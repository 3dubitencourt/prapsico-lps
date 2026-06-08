import type { Metadata } from "next";
import Link from "next/link";
import { HeaderLive } from "@/components/sections/HeaderLive";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Aula Liberada · Pós em Psicologia Positiva | Prapsico × Anhanguera",
  description:
    "Assista agora a aula técnica de 3 minutos do Dr. Paulo de Tarso sobre a pós-graduação em Psicologia Positiva e Neurociência Afetiva.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/obrigado-aula-pos" },
};

const AULA_EMBED_URL =
  process.env.NEXT_PUBLIC_AULA_POS_EMBED_URL ||
  "https://www.youtube.com/embed/pzas_C_FH0U?rel=0&modestbranding=1";

export default function Page() {
  return (
    <>
      <HeaderLive />

      <main className="pt-24 md:pt-28 pb-20 md:pb-24 bg-navy-950">
        <div className="container-lp max-w-3xl text-center">
          <p className="eyebrow mb-4">Acesso liberado</p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink leading-tight mb-4 text-balance">
            Sua aula técnica de 3 minutos com o{" "}
            <em className="font-serif italic text-cyan font-normal">
              Dr. Paulo de Tarso
            </em>
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-8 md:mb-10">
            Assista agora. Em seguida, conheça a pós-graduação completa em
            Psicologia Positiva e Neurociência Afetiva, em parceria com a
            Anhanguera.
          </p>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(6,164,212,0.15)] aspect-[9/16] mx-auto max-w-[400px] bg-navy-900">
            <iframe
              src={AULA_EMBED_URL}
              title="Aula gratuita — Dr. Paulo de Tarso"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="mt-10 md:mt-12 rounded-2xl border border-cyan/30 bg-navy-900/60 p-6 md:p-8">
            <p className="eyebrow mb-3">Próximo passo</p>
            <h2 className="text-xl md:text-2xl font-bold text-ink mb-3 leading-tight text-balance">
              Conheça a Pós em Psicologia Positiva e Neurociência Afetiva
            </h2>
            <p className="text-muted text-sm md:text-base mb-6 leading-relaxed">
              Reconhecida pelo MEC · Corpo docente com doutores e mestres ·
              Em parceria com a Anhanguera.
            </p>
            <Link
              href="/pos-graduacao"
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                bg-cyan text-navy-950 font-bold tracking-wide text-sm md:text-base
                px-8 py-4 hover:bg-cyan-light transition
                shadow-[0_8px_24px_rgba(6,164,212,0.45)]
              "
            >
              VER A PÓS-GRADUAÇÃO COMPLETA <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-subtle">
            Também enviamos o link da aula pro seu e-mail e WhatsApp.
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
