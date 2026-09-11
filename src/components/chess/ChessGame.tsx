'use client';
/* oxlint-disable react/react-compiler, react-hooks/exhaustive-deps */

import { Chess, type Move, type Square } from 'chess.js';
import {
  BarChart3,
  Bot,
  Check,
  ChevronLeft,
  Clock3,
  Copy,
  Flag,
  History,
  Home,
  Lightbulb,
  Moon,
  RotateCcw,
  Settings,
  Share2,
  Sparkles,
  Sun,
  Swords,
  TimerReset,
  Undo2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Arrow } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const stockfishUrl = '/games/chess/stockfish-18-lite.js';

type AppView = 'home' | 'botSetup' | 'localSetup' | 'onlineSetup' | 'game' | 'stats';
type GameMode = 'bot' | 'local';
type Difficulty = 'easy' | 'medium' | 'hard';
type PlayerColorChoice = 'white' | 'black' | 'random';
type PieceColor = 'white' | 'black';
type TimeControl = 0 | 180 | 300 | 600;
type BoardTheme = 'classic' | 'modern';
type UiTheme = 'light' | 'dark';
type PromotionPiece = 'q' | 'r' | 'b' | 'n';

type GameConfig = {
  mode: GameMode;
  difficulty: Difficulty;
  playerColor: PieceColor;
  requestedColor: PlayerColorChoice;
  timeControl: TimeControl;
  autoFlip: boolean;
};

type ResultState = {
  title: string;
  reason: string;
  winner: PieceColor | 'draw' | null;
};

type PendingPromotion = {
  from: Square;
  to: Square;
};

type LocalStats = {
  games: number;
  wins: number;
  losses: number;
  draws: number;
  byDifficulty: Record<Difficulty, { wins: number; losses: number; draws: number }>;
  recentPgn: string[];
};

type EngineMessage =
  | { type: 'bestmove'; requestId: string; move: string | null; candidates: string[] }
  | { type: 'error'; requestId: string; message: string };

type WebMcpContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      execute: (input: unknown) => unknown;
      annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
    },
    options?: { signal?: AbortSignal },
  ) => void | Promise<void>;
};

const STARTING_FEN = new Chess().fen();
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const DIFFICULTY_COPY: Record<Difficulty, string> = {
  easy: 'Relaxed opponent. Good for beginners.',
  medium: 'Balanced opponent with sharper tactical play.',
  hard: 'Strong engine play with fewer mistakes.',
};
const TIME_OPTIONS: { label: string; value: TimeControl }[] = [
  { label: 'No Timer', value: 0 },
  { label: '10 Min', value: 600 },
  { label: '5 Min', value: 300 },
  { label: '3 Min', value: 180 },
];
const PIECE_SYMBOLS: Record<string, string> = {
  wp: '♙',
  wn: '♘',
  wb: '♗',
  wr: '♖',
  wq: '♕',
  wk: '♔',
  bp: '♟',
  bn: '♞',
  bb: '♝',
  br: '♜',
  bq: '♛',
  bk: '♚',
};
const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
const EMPTY_STATS: LocalStats = {
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  byDifficulty: {
    easy: { wins: 0, losses: 0, draws: 0 },
    medium: { wins: 0, losses: 0, draws: 0 },
    hard: { wins: 0, losses: 0, draws: 0 },
  },
  recentPgn: [],
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function cloneStats(stats: LocalStats): LocalStats {
  return {
    ...stats,
    byDifficulty: {
      easy: { ...stats.byDifficulty.easy },
      medium: { ...stats.byDifficulty.medium },
      hard: { ...stats.byDifficulty.hard },
    },
    recentPgn: [...stats.recentPgn],
  };
}

function formatTime(total: number) {
  const safe = Math.max(0, Math.ceil(total));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function squareName(file: string, rank: number): Square {
  return `${file}${rank}` as Square;
}

function sideName(color: PieceColor) {
  return color === 'white' ? 'White' : 'Black';
}

function opposite(color: PieceColor): PieceColor {
  return color === 'white' ? 'black' : 'white';
}

function turnToColor(turn: 'w' | 'b'): PieceColor {
  return turn === 'w' ? 'white' : 'black';
}

function isPromotionMove(chess: Chess, from: Square, to: Square) {
  const piece = chess.get(from);
  if (!piece || piece.type !== 'p') return false;
  return (piece.color === 'w' && to.endsWith('8')) || (piece.color === 'b' && to.endsWith('1'));
}

function findKingSquare(chess: Chess, color: 'w' | 'b'): Square | null {
  for (let rank = 1; rank <= 8; rank += 1) {
    for (const file of FILES) {
      const square = squareName(file, rank);
      const piece = chess.get(square);
      if (piece?.type === 'k' && piece.color === color) return square;
    }
  }
  return null;
}

function resultFromPosition(chess: Chess): ResultState | null {
  if (chess.isCheckmate()) {
    const winner = opposite(turnToColor(chess.turn()));
    return { title: 'CHECKMATE', reason: `${sideName(winner)} wins`, winner };
  }
  if (chess.isStalemate()) return { title: 'DRAW', reason: 'Stalemate', winner: 'draw' };
  if (chess.isThreefoldRepetition()) return { title: 'DRAW', reason: 'Threefold repetition', winner: 'draw' };
  if (chess.isInsufficientMaterial()) return { title: 'DRAW', reason: 'Insufficient material', winner: 'draw' };
  if (chess.isDrawByFiftyMoves()) return { title: 'DRAW', reason: '50-move rule', winner: 'draw' };
  if (chess.isDraw()) return { title: 'DRAW', reason: 'Draw by rule', winner: 'draw' };
  return null;
}

function capturedPieces(history: Move[]) {
  const white: string[] = [];
  const black: string[] = [];
  history.forEach((move) => {
    if (!move.captured) return;
    const capturedColor = move.color === 'w' ? 'b' : 'w';
    const symbol = PIECE_SYMBOLS[`${capturedColor}${move.captured}`];
    if (move.color === 'w') white.push(symbol);
    else black.push(symbol);
  });
  return { white, black };
}

function materialScore(symbols: string[]) {
  return symbols.reduce((score, symbol) => {
    const entry = Object.entries(PIECE_SYMBOLS).find(([, pieceSymbol]) => pieceSymbol === symbol);
    return score + (entry ? PIECE_VALUES[entry[0][1]] : 0);
  }, 0);
}

function buildPgnHeaders(config: GameConfig) {
  const white = config.mode === 'bot' && config.playerColor === 'black' ? `Stockfish ${config.difficulty}` : 'Player';
  const black = config.mode === 'bot' && config.playerColor === 'white' ? `Stockfish ${config.difficulty}` : 'Player';
  return { Event: config.mode === 'bot' ? 'Bot Game' : 'Local Game', White: white, Black: black };
}

function useSound(enabled: boolean) {
  return useCallback(
    (kind: 'move' | 'capture' | 'check' | 'end' | 'invalid' | 'promotion') => {
      if (!enabled || typeof window === 'undefined') return;
      const audioWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
      const AudioContextClass = window.AudioContext || audioWindow.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const frequencies = { move: 440, capture: 280, check: 620, end: 180, invalid: 120, promotion: 760 };
      oscillator.frequency.value = frequencies[kind];
      oscillator.type = kind === 'invalid' ? 'sawtooth' : 'sine';
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.13);
      oscillator.addEventListener('ended', () => void ctx.close());
    },
    [enabled],
  );
}

function useStockfish() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<string, (message: EngineMessage) => void>>(new Map());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const workerSource = `
      const stockfishUrl = ${JSON.stringify(stockfishUrl)};
      const settings = {
        easy: { skill: 3, depth: 4, multiPv: 3 },
        medium: { skill: 10, depth: 9, multiPv: 2 },
        hard: { skill: 18, depth: 15, multiPv: 1 }
      };
      let engine = null;
      let activeRequest = null;
      let candidates = new Map();

      function post(line) {
        if (engine) engine.postMessage(line);
      }

      function chooseMove(difficulty, bestMove) {
        const ordered = [...candidates.entries()].sort(([a], [b]) => a - b).map(([, move]) => move);
        if (!ordered.length && bestMove) return bestMove;
        if (difficulty === 'hard') return bestMove || ordered[0] || null;
        if (difficulty === 'medium') return Math.random() < 0.82 ? ordered[0] || bestMove : ordered[1] || ordered[0] || bestMove;
        const roll = Math.random();
        if (roll < 0.55) return ordered[0] || bestMove;
        if (roll < 0.82) return ordered[1] || ordered[0] || bestMove;
        return ordered[2] || ordered[1] || ordered[0] || bestMove;
      }

      try {
        engine = new Worker(stockfishUrl);
        engine.onmessage = (event) => {
          const line = String(event.data);
          const pvMatch = line.match(/\\bmultipv\\s+(\\d+).*?\\bpv\\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
          if (pvMatch) candidates.set(Number(pvMatch[1]), pvMatch[2]);
          if (line.startsWith('bestmove') && activeRequest) {
            const parts = line.split(/\\s+/);
            const best = parts[1] && parts[1] !== '(none)' ? parts[1] : null;
            const move = chooseMove(activeRequest.difficulty, best);
            self.postMessage({ type: 'bestmove', requestId: activeRequest.requestId, move, candidates: [...candidates.values()] });
            activeRequest = null;
            candidates = new Map();
          }
        };
        engine.onerror = () => {
          if (activeRequest) self.postMessage({ type: 'error', requestId: activeRequest.requestId, message: 'Stockfish worker failed.' });
          activeRequest = null;
        };
        post('uci');
        self.postMessage({ type: 'ready' });
      } catch {
        self.postMessage({ type: 'error', requestId: 'init', message: 'Stockfish could not load.' });
      }

      self.onmessage = (event) => {
        if (event.data.type !== 'bestmove') return;
        if (!engine) {
          self.postMessage({ type: 'error', requestId: event.data.requestId, message: 'Stockfish could not load.' });
          return;
        }
        activeRequest = event.data;
        candidates = new Map();
        const level = settings[event.data.difficulty];
        post('stop');
        post('setoption name Skill Level value ' + level.skill);
        post('setoption name MultiPV value ' + level.multiPv);
        post('position fen ' + event.data.fen);
        post('go depth ' + level.depth);
      };
    `;
    const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    const worker = new Worker(workerUrl);
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent<EngineMessage | { type: 'ready' }>) => {
      if (event.data.type === 'ready') {
        setReady(true);
        return;
      }
      if (event.data.type === 'error' && event.data.requestId === 'init') {
        setFailed(true);
        setReady(false);
        return;
      }
      const callback = pendingRef.current.get(event.data.requestId);
      if (callback) {
        pendingRef.current.delete(event.data.requestId);
        callback(event.data);
      }
    };
    worker.onerror = () => {
      setFailed(true);
      setReady(false);
    };
    return () => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };
  }, []);

  const getBestMove = useCallback(
    (fen: string, difficulty: Difficulty, requestId: string) => {
      return new Promise<EngineMessage>((resolve) => {
        const worker = workerRef.current;
        if (!worker || failed) {
          resolve({ type: 'error', requestId, message: 'Stockfish is unavailable.' });
          return;
        }
        pendingRef.current.set(requestId, resolve);
        worker.postMessage({ type: 'bestmove', fen, difficulty, requestId });
        window.setTimeout(() => {
          if (pendingRef.current.has(requestId)) {
            pendingRef.current.delete(requestId);
            resolve({ type: 'error', requestId, message: 'Stockfish timed out.' });
          }
        }, 5000);
      });
    },
    [failed],
  );

  return { ready, failed, getBestMove };
}

function chooseEngineMove(difficulty: Difficulty, bestMove: string | null, candidates: Map<number, string>) {
  const ordered = [...candidates.entries()].sort(([a], [b]) => a - b).map(([, move]) => move);
  if (!ordered.length && bestMove) return bestMove;
  if (difficulty === 'hard') return bestMove || ordered[0] || null;
  if (difficulty === 'medium') return Math.random() < 0.82 ? ordered[0] || bestMove : ordered[1] || ordered[0] || bestMove;
  const roll = Math.random();
  if (roll < 0.55) return ordered[0] || bestMove;
  if (roll < 0.82) return ordered[1] || ordered[0] || bestMove;
  return ordered[2] || ordered[1] || ordered[0] || bestMove;
}

function useBrowserStockfish() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<string, (message: EngineMessage) => void>>(new Map());
  const activeRequestRef = useRef<{ requestId: string; difficulty: Difficulty } | null>(null);
  const candidatesRef = useRef<Map<number, string>>(new Map());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const worker = new Worker(stockfishUrl);
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent<string>) => {
      const line = String(event.data);
      if (line === 'uciok' || line === 'readyok' || line.startsWith('Stockfish')) setReady(true);
      const pvMatch = line.match(/\bmultipv\s+(\d+).*?\bpv\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
      if (pvMatch) candidatesRef.current.set(Number(pvMatch[1]), pvMatch[2]);
      if (line.startsWith('bestmove') && activeRequestRef.current) {
        const parts = line.split(/\s+/);
        const best = parts[1] && parts[1] !== '(none)' ? parts[1] : null;
        const active = activeRequestRef.current;
        const move = chooseEngineMove(active.difficulty, best, candidatesRef.current);
        pendingRef.current.get(active.requestId)?.({ type: 'bestmove', requestId: active.requestId, move, candidates: [...candidatesRef.current.values()] });
        pendingRef.current.delete(active.requestId);
        activeRequestRef.current = null;
        candidatesRef.current = new Map();
      }
    };
    worker.onerror = () => {
      setFailed(true);
      setReady(false);
    };
    worker.postMessage('uci');
    worker.postMessage('isready');
    return () => worker.terminate();
  }, []);

  const getBestMove = useCallback(
    (fen: string, difficulty: Difficulty, requestId: string) => {
      return new Promise<EngineMessage>((resolve) => {
        const worker = workerRef.current;
        if (!worker || failed) {
          resolve({ type: 'error', requestId, message: 'Stockfish is unavailable.' });
          return;
        }
        pendingRef.current.set(requestId, resolve);
        activeRequestRef.current = { requestId, difficulty };
        candidatesRef.current = new Map();
        const settings = {
          easy: { skill: 3, depth: 4, multiPv: 3 },
          medium: { skill: 10, depth: 9, multiPv: 2 },
          hard: { skill: 18, depth: 15, multiPv: 1 },
        }[difficulty];
        worker.postMessage('stop');
        worker.postMessage(`setoption name Skill Level value ${settings.skill}`);
        worker.postMessage(`setoption name MultiPV value ${settings.multiPv}`);
        worker.postMessage(`position fen ${fen}`);
        worker.postMessage(`go depth ${settings.depth}`);
        window.setTimeout(() => {
          if (pendingRef.current.has(requestId)) {
            pendingRef.current.delete(requestId);
            activeRequestRef.current = null;
            resolve({ type: 'error', requestId, message: 'Stockfish timed out.' });
          }
        }, 5000);
      });
    },
    [failed],
  );

  return { ready, failed, getBestMove };
}

function fallbackMove(fen: string, difficulty: Difficulty) {
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true });
  if (!moves.length) return null;
  const captures = moves.filter((move) => move.captured);
  const checks = moves.filter((move) => move.san.includes('+') || move.san.includes('#'));
  const pool = difficulty === 'easy' ? moves : checks.length ? checks : captures.length ? captures : moves;
  const move = pool[Math.floor(Math.random() * pool.length)];
  return `${move.from}${move.to}${move.promotion ?? ''}`;
}

function useChessGame(config: GameConfig | null, soundEnabled: boolean) {
  const playSound = useSound(soundEnabled);
  const { ready: engineReady, failed: engineFailed, getBestMove } = useBrowserStockfish();
  const chessRef = useRef(new Chess());
  const gameIdRef = useRef(crypto.randomUUID());
  const botRequestRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const [fen, setFen] = useState(STARTING_FEN);
  const [history, setHistory] = useState<Move[]>([]);
  const [selected, setSelected] = useState<Square | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [thinking, setThinking] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [drawOffer, setDrawOffer] = useState<PieceColor | null>(null);
  const [timers, setTimers] = useState({ white: config?.timeControl ?? 0, black: config?.timeControl ?? 0 });
  const [duration, setDuration] = useState(0);
  const [orientationOverride, setOrientationOverride] = useState<PieceColor | null>(null);

  const sync = useCallback((chess: Chess) => {
    setFen(chess.fen());
    setHistory(chess.history({ verbose: true }));
  }, []);

  const finalizeResult = useCallback(
    (nextResult: ResultState) => {
      setResult(nextResult);
      setThinking(false);
      playSound('end');
    },
    [playSound],
  );

  const reset = useCallback(
    (nextConfig = config) => {
      if (!nextConfig) return;
      const chess = new Chess();
      Object.entries(buildPgnHeaders(nextConfig)).forEach(([key, value]) => chess.setHeader(key, value));
      chessRef.current = chess;
      gameIdRef.current = crypto.randomUUID();
      botRequestRef.current = null;
      startedAtRef.current = Date.now();
      setFen(chess.fen());
      setHistory([]);
      setSelected(null);
      setPendingPromotion(null);
      setResult(null);
      setThinking(false);
      setHint(null);
      setDrawOffer(null);
      setDuration(0);
      setTimers({ white: nextConfig.timeControl, black: nextConfig.timeControl });
      setOrientationOverride(null);
    },
    [config],
  );

  useEffect(() => {
    if (config) reset(config);
  }, [config, reset]);

  const isBotTurn = useMemo(() => {
    if (!config || config.mode !== 'bot' || result || pendingPromotion) return false;
    return turnToColor(chessRef.current.turn()) !== config.playerColor;
  }, [config, fen, result, pendingPromotion]);

  const applyMove = useCallback(
    (move: { from: Square; to: Square; promotion?: PromotionPiece }, source: 'player' | 'bot') => {
      if (result) return false;
      const chess = chessRef.current;
      let moved: Move | null = null;
      try {
        moved = chess.move(move);
      } catch {
        moved = null;
      }
      if (!moved) {
        if (source === 'player') playSound('invalid');
        return false;
      }
      setHint(null);
      setSelected(null);
      setDrawOffer(null);
      sync(chess);
      if (moved.promotion) playSound('promotion');
      else if (chess.isCheck()) playSound('check');
      else if (moved.captured) playSound('capture');
      else playSound('move');
      const nextResult = resultFromPosition(chess);
      if (nextResult) finalizeResult(nextResult);
      return true;
    },
    [finalizeResult, playSound, result, sync],
  );

  const makePlayerMove = useCallback(
    (from: Square, to: Square) => {
      if (!config || result || thinking || isBotTurn) return false;
      const piece = chessRef.current.get(from);
      if (!piece || piece.color !== chessRef.current.turn()) return false;
      if (isPromotionMove(chessRef.current, from, to)) {
        const legalPromotion = chessRef.current.moves({ square: from, verbose: true }).some((move) => move.to === to && move.promotion);
        if (legalPromotion) {
          setPendingPromotion({ from, to });
          return true;
        }
      }
      return applyMove({ from, to }, 'player');
    },
    [applyMove, config, isBotTurn, result, thinking],
  );

  const choosePromotion = useCallback(
    (piece: PromotionPiece) => {
      if (!pendingPromotion) return;
      applyMove({ ...pendingPromotion, promotion: piece }, 'player');
      setPendingPromotion(null);
    },
    [applyMove, pendingPromotion],
  );

  useEffect(() => {
    if (!config || config.mode !== 'bot' || !isBotTurn || botRequestRef.current) return undefined;
    const requestGameId = gameIdRef.current;
    const requestFen = chessRef.current.fen();
    const requestId = `${requestGameId}:${Date.now()}`;
    botRequestRef.current = requestId;
    setThinking(true);
    const delay = config.difficulty === 'easy' ? 320 : config.difficulty === 'medium' ? 520 : 760;
    const timeout = window.setTimeout(async () => {
      const response = await getBestMove(requestFen, config.difficulty, requestId);
      if (gameIdRef.current !== requestGameId || chessRef.current.fen() !== requestFen) {
        if (botRequestRef.current === requestId) botRequestRef.current = null;
        setThinking(false);
        return;
      }
      const bestMove = response.type === 'bestmove' ? response.move : fallbackMove(requestFen, config.difficulty);
      const moveText = bestMove ?? fallbackMove(requestFen, config.difficulty);
      if (!moveText) {
        if (botRequestRef.current === requestId) botRequestRef.current = null;
        setThinking(false);
        return;
      }
      applyMove(
        {
          from: moveText.slice(0, 2) as Square,
          to: moveText.slice(2, 4) as Square,
          promotion: (moveText[4] as PromotionPiece | undefined) ?? undefined,
        },
        'bot',
      );
      if (botRequestRef.current === requestId) botRequestRef.current = null;
      setThinking(false);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (botRequestRef.current === requestId) botRequestRef.current = null;
    };
  }, [applyMove, config, getBestMove, isBotTurn]);

  useEffect(() => {
    if (!config || result) return undefined;
    const interval = window.setInterval(() => {
      setDuration(Math.floor((Date.now() - startedAtRef.current) / 1000));
      if (!config.timeControl || pendingPromotion) return;
      const active = turnToColor(chessRef.current.turn());
      setTimers((current) => {
        const next = { ...current, [active]: Math.max(0, current[active] - 1) };
        if (next[active] <= 0 && !result) {
          window.setTimeout(() => finalizeResult({ title: 'TIME OUT', reason: `${sideName(opposite(active))} wins`, winner: opposite(active) }), 0);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [config, finalizeResult, pendingPromotion, result]);

  const legalTargets = useMemo(() => {
    if (!selected) return [];
    return chessRef.current.moves({ square: selected, verbose: true }).map((move) => move.to);
  }, [selected, fen]);

  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    const last = history.at(-1);
    if (last) {
      styles[last.from] = { background: 'rgba(242, 190, 92, 0.48)' };
      styles[last.to] = { background: 'rgba(242, 190, 92, 0.48)' };
    }
    if (selected) styles[selected] = { background: 'rgba(90, 128, 106, 0.65)' };
    legalTargets.forEach((square) => {
      const occupied = chessRef.current.get(square);
      styles[square] = {
        ...styles[square],
        boxShadow: occupied ? 'inset 0 0 0 5px rgba(120, 37, 37, 0.42)' : 'inset 0 0 0 9999px rgba(36, 66, 46, 0.15)',
        borderRadius: occupied ? 0 : '50%',
      };
    });
    if (chessRef.current.isCheck()) {
      const king = findKingSquare(chessRef.current, chessRef.current.turn());
      if (king) styles[king] = { ...styles[king], background: 'rgba(194, 65, 12, 0.65)' };
    }
    return styles;
  }, [fen, history, legalTargets, selected]);

  const boardOrientation = useMemo<PieceColor>(() => {
    if (!config) return 'white';
    if (orientationOverride) return orientationOverride;
    if (config.mode === 'bot') return config.playerColor;
    if (config.autoFlip) return turnToColor(chessRef.current.turn());
    return 'white';
  }, [config, fen, orientationOverride]);

  const undo = useCallback(() => {
    if (!config || result || thinking) return;
    const chess = chessRef.current;
    if (config.mode === 'bot') {
      chess.undo();
      chess.undo();
    } else {
      chess.undo();
    }
    sync(chess);
    setResult(null);
    setPendingPromotion(null);
    setHint(null);
  }, [config, result, sync, thinking]);

  const requestHint = useCallback(async () => {
    if (!config || config.mode !== 'bot' || result || thinking || isBotTurn) return;
    const requestFen = chessRef.current.fen();
    const requestId = `hint:${gameIdRef.current}:${Date.now()}`;
    const response = await getBestMove(requestFen, 'hard', requestId);
    const moveText = response.type === 'bestmove' ? response.move : fallbackMove(requestFen, 'hard');
    if (moveText && chessRef.current.fen() === requestFen) setHint(moveText);
  }, [config, getBestMove, isBotTurn, result, thinking]);

  const resign = useCallback(
    (color: PieceColor) => finalizeResult({ title: 'RESIGNED', reason: `${sideName(opposite(color))} wins`, winner: opposite(color) }),
    [finalizeResult],
  );

  const agreeDraw = useCallback(() => finalizeResult({ title: 'DRAW', reason: 'Draw by agreement', winner: 'draw' }), [finalizeResult]);

  return {
    fen,
    history,
    selected,
    setSelected,
    squareStyles,
    pendingPromotion,
    choosePromotion,
    result,
    thinking,
    hint,
    timers,
    duration,
    boardOrientation,
    engineReady,
    engineFailed,
    drawOffer,
    setDrawOffer,
    makePlayerMove,
    reset,
    undo,
    requestHint,
    resign,
    agreeDraw,
    setOrientationOverride,
    pgn: () => chessRef.current.pgn(),
    turn: turnToColor(chessRef.current.turn()),
    inCheck: chessRef.current.isCheck(),
  };
}

function AppShell() {
  const [view, setView] = useState<AppView>('home');
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [colorChoice, setColorChoice] = useState<PlayerColorChoice>('white');
  const [timeControl, setTimeControl] = useState<TimeControl>(0);
  const [autoFlip, setAutoFlip] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('classic');
  const [uiTheme, setUiTheme] = useState<UiTheme>('dark');
  const [stats, setStats] = useState<LocalStats>(EMPTY_STATS);
  const [roomLink, setRoomLink] = useState('');

  useEffect(() => {
    setStats(readStorage('chess:stats', EMPTY_STATS));
    setSoundEnabled(readStorage('chess:sound', true));
    setBoardTheme(readStorage('chess:boardTheme', 'classic'));
    setUiTheme(readStorage('chess:uiTheme', 'dark'));
  }, []);

  useEffect(() => writeStorage('chess:sound', soundEnabled), [soundEnabled]);
  useEffect(() => writeStorage('chess:boardTheme', boardTheme), [boardTheme]);
  useEffect(() => writeStorage('chess:uiTheme', uiTheme), [uiTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', uiTheme === 'dark');
  }, [uiTheme]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (!room) return;
    setRoomLink(window.location.href);
    setView('onlineSetup');
  }, []);

  const startBot = () => {
    const playerColor = colorChoice === 'random' ? (Math.random() > 0.5 ? 'white' : 'black') : colorChoice;
    setConfig({ mode: 'bot', difficulty, playerColor, requestedColor: colorChoice, timeControl, autoFlip: false });
    setView('game');
  };

  const startLocal = () => {
    setConfig({ mode: 'local', difficulty: 'medium', playerColor: 'white', requestedColor: 'white', timeControl, autoFlip });
    setView('game');
  };

  const createRoomLink = () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('room', roomId);
    setRoomLink(url.toString());
    void navigator.clipboard?.writeText(url.toString());
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: WebMcpContext }).modelContext;
    if (!context?.registerTool) return undefined;
    const lifecycle = new AbortController();
    const parseTime = (value: unknown): TimeControl => ([0, 180, 300, 600].includes(Number(value)) ? (Number(value) as TimeControl) : 0);
    const parseDifficulty = (value: unknown): Difficulty => (value === 'easy' || value === 'medium' || value === 'hard' ? value : 'medium');
    const parseColor = (value: unknown): PlayerColorChoice => (value === 'white' || value === 'black' || value === 'random' ? value : 'white');
    void Promise.resolve(
      context.registerTool(
        {
          name: 'read_chess_stats',
          title: 'Read chess stats',
          description: 'Read the locally saved chess results shown on the Stats screen.',
          inputSchema: { type: 'object', properties: {}, additionalProperties: false },
          execute: () => stats,
          annotations: { readOnlyHint: true, untrustedContentHint: false },
        },
        { signal: lifecycle.signal },
      ),
    );
    void Promise.resolve(
      context.registerTool(
        {
          name: 'start_bot_game',
          title: 'Start bot game',
          description: 'Start a visible chess game against Stockfish with the requested difficulty, color, and timer.',
          inputSchema: {
            type: 'object',
            properties: {
              difficulty: { enum: ['easy', 'medium', 'hard'] },
              color: { enum: ['white', 'black', 'random'] },
              timeControl: { enum: [0, 180, 300, 600] },
            },
            additionalProperties: false,
          },
          execute: (input) => {
            const data = input as { difficulty?: unknown; color?: unknown; timeControl?: unknown };
            const nextDifficulty = parseDifficulty(data?.difficulty);
            const requestedColor = parseColor(data?.color);
            const playerColor = requestedColor === 'random' ? (Math.random() > 0.5 ? 'white' : 'black') : requestedColor;
            const nextConfig = {
              mode: 'bot' as const,
              difficulty: nextDifficulty,
              playerColor,
              requestedColor,
              timeControl: parseTime(data?.timeControl),
              autoFlip: false,
            };
            setDifficulty(nextDifficulty);
            setColorChoice(requestedColor);
            setTimeControl(nextConfig.timeControl);
            setConfig(nextConfig);
            setView('game');
            return { status: 'started', mode: 'bot', difficulty: nextDifficulty, playerColor };
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
        },
        { signal: lifecycle.signal },
      ),
    );
    void Promise.resolve(
      context.registerTool(
        {
          name: 'start_local_game',
          title: 'Start local game',
          description: 'Start a visible local chess game with the requested timer and board flip setting.',
          inputSchema: {
            type: 'object',
            properties: {
              timeControl: { enum: [0, 180, 300, 600] },
              autoFlip: { type: 'boolean' },
            },
            additionalProperties: false,
          },
          execute: (input) => {
            const data = input as { timeControl?: unknown; autoFlip?: unknown };
            const nextConfig = {
              mode: 'local' as const,
              difficulty: 'medium' as const,
              playerColor: 'white' as const,
              requestedColor: 'white' as const,
              timeControl: parseTime(data?.timeControl),
              autoFlip: Boolean(data?.autoFlip),
            };
            setTimeControl(nextConfig.timeControl);
            setAutoFlip(nextConfig.autoFlip);
            setConfig(nextConfig);
            setView('game');
            return { status: 'started', mode: 'local', autoFlip: nextConfig.autoFlip };
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
        },
        { signal: lifecycle.signal },
      ),
    );
    return () => lifecycle.abort();
  }, [stats]);

  const recordGame = useCallback((gameConfig: GameConfig, result: ResultState, pgn: string) => {
    setStats((current) => {
      const next = cloneStats(current);
      next.games += 1;
      if (result.winner === 'draw') next.draws += 1;
      else if (gameConfig.mode === 'bot' && result.winner === gameConfig.playerColor) next.wins += 1;
      else if (gameConfig.mode === 'bot') next.losses += 1;
      const bucket = next.byDifficulty[gameConfig.difficulty];
      if (gameConfig.mode === 'bot') {
        if (result.winner === 'draw') bucket.draws += 1;
        else if (result.winner === gameConfig.playerColor) bucket.wins += 1;
        else bucket.losses += 1;
      }
      next.recentPgn = [pgn, ...next.recentPgn].slice(0, 5);
      writeStorage('chess:stats', next);
      return next;
    });
  }, []);

  return (
    <main className="chess-original min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(188,162,104,0.18),transparent_30%),linear-gradient(135deg,var(--background),var(--surface-deep))] text-foreground">
      {view === 'home' && (
        <HomePage
          stats={stats}
          soundEnabled={soundEnabled}
          boardTheme={boardTheme}
          uiTheme={uiTheme}
          onBot={() => setView('botSetup')}
          onLocal={() => setView('localSetup')}
          onOnline={() => {
            createRoomLink();
            setView('onlineSetup');
          }}
          onStats={() => setView('stats')}
          onSound={() => setSoundEnabled((value) => !value)}
          onBoardTheme={setBoardTheme}
          onUiTheme={setUiTheme}
        />
      )}
      {view === 'botSetup' && (
        <BotSetupPage
          difficulty={difficulty}
          colorChoice={colorChoice}
          timeControl={timeControl}
          onDifficulty={setDifficulty}
          onColor={setColorChoice}
          onTime={setTimeControl}
          onBack={() => setView('home')}
          onStart={startBot}
        />
      )}
      {view === 'localSetup' && (
        <LocalSetupPage
          timeControl={timeControl}
          autoFlip={autoFlip}
          onTime={setTimeControl}
          onAutoFlip={setAutoFlip}
          onBack={() => setView('home')}
          onStart={startLocal}
        />
      )}
      {view === 'onlineSetup' && (
        <OnlineSetupPage
          roomLink={roomLink}
          onCreateLink={createRoomLink}
          onBack={() => setView('home')}
          onLocalFallback={() => setView('localSetup')}
        />
      )}
      {view === 'stats' && <StatsPage stats={stats} onBack={() => setView('home')} />}
      {view === 'game' && config && (
        <GamePage
          config={config}
          boardTheme={boardTheme}
          soundEnabled={soundEnabled}
          onSound={() => setSoundEnabled((value) => !value)}
          onHome={() => setView('home')}
          onChangeSettings={() => setView(config.mode === 'bot' ? 'botSetup' : 'localSetup')}
          onRecord={recordGame}
        />
      )}
    </main>
  );
}

function HomePage(props: {
  stats: LocalStats;
  soundEnabled: boolean;
  boardTheme: BoardTheme;
  uiTheme: UiTheme;
  onBot: () => void;
  onLocal: () => void;
  onOnline: () => void;
  onStats: () => void;
  onSound: () => void;
  onBoardTheme: (theme: BoardTheme) => void;
  onUiTheme: (theme: UiTheme) => void;
}) {
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] items-center gap-10 px-5 py-8 max-lg:grid-cols-1 max-lg:content-start sm:px-8">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg border border-border bg-card text-xl font-semibold shadow-sm">♔</span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Chess</p>
            <h1 className="text-5xl font-semibold tracking-normal sm:text-7xl">PLAY CHESS</h1>
          </div>
        </div>
        <p className="max-w-md text-lg text-muted-foreground">Challenge the computer or play with a friend.</p>
        <div className="grid max-w-sm gap-3">
          <Button className="h-12 justify-start px-4 text-base" onClick={props.onBot}>
            <Bot /> Play vs Bot
          </Button>
          <Button className="h-12 justify-start px-4 text-base" variant="secondary" onClick={props.onLocal}>
            <Swords /> Local 1 vs 1
          </Button>
          <Button className="h-12 justify-start px-4 text-base" variant="outline" onClick={props.onOnline}>
            <Share2 /> Online 1v1
          </Button>
          <Button className="h-12 justify-start px-4 text-base" variant="outline" disabled>
            <Sparkles /> Training
            <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={props.onStats}>
            <BarChart3 /> Stats
          </Button>
          <Button variant="ghost" onClick={props.onSound} aria-label="Toggle sound">
            {props.soundEnabled ? <Volume2 /> : <VolumeX />} Sound
          </Button>
          <Button variant={props.uiTheme === 'dark' ? 'secondary' : 'ghost'} onClick={() => props.onUiTheme(props.uiTheme === 'dark' ? 'light' : 'dark')}>
            {props.uiTheme === 'dark' ? <Moon /> : <Sun />} {props.uiTheme === 'dark' ? 'Dark' : 'Light'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-xl border border-border bg-card/86 p-5 shadow-2xl shadow-black/10">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-medium">Quick board</p>
            <div className="flex gap-2">
              {(['classic', 'modern'] as BoardTheme[]).map((theme) => (
                <button
                  key={theme}
                  className={`size-8 rounded-md border ${props.boardTheme === theme ? 'border-primary' : 'border-border'}`}
                  onClick={() => props.onBoardTheme(theme)}
                  aria-label={`${theme} board theme`}
                >
                  <span className={`block size-full rounded-[5px] ${theme === 'classic' ? 'bg-[#b88b4a]' : 'bg-[#56616f]'}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-lg border border-border">
            {Array.from({ length: 64 }).map((_, index) => {
              const light = (Math.floor(index / 8) + index) % 2 === 0;
              return <span key={index} className={light ? 'bg-[var(--board-light)]' : 'bg-[var(--board-dark)]'} />;
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatTile label="Games" value={props.stats.games} />
          <StatTile label="Wins" value={props.stats.wins} />
          <StatTile label="Draws" value={props.stats.draws} />
        </div>
      </div>
    </section>
  );
}

function BotSetupPage(props: {
  difficulty: Difficulty;
  colorChoice: PlayerColorChoice;
  timeControl: TimeControl;
  onDifficulty: (difficulty: Difficulty) => void;
  onColor: (color: PlayerColorChoice) => void;
  onTime: (time: TimeControl) => void;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <SetupFrame title="Choose Your Game" onBack={props.onBack}>
      <ChoiceGroup title="Difficulty">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((item) => (
          <ChoiceCard key={item} active={props.difficulty === item} title={item} description={DIFFICULTY_COPY[item]} onClick={() => props.onDifficulty(item)} />
        ))}
      </ChoiceGroup>
      <ChoiceGroup title="Player Color">
        {(['white', 'black', 'random'] as PlayerColorChoice[]).map((item) => (
          <ChoiceCard key={item} active={props.colorChoice === item} title={item} description={item === 'random' ? 'Let the board decide.' : `${sideName(item)} at the bottom.`} onClick={() => props.onColor(item)} />
        ))}
      </ChoiceGroup>
      <TimeSelector value={props.timeControl} onChange={props.onTime} />
      <Button className="h-12 text-base" onClick={props.onStart}>
        <Swords /> Start Game
      </Button>
    </SetupFrame>
  );
}

function LocalSetupPage(props: {
  timeControl: TimeControl;
  autoFlip: boolean;
  onTime: (time: TimeControl) => void;
  onAutoFlip: (value: boolean) => void;
  onBack: () => void;
  onStart: () => void;
}) {
  return (
    <SetupFrame title="Local 1 vs 1" onBack={props.onBack}>
      <TimeSelector value={props.timeControl} onChange={props.onTime} />
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
        <div>
          <p className="font-medium">Auto Flip Board</p>
          <p className="text-sm text-muted-foreground">Rotate the board after each completed move.</p>
        </div>
        <Switch checked={props.autoFlip} onCheckedChange={props.onAutoFlip} />
      </div>
      <Button className="h-12 text-base" onClick={props.onStart}>
        <Swords /> Start Local Game
      </Button>
    </SetupFrame>
  );
}

function OnlineSetupPage(props: {
  roomLink: string;
  onCreateLink: () => void;
  onBack: () => void;
  onLocalFallback: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    if (!props.roomLink) props.onCreateLink();
    const link = props.roomLink || window.location.href;
    void navigator.clipboard?.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <SetupFrame title="Online 1v1" onBack={props.onBack}>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted">
            <Share2 className="size-5" />
          </span>
          <div>
            <p className="font-medium">Invite Link</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Share this room link with a friend. Live move sync needs hosted multiplayer storage before remote play is active.
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="min-h-11 overflow-hidden rounded-md border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
            {props.roomLink || 'Create a room link to invite another player.'}
          </div>
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
            <Button onClick={props.onCreateLink}>
              <Share2 /> Create Link
            </Button>
            <Button variant="outline" onClick={copyLink} disabled={!props.roomLink}>
              <Copy /> {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="font-medium">What is ready now?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Same-device local 1v1 is playable today. The room link reserves the flow for remote multiplayer, but both players will need a shared backend before moves sync across PCs.
        </p>
      </div>
      <Button className="h-12 text-base" variant="secondary" onClick={props.onLocalFallback}>
        <Swords /> Play Same Device
      </Button>
    </SetupFrame>
  );
}

function SetupFrame({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-6 px-5 py-8">
      <Button className="w-fit" variant="ghost" onClick={onBack}>
        <ChevronLeft /> Home
      </Button>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Chess</p>
        <h1 className="text-4xl font-semibold tracking-normal">{title}</h1>
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

function ChoiceGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-medium">{title}</h2>
      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">{children}</div>
    </div>
  );
}

function ChoiceCard({ active, title, description, onClick }: { active: boolean; title: string; description: string; onClick: () => void }) {
  return (
    <button
      className={`rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-muted'}`}
      onClick={onClick}
    >
      <span className="block text-base font-semibold capitalize">{title}</span>
      <span className={`mt-2 block text-sm ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{description}</span>
    </button>
  );
}

function TimeSelector({ value, onChange }: { value: TimeControl; onChange: (value: TimeControl) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-medium">Time Control</h2>
      <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
        {TIME_OPTIONS.map((option) => (
          <Button key={option.value} variant={value === option.value ? 'default' : 'outline'} className="h-11" onClick={() => onChange(option.value)}>
            <Clock3 /> {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function GamePage(props: {
  config: GameConfig;
  boardTheme: BoardTheme;
  soundEnabled: boolean;
  onSound: () => void;
  onHome: () => void;
  onChangeSettings: () => void;
  onRecord: (config: GameConfig, result: ResultState, pgn: string) => void;
}) {
  const game = useChessGame(props.config, props.soundEnabled);
  const [confirm, setConfirm] = useState<'resign' | 'new' | null>(null);
  const [recordedResult, setRecordedResult] = useState<ResultState | null>(null);

  useEffect(() => {
    if (game.result && game.result !== recordedResult) {
      props.onRecord(props.config, game.result, game.pgn());
      setRecordedResult(game.result);
    }
  }, [game.result, props, recordedResult]);

  const captures = capturedPieces(game.history);
  const playerToMove = sideName(game.turn);
  const hintArrow = game.hint
    ? [{ startSquare: game.hint.slice(0, 2), endSquare: game.hint.slice(2, 4), color: 'rgb(47 107 77)' } as Arrow]
    : [];

  const boardPalette =
    props.boardTheme === 'classic'
      ? { light: '#ead7b3', dark: '#9f7045' }
      : { light: '#d8dde2', dark: '#56616f' };

  return (
    <section className="mx-auto grid min-h-screen w-full max-w-[1480px] grid-cols-[240px_minmax(320px,720px)_340px] gap-5 px-4 py-4 max-xl:grid-cols-[minmax(320px,720px)_320px] max-lg:flex max-lg:flex-col sm:px-6">
      <SideStatus captures={captures} config={props.config} className="max-xl:hidden" />
      <div className="flex min-w-0 flex-col gap-3">
        <PlayerCard
          color="black"
          name={props.config.mode === 'bot' && props.config.playerColor === 'white' ? 'Stockfish' : props.config.mode === 'local' ? 'Player 2' : 'You'}
          detail={props.config.mode === 'bot' && props.config.playerColor === 'white' ? props.config.difficulty : 'Black'}
          timer={game.timers.black}
          active={game.turn === 'black' && !game.result}
          captured={captures.black}
        />
        <div className="relative mx-auto w-full max-w-[min(720px,calc(100vw-2rem))]">
          <Chessboard
            options={{
              id: 'codex-chess-board',
              position: game.fen,
              boardOrientation: game.boardOrientation,
              squareStyles: game.squareStyles,
              lightSquareStyle: { backgroundColor: boardPalette.light },
              darkSquareStyle: { backgroundColor: boardPalette.dark },
              boardStyle: { borderRadius: '8px', boxShadow: '0 24px 80px rgba(0,0,0,0.22)' },
              showNotation: true,
              animationDurationInMs: 180,
              allowDrawingArrows: false,
              arrows: hintArrow,
              canDragPiece: ({ square }) => Boolean(square) && !game.thinking && !game.result,
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                if (!targetSquare) return false;
                return game.makePlayerMove(sourceSquare as Square, targetSquare as Square);
              },
              onSquareClick: ({ square }) => {
                const target = square as Square;
                if (game.selected) {
                  if (game.makePlayerMove(game.selected, target)) return;
                  game.setSelected(null);
                }
                game.setSelected(target);
              },
            }}
          />
          {(game.thinking || game.inCheck) && (
            <div className="absolute left-3 top-3 rounded-md border border-border bg-card/90 px-3 py-2 text-sm font-medium shadow">
              {game.thinking ? 'Bot is thinking...' : 'CHECK'}
            </div>
          )}
        </div>
        <PlayerCard
          color="white"
          name={props.config.mode === 'bot' && props.config.playerColor === 'black' ? 'Stockfish' : props.config.mode === 'local' ? 'Player 1' : 'You'}
          detail={props.config.mode === 'bot' && props.config.playerColor === 'black' ? props.config.difficulty : 'White'}
          timer={game.timers.white}
          active={game.turn === 'white' && !game.result}
          captured={captures.white}
        />
        <Controls
          config={props.config}
          soundEnabled={props.soundEnabled}
          onSound={props.onSound}
          onUndo={game.undo}
          onHint={game.requestHint}
          onFlip={() => game.setOrientationOverride(game.boardOrientation === 'white' ? 'black' : 'white')}
          onResign={() => setConfirm('resign')}
          onNew={() => setConfirm('new')}
          disabled={Boolean(game.result) || game.thinking}
        />
      </div>
      <aside className="grid min-h-0 gap-4">
        <div className="rounded-lg border border-border bg-card/88 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">Game Status</p>
              <p className="text-sm text-muted-foreground">{game.result ? game.result.reason : `${playerToMove} to move`}</p>
            </div>
            <Settings className="size-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <MiniDatum label="Mode" value={props.config.mode === 'bot' ? 'Bot' : 'Local'} />
            <MiniDatum label="Duration" value={formatTime(game.duration)} />
            <MiniDatum label="Engine" value={game.engineFailed ? 'Fallback' : game.engineReady ? 'Ready' : 'Loading'} />
            <MiniDatum label="Moves" value={Math.ceil(game.history.length / 2).toString()} />
          </div>
        </div>
        <MoveHistory history={game.history} />
        {props.config.mode === 'local' && (
          <div className="rounded-lg border border-border bg-card/88 p-4">
            <p className="mb-3 font-medium">Draw Offer</p>
            {game.drawOffer ? (
              <div className="grid gap-2">
                <p className="text-sm text-muted-foreground">{sideName(game.drawOffer)} offered a draw.</p>
                <Button onClick={game.agreeDraw}>
                  <Check /> Accept Draw
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => game.setDrawOffer(game.turn)}>
                Offer Draw
              </Button>
            )}
          </div>
        )}
      </aside>
      <PromotionDialog open={Boolean(game.pendingPromotion)} onChoose={game.choosePromotion} />
      <ResultDialog
        result={game.result}
        config={props.config}
        moves={Math.ceil(game.history.length / 2)}
        duration={game.duration}
        pgn={game.pgn()}
        onPlayAgain={() => {
          setRecordedResult(null);
          game.reset();
        }}
        onSettings={props.onChangeSettings}
        onHome={props.onHome}
      />
      <Dialog open={confirm !== null} onOpenChange={(open) => !open && setConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirm === 'resign' ? 'Resign Game?' : 'Start a new game?'}</DialogTitle>
            <DialogDescription>{confirm === 'resign' ? 'This will end the game immediately.' : 'Your current game will be lost.'}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(null)}>
              Continue Playing
            </Button>
            <Button
              variant={confirm === 'resign' ? 'destructive' : 'default'}
              onClick={() => {
                if (confirm === 'resign') game.resign(props.config.mode === 'bot' ? props.config.playerColor : game.turn);
                else {
                  setRecordedResult(null);
                  game.reset();
                }
                setConfirm(null);
              }}
            >
              {confirm === 'resign' ? 'Resign' : 'New Game'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PlayerCard(props: { color: PieceColor; name: string; detail: string; timer: number; active: boolean; captured: string[] }) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border p-3 ${props.active ? 'border-primary bg-card' : 'border-border bg-card/74'}`}>
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 place-items-center rounded-md bg-muted text-xl">{props.color === 'white' ? '♔' : '♚'}</span>
        <div className="min-w-0">
          <p className="truncate font-medium">{props.name}</p>
          <p className="text-sm capitalize text-muted-foreground">{props.detail}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-lg font-semibold">{props.timer ? formatTime(props.timer) : '--:--'}</p>
        <p className="max-w-36 truncate text-sm text-muted-foreground">{props.captured.join(' ') || 'No captures'}</p>
      </div>
    </div>
  );
}

function Controls(props: {
  config: GameConfig;
  soundEnabled: boolean;
  disabled: boolean;
  onSound: () => void;
  onUndo: () => void;
  onHint: () => void;
  onFlip: () => void;
  onResign: () => void;
  onNew: () => void;
}) {
  return (
    <div className="grid grid-cols-6 gap-2 max-sm:grid-cols-3">
      <Button variant="outline" disabled={props.disabled} onClick={props.onUndo}>
        <Undo2 /> Undo
      </Button>
      <Button variant="outline" disabled={props.disabled || props.config.mode !== 'bot'} onClick={props.onHint}>
        <Lightbulb /> Hint
      </Button>
      <Button variant="outline" onClick={props.onFlip}>
        <RotateCcw /> Flip
      </Button>
      <Button variant="outline" onClick={props.onSound}>
        {props.soundEnabled ? <Volume2 /> : <VolumeX />} Sound
      </Button>
      <Button variant="destructive" disabled={props.disabled} onClick={props.onResign}>
        <Flag /> Resign
      </Button>
      <Button onClick={props.onNew}>
        <TimerReset /> New
      </Button>
    </div>
  );
}

function SideStatus({ captures, config, className = '' }: { captures: { white: string[]; black: string[] }; config: GameConfig; className?: string }) {
  const whiteScore = materialScore(captures.white);
  const blackScore = materialScore(captures.black);
  return (
    <aside className={`grid content-start gap-4 ${className}`}>
      <div className="rounded-lg border border-border bg-card/88 p-4">
        <p className="mb-3 font-medium">Match</p>
        <div className="grid gap-3 text-sm text-muted-foreground">
          <p>{config.mode === 'bot' ? `Stockfish ${config.difficulty}` : 'Local casual game'}</p>
          <p>You are {config.mode === 'bot' ? sideName(config.playerColor) : 'sharing the board'}.</p>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card/88 p-4">
        <p className="mb-3 font-medium">Captured Pieces</p>
        <CapturedLine label="White captured" pieces={captures.white} score={whiteScore - blackScore} />
        <CapturedLine label="Black captured" pieces={captures.black} score={blackScore - whiteScore} />
      </div>
    </aside>
  );
}

function CapturedLine({ label, pieces, score }: { label: string; pieces: string[]; score: number }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span>{score > 0 ? `+${score}` : score < 0 ? score : '0'}</span>
      </div>
      <p className="mt-1 min-h-6 text-xl">{pieces.join(' ') || '—'}</p>
    </div>
  );
}

function MoveHistory({ history }: { history: Move[] }) {
  const rows = [];
  for (let index = 0; index < history.length; index += 2) {
    rows.push({ move: index / 2 + 1, white: history[index], black: history[index + 1] });
  }
  return (
    <div className="min-h-0 rounded-lg border border-border bg-card/88 p-4">
      <div className="mb-3 flex items-center gap-2">
        <History className="size-4" />
        <p className="font-medium">Move History</p>
      </div>
      <div className="max-h-[44vh] overflow-auto pr-1 text-sm">
        {rows.length ? (
          rows.map((row) => (
            <div key={row.move} className="grid grid-cols-[36px_1fr_1fr] gap-2 rounded-md px-2 py-1.5 odd:bg-muted/42">
              <span className="text-muted-foreground">{row.move}.</span>
              <span className={row.white === history.at(-1) ? 'font-semibold' : ''}>{row.white?.san}</span>
              <span className={row.black === history.at(-1) ? 'font-semibold' : ''}>{row.black?.san}</span>
            </div>
          ))
        ) : (
          <p className="rounded-md bg-muted p-3 text-muted-foreground">No moves yet.</p>
        )}
      </div>
    </div>
  );
}

function PromotionDialog({ open, onChoose }: { open: boolean; onChoose: (piece: PromotionPiece) => void }) {
  const options: { piece: PromotionPiece; label: string; icon: string }[] = [
    { piece: 'q', label: 'Queen', icon: '♕' },
    { piece: 'r', label: 'Rook', icon: '♖' },
    { piece: 'b', label: 'Bishop', icon: '♗' },
    { piece: 'n', label: 'Knight', icon: '♘' },
  ];
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>CHOOSE PROMOTION</DialogTitle>
          <DialogDescription>Select the piece for this pawn.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-2">
          {options.map((option) => (
            <Button key={option.piece} className="h-20 flex-col text-base" variant="outline" onClick={() => onChoose(option.piece)}>
              <span className="text-3xl">{option.icon}</span>
              {option.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResultDialog(props: {
  result: ResultState | null;
  config: GameConfig;
  moves: number;
  duration: number;
  pgn: string;
  onPlayAgain: () => void;
  onSettings: () => void;
  onHome: () => void;
}) {
  if (!props.result) return null;
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{props.result.title}</DialogTitle>
          <DialogDescription>{props.result.reason}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <MiniDatum label="Moves" value={props.moves.toString()} />
          <MiniDatum label="Duration" value={formatTime(props.duration)} />
          <MiniDatum label="Difficulty" value={props.config.mode === 'bot' ? props.config.difficulty : 'Local'} />
          <MiniDatum label="Review" value="Coming soon" />
        </div>
        <DialogFooter className="grid grid-cols-2 sm:grid-cols-2">
          <Button variant="outline" onClick={() => void navigator.clipboard?.writeText(props.pgn)}>
            <Copy /> Copy PGN
          </Button>
          <Button variant="outline" onClick={props.onSettings}>
            <Settings /> Settings
          </Button>
          <Button variant="secondary" onClick={props.onHome}>
            <Home /> Home
          </Button>
          <Button onClick={props.onPlayAgain}>
            <RotateCcw /> Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatsPage({ stats, onBack }: { stats: LocalStats; onBack: () => void }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-5 px-5 py-8">
      <Button className="w-fit" variant="ghost" onClick={onBack}>
        <ChevronLeft /> Home
      </Button>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Stats</p>
        <h1 className="text-4xl font-semibold tracking-normal">Your Results</h1>
      </div>
      <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2">
        <StatTile label="Games" value={stats.games} />
        <StatTile label="Wins" value={stats.wins} />
        <StatTile label="Losses" value={stats.losses} />
        <StatTile label="Draws" value={stats.draws} />
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 font-medium">Bot Difficulty</p>
        <div className="grid gap-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
            <div key={difficulty} className="grid grid-cols-[1fr_auto] rounded-md bg-muted p-3 text-sm">
              <span className="capitalize">{difficulty}</span>
              <span className="text-muted-foreground">
                {stats.byDifficulty[difficulty].wins}W {stats.byDifficulty[difficulty].losses}L {stats.byDifficulty[difficulty].draws}D
              </span>
            </div>
          ))}
        </div>
      </div>
      {!stats.games && <p className="rounded-lg border border-border bg-card p-4 text-muted-foreground">No games played yet. Your results will appear here.</p>}
    </section>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card/86 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function MiniDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted p-3">
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-medium capitalize">{value}</p>
    </div>
  );
}

export default function HomeRoute() {
  return <AppShell />;
}
