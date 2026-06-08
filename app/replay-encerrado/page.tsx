import type { Metadata } from "next";
import { TwoPathsReplay } from "@/components/sections/replay/TwoPathsReplay";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { ConsultativeCTA } from "@/components/sections/replay/ConsultativeCTA";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Replay encerrado · Prapsico × Anhanguera",
  description:
    "A janela de 7 dias do replay foi encerrada. Conheça os dois caminhos formativos do Psicólogo Paulo de Tarso.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <main>
        <section className="py-20 md:py-32 bg-gradient-to-b from-navy-950 to-navy-900 text-center">
          <div className="container-lp max-w-2xl">
            <p className="eyebrow mb-6">Replay encerrado</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
              A janela de 7 dias{" "}
              <em className="font-serif italic text-cyan font-normal">foi encerrada.</em>
            </h1>
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto text-pretty">
              Por critério institucional, o replay da aula ao vivo do Psicólogo Paulo de Tarso fica disponível apenas pelos 7 dias seguintes ao evento.
            </p>
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto mt-4 text-pretty">
              Se a proposta da aula faz sentido pra você, os dois caminhos formativos da parceria Prapsico × Anhanguera continuam abertos.
            </p>
          </div>
        </section>

        <TwoPathsReplay />
        <InstitutionalBar />
        <ConsultativeCTA />
      </main>
      <WhatsAppFloat />
    </>
  );
}
