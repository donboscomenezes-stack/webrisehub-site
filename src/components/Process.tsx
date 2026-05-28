import Section from "./Section";
import { processSteps } from "@/lib/config";

const stepBackgrounds = [
  "/Discovery.jpg",
  "/Design.jpg",
  "/Development.jpg",
  "/Launch Support.jpg"
];

export default function Process() {
  return (
    <Section id="process" title="Our Process">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, idx) => {
          const backgroundImage = stepBackgrounds[idx] ?? stepBackgrounds[0];
          const encodedBackgroundImage = encodeURI(backgroundImage);

          return (
            <div
              key={step.title}
              className="glass relative overflow-hidden rounded-3xl animate-fade-up reveal"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(11, 15, 25, 0.58), rgba(11, 15, 25, 0.74)), url("${encodedBackgroundImage}")`,
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            >
              <div className="flex min-h-[280px] flex-col p-6 text-center">
                <p className="text-sm font-semibold text-blue-200">Step {idx + 1}</p>
                <div className="flex flex-1 flex-col justify-center pt-14">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-200">{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}