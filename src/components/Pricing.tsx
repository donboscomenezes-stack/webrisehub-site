import Section from "./Section";
import { pricing, links } from "@/lib/config";

export default function Pricing() {
  const delays = ["anim-delay-0", "anim-delay-1", "anim-delay-2", "anim-delay-3"];

  return (
    <Section
      id="pricing"
      title="Investment"
      subtitle="Simple packages with a custom quote—final pricing depends on scope, pages, and timelines."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {pricing.map((p, idx) => (
          <div
            key={p.name}
            className={`rounded-3xl p-6 animate-fade-up ${delays[idx] ?? "anim-delay-0"} transition-transform duration-200 hover:-translate-y-1 hover:bg-white/5 reveal ${idx === 1 ? "glass ring-1 ring-accent/40" : "glass"}`}
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-3 text-2xl font-semibold">{p.price}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href={links.bookCall}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
            >
              Book a Call
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}