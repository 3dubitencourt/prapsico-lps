import { GraduationCap, UserCheck, Handshake, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FOUR_PILLARS } from "./constants";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  UserCheck,
  Handshake,
  Award,
};

export function FourPillars() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-6xl">
        <p className="eyebrow mb-4 text-center">O QUE É A CERTIFICAÇÃO</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 md:mb-16 text-balance">
          Quatro pilares que separam{" "}
          <em className="font-serif italic text-cyan font-normal">atender</em>{" "}
          de{" "}
          <em className="font-serif italic text-cyan font-normal">atender bem</em>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FOUR_PILLARS.map(({ icon, title, desc }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="rounded-2xl bg-navy-950 border border-white/5 p-6 md:p-7 hover:border-cyan/30 transition"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 mb-5">
                  <Icon className="w-6 h-6 text-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <p className="text-muted text-sm md:text-base leading-relaxed text-pretty">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
