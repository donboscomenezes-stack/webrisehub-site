import Link from "next/link";
const nav = [["Games", "/#games"], ["Categories", "/categories/"], ["Blog", "/blog/"], ["About", "/about/"], ["Contact", "/contact/"]];
export default function Header() {
  return <header className="site-header"><div className="site-container header-inner">
    <Link href="/" className="site-brand" aria-label="WebRiseHub home"><img src="/logo.png" width="42" height="42" alt="" /><span>WebRise<span className="brand-accent">Hub</span></span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>
    <Link href="/#games" className="button-primary header-play">Let’s play <span aria-hidden="true">→</span></Link>
    <details className="mobile-menu"><summary>Menu <span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation">{nav.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav></details>
  </div></header>;
}
