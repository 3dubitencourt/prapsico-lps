import { MediaSlot } from "./MediaSlot";

/* ===== APLIQUE SEU DESIGN AQUI (faixa de banner full-width) =====
 * Bloco de banner largo pra encaixar entre seções. Reutilizável:
 *   <BannerFaixa label="Banner promocional" hint="1200 × 320 px" />
 */
export function BannerFaixa({
  label,
  hint,
  ratio = "aspect-[16/5]",
}: {
  label: string;
  hint?: string;
  ratio?: string;
}) {
  return (
    <section className="bg-psa-cream py-8 md:py-12">
      <div className="container-lp">
        <MediaSlot label={label} hint={hint} ratio={ratio} />
      </div>
    </section>
  );
}
