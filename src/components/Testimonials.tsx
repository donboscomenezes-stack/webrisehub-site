import Section from "./Section";
import { testimonials } from "@/lib/config";

export default function Testimonials() {
  return (
    <Section id="testimonials" title="What Clients Say">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((quote, idx) => (
          <blockquote key={quote} className="glass rounded-3xl p-6 animate-fade-up reveal">
            <p className="text-sm font-semibold text-accent">Testimonial {idx + 1}</p>
            <p className="mt-4 text-base leading-7 text-muted">“{quote}”</p>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}