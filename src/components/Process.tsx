import Section from "./Section";
import { processSteps } from "@/lib/config";

export default function Process() {
  return (
    <Section id="process" title="Our Process">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, idx) => (
          <div key={step.title} className="glass rounded-3xl p-6 animate-fade-up reveal">
            <p className="text-sm font-semibold text-accent">Step {idx + 1}</p>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm text-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}