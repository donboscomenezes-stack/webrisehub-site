import Link from "next/link";
import { links } from "@/lib/config";
import { categories } from "@/lib/editorial";
export default function Footer() {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid"><div className="footer-about"><Link href="/" className="site-brand">WebRise<span className="brand-accent">Hub</span></Link><p>Small breaks. Fresh challenges.<br />Something worth playing.</p><a href={`mailto:${links.email}`}>{links.email}</a></div>
      <nav aria-label="Explore"><h2>Explore</h2><Link href="/#games">All games</Link><Link href="/blog/">Journal</Link><Link href="/about/">About WebRiseHub</Link><Link href="/contact/">Contact</Link></nav>
      <nav aria-label="Game categories"><h2>Game categories</h2>{categories.map(c => <Link href={`/categories/${c.slug}/`} key={c.slug}>{c.name} games</Link>)}</nav>
      <nav aria-label="Legal"><h2>Good to know</h2><Link href="/privacy-policy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link><Link href="/cookie-policy/">Cookie policy</Link><Link href="/advertise/">Advertising disclosure</Link></nav>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} WebRiseHub</p><p>Play directly in your browser.</p><a href="#top">Back to top ↑</a></div>
  </div></footer>;
}
