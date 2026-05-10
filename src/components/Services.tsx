import Section from "./Section";
import { services } from "@/lib/config";

export default function Services() {
  const delays = ["anim-delay-0", "anim-delay-1", "anim-delay-2", "anim-delay-3"];

  return (
    <Section
      id="services"
      title="What We Do"
      subtitle="Professional digital solutions built to help businesses stand out online and generate real growth."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className={`glass rounded-3xl p-6 animate-fade-up ${delays[idx] ?? "anim-delay-0"} hover:bg-white/5 transition-transform duration-200 hover:-translate-y-1 reveal`}
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}