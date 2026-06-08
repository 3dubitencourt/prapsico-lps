import { FINAL } from "./constants";
import { BrandMark } from "./BrandMark";

/* ===== APLIQUE SEU DESIGN AQUI (Footer + CTA final) =====
 * Bloco de fechamento em marinho (cor do logo) p/ destacar o CTA verde.
 * Fundo com textura sutil do padrão de marca (elemento-1). */
export function FinalCta({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative bg-psa-navy py-16 md:py-24 overflow-hidden">
      {/* ELEMENTO DE MARCA: textura do padrão de estrelas, bem sutil */}
      <BrandMark
        src="/psa/elemento-1.png"
        color="bg-psa-cream"
        repeat
        tile="150px"
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
      />
      <div className="relative container-lp max-w-3xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-psa-cream leading-tight text-balance">
          {FINAL.titulo}
        </h2>
        <button
          type="button"
          onClick={onOpenForm}
          className="
            mt-8 inline-flex items-center justify-center gap-2 rounded-full
            bg-psa-lime text-psa-navy font-bold tracking-wide text-sm md:text-base
            px-8 py-4 md:px-10 md:py-5 hover:bg-psa-lime-dark transition
            shadow-[0_8px_24px_rgba(143,197,46,0.45)]
          "
        >
          {FINAL.cta}
        </button>

        {/* Rodapé legal */}
        <p className="mt-10 text-xs text-psa-cream/60">
          {/* TODO: preencher CNPJ e links de Termos / Privacidade */}
          CNPJ: TODO ·{" "}
          <a href="#" className="hover:text-psa-lime transition">
            Termos de Uso
          </a>{" "}
          ·{" "}
          <a href="#" className="hover:text-psa-lime transition">
            Política de Privacidade
          </a>
        </p>
      </div>
    </section>
  );
}
