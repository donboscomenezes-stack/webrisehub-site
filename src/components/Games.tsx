"use client";

import { useMemo, useState } from "react";

type GameCategory = "Drawing" | "Skill" | "Casual";

type Game = {
  title: string;
  category: GameCategory;
  description: string;
  href: string;
  duration: string;
  status?: "NEW" | "FEATURED" | "POPULAR";
  accent: "cyan" | "orange" | "purple" | "green";
};

const games: Game[] = [
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
  }
];

const filters = ["All Games", "Drawing", "Puzzle", "Skill", "Reaction", "Casual"];

function GameVisual({ game }: { game: Game }) {
  return (
    <div className={`game-art game-art-${game.accent}`}>
      <div className="art-grid" />
      {game.title === "Circle Game" ? (
        <div className="circle-art" aria-hidden="true">
          <span />
          <b />
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
