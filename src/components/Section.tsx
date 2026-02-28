export default function Section({
  id,
  title,
  subtitle,
  children
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-20 md:py-24 animate-fade-up">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 reveal">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-[15px] md:text-base text-muted">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}