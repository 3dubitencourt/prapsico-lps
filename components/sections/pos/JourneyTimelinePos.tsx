import { JOURNEY_STEPS_POS } from "./constants";

export function JourneyTimelinePos() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-6xl">
        <p className="eyebrow mb-4 text-center">JORNADA ACADÊMICA</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-14 md:mb-20 text-balance">
          Como{" "}
          <em className="font-serif italic text-cyan font-normal">funciona</em>{" "}
          em 12 meses
        </h2>

        {/* MOBILE — vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-cyan/20" />
          <ol className="space-y-7">
            {JOURNEY_STEPS_POS.map((step, i) => (
              <li key={step.label} className="relative pl-12">
                <span className="absolute left-0 top-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy-950 border border-cyan/40 text-cyan font-serif italic text-base">
                  {i + 1}
                </span>
                <p className="text-[10px] tracking-[0.18em] uppercase text-cyan font-medium mb-1">
                  {step.label}
                </p>
                <h3 className="text-lg font-semibold mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* DESKTOP — horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-cyan/20" />
          <ol className="grid grid-cols-5 gap-4">
            {JOURNEY_STEPS_POS.map((step, i) => (
              <li key={step.label} className="relative text-center">
                <span className="relative z-10 mx-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-navy-950 border border-cyan/40 text-cyan font-serif italic">
                  {i + 1}
                </span>
                <p className="mt-4 text-[10px] tracking-[0.18em] uppercase text-cyan font-medium">
                  {step.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-tight text-balance">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
