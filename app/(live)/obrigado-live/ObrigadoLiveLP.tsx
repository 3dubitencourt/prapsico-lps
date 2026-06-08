"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Check,
  AlertTriangle,
  Calendar,
  Play,
  Mail,
  Share2,
  MessageCircle,
  ArrowRight,
  Quote,
} from "lucide-react";
import {
  trackPurchase,
  trackClickWhatsAppGroup,
  trackPlayBonusVideo,
  trackAddToCalendar,
} from "@/lib/tracking";
import Image from "next/image";

const DEFAULT_WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EQ9BB74Jrsh47ppiAVpm05";
const DEFAULT_BONUS_VIDEO_EMBED_URL = "https://www.youtube.com/embed/pzas_C_FH0U";

// Live: 8 de junho 2026, 19h BRT (UTC-3) · 90 min
// Início UTC: 2026-06-08 22:00 · Fim UTC: 2026-06-08 23:30
const EVENT_TITLE = "Aula Ao Vivo · Psicólogo Paulo de Tarso (Prapsico × Anhanguera)";
const EVENT_DETAILS =
  "Aula clínica de 90 minutos sobre os fundamentos do bom atendimento. Live no Zoom. Link enviado no grupo VIP do WhatsApp.";
const EVENT_LOCATION = "Ao vivo no Zoom";
const EVENT_START_UTC = "20260608T220000Z";
const EVENT_END_UTC = "20260608T233000Z";

function buildGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${EVENT_START_UTC}/${EVENT_END_UTC}`,
    details: EVENT_DETAILS,
    location: EVENT_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsDataUri() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prapsico//Aula Ao Vivo//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:aula-ao-vivo-paulo-de-tarso-20260608@prapsico.com.br",
    "DTSTAMP:20260514T000000Z",
    `DTSTART:${EVENT_START_UTC}`,
    `DTEND:${EVENT_END_UTC}`,
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:${EVENT_DETAILS}`,
    `LOCATION:${EVENT_LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function ObrigadoLiveLP({
  whatsappGroupUrl = DEFAULT_WHATSAPP_GROUP_URL,
  bonusVideoUrl = DEFAULT_BONUS_VIDEO_EMBED_URL,
}: {
  whatsappGroupUrl?: string;
  bonusVideoUrl?: string;
}) {
  const searchParams = useSearchParams();

  const nome = searchParams.get("nome") || searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const pedido =
    searchParams.get("pedido") ||
    searchParams.get("transaction") ||
    searchParams.get("order") ||
    "";
  const pagamento =
    searchParams.get("pagamento") || searchParams.get("payment") || "";

  const primeiroNome = useMemo(() => (nome ? nome.split(" ")[0] : ""), [nome]);

  const googleCalUrl = useMemo(buildGoogleCalendarUrl, []);
  const icsUrl = useMemo(buildIcsDataUri, []);

  useEffect(() => {
    trackPurchase(pedido || undefined);
  }, [pedido]);

  return (
    <>
      <main className="pb-12">
        {/* TODO (backend): ao receber webhook do Hotmart, disparar:
              - email transacional (link do grupo + aula bônus)
              - webhook WhatsApp (ManyChat/Z-API) com boas-vindas
              - CRM tag: live_8jun_inscrito
              - sequência de emails: D-7, D-3, D-1, D-0 */}

        <ConfirmationHero primeiroNome={primeiroNome} />

        <ThreeStepsSection
          googleCalUrl={googleCalUrl}
          icsUrl={icsUrl}
          whatsappGroupUrl={whatsappGroupUrl}
          bonusVideoUrl={bonusVideoUrl}
        />

        <ReceiptSection email={email} pedido={pedido} pagamento={pagamento} />

        <AuthorityReinforcement />

        <TimelineSection />

        <ShareSection />
      </main>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Seção 2 — Hero de confirmação (fundo sucesso)
--------------------------------------------------------------------------- */
function ConfirmationHero({ primeiroNome }: { primeiroNome: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-success/25 via-navy-950 to-navy-950 border-b border-white/5">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(47,190,122,0.18),_transparent_60%)]"
      />
      <div className="container-lp relative py-16 md:py-24 text-center max-w-4xl">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-success/40 blur-2xl animate-pulse" />
            <CheckCircle2
              className="relative w-24 h-24 md:w-28 md:h-28 text-success"
              strokeWidth={1.5}
            />
          </span>
        </div>

        <p className="eyebrow !text-success mb-3">INSCRIÇÃO RECEBIDA</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-4">
          VAGA CONFIRMADA!
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto md:text-pretty">
          {primeiroNome ? `${primeiroNome}, sua` : "Sua"} inscrição na aula do
          <br className="md:hidden" />{" "}
          dia 8 de junho está garantida.
        </p>

        <div className="mt-10 w-full rounded-2xl border border-white/10 bg-navy-900/60 px-6 py-6 md:py-7">
          <dl className="grid grid-cols-3 divide-x divide-white/10 text-center">
            <div className="px-3">
              <dt className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-subtle mb-1.5">
                Data
              </dt>
              <dd className="text-sm md:text-base font-semibold text-ink leading-tight">
                8 de junho
                <span className="block text-xs md:text-sm font-normal text-muted">
                  quarta-feira
                </span>
              </dd>
            </div>
            <div className="px-3">
              <dt className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-subtle mb-1.5">
                Horário
              </dt>
              <dd className="text-sm md:text-base font-semibold text-ink leading-tight">
                19h
                <span className="block text-xs md:text-sm font-normal text-muted">
                  Brasília
                </span>
              </dd>
            </div>
            <div className="px-3">
              <dt className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-subtle mb-1.5">
                Onde
              </dt>
              <dd className="text-sm md:text-base font-semibold text-ink leading-tight">
                Zoom
                <span className="block text-xs md:text-sm font-normal text-muted">
                  ao vivo
                </span>
                <span className="block text-xs md:text-sm font-normal text-muted">
                  90 min
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Seção 3 — Faça 3 coisas agora (Card 1 dominante)
--------------------------------------------------------------------------- */
function ThreeStepsSection({
  googleCalUrl,
  icsUrl,
  whatsappGroupUrl,
  bonusVideoUrl,
}: {
  googleCalUrl: string;
  icsUrl: string;
  whatsappGroupUrl: string;
  bonusVideoUrl: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-lp max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-3">PRÓXIMOS PASSOS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Faça 3 coisas agora pra não perder nada
          </h2>
        </div>

        <WhatsAppGroupCard whatsappGroupUrl={whatsappGroupUrl} />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <BonusVideoCard bonusVideoUrl={bonusVideoUrl} />
          <CalendarCard googleCalUrl={googleCalUrl} icsUrl={icsUrl} />
        </div>
      </div>
    </section>
  );
}

function WhatsAppGroupCard({ whatsappGroupUrl }: { whatsappGroupUrl: string }) {
  return (
    <div className="relative rounded-3xl bg-[#25D366] text-[#0B3D24] shadow-[0_20px_60px_-15px_rgba(37,211,102,0.6)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#0B3D24]/10 blur-3xl"
      />

      {/* Top bar — eyebrow + badge */}
      <div className="relative flex items-center justify-between px-7 md:px-10 pt-6 md:pt-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#0B3D24] text-[#25D366] text-base md:text-lg font-bold">
            1
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-bold opacity-80">
            Passo 1 · Mais importante
          </span>
        </div>
        <span className="inline-flex items-center justify-center text-center rounded-2xl bg-[#0B3D24] text-[#25D366] text-[9px] md:text-[10px] font-bold tracking-[0.18em] px-3 py-1.5 leading-tight">
          PRIORIDADE
          <br />
          MÁXIMA
        </span>
      </div>

      {/* Body — 2 colunas no desktop */}
      <div className="relative grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 px-7 md:px-10 py-7 md:py-9">
        {/* Coluna esquerda — conteúdo */}
        <div>
          <h3 className="text-2xl md:text-[2rem] font-bold leading-[1.1] tracking-tight text-balance mb-3">
            Entre no grupo VIP do WhatsApp
          </h3>
          <p className="text-sm md:text-base text-[#0B3D24]/80 leading-relaxed mb-6 text-pretty">
            É lá que tudo acontece nos próximos dias — incluindo o link da live
            no dia 8.
          </p>

          <ul className="space-y-2.5 text-sm md:text-[15px]">
            <li className="flex items-start gap-2.5">
              <Check
                className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]"
                strokeWidth={3}
              />
              <span>Conteúdo exclusivo do Paulo nos próximos 7 dias</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check
                className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]"
                strokeWidth={3}
              />
              <span>Lembretes da live (1h, 30min e 5min antes)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check
                className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]"
                strokeWidth={3}
              />
              <span>Link direto pra entrar na live no dia</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check
                className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px]"
                strokeWidth={3}
              />
              <span>Q&amp;A pré-aula com o time</span>
            </li>
          </ul>
        </div>

        {/* Coluna direita — ação */}
        <div className="flex flex-col justify-center gap-4 md:border-l md:border-[#0B3D24]/15 md:pl-12">
          <a
            href={whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackClickWhatsAppGroup}
            className="group inline-flex items-center justify-center gap-2.5 w-full rounded-2xl bg-[#0B3D24] text-white text-base md:text-lg font-bold px-6 py-5 hover:bg-[#0E5232] transition shadow-[0_8px_24px_rgba(11,61,36,0.35)]"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span>ENTRAR NO GRUPO</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition" />
          </a>

          <div className="flex items-center gap-2.5 rounded-xl bg-[#0B3D24]/10 border border-[#0B3D24]/20 px-4 py-3">
            <AlertTriangle
              className="flex-shrink-0 w-4 h-4 md:w-[18px] md:h-[18px]"
              strokeWidth={2.5}
            />
            <p className="text-xs md:text-sm font-medium leading-snug text-pretty">
              Sem entrar no grupo, você pode perder o link da live no dia.
            </p>
          </div>

          <p className="text-[11px] text-center text-[#0B3D24]/70 tracking-wide">
            Acesso imediato · sem cadastro adicional
          </p>
        </div>
      </div>
    </div>
  );
}

function BonusVideoCard({ bonusVideoUrl }: { bonusVideoUrl: string }) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    trackPlayBonusVideo();
  };

  return (
    <div className="rounded-2xl bg-navy-900 border border-white/5 p-7 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/10 text-cyan text-xl font-bold">
          2
        </span>
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          ASSISTA SUA AULA BÔNUS DE 3 MINUTOS
        </h3>
      </div>
      <p className="text-muted text-sm md:text-base text-pretty mb-5 leading-relaxed">
        O Paulo gravou uma aula bônus exclusiva pra você começar com o pé
        certo. Assista agora — vai te preparar pra aproveitar muito mais a live
        de 8/jun.
      </p>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-950 border border-white/5 mb-5">
        {playing ? (
          <iframe
            src={`${bonusVideoUrl}?autoplay=1`}
            title="Aula bônus · Psicólogo Paulo de Tarso"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="group absolute inset-0 flex items-center justify-center w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 hover:from-navy-700 hover:to-navy-800 transition"
            aria-label="Assistir aula bônus"
          >
            <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,164,212,0.18),_transparent_70%)]" />
            <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan text-navy-950 shadow-[0_8px_24px_rgba(6,164,212,0.4)] group-hover:scale-110 transition">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
            </span>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.18em] text-subtle uppercase">
              3 minutos
            </span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handlePlay}
        disabled={playing}
        className="inline-flex items-center gap-2 text-cyan text-sm font-medium tracking-wide hover:text-cyan-light transition disabled:opacity-50"
      >
        <Play className="w-4 h-4" fill="currentColor" />
        {playing ? "REPRODUZINDO" : "ASSISTIR AGORA"}
      </button>
    </div>
  );
}

function CalendarCard({
  googleCalUrl,
  icsUrl,
}: {
  googleCalUrl: string;
  icsUrl: string;
}) {
  return (
    <div className="rounded-2xl bg-navy-900 border border-white/5 p-7 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/10 text-cyan text-xl font-bold">
          3
        </span>
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          SALVE A DATA NA SUA AGENDA
        </h3>
      </div>
      <p className="text-muted text-sm md:text-base text-pretty mb-6 leading-relaxed">
        Coloque um lembrete pra 8 de junho, 19h (horário de Brasília). A live
        tem 90 minutos.
      </p>

      <div className="space-y-3">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAddToCalendar("google")}
          className="flex items-center gap-3 w-full rounded-xl border border-white/10 bg-navy-950/60 hover:bg-navy-800 hover:border-cyan/40 transition px-4 py-3 text-sm md:text-base font-medium"
        >
          <Calendar className="w-5 h-5 text-cyan flex-shrink-0" />
          <span>Adicionar ao Google Calendar</span>
        </a>
        <a
          href={icsUrl}
          download="aula-prapsico-8jun.ics"
          onClick={() => trackAddToCalendar("apple")}
          className="flex items-center gap-3 w-full rounded-xl border border-white/10 bg-navy-950/60 hover:bg-navy-800 hover:border-cyan/40 transition px-4 py-3 text-sm md:text-base font-medium"
        >
          <Calendar className="w-5 h-5 text-cyan flex-shrink-0" />
          <span>Adicionar ao Apple Calendar</span>
        </a>
        <a
          href={icsUrl}
          download="aula-prapsico-8jun.ics"
          onClick={() => trackAddToCalendar("outlook")}
          className="flex items-center gap-3 w-full rounded-xl border border-white/10 bg-navy-950/60 hover:bg-navy-800 hover:border-cyan/40 transition px-4 py-3 text-sm md:text-base font-medium"
        >
          <Calendar className="w-5 h-5 text-cyan flex-shrink-0" />
          <span>Adicionar ao Outlook</span>
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Seção 4 — Recibo / detalhes
--------------------------------------------------------------------------- */
function ReceiptSection({
  email,
  pedido,
  pagamento,
}: {
  email: string;
  pedido: string;
  pagamento: string;
}) {
  return (
    <section className="py-12 md:py-16 border-t border-white/5">
      <div className="container-lp max-w-4xl">
        <div className="rounded-2xl bg-navy-900/60 border border-white/5 p-7 md:p-9">
          <h3 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan" />
            Detalhes da sua inscrição
          </h3>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm md:text-base">
            <div>
              <dt className="text-subtle text-xs uppercase tracking-wider mb-1">
                Email
              </dt>
              <dd className="text-ink break-words">
                {email || <span className="text-subtle">—</span>}
              </dd>
            </div>
            <div>
              <dt className="text-subtle text-xs uppercase tracking-wider mb-1">
                Valor pago
              </dt>
              <dd className="text-ink">R$ 37,00</dd>
            </div>
            <div>
              <dt className="text-subtle text-xs uppercase tracking-wider mb-1">
                Forma de pagamento
              </dt>
              <dd className="text-ink">
                {pagamento || <span className="text-subtle">—</span>}
              </dd>
            </div>
            <div>
              <dt className="text-subtle text-xs uppercase tracking-wider mb-1">
                Pedido
              </dt>
              <dd className="text-ink">
                {pedido ? `#${pedido}` : <span className="text-subtle">—</span>}
              </dd>
            </div>
          </dl>

          <p className="mt-6 pt-6 border-t border-white/5 text-sm text-muted leading-relaxed text-pretty">
            Você também recebeu um email de confirmação com todos esses dados
            + link pro grupo VIP. Não achou o email? Olhe no spam ou nos chame:{" "}
            <a
              href="https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site."
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:text-cyan-light font-medium"
            >
              WhatsApp (35) 99257-1045
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Seção 5 — Reforço de autoridade
--------------------------------------------------------------------------- */
function AuthorityReinforcement() {
  return (
    <section className="py-16 md:py-24 bg-navy-900/40 border-y border-white/5">
      <div className="container-lp max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900/60 border border-white/10">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-cyan/10 blur-3xl"
          />

          <div className="relative grid md:grid-cols-[260px_1fr] gap-0">
            {/* Foto */}
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full min-h-[300px] overflow-hidden md:border-r border-white/10">
              <Image
                src="/paulo-de-tarso.png"
                alt="Psicólogo Paulo de Tarso"
                fill
                sizes="(min-width: 768px) 260px, 100vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-900/30"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <p className="eyebrow mb-3">QUEM CONDUZ A AULA</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-balance">
                Psicólogo Paulo de Tarso
              </h2>

              <p className="text-muted text-base md:text-[17px] leading-relaxed text-pretty mb-7">
                Psicólogo clínico há mais de 20 anos, supervisor de formação e
                diretor acadêmico da Prapsico. Coordenador da Pós-graduação em
                Psicoterapia Anhanguera-Prapsico, com mais de 2.000 alunos
                formados nas trilhas de Certificação e Pós.
              </p>

              <blockquote className="border-l-2 border-cyan pl-5 md:pl-6">
                <Quote
                  aria-hidden
                  className="w-5 h-5 text-cyan/60 mb-2"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p className="font-serif italic text-lg md:text-xl leading-relaxed text-ink text-balance">
                  Tô preparando uma aula completa pra você. No dia 8 a gente se
                  vê &mdash; chega de cabeça aberta e caderno na mão.
                </p>
                <footer className="mt-3 text-xs tracking-[0.18em] uppercase text-subtle">
                  — uma mensagem do Paulo
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Seção 6 — Timeline
--------------------------------------------------------------------------- */
type TimelineItem = { text: string; done?: boolean };
type TimelineStep = {
  label: string;
  title: string;
  items: TimelineItem[];
  highlight?: boolean;
};

const TIMELINE: TimelineStep[] = [
  {
    label: "HOJE",
    title: "Você está aqui",
    items: [
      { text: "Você entrou no grupo VIP", done: true },
      { text: "Recebeu a aula bônus", done: true },
    ],
  },
  {
    label: "PRÓXIMOS 7 DIAS",
    title: "Aquecimento no grupo",
    items: [
      { text: "Conteúdos exclusivos do Paulo" },
      { text: "Cases clínicos comentados" },
      { text: "Material pré-aula" },
    ],
  },
  {
    label: "D-1 · 7 DE JUNHO",
    title: "Véspera",
    items: [
      { text: "Lembrete oficial" },
      { text: "Preparação final" },
    ],
  },
  {
    label: "8 DE JUNHO · 19H",
    title: "Live ao vivo no Zoom",
    items: [
      { text: "Aula completa de 90 minutos" },
      { text: "Q&A aberto no final" },
    ],
    highlight: true,
  },
  {
    label: "PÓS-LIVE",
    title: "Próximos passos",
    items: [
      { text: "Apresentação dos caminhos (Cert e Pós)" },
      { text: "Conversa consultiva (se fizer sentido)" },
    ],
  },
];

function TimelineItemRow({ item }: { item: TimelineItem }) {
  return (
    <li className="flex items-start gap-2">
      {item.done ? (
        <Check
          className="flex-shrink-0 mt-[3px] w-3.5 h-3.5 text-cyan"
          strokeWidth={3}
        />
      ) : (
        <span
          aria-hidden
          className="flex-shrink-0 mt-[7px] w-1 h-1 rounded-full bg-subtle"
        />
      )}
      <span className={item.done ? "text-muted" : ""}>{item.text}</span>
    </li>
  );
}

function TimelineSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-lp max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-3">O QUE ACONTECE DAQUI PRA FRENTE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Sua jornada até a live (e depois dela)
          </h2>
        </div>

        {/* Mobile: vertical */}
        <ol className="md:hidden relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
          {TIMELINE.map((step) => (
            <li key={step.label} className="relative">
              <span
                className={`absolute -left-[26px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  step.highlight
                    ? "bg-cyan border-cyan shadow-[0_0_0_4px_rgba(6,164,212,0.2)]"
                    : "bg-navy-950 border-white/30"
                }`}
              />
              <div
                className={`rounded-xl p-4 border ${
                  step.highlight
                    ? "bg-cyan/5 border-cyan/30"
                    : "bg-navy-900/40 border-white/5"
                }`}
              >
                <p
                  className={`text-[11px] tracking-[0.18em] uppercase font-bold mb-1 ${
                    step.highlight ? "text-cyan" : "text-subtle"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-sm font-bold mb-3 ${
                    step.highlight ? "text-cyan" : "text-ink"
                  }`}
                >
                  {step.title}
                </p>
                <ul className="space-y-1.5 text-sm text-muted">
                  {step.items.map((item) => (
                    <TimelineItemRow key={item.text} item={item} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: horizontal */}
        <ol className="hidden md:grid relative grid-cols-5 gap-3">
          <div
            aria-hidden
            className="absolute top-3 left-0 right-0 h-px bg-white/10"
          />
          {TIMELINE.map((step) => (
            <li key={step.label} className="relative pt-10">
              <span
                className={`absolute top-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 ${
                  step.highlight
                    ? "bg-cyan border-cyan shadow-[0_0_0_5px_rgba(6,164,212,0.2)]"
                    : "bg-navy-950 border-white/30"
                }`}
              />
              <div
                className={`h-full rounded-xl p-4 border text-center ${
                  step.highlight
                    ? "bg-cyan/5 border-cyan/30"
                    : "bg-navy-900/40 border-white/5"
                }`}
              >
                <p
                  className={`text-[10px] tracking-[0.18em] uppercase font-bold mb-2 ${
                    step.highlight ? "text-cyan" : "text-subtle"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-sm font-bold mb-3 text-balance leading-tight ${
                    step.highlight ? "text-cyan" : "text-ink"
                  }`}
                >
                  {step.title}
                </p>
                <ul className="space-y-1.5 text-[13px] text-muted text-left">
                  {step.items.map((item) => (
                    <TimelineItemRow key={item.text} item={item} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Seção 7 — Compartilhamento
--------------------------------------------------------------------------- */
function ShareSection() {
  const shareUrl = "https://prapsico-lps.vercel.app/aula-ao-vivo";
  const shareText =
    "Achei que você ia gostar dessa aula clínica do Psicólogo Paulo de Tarso (Prapsico × Anhanguera) — dia 8 de junho, 19h, ao vivo no Zoom. Vaga é R$ 37.";

  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    `${shareText} ${shareUrl}`
  )}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(
    "Aula clínica ao vivo · Psicólogo Paulo de Tarso"
  )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  return (
    <section className="py-16 md:py-20 border-t border-white/5">
      <div className="container-lp max-w-3xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan/10 text-cyan mb-5">
          <Share2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
          Conhece alguém que precisa dessa aula?
        </h2>
        <p className="text-muted text-base md:text-lg max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
          A live é universal — serve pra quem tem CRP e pra quem ainda não tem.
          Se você acha que alguém vai se beneficiar, manda o link:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md sm:max-w-none mx-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-success hover:bg-success/90 transition text-white px-6 py-3.5 font-semibold text-sm md:text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Compartilhar no WhatsApp
          </a>
          <a
            href={mailUrl}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-white/10 transition text-ink px-6 py-3.5 font-semibold text-sm md:text-base"
          >
            <Mail className="w-5 h-5" />
            Compartilhar por email
          </a>
        </div>

        <p className="mt-6 text-xs text-subtle">
          (Cada pessoa precisa fazer a própria inscrição.)
        </p>
      </div>
    </section>
  );
}
