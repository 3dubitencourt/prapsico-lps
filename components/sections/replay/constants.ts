// Live foi 8/jun/2026 19h BRT (22h UTC), 90min. Janela do replay = 7 dias após o fim.
// Fim da live: 8/jun 20:30 BRT (23:30 UTC). Encerra replay: 15/jun 23:30 UTC = 20:30 BRT.
export const REPLAY_DEADLINE_UTC_MS = Date.UTC(2026, 5, 15, 23, 30, 0);

export const WHATSAPP_URL =
  "https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site.";
export const WHATSAPP_DISPLAY = "(35) 99257-1045";

// Deixa vazio até plugar o ID real. Quando string vazia, VimeoPlayer renderiza placeholder.
// Trocar pelo ID real do replay (Vimeo Pro recomendado p/ controle de domínio + capítulos).
export const VIMEO_VIDEO_ID = "";

export const CERT_URL = "/certificacao";
export const POS_URL = "/pos-graduacao";

export type Chapter = { time: number; label: string };

export const CHAPTERS: Chapter[] = [
  { time: 0, label: "Abertura · O cenário clínico atual" },
  { time: 300, label: "O diagnóstico · Por que 85% atende mal" },
  { time: 1500, label: "Os 3 erros + 3 antídotos + demo prática" },
  { time: 3000, label: "Os 3 pilares de uma prática sólida" },
  { time: 3900, label: "Os 2 caminhos formativos" },
  { time: 4500, label: "Q&A aberto" },
];

export const REPLAY_FAQS = [
  {
    q: "O replay vai ficar disponível depois dos 7 dias?",
    a: "Não. Por critério institucional, o replay encerra em exatamente 7 dias após o fim da live.",
  },
  {
    q: "Posso baixar o vídeo?",
    a: "Não. O replay é por streaming. Quem quer guardar a gravação adquiriu como adicional no checkout original.",
  },
  {
    q: "Como me matriculo na Certificação ou na Pós?",
    a: "Clique no caminho que faz sentido pra você (acima) e você é levado pra página de inscrição.",
  },
  {
    q: "Posso conversar com a equipe antes de decidir?",
    a: "Sim. WhatsApp (35) 99257-1045. Sem pressão de venda.",
  },
  {
    q: "As inscrições têm desconto pós-live?",
    a: "Não criamos descontos artificiais pós-live. As condições são as mesmas do site institucional, sempre.",
  },
  {
    q: "Em quanto tempo começo a estudar se me matricular hoje?",
    a: "Acesso à plataforma é liberado em até 24h após a confirmação do pagamento.",
  },
];

export const CHAPTER_SEEK_EVENT = "replay:seek";

export function formatChapterTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function formatDeadlineBR(ms: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(ms));
}
