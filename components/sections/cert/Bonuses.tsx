import { Target, Scale, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BONUSES } from "./constants";

const ICONS: Record<string, LucideIcon> = { Target, Scale };

export function Bonuses() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-5xl">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 mx-auto justify-center w-fit left-1/2 -translate-x-1/2 relative">
          <Gift className="w-3.5 h-3.5 text-cyan" strokeWidth={2} />
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium text-cyan">
            Bônus inclusos
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 md:mb-14 text-balance">
          Dois bônus pra você{" "}
          <em className="font-serif italic text-cyan font-normal">atender e crescer</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {BONUSES.map(({ icon, title, desc }) => {
            const Icon = ICONS[icon];
            return (
              <div
                key={title}
                className="rounded-2xl bg-navy-900 border border-cyan/20 p-7 md:p-8 hover:border-cyan/40 transition"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 mb-5">
                  <Icon className="w-7 h-7 text-cyan" strokeWidth={1.75} />
                </div>
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-cyan font-medium mb-2">
                  Bônus exclusivo
                </p>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-balance">
                  {title}
                </h3>
                <p className="text-muted text-base leading-relaxed text-pretty">
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
