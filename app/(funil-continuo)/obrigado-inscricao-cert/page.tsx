import type { Metadata } from "next";
import { HeaderLive } from "@/components/sections/HeaderLive";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Recebemos seus dados · Prapsico × Anhanguera",
  description:
    "Nossa equipe entra em contato com você em até 5 minutos no WhatsApp.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/obrigado-inscricao-cert" },
};

const STEPS = [
  {
    n: "1",
    title: "Você recebeu uma mensagem no WhatsApp",
    body: "Confirme que é o seu número e fique de olho — vamos te chamar em até 5 minutos.",
  },
  {
    n: "2",
    title: "Conversa rápida com a equipe",
    body: "Vamos entender seu momento, tirar dúvidas e ver se a certificação faz sentido pra você agora.",
  },
  {
    n: "3",
    title: "Próximos passos da inscrição",
    body: "Se fizer sentido, te mostramos as condições (R$ 257/mês · até 12x) e como começar.",
  },
];

export default function Page() {
  return (
    <>
      <HeaderLive />

      <main className="pt-24 md:pt-28 pb-20 md:pb-24 bg-navy-950">
        <div className="container-lp max-w-3xl text-center">
          <div
            aria-hidden
            className="mx-auto flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan/15 border border-cyan/40 mb-6"
          >
            <span className="text-cyan text-3xl md:text-4xl font-bold">✓</span>
          </div>

          <p className="eyebrow mb-4">Recebemos seus dados</p>
          <h1 className="text-3xl md:text-5xl font-bold text-ink leading-tight mb-4 text-balance">
            Nossa equipe te chama em até{" "}
            <em className="font-serif italic text-cyan font-normal">
              5 minutos
            </em>{" "}
            no WhatsApp
          </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto">
            Já enviamos uma mensagem pro número que você cadastrou. Confirma o
            recebimento por lá pra agilizar o atendimento.
          </p>

          <div className="grid gap-4 md:gap-5 text-left">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-5 md:p-6"
              >
                <span
                  aria-hidden
                  className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan text-navy-950 font-bold"
                >
                  {s.n}
                </span>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-ink mb-1 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 rounded-2xl border border-cyan/30 bg-navy-900/60 p-6 md:p-8">
            <p className="eyebrow mb-3">Prefere conversar agora?</p>
            <h2 className="text-xl md:text-2xl font-bold text-ink mb-4 leading-tight text-balance">
              Chama a gente direto no WhatsApp
            </h2>
            <a
              href="https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site."
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                bg-cyan text-navy-950 font-bold tracking-wide text-sm md:text-base
                px-8 py-4 hover:bg-cyan-light transition
                shadow-[0_8px_24px_rgba(6,164,212,0.45)]
              "
            >
              FALAR NO WHATSAPP <span aria-hidden>→</span>
            </a>
            <p className="mt-4 text-xs text-subtle">
              (35) 99257-1045 · Atendimento humano
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
