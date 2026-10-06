import SiteShell from "@/components/SiteShell";
import { GameCard } from "@/components/GameCard";
import { games, pageMetadata } from "@/lib/editorial";
export const metadata = pageMetadata("Free Browser Games", "Explore all WebRiseHub games: drawing, puzzles, action, reaction, strategy and casual play without downloads or accounts.", "/games/");
export default function GamesPage() { return <SiteShell><div className="site-container"><header className="page-intro"><h1>Free browser games</h1><p>Choose your next WebRiseHub game. Play instantly with no downloads or account required.</p></header><div className="catalog-grid">{games.map(game => <GameCard game={game} key={game.slug} />)}</div></div></SiteShell>; }
