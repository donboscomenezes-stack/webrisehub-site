import Link from "next/link";
import type { Game } from "@/lib/editorial";
export function GameArt({ game }: { game: Game }) {
  return <div className={`game-art game-art-${game.accent}`} aria-hidden="true"><div className="art-grid" />{game.slug === "circle-game" ? <div className="circle-art"><span /><b /></div> : <div className="build-art"><span /><span /><span /></div>}<span className="art-caption">{game.slug === "circle-game" ? "A little imperfect. A lot of fun." : "Small habits. Bigger picture."}</span></div>;
}
export function GameCard({ game }: { game: Game }) {
  return <Link className="standard-game-card" href={`/games/${game.slug}/`}><GameArt game={game} /><div className="standard-card-copy"><div className="card-label-row"><span className="game-category">{game.label}</span><span className="game-badge">Free to play</span></div><h3>{game.title}</h3><p>{game.description}</p><div className="game-meta"><span>{game.duration}</span><strong>Play now →</strong></div></div></Link>;
}
