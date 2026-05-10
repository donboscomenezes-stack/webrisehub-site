import { brand, links } from "@/lib/config";
import { socialProof } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow absolute inset-0" />
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] animate-fade-up anim-delay-1 stagger-words"
              suppressHydrationWarning
            >
              {brand.tagline}
            </h1>

            <p className="mt-5 max-w-xl text-[15px] md:text-lg text-muted animate-fade-up anim-delay-2 fade-up">
              {brand.subtagline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up anim-delay-3 fade-up">
              <a
                href={links.bookCall}
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
                target="_blank"
                rel="noreferrer"
              >
                Book a Free Consultation
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 font-semibold text-text hover:bg-white/5 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
              >
                View Our Work
              </a>
            </div>

            <p className="mt-6 max-w-2xl text-sm text-muted animate-fade-up anim-delay-3 fade-up">
              {socialProof.regionLine}
            </p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent2 transition-transform duration-200 hover:-translate-y-1 hover-scale"
      >
        WhatsApp
      </a>
    </section>
  );
}