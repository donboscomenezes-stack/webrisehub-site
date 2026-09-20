import { brand } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow absolute inset-0" />
      <div className="mx-auto flex max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-3xl text-left">
            <h1
              className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.04] animate-fade-up anim-delay-1 stagger-words"
              suppressHydrationWarning
            >
              {brand.tagline}
            </h1>

        </div>
      </div>

    </section>
  );
}
