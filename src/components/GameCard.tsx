import GameVisual from "@/components/GameVisual";
import Link from "next/link";
import { gamePath } from "@/lib/editorial";
import type { Game } from "@/lib/editorial";
export function GameCard({ game }: { game: Game }) {
  return <Link className="standard-game-card" href={gamePath(game.slug)}><GameVisual game={game} /><div className="standard-card-copy"><div className="card-label-row"><span className="game-category">{game.label}</span><span className="game-badge">Free to play</span></div><h3>{game.title}</h3><p>{game.description}</p><div className="game-meta"><span>{game.duration}</span><strong>Play now →</strong></div></div></Link>;
}
