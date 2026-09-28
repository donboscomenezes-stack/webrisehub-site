import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import EditorialContent from "@/components/EditorialContent";
import { articles } from "@/lib/journal";
import { pageMetadata, updated } from "@/lib/editorial";
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(a => a.slug === slug); return a ? pageMetadata(a.title, a.description, `/blog/${slug}/`) : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(a => a.slug === slug); if (!a) notFound();
  return <SiteShell><div className="site-container"><header className="page-intro article-intro"><a className="breadcrumb" href="/blog/">← The journal</a><p className="eyebrow-label">{a.eyebrow}</p><h1>{a.title}</h1><p>{a.description}</p><p className="updated-date">By WebRiseHub · {updated} · {a.minutes} min read</p></header><div className="reading-layout"><aside className="reading-nav"><p className="eyebrow-label">In this story</p><nav aria-label="In this story">{a.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav><a href={`/games/${a.game}/`}>Explore the game →</a></aside><article className="prose"><EditorialContent sections={a.sections} /><p className="editorial-note">Have a correction or a question? <a href="/contact/">Contact WebRiseHub.</a></p></article></div></div></SiteShell>;
}
