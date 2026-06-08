import { ShieldCheck } from "lucide-react";

export function GuaranteePos() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-3xl">
        <div className="rounded-3xl bg-navy-950 border border-cyan/30 p-8 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(6,164,212,0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-cyan/10 border border-cyan/30 mb-6">
              <ShieldCheck
                className="w-10 h-10 md:w-12 md:h-12 text-cyan"
                strokeWidth={1.5}
              />
            </div>

            <p className="eyebrow mb-3">GARANTIA</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
              <em className="font-serif italic text-cyan font-normal">30 dias</em>{" "}
              de garantia incondicional
            </h2>

            <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto text-pretty">
              Se nos primeiros 30 dias após o início das aulas você avaliar que não é pra você, devolvemos{" "}
              <span className="text-ink font-medium">100% do valor</span> sem nenhuma pergunta.
            </p>
            <p className="mt-4 font-serif italic text-lg md:text-xl text-cyan-light">
              A decisão precisa ser sua — e técnica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
