import { Breadcrumbs } from "@/components/StructuredData";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import EditorialContent from "@/components/EditorialContent";
import { pages } from "@/lib/pages";
import { pageMetadata, updated } from "@/lib/editorial";
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(page => ({ page })); }
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params; const content = pages[page];
  if (!content) return {};
  return pageMetadata(page === "about" ? "About WebRiseHub" : page === "contact" ? "Contact WebRiseHub" : content.title, content.description, `/${page}/`);
}
export default async function InformationPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params; const content = pages[page]; if (!content) notFound();
  return <SiteShell><Breadcrumbs items={[{ name: "Home", path: "/" }, { name: content.title, path: `/${page}/` }]} /><div className="site-container"><header className="page-intro"><a className="breadcrumb" href="/">Home / {content.eyebrow}</a><p className="eyebrow-label">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.description}</p>{["terms", "privacy-policy", "cookie-policy", "advertise"].includes(page) && <p className="updated-date">Updated {updated}</p>}</header><div className="reading-layout"><aside className="reading-nav"><p className="eyebrow-label">On this page</p><nav aria-label="On this page">{content.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav></aside><article className="prose"><EditorialContent sections={content.sections} /></article></div></div></SiteShell>;
}
