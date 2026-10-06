import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import Games from "@/components/Games";
import JournalCards from "@/components/JournalCards";
import { pageMetadata } from "@/lib/editorial";
export const metadata = pageMetadata("WebRiseHub – Free Browser Games | Play Online, No Downloads", "Play free browser games on WebRiseHub. Discover puzzle, action, drawing, reaction, skill and casual games you can play instantly with no downloads or account required.", "/");
export default function HomePage() {
  return <SiteShell><StructuredData data={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": "https://webrisehub.com/#website", name: "WebRiseHub", alternateName: "Web Rise Hub", url: "https://webrisehub.com/", publisher: { "@id": "https://webrisehub.com/#organization" } }, { "@type": "Organization", "@id": "https://webrisehub.com/#organization", name: "WebRiseHub", url: "https://webrisehub.com/", logo: "https://webrisehub.com/logo.png" }] }} /><Hero />
    <Games />
    <section className="why-band"><div className="site-container"><div className="section-heading"><div><p className="eyebrow-label">Less setup. More play.</p><h2>Made for your next break.</h2></div></div><div className="benefits-grid">
      {[["01", "Free to explore", "Open a game and start playing. No purchase or account is needed for the current collection."], ["02", "No installation", "Everything runs in your browser. Choose an experience and go straight to its play area."], ["03", "A clear starting point", "Read actual controls, scoring explanations, and useful tips on every game page."], ["04", "Play your way", "Use a mouse or supported touchscreen. Each guide explains its device and input requirements."]].map(([n,t,d]) => <div className="benefit" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
    </div></div></section>
    <section className="site-container home-section"><div className="section-heading"><div><p className="eyebrow-label">Another way to play</p><h2>Take the scenic route.</h2></div><span className="section-index">02 / DISCOVER</span></div><div className="discovery-panel"><div><p className="eyebrow-label">Build Life · Interactive experiment</p><h3>Small habits.{" "}<br />A bigger picture.</h3><p>What does a few hours a day look like over a decade? Set an estimate and explore the possibilities.</p><Link href="/games/build-life/" className="button-secondary">Explore Build Life →</Link></div><div className="time-art" aria-hidden="true"><span>1 DAY</span><b>24<span>h</span></b><div /><span>ONE SMALL CHOICE AT A TIME</span></div></div></section>
    <section className="site-container home-section"><div className="section-heading"><div><p className="eyebrow-label">The WebRiseHub journal</p><h2>A little more behind the play.</h2></div><Link href="/blog/" className="text-link">All stories →</Link></div><JournalCards /></section>
    <section className="site-container home-about"><div><p className="eyebrow-label">Curiosity is the point</p><h2>Something worth{" "}<br />taking a break for.</h2></div><div><p>WebRiseHub is a home for browser games and interactive ideas with a clear invitation: try something, learn how it works, and see what happens. Explore the project, suggest an improvement, or tell us what you would like to play next.</p><Link className="text-link" href="/about/">Meet WebRiseHub →</Link><Link className="secondary-text-link" href="/advertise/">Interested in advertising?</Link></div></section>
  </SiteShell>;
}
