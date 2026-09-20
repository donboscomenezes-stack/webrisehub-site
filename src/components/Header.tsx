import { brand, links } from "@/lib/config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#090d18]/86 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        <a href="/" className="flex items-center gap-3" aria-label={`Go to ${brand.name} home`}>
          <div className="flex items-center justify-center">
            <img
              src="/logo.png"
              alt={`${brand.name} logo`}
              className="h-12 w-12 object-contain"
            />
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          <a href="/#games" className="hover:text-text transition-colors">Games</a>
          <a
            href={links.blog}
            className="hover:text-text transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blogs
          </a>
          <a href="/#advertise" className="hover:text-text transition-colors">Advertise</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={links.bookCall}
            className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent2 transition-transform duration-200 hover:-translate-y-0.5 hover-scale"
            target="_blank"
            rel="noreferrer"
          >
            Advertise
          </a>
        </div>
      </div>
    </header>
  );
}
