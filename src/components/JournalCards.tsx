import Link from "next/link";
import { articles } from "@/lib/journal";
export default function JournalCards() {
  return <div className="journal-grid">{articles.map((article) => <Link href={`/blog/${article.slug}/`} className={`journal-card journal-${article.accent}`} key={article.slug}><div className="journal-art"><img src={article.image} alt="" /></div><div className="journal-copy"><p className="eyebrow-label">GAME GUIDE <span>· {article.date} · {article.minutes} min read</span></p><h3>{article.title}</h3><p>{article.description}</p><span className="text-link">Read the story →</span></div></Link>)}</div>;
}
