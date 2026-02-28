import Section from "./Section";
import { portfolioItems } from "@/lib/config";

export default function Portfolio() {
  const delays = ["anim-delay-0", "anim-delay-1", "anim-delay-2", "anim-delay-3"];

  return (
    <Section
      id="work"
      title="Example Work"
      subtitle="Realistic examples of what we build—premium design, fast performance, and conversion-first structure."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {portfolioItems.map((item, idx) => (
          <div
            key={item.title}
            className={`glass rounded-3xl p-6 animate-fade-up ${delays[idx] ?? "anim-delay-0"} transition-transform duration-200 hover:-translate-y-1 hover:bg-white/5 reveal`}
          >
            <div className="mb-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
              {item.tag}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-muted">{item.desc}</p>
            <div className="mt-6 h-28 rounded-2xl bg-white/5 border border-white/10" />
          </div>
        ))}
      </div>
    </Section>
  );
}