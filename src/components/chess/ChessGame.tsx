"use client";

import { Chess, type Move, type Square } from "chess.js";
import { useEffect, useMemo, useRef, useState } from "react";

type PieceColor = "w" | "b";
type GameMode = "bot" | "local";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const pieceSymbols: Record<string, string> = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};

function buildSquares() {
  const squares: Square[] = [];
  for (let rank = 8; rank >= 1; rank -= 1) {
    for (const file of files) squares.push(`${file}${rank}` as Square);
  }
  return squares;
}

function resultText(chess: Chess) {
  if (chess.isCheckmate()) return `${chess.turn() === "w" ? "Black" : "White"} wins by checkmate`;
  if (chess.isStalemate()) return "Draw by stalemate";
  if (chess.isThreefoldRepetition()) return "Draw by repetition";
  if (chess.isInsufficientMaterial()) return "Draw by insufficient material";
  if (chess.isDraw()) return "Draw";
  return null;
}

function scoreMove(move: Move) {
  const values: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  let score = 0;
  if (move.captured) score += values[move.captured] * 10;
  if (move.promotion) score += values[move.promotion] * 8;
  if (move.san.includes("+")) score += 3;
  if (move.san.includes("#")) score += 200;
  return score + Math.random();
}

function pickBotMove(chess: Chess) {
  const moves = chess.moves({ verbose: true });
  if (!moves.length) return null;
  return [...moves].sort((a, b) => scoreMove(b) - scoreMove(a))[0];
}

export default function ChessGame() {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());
  const [selected, setSelected] = useState<Square | null>(null);
  const [mode, setMode] = useState<GameMode>("bot");
  const [message, setMessage] = useState("White to move");
  const [thinking, setThinking] = useState(false);
  const squares = useMemo(buildSquares, []);
  const history = chessRef.current.history({ verbose: true });
  const selectedMoves = selected ? chessRef.current.moves({ square: selected, verbose: true }) : [];
  const legalTargets = new Set(selectedMoves.map((move) => move.to));

  function sync(nextMessage?: string) {
    const chess = chessRef.current;
    setFen(chess.fen());
    setMessage(nextMessage ?? resultText(chess) ?? `${chess.turn() === "w" ? "White" : "Black"} to move`);
  }

  function reset(nextMode = mode) {
    chessRef.current = new Chess();
    setSelected(null);
    setThinking(false);
    setMode(nextMode);
    sync("White to move");
  }

  function makeMove(from: Square, to: Square) {
    const chess = chessRef.current;
    try {
      const move = chess.move({ from, to, promotion: "q" });
      if (!move) return false;
      setSelected(null);
      sync();
      return true;
    } catch {
      return false;
    }
  }

  function handleSquareClick(square: Square) {
    const chess = chessRef.current;
    if (thinking || resultText(chess)) return;
    if (mode === "bot" && chess.turn() === "b") return;

    if (selected && legalTargets.has(square)) {
      makeMove(selected, square);
      return;
    }

    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) setSelected(square);
    else setSelected(null);
  }

  useEffect(() => {
    const chess = chessRef.current;
    if (mode !== "bot" || chess.turn() !== "b" || resultText(chess)) return;
    setThinking(true);
    const timer = window.setTimeout(() => {
      const botMove = pickBotMove(chess);
      if (botMove) chess.move(botMove);
      setThinking(false);
      sync();
    }, 420);
    return () => window.clearTimeout(timer);
  }, [fen, mode]);

  return (
    <main className="chess-page">
      <section className="chess-shell">
        <div className="chess-topbar">
          <a href="/#games">Back to games</a>
          <div className="chess-mode-toggle" aria-label="Chess mode">
            <button className={mode === "bot" ? "active" : ""} onClick={() => reset("bot")} type="button">
              Vs Bot
            </button>
            <button className={mode === "local" ? "active" : ""} onClick={() => reset("local")} type="button">
              Local
            </button>
          </div>
        </div>

        <div className="chess-layout">
          <div className="chess-intro">
            <span>Skill Game</span>
            <h1>Chess</h1>
            <p>
              Play a quick match against the browser bot or share the board for a local game.
              Legal moves, checkmate, draws, move history, and promotion are handled in the board.
            </p>
            <div className="chess-status">
              <strong>{thinking ? "Bot is thinking..." : message}</strong>
              <button onClick={() => reset()} type="button">New game</button>
            </div>
          </div>

          <div className="chess-board-panel">
            <div className="chess-board" aria-label="Chess board">
              {squares.map((square) => {
                const piece = chessRef.current.get(square);
                const isDark = (files.indexOf(square[0]) + Number(square[1])) % 2 === 0;
                const isSelected = selected === square;
                const isTarget = legalTargets.has(square);
                return (
                  <button
                    aria-label={piece ? `${piece.color === "w" ? "White" : "Black"} ${piece.type} on ${square}` : square}
                    className={[
                      "chess-square",
                      isDark ? "dark" : "light",
                      isSelected ? "selected" : "",
                      isTarget ? "target" : "",
                    ].join(" ")}
                    key={square}
                    onClick={() => handleSquareClick(square)}
                    type="button"
                  >
                    {piece ? pieceSymbols[`${piece.color}${piece.type}`] : ""}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="chess-sidebar">
            <div>
              <span>Moves</span>
              <h2>{Math.ceil(history.length / 2) || 0}</h2>
            </div>
            <ol className="chess-history">
              {history.length ? (
                history.map((move, index) => (
                  <li key={`${move.san}-${index}`}>
                    <small>{index + 1}</small>
                    <strong>{move.san}</strong>
                  </li>
                ))
              ) : (
                <li className="empty">No moves yet.</li>
              )}
            </ol>
            <button className="copy-pgn" onClick={() => void navigator.clipboard?.writeText(chessRef.current.pgn())} type="button">
              Copy PGN
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
