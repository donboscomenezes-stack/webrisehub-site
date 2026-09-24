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
        </nav>
      </div>
    </header>
  );
}
