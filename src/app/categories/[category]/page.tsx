import { Breadcrumbs } from "@/components/StructuredData";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { GameCard } from "@/components/GameCard";
import { categories, games, pageMetadata } from "@/lib/editorial";
export const dynamicParams = false;
export function generateStaticParams() { return categories.map(c => ({ category: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; const c = categories.find(c => c.slug === category);
  return c ? pageMetadata(`${c.name} Games`, c.description, `/categories/${c.slug}/`) : {};
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; const c = categories.find(c => c.slug === category); if (!c) notFound();
  return <SiteShell><Breadcrumbs items={[{ name: "Home", path: "/" }, { name: `${c.name} games`, path: `/categories/${c.slug}/` }]} /><div className="site-container"><header className="page-intro"><a className="breadcrumb" href="/categories/">← All categories</a><p className="eyebrow-label">Play your way</p><h1>{c.name} games</h1><p>{c.description}</p></header><div className="catalog-grid category-results">{games.filter(g => (g.categories as readonly string[]).includes(category)).map(g => <GameCard game={g} key={g.slug} />)}</div></div></SiteShell>;
}
