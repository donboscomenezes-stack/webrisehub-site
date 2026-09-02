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

            <p className="mt-5 max-w-xl text-[15px] md:text-lg text-muted animate-fade-up anim-delay-2 fade-up">
              {brand.subtagline}
            </p>

            <p className="mt-5 max-w-2xl text-base font-semibold text-white animate-fade-up anim-delay-2 fade-up">
              Advertise with WebRiseHub and put your brand inside experiences people actually enjoy.
            </p>

        </div>
      </div>

    </section>
  );
}
