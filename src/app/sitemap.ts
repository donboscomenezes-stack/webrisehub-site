import type { MetadataRoute } from "next";
import { categories, games, siteUrl } from "@/lib/editorial";
import { pages } from "@/lib/pages";
import { articles } from "@/lib/journal";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/categories/", "/blog/", ...Object.keys(pages).map(p => `/${p}/`), ...categories.map(c => `/categories/${c.slug}/`), ...games.map(g => `/games/${g.slug}/`), ...articles.map(a => `/blog/${a.slug}/`)].map(path => ({ url: `${siteUrl}${path}` }));
}
