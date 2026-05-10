import Section from "./Section";
import { whyChooseUs } from "@/lib/config";

export default function WhyChooseUs() {
  return (
    <Section id="why-us" title={whyChooseUs.title}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {whyChooseUs.points.map((point, idx) => (
          <div
            key={point}
            className={`glass rounded-3xl p-5 reveal ${idx % 2 === 0 ? "animate-fade-up anim-delay-1" : "animate-fade-up anim-delay-2"}`}
          >
            <p className="text-sm font-semibold text-accent">0{idx + 1}</p>
            <p className="mt-3 text-base font-medium">{point}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}