import stockfishUrl from 'stockfish/bin/stockfish-18-asm.js?url';

type Difficulty = 'easy' | 'medium' | 'hard';

type BestMoveRequest = {
  type: 'bestmove';
  fen: string;
  difficulty: Difficulty;
  requestId: string;
};

const settings: Record<Difficulty, { skill: number; depth: number; multiPv: number }> = {
  easy: { skill: 3, depth: 4, multiPv: 3 },
  medium: { skill: 10, depth: 9, multiPv: 2 },
  hard: { skill: 18, depth: 15, multiPv: 1 },
};

let engine: Worker | null = null;
let activeRequest: BestMoveRequest | null = null;
let candidates = new Map<number, string>();

function post(line: string) {
  engine?.postMessage(line);
}

function chooseMove(difficulty: Difficulty, bestMove: string | null) {
  const ordered = [...candidates.entries()].sort(([a], [b]) => a - b).map(([, move]) => move);
  if (!ordered.length && bestMove) return bestMove;
  if (difficulty === 'hard') return bestMove ?? ordered[0] ?? null;
  if (difficulty === 'medium') return Math.random() < 0.82 ? ordered[0] ?? bestMove : ordered[1] ?? ordered[0] ?? bestMove;
  const roll = Math.random();
  if (roll < 0.55) return ordered[0] ?? bestMove;
  if (roll < 0.82) return ordered[1] ?? ordered[0] ?? bestMove;
  return ordered[2] ?? ordered[1] ?? ordered[0] ?? bestMove;
}

function initEngine() {
  try {
    engine = new Worker(stockfishUrl);
    engine.onmessage = (event: MessageEvent<string>) => {
      const line = `${event.data}`;
      const pvMatch = line.match(/\bmultipv\s+(\d+).*?\bpv\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
      if (pvMatch) candidates.set(Number(pvMatch[1]), pvMatch[2]);
      if (line.startsWith('bestmove') && activeRequest) {
        const best = line.split(/\s+/)[1] && line.split(/\s+/)[1] !== '(none)' ? line.split(/\s+/)[1] : null;
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
    self.postMessage({ type: 'ready' });
  }
}

self.onmessage = (event: MessageEvent<BestMoveRequest>) => {
  if (event.data.type !== 'bestmove') return;
  if (!engine) {
    self.postMessage({ type: 'error', requestId: event.data.requestId, message: 'Stockfish could not load.' });
    return;
  }
  activeRequest = event.data;
  candidates = new Map();
  const level = settings[event.data.difficulty];
  post('stop');
  post(`setoption name Skill Level value ${level.skill}`);
  post(`setoption name MultiPV value ${level.multiPv}`);
  post(`position fen ${event.data.fen}`);
  post(`go depth ${level.depth}`);
};

initEngine();
