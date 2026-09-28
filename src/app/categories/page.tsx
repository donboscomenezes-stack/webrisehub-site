import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { categories, games, pageMetadata } from "@/lib/editorial";
export const metadata = pageMetadata("Game Categories", "Browse free drawing, skill, and casual browser games on WebRiseHub.", "/categories/");
export default function CategoriesPage() {
  return <SiteShell><div className="site-container"><header className="page-intro"><p className="eyebrow-label">Find your kind of play</p><h1>A different way to take a break.</h1><p>Choose by what you feel like doing. Some experiences belong in more than one category.</p></header><div className="category-grid-site">{categories.map((c, i) => <Link className="category-tile" href={`/categories/${c.slug}/`} key={c.slug}><span className="tile-number">0{i + 1}</span><h2>{c.name} games →</h2><p>{c.description}</p><span>{games.filter(g => (g.categories as readonly string[]).includes(c.slug)).length} available</span></Link>)}</div></div></SiteShell>;
}
