import { brand, links } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 reveal">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{brand.name}</p>
          <p className="text-sm text-muted mt-1">Premium websites & marketing for India + US.</p>
        </div>

        <div className="text-sm text-muted flex flex-wrap gap-4">
          <a className="hover:text-text" href="#services">Services</a>
          <a className="hover:text-text" href="#work">Work</a>
          <a className="hover:text-text" href="#pricing">Pricing</a>
          <a className="hover:text-text" href="#contact">Contact</a>
          <a className="hover:text-text" href={`mailto:${links.email}`}>{links.email}</a>
        </div>

        <p className="text-xs text-muted">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}