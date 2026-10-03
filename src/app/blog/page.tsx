import SiteShell from "@/components/SiteShell";
import JournalCards from "@/components/JournalCards";
import { pageMetadata } from "@/lib/editorial";

export const metadata = pageMetadata(
  "The WebRiseHub Journal",
  "Game tips, the ideas behind our interactive experiences, and practical notes on playing in your browser.",
  "/blog/"
);

export default function BlogPage() {
  return (
    <SiteShell>
      <div className="site-container">
        <header className="page-intro">
          <p className="eyebrow-label">The WebRiseHub journal</p>
          <h1>There’s more to the game.</h1>
          <p>Practical tips, curious ideas, and a closer look at the experiences you play.</p>
        </header>
        <JournalCards />
        <p className="editorial-note">Guides and explainers by WebRiseHub, grounded in the games available here.</p>
      </div>
    </SiteShell>
  );
}
