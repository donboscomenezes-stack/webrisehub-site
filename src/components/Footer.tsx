import { brand, links } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 reveal">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{brand.name}</p>
          <a
            className="mt-1 inline-block text-sm text-muted transition-colors hover:text-text"
            href="mailto:donbosco.menezes@webrisehub.com"
          >
            donbosco.menezes@webrisehub.com
          </a>
        </div>

        <div className="text-sm text-muted flex flex-wrap gap-4">
          <a className="hover:text-text" href="/#games">Games</a>
          <a
            className="hover:text-text"
            href={links.blog}
            target="_blank"
            rel="noopener noreferrer"
          >
            Blogs
          </a>
          <a className="hover:text-text" href="/#advertise">Advertise</a>
        </div>

        <p className="text-xs text-muted">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
