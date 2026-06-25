import { Calendar } from "lucide-react";
import { CTAPrimary } from "@/components/CTAPrimary";

type Props = { checkoutUrl: string };

export function FinalCTA({ checkoutUrl }: Props) {
  return (
    <section className="pt-16 md:pt-40 pb-20 md:pb-48 bg-gradient-to-b from-navy-900 to-navy-950 text-center border-t border-white/10">
      <div className="container-lp max-w-2xl">
        <p className="eyebrow mb-5 md:mb-8 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 text-cyan" strokeWidth={1.75} />
          10 DE JULHO · 19H · ZOOM · 90 MINUTOS
        </p>
        <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-8 md:mb-14 text-balance">
          Garante sua vaga e hoje{" "}
          <em className="font-serif italic text-cyan font-normal">entra na live</em>
        </h2>
        <CTAPrimary href={checkoutUrl} size="lg" />
      </div>
    </section>
  );
}
