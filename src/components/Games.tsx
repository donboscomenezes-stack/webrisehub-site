"use client";

import { useMemo, useState } from "react";
import GameVisual from "@/components/GameVisual";

type GameCategory = "Action" | "Drawing" | "Puzzle" | "Skill" | "Reaction" | "Casual";

type Game = {
  title: string;
  category: GameCategory;
  description: string;
  href: string;
  duration: string;
  status?: "NEW" | "FEATURED" | "POPULAR";
  accent: "cyan" | "orange" | "purple" | "green" | "red" | "rainbow" | "lime" | "wild" | "geo" | "explorer" | "farm" | "tank" | "firefight";
};

const games: Game[] = [
  {
    title: "FIREFIGHT",
    category: "Action",
    description: "Realistic 3D shooter. Battle bots across five big maps, from a fortified outpost to a neon city at night.",
    href: "/games/firefight/",
    duration: "5-10 min",
    status: "NEW",
    accent: "firefight"
  },
  {
    title: "TANK ARENA",
    category: "Action",
    description: "Fast 3D tank battles from 1v1 to 5v5. Pick your tank and weapon, team up with bots, and win the arena.",
    href: "/games/tank-arena/",
    duration: "3-8 min",
    status: "NEW",
    accent: "tank"
  },
  {
    title: "LET IT GROW",
    category: "Casual",
    description: "Drive a getaway run to earn game cash, buy dreamy land, and build cozy farms for free.",
    href: "/games/let-it-grow/",
    duration: "10-30 min",
    status: "NEW",
    accent: "farm"
  },
  {
    title: "LITTLE EXPLORER",
    category: "Casual",
    description: "Explore a cozy 3D fantasy village, ride bikes, befriend a cat, and unlock the Hidden Garden.",
    href: "/games/little-explorer/",
    duration: "10-20 min",
    status: "NEW",
    accent: "explorer"
  },
  {
    title: "WHERE AM I?",
    category: "Puzzle",
    description: "Study real-world scenes, read the clues, and pin each mystery location on the map.",
    href: "/games/where-am-i/",
    duration: "5-10 min",
    status: "NEW",
    accent: "geo"
  },
  {
    title: "WILD ARENA",
    category: "Action",
    description: "Fight rival survivors, loot stronger gear, and outrun the storm to be the last fighter standing.",
    href: "/games/wild-arena/",
    duration: "4-10 min",
    status: "NEW",
    accent: "wild"
  },
  {
    title: "CELL RUSH",
    category: "Casual",
    description: "Feed on protein bites, outgrow rival cells, and climb to the top of the arena.",
    href: "/games/cell-rush/",
    duration: "2-8 min",
    status: "NEW",
    accent: "cyan"
  },
  {
    title: "WORD LOCK",
    category: "Puzzle",
    description: "Crack a five-letter word in six tries, or take on the shared Daily Word.",
    href: "/games/word-lock/",
    duration: "2-5 min",
    status: "NEW",
    accent: "green"
  },
  {
    title: "LOCK IN",
    category: "Reaction",
    description: "Stop the rotating marker inside the target, build your combo, and survive the speed-up.",
    href: "/games/lock-in/",
    duration: "1-3 min",
    status: "NEW",
    accent: "lime"
  },
  {
    title: "Build Life",
    category: "Skill",
    description: "Scroll through an interactive life experiment and see how small habits add up.",
    href: "/games/build-life/",
    duration: "4-6 min",
    status: "FEATURED",
    accent: "green"
  },
  {
    title: "Circle Game",
    category: "Drawing",
    description: "Draw the cleanest circle you can and get scored instantly.",
    href: "/games/circel/",
    duration: "1-2 min",
    status: "NEW",
    accent: "orange"
  },
  {
    title: "Chess",
    category: "Skill",
    description: "Play a fast chess match against the browser bot or across the same board.",
    href: "/games/chess/",
    duration: "3-10 min",
    status: "NEW",
    accent: "purple"
  },
  {
    title: "X0 Arena",
    category: "Casual",
    description: "Play a 3D Tic-Tac-Toe match with bot levels, shapes, and character pieces.",
    href: "/games/x0-arena/",
    duration: "1-3 min",
    status: "NEW",
    accent: "cyan"
  },
  {
    title: "GETAWAY",
    category: "Reaction",
    description: "Thread through traffic, outrun the police, and push your escape score higher.",
    href: "/games/getaway/",
    duration: "2-6 min",
    status: "NEW",
    accent: "red"
  },
  {
    title: "Don't Touch Red",
    category: "Reaction",
    description: "Flip your direction, thread past red hazards, and survive as long as you can.",
    href: "/games/dont-touch-red/",
    duration: "1-3 min",
    status: "NEW",
    accent: "red"
  },
  {
    title: "STACK",
    category: "Reaction",
    description: "Time each drop, trim the misses, and build the tallest colorful tower you can.",
    href: "/games/stack/",
    duration: "1-3 min",
    status: "NEW",
    accent: "rainbow"
  }
];

const filters = ["All Games", "Action", "Drawing", "Puzzle", "Skill", "Reaction", "Casual"];

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
