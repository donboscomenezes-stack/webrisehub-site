import { links } from "@/lib/config";

export default function CTA() {
  return (
    <section id="contact" className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-up reveal">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Ready for a Website That Converts?
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] md:text-base text-muted">
            Share your business, location, and goal (calls, WhatsApp chats, bookings, or leads). We’ll recommend the fastest path.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={links.bookCall}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
              target="_blank"
              rel="noreferrer"
            >
              Book a Strategy Call
            </a>
            <a
              href={links.whatsapp}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 font-semibold text-text hover:bg-white/5 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}