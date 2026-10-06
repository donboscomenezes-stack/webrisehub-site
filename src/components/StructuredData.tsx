import { siteUrl } from "@/lib/editorial";
export default function StructuredData({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return <StructuredData data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${siteUrl}${item.path}` })) }} />;
}
