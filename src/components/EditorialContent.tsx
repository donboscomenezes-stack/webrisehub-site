import type { ContentSection } from "@/lib/editorial";
export default function EditorialContent({ sections }: { sections: ContentSection[] }) {
  return <>{sections.map(section => <section id={section.id} key={section.id} className="prose-section"><h2>{section.title}</h2>{section.paragraphs?.map(p => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.steps && <ol>{section.steps.map(item => <li key={item}>{item}</li>)}</ol>}{section.links && <div className="editorial-links">{section.links.map(link => <a href={link.href} key={link.href}>{link.label} →</a>)}</div>}</section>)}</>;
}
