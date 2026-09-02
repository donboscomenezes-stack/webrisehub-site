import { brand, links } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 reveal">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{brand.name}</p>
          <p className="text-sm text-muted mt-1">Interactive games designed to attract attention and keep people coming back.</p>
        </div>

        <div className="text-sm text-muted flex flex-wrap gap-4">
          <a className="hover:text-text" href="#games">Games</a>
          <a className="hover:text-text" href="#advertise">Advertise</a>
          <a className="hover:text-text" href="#contact">Contact</a>
          <a className="hover:text-text" href={`mailto:${links.email}`}>{links.email}</a>
        </div>

        <p className="text-xs text-muted">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
