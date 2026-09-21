"use client";

import { useMemo, useState } from "react";

type GameCategory = "Drawing" | "Puzzle" | "Skill" | "Reaction" | "Casual";

type Game = {
  title: string;
  category: GameCategory;
  description: string;
  href: string;
  duration: string;
  status?: "NEW" | "FEATURED" | "POPULAR";
  accent: "cyan" | "orange" | "purple" | "green" | "red" | "rainbow" | "lime";
};

const games: Game[] = [
  {
    title: "WORD LOCK",
    category: "Puzzle",
    description: "Crack a five-letter word in six tries, or take on the shared Daily Word.",
    href: "/games/word-lock/index.html",
    duration: "2-5 min",
    status: "NEW",
    accent: "green"
  },
  {
    title: "LOCK IN",
    category: "Reaction",
    description: "Stop the rotating marker inside the target, build your combo, and survive the speed-up.",
    href: "/games/lock-in/index.html",
    duration: "1-3 min",
    status: "NEW",
    accent: "lime"
  },
  {
    title: "Build Life",
    category: "Skill",
    description: "Scroll through an interactive life experiment and see how small habits add up.",
    href: "/games/build-life",
    duration: "4-6 min",
    status: "FEATURED",
    accent: "green"
  },
  {
    title: "Circle Game",
    category: "Drawing",
    description: "Draw the cleanest circle you can and get scored instantly.",
    href: "/games/circel/index.html",
    duration: "1-2 min",
    status: "NEW",
    accent: "orange"
  },
  {
    title: "Chess",
    category: "Skill",
    description: "Play a fast chess match against the browser bot or across the same board.",
    href: "/games/chess",
    duration: "3-10 min",
    status: "NEW",
    accent: "purple"
  },
  {
    title: "X0 Arena",
    category: "Casual",
    description: "Play a 3D Tic-Tac-Toe match with bot levels, shapes, and character pieces.",
    href: "/games/x0-arena",
    duration: "1-3 min",
    status: "NEW",
    accent: "cyan"
  },
  {
    title: "GETAWAY",
    category: "Reaction",
    description: "Thread through traffic, outrun the police, and push your escape score higher.",
    href: "/games/getaway/index.html",
    duration: "2-6 min",
    status: "NEW",
    accent: "red"
  },
  {
    title: "Don't Touch Red",
    category: "Reaction",
    description: "Flip your direction, thread past red hazards, and survive as long as you can.",
    href: "/games/dont-touch-red/index.html",
    duration: "1-3 min",
    status: "NEW",
    accent: "red"
  },
  {
    title: "STACK",
    category: "Reaction",
    description: "Time each drop, trim the misses, and build the tallest colorful tower you can.",
    href: "/games/stack/index.html",
    duration: "1-3 min",
    status: "NEW",
    accent: "rainbow"
  }
];

const filters = ["All Games", "Drawing", "Puzzle", "Skill", "Reaction", "Casual"];

function GameVisual({ game }: { game: Game }) {
  return (
    <div className={`game-art game-art-${game.accent}`}>
      <div className="art-grid" />
      {game.title === "LOCK IN" ? (
        <div className="lock-in-art" aria-hidden="true">
          <span className="lock-in-ring" />
          <span className="lock-in-target" />
          <span className="lock-in-marker" />
          <b>LOCK IN</b>
        </div>
      ) : game.title === "WORD LOCK" ? (
        <div className="word-lock-art" aria-hidden="true">
          {["W", "O", "R", "D", "S"].map((letter, index) => (
            <span className={`word-lock-tile word-lock-tile-${index + 1}`} key={letter}>{letter}</span>
          ))}
        </div>
      ) : game.title === "Circle Game" ? (
        <div className="circle-art" aria-hidden="true">
          <span />
          <b />
        </div>
      ) : game.title === "Chess" ? (
        <div className="chess-art" aria-hidden="true">
          {["♜", "♞", "♝", "♛", "♚", "♟"].map((piece, index) => (
            <span key={`${piece}-${index}`}>{piece}</span>
          ))}
        </div>
      ) : game.title === "X0 Arena" ? (
        <div className="x0-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>X</b>
          <b>0</b>
        </div>
      ) : game.title === "GETAWAY" ? (
        <div className="getaway-art" aria-hidden="true">
          <span className="getaway-road" />
          <span className="getaway-car getaway-car-player" />
          <span className="getaway-car getaway-car-police" />
          <i />
          <i />
        </div>
      ) : game.title === "Don't Touch Red" ? (
        <div className="red-art" aria-hidden="true">
          <span className="red-hazard red-hazard-left" />
          <span className="red-hazard red-hazard-right" />
          <b className="red-player" />
          <i className="red-trail" />
        </div>
      ) : game.title === "STACK" ? (
        <div className="stack-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className="build-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}

function StandardGameCard({ game }: { game: Game }) {
  return (
    <a className="standard-game-card" href={game.href}>
      <GameVisual game={game} />
      <div className="standard-card-copy">
        <div className="card-label-row">
          <span className="game-category">{game.category} Game</span>
          {game.status ? <span className="game-badge">{game.status}</span> : null}
        </div>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <div className="game-meta">
          <span>{game.duration}</span>
          <strong>Play -&gt;</strong>
        </div>
      </div>
    </a>
  );
}

export default function Games() {
  const [activeFilter, setActiveFilter] = useState("All Games");
  const filteredGames = useMemo(
    () => games.filter((game) => activeFilter === "All Games" || game.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="games" className="games-section">
      <div className="games-container">
        <div className="explore-header">
          <div>
            <span>All Games</span>
            <h2>Explore Games</h2>
            <p>Pick a game and start playing.</p>
          </div>

          <div className="game-filters" aria-label="Game categories">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={activeFilter === filter ? "selected" : ""}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="game-grid">
          {filteredGames.map((game) => (
            <StandardGameCard game={game} key={game.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
