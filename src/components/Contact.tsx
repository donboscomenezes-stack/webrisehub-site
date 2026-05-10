import Section from "./Section";
import { links } from "@/lib/config";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Let’s Work Together"
      subtitle="Have a project in mind or want to improve your online presence? Get in touch and let’s discuss how we can help your business grow online."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="glass rounded-3xl p-6 md:p-8 reveal">
          <p className="text-sm text-muted">Reach out by email or schedule a call to discuss your project, goals, and timeline.</p>
          <a href={`mailto:${links.email}`} className="mt-5 inline-flex text-lg font-semibold hover:text-accent transition-colors">
            {links.email}
          </a>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 reveal flex items-center">
          <a
            href={links.bookCall}
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
            target="_blank"
            rel="noreferrer"
          >
            Book a Free Call
          </a>
        </div>
      </div>
    </Section>
  );
}