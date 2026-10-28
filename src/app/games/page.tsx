import SiteShell from "@/components/SiteShell";
import { GameCard } from "@/components/GameCard";
import { categories, games, pageMetadata } from "@/lib/editorial";
export const metadata = pageMetadata("Online Browser Games – Play Free", "Explore original online browser games from WebRiseHub: action, farming, word puzzles, drawing and quick challenges. Play free with no download or account.", "/games/");
export default function GamesPage() {
  return <SiteShell><div className="site-container">
    <header className="page-intro"><h1>Play Free Online Browser Games</h1><p>Choose an original WebRiseHub game, from 3D arena battles and cozy farming to word puzzles and short timing challenges. No download or account is required; check each game's guide for controls and device requirements.</p>
      <nav aria-label="Browse game categories">{categories.map((category, index) => <span key={category.slug}>{index > 0 && " · "}<a href={`/categories/${category.slug}/`}>{category.name} games</a></span>)}</nav>
    </header>
    <div className="catalog-grid">{games.map(game => <GameCard game={game} key={game.slug} />)}</div>
    <section className="prose prose-section"><h2>Find a game for your next break</h2><p>Browser games run directly in the page. Some need a desktop keyboard and mouse, while others offer touch controls. For a short session, start with the <a href="/blog/10-quick-games-5-minutes/">quick browser games guide</a>. For a longer battle, read the <a href="/blog/firefight-beginners-guide/">Firefight beginner's guide</a>, or explore the <a href="/blog/15-free-browser-games-no-download/">no-download games guide</a> for more choices.</p></section>
  </div></SiteShell>;
}
