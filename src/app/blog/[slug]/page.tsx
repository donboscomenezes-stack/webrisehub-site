import StructuredData, { Breadcrumbs } from "@/components/StructuredData";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import EditorialContent from "@/components/EditorialContent";
import { articles, articleDate } from "@/lib/journal";
import { pageMetadata, gamePath, siteUrl } from "@/lib/editorial";
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(a => a.slug === slug); if (!a) return {};
  const meta = pageMetadata(a.title, a.description, `/blog/${slug}/`);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: articleDate(a.date), authors: ["WebRiseHub"], images: [{ url: a.image, alt: a.imageAlt || a.title }] }, twitter: { card: "summary_large_image", title: meta.title, description: a.description, images: [a.image] } };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const a = articles.find(a => a.slug === slug); if (!a) notFound();
  return <SiteShell><StructuredData data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title, description: a.description, image: `${siteUrl}${a.image}`, datePublished: articleDate(a.date), author: { "@type": "Organization", name: "WebRiseHub", url: `${siteUrl}/` }, publisher: { "@type": "Organization", name: "WebRiseHub", url: `${siteUrl}/` }, mainEntityOfPage: `${siteUrl}/blog/${a.slug}/` }} /><Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: a.title, path: `/blog/${a.slug}/` }]} /><div className="site-container"><header className="page-intro article-intro"><a className="breadcrumb" href="/blog/">← The journal</a><p className="eyebrow-label">{a.eyebrow}</p><h1>{a.title}</h1><p>{a.description}</p><p className="updated-date">By WebRiseHub · <time dateTime={articleDate(a.date)}>{a.date}</time> · {a.minutes} min read</p></header>{a.heroImage && <figure style={{ margin: "0 0 2rem" }}><img src={a.image} alt={a.imageAlt || a.title} width={1500} height={844} style={{ width: "100%", height: "auto", borderRadius: "16px" }} /></figure>}<div className="reading-layout"><aside className="reading-nav"><p className="eyebrow-label">In this story</p><nav aria-label="In this story">{a.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav><a href={gamePath(a.game)}>Explore the game →</a></aside><article className="prose"><EditorialContent sections={a.sections} /><p className="editorial-note">Have a correction or a question? <a href="/contact/">Contact WebRiseHub.</a></p></article></div></div></SiteShell>;
}
