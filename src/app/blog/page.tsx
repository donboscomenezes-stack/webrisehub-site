import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Blogs | WebRiseHub",
  description: "Guides, recommendations, and ideas from WebRiseHub about browser games and interactive experiences."
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="border-b border-white/5 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-cyan-300">
              WebRiseHub Journal
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-text md:text-6xl">
              Blogs
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">
              Guides and ideas for finding games worth your next break.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16" aria-label="Latest articles">
          <div className="mx-auto max-w-6xl">
            <a className="blog-feature" href="/blog/25-best-browser-games-2026">
              <div className="blog-feature-image">
                <img
                  src="/blog/25-best-browser-games-2026.png"
                  alt="A colorful collection of browser games surrounding the title 25 Best Browser Games to Play When You're Bored in 2026"
                />
              </div>

              <div className="blog-feature-copy">
                <div className="blog-meta">
                  <span>Game Guide</span>
                  <time dateTime="2026-09-20">September 20, 2026</time>
                  <span>18 min read</span>
                </div>
                <h2>25 Best Browser Games to Play When You&apos;re Bored in 2026</h2>
                <p>
                  From quick reaction challenges and drawing games to chess, puzzles, multiplayer games,
                  and relaxing experiences, find your next game without downloading a thing.
                </p>
                <strong>
                  Read article <ArrowRight aria-hidden="true" size={17} />
                </strong>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
