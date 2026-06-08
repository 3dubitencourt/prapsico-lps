/* ===========================================================================
 *  MediaSlot — placeholder de banner/imagem (na paleta Psicoaplique).
 *  Caixa tracejada com legenda do que entra ali e o tamanho recomendado.
 *
 *  COMO TROCAR POR IMAGEM REAL (Eduardo):
 *    1. Suba a imagem em /public (ex: /public/banner-hero.jpg)
 *    2. Troque o <MediaSlot ... /> por:
 *         <Image src="/banner-hero.jpg" alt="..." width={1200} height={500}
 *                className="w-full rounded-2xl" />
 *       (importe: import Image from "next/image";)
 * =========================================================================== */
export function MediaSlot({
  label,
  hint,
  ratio = "aspect-video",
  className = "",
}: {
  /** O que entra aqui (ex: "Banner principal") */
  label: string;
  /** Dica de tamanho/uso (ex: "1200 × 500 px") */
  hint?: string;
  /** Proporção Tailwind (ex: "aspect-video", "aspect-[16/6]", "aspect-square") */
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full rounded-2xl border-2 border-dashed border-psa-navy/30 bg-white/50 flex flex-col items-center justify-center text-center px-6 ${className}`}
    >
      {/* ícone de imagem (sem emoji) */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-9 h-9 text-psa-lime-dark mb-2"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
        <path d="M21 16l-5-5-4 4-2-2-7 7" />
      </svg>
      <p className="text-psa-navy font-semibold text-sm md:text-base">{label}</p>
      {hint ? (
        <p className="mt-1 text-xs text-psa-navy-500">{hint}</p>
      ) : null}
    </div>
  );
}
