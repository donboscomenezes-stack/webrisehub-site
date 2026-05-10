import { links } from "@/lib/config";

export default function CTA() {
  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-up reveal">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Ready to Build Your Online Presence?
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] md:text-base text-muted">
            Let’s create a website that helps your business stand out, build trust, and grow online.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            We keep the process transparent, so you can review the delivered output with confidence before finalizing payment.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={links.bookCall}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
              target="_blank"
              rel="noreferrer"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}