import { brand, links } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-midnight/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <img
              src="/logo.png"
              alt={`${brand.name} logo`}
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          <a href="#services" className="hover:text-text transition-colors">Services</a>
          <a href="#work" className="hover:text-text transition-colors">Work</a>
          <a href="#pricing" className="hover:text-text transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-text transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={links.whatsapp}
            className="hidden sm:inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm text-text hover:bg-white/5 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            href={links.bookCall}
            className="inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
            target="_blank"
            rel="noreferrer"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}