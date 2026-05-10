import Section from "./Section";
import { about } from "@/lib/config";

export default function About() {
  return (
    <Section id="about" title={about.title}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass rounded-3xl p-6 md:p-8 reveal">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-7 text-muted [&:not(:first-child)]:mt-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 reveal">
          <p className="text-sm font-semibold text-accent">Built for clarity</p>
          <p className="mt-3 text-lg font-semibold">Professional websites that support trust, growth, and long-term visibility.</p>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>Modern design systems</p>
            <p>Business-focused messaging</p>
            <p>Performance-first development</p>
          </div>
        </div>
      </div>
    </Section>
  );
}