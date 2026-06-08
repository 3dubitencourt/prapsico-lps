import { Check, Lock, ShieldCheck } from "lucide-react";
import { CTAPos } from "./CTAPos";
import {
  OFFER_ANCHOR,
  OFFER_INCLUDES_POS,
  TOTAL_PRICE_LABEL,
  HOUR_COST_LABEL,
} from "./constants";

export function OfferCardPos() {
  return (
    <section
      id={OFFER_ANCHOR}
      className="relative py-14 md:py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-y border-cyan/20 scroll-mt-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center top, rgba(6,164,212,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="container-lp max-w-3xl relative">
        <p className="eyebrow mb-3 text-center">SUA INSCRIÇÃO</p>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-8 text-balance">
          Tudo o que está{" "}
          <em className="font-serif italic text-cyan font-normal">incluso</em>
        </h2>

        <div className="rounded-3xl bg-navy-950 border-2 border-cyan/40 p-6 md:p-9 shadow-[0_24px_60px_rgba(6,164,212,0.18)]">
          <div className="text-center mb-5">
            <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-cyan font-medium mb-2">
              Pós-graduação em Psicologia Positiva e Neurociência Afetiva
            </p>
            <p className="text-sm md:text-base text-muted">
              12 meses · EAD · 360h · Reconhecida pelo MEC
            </p>
          </div>

          <div className="text-center my-6">
            <p className="text-xs md:text-sm text-subtle mb-1.5 tracking-wide">
              12x sem juros no cartão · ou boleto
            </p>
            <p className="font-bold leading-none">
              <span className="text-xl md:text-2xl text-muted align-top relative top-2 md:top-3">
                R$
              </span>
              <span className="text-5xl md:text-7xl text-ink mx-1">427</span>
              <span className="text-lg md:text-xl text-muted">/mês</span>
            </p>

            {/* Ancoragem racional */}
            <div className="mt-5 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 py-3 rounded-2xl bg-cyan/[0.06] border border-cyan/20">
              <div className="text-center sm:text-left">
                <p className="text-[10px] tracking-[0.18em] uppercase text-subtle font-medium">
                  Total do investimento
                </p>
                <p className="text-base md:text-lg font-bold text-ink">
                  {TOTAL_PRICE_LABEL}{" "}
                  <span className="text-xs text-subtle font-normal">em 12x</span>
                </p>
              </div>
              <span className="hidden sm:inline-block h-8 w-px bg-white/10" />
              <div className="text-center sm:text-left">
                <p className="text-[10px] tracking-[0.18em] uppercase text-subtle font-medium">
                  Custo por hora-aula
                </p>
                <p className="text-base md:text-lg font-bold text-cyan">
                  {HOUR_COST_LABEL}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs md:text-sm text-muted max-w-sm mx-auto leading-relaxed text-pretty">
              Comparável a pós presenciais privadas — com flexibilidade EAD.
            </p>
          </div>

          <ul className="space-y-2.5 mb-7 max-w-md mx-auto">
            {OFFER_INCLUDES_POS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan/15 border border-cyan/30 shrink-0">
                  <Check className="w-3 h-3 text-cyan" strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base text-ink/95 leading-relaxed text-pretty">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-4">
            <CTAPos
              source="offer_card"
              size="xl"
              label="QUERO ME INSCREVER AGORA"
              className="w-full md:w-auto"
            />
            <p className="text-xs text-subtle flex items-center gap-2 text-center">
              <Lock className="w-3 h-3 shrink-0" strokeWidth={2} />
              Pagamento seguro via Voomp Creators · garantia de 30 dias
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-cyan">
            <ShieldCheck className="w-4 h-4" strokeWidth={2} />
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase font-medium">
              Selo MEC · Certificação Anhanguera
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
