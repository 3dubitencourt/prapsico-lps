import { X, Check } from "lucide-react";
import { COMPARISON_ROWS } from "./constants";

export function ComparisonTable() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-5xl">
        <p className="eyebrow mb-4 text-center">COMPARATIVO DIRETO</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-4 text-balance">
          Pós comum{" "}
          <em className="font-serif italic text-cyan font-normal">×</em>{" "}
          essa pós
        </h2>
        <p className="text-center text-muted text-base md:text-lg mb-12 max-w-2xl mx-auto text-pretty">
          Onde a maioria entrega genérico, a gente entrega profundidade. Olhe linha por linha.
        </p>

        {/* DESKTOP — table */}
        <div className="hidden md:block rounded-2xl border border-cyan/20 overflow-hidden bg-navy-950 shadow-[0_24px_60px_rgba(6,164,212,0.12)]">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-900 border-b border-white/5">
                <th className="w-[180px] py-5 px-5 text-left text-[10px] tracking-[0.2em] uppercase text-subtle font-medium">
                  Critério
                </th>
                <th className="py-5 px-5 text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10">
                      <X className="w-3.5 h-3.5 text-subtle" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm md:text-base font-semibold text-muted">
                      Pós comum
                    </span>
                  </div>
                </th>
                <th className="py-5 px-5 text-left bg-cyan/[0.04]">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan/15 border border-cyan/40">
                      <Check className="w-3.5 h-3.5 text-cyan" strokeWidth={3} />
                    </span>
                    <span className="text-sm md:text-base font-bold text-cyan">
                      Essa pós · Anhanguera × Prapsico
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}
                >
                  <td className="py-5 px-5 border-r border-white/5 align-top">
                    <span className="font-semibold text-ink text-sm md:text-base">
                      {row.label}
                    </span>
                  </td>
                  <td className="py-5 px-5 border-r border-white/5 align-top text-muted text-sm md:text-[15px] leading-relaxed text-pretty">
                    {row.commom}
                  </td>
                  <td className="py-5 px-5 align-top text-ink text-sm md:text-[15px] leading-relaxed bg-cyan/[0.04] text-pretty">
                    {row.ours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE — cards empilhados */}
        <div className="md:hidden space-y-5">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-cyan/20 bg-navy-950 overflow-hidden"
            >
              <div className="px-5 py-3 bg-navy-900 border-b border-white/5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-subtle font-medium">
                  Critério
                </span>
                <p className="font-semibold text-ink text-base mt-0.5">
                  {row.label}
                </p>
              </div>
              <div className="grid grid-cols-1 divide-y divide-white/5">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5 border border-white/10">
                      <X className="w-3 h-3 text-subtle" strokeWidth={2.5} />
                    </span>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-subtle font-medium">
                      Pós comum
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed text-pretty">
                    {row.commom}
                  </p>
                </div>
                <div className="p-5 bg-cyan/[0.04]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan/15 border border-cyan/40">
                      <Check className="w-3 h-3 text-cyan" strokeWidth={3} />
                    </span>
                    <span className="text-[11px] tracking-[0.18em] uppercase text-cyan font-bold">
                      Essa pós
                    </span>
                  </div>
                  <p className="text-sm text-ink leading-relaxed text-pretty">
                    {row.ours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
