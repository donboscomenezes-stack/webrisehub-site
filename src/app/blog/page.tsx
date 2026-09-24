import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const articles = [
  {
    href: "/blog/10-quick-games-5-minutes",
    image: "/blog/10-quick-games-5-minutes.png",
    alt: "Ten quick browser games to play when you have five minutes to spare",
    dateTime: "2026-09-24",
    date: "September 24, 2026",
    readTime: "12 min read",
    title: "10 Quick Games to Play When You Have 5 Minutes to Spare",
    description:
      "Turn a short break into a complete challenge with ten browser games that start quickly and fit into five minutes."
  },
  {
    href: "/blog/15-free-browser-games-no-download",
    image: "/blog/15-free-browser-games-no-download.png",
    alt: "A laptop showing 15 free browser games that require no download",
    dateTime: "2026-09-21",
    date: "September 21, 2026",
    readTime: "13 min read",
    title: "15 Free Browser Games You Can Play Without Downloading Anything",
    description:
      "Open a tab and start playing. These quick challenges, puzzles, multiplayer games, and relaxed adventures need no installation."
  },
  {
    href: "/blog/25-best-browser-games-2026",
    image: "/blog/25-best-browser-games-2026.png",
    alt: "A colorful collection of the 25 best browser games to play in 2026",
    dateTime: "2026-09-20",
    date: "September 20, 2026",
    readTime: "18 min read",
    title: "25 Best Browser Games to Play When You're Bored in 2026",
    description:
      "Find your next game without downloading a thing, from reaction challenges and puzzles to multiplayer games and relaxed adventures."
  }
];

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
          <div className="blog-list mx-auto max-w-6xl">
            {articles.map((article) => (
              <a className="blog-feature" href={article.href} key={article.href}>
                <div className="blog-feature-image">
                  <img src={article.image} alt={article.alt} />
                </div>

                <div className="blog-feature-copy">
                  <div className="blog-meta">
                    <span>Game Guide</span>
                    <time dateTime={article.dateTime}>{article.date}</time>
                    <span>{article.readTime}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <strong>
                    Read article <ArrowRight aria-hidden="true" size={17} />
                  </strong>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
