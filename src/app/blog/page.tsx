import type { Metadata } from "next";
import { ArrowLeft, BookOpenText } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Blogs | WebRiseHub",
  description: "Stories and ideas from WebRiseHub about games, interaction, and digital experiences."
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
              Ideas on interactive experiences, game design, and building attention people choose to give.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28" aria-labelledby="blog-empty-title">
          <div className="mx-auto flex max-w-6xl flex-col items-start border-t border-white/10 pt-12 md:pt-16">
            <BookOpenText aria-hidden="true" className="h-9 w-9 text-cyan-300" strokeWidth={1.6} />
            <h2 id="blog-empty-title" className="mt-6 text-2xl font-semibold text-text md:text-3xl">
              Stories are on the way.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              We are preparing the first WebRiseHub articles. Check back soon.
            </p>
            <a
              href="/#games"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition-colors hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Browse games
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
