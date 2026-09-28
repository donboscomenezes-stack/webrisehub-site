import Link from "next/link";
import { games, guides } from "@/lib/editorial";
import EditorialContent from "@/components/EditorialContent";
import { GameCard } from "@/components/GameCard";
export default function GameGuide({ slug }: { slug: string }) {
  const guide = guides[slug];
  return <div className="site-container game-guide" id="game-guide"><div className="reading-layout"><aside className="reading-nav"><p className="eyebrow-label">Your game guide</p><nav aria-label={`${guide.title} guide`}>{guide.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}<a href="#faq">Common questions</a></nav><Link href="/contact/">Report a problem →</Link></aside><article className="prose"><EditorialContent sections={guide.sections} /><section id="faq" className="prose-section"><h2>Common questions</h2><div className="faq-list">{guide.faqs.map(f => <details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div></section><p className="editorial-note">Written from this game’s mechanics. Found something different? <Link href="/contact/">Let us know.</Link></p></article></div><section className="related-games"><div className="section-heading"><div><p className="eyebrow-label">Keep exploring</p><h2>Try something different</h2></div><Link className="text-link" href="/#games">All games →</Link></div><div className="catalog-grid">{games.filter(game => game.slug !== slug).map(game => <GameCard game={game} key={game.slug} />)}</div></section></div>;
}
