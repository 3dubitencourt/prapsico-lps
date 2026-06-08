/* =========================================================================
 *  COMUNIDADE PSICOAPLIQUE — CONFIGURAÇÃO
 *  (Eduardo: estes são os campos pra trocar antes de subir. Mexa só aqui.)
 * ========================================================================= */

// WhatsApp do time COMERCIAL — só números, com DDI 55. Ex: "5535999999999"
// É pra onde o botão do pop-up de revelação leva o lead.
// TODO: preencher com o número real do comercial.
export const NUMERO_COMERCIAL = "5535000000000"; // TODO

// Mensagem já escrita que o lead manda ao clicar em "Resgatar no WhatsApp".
export const MENSAGEM_WHATSAPP =
  "Oi! Preenchi o formulário e quero resgatar meu desconto de R$ 100 e meu presente na Comunidade Psicoaplique!";

// Nome do bônus (se um dia trocar o mini-curso, muda só aqui).
export const BONUS_NOME = "Como dizer não sem culpa em 3 passos";

// Endpoint que GRAVA o lead (Apps Script / Make / Zapier).
// IMPORTANTE: por segurança e pra evitar erro de CORS, o lead é enviado
// pela rota interna /api/leads/comunidade-psicoaplique, e essa rota repassa
// pro webhook abaixo. Configure o valor real na variável de ambiente
// CRM_WEBHOOK_URL (arquivo .env / painel da Vercel) — NÃO precisa colar a
// URL aqui. Veja: app/api/leads/comunidade-psicoaplique/route.ts
// TODO: definir CRM_WEBHOOK_URL no .env / Vercel.

// Link/CTA do checkout: NÃO vai no front. O comercial envia manualmente
// pelo WhatsApp depois da conversa.
// TODO (comercial): nenhum botão de checkout na página — apenas WhatsApp.

/* -------------------------------------------------------------------------
 *  CONTEÚDO DA PÁGINA (copy aprovada — pode ajustar à vontade)
 * ------------------------------------------------------------------------- */

export const HERO = {
  badge: "Comunidade Psicoaplique",
  headline:
    "Chega de carregar o peso do mundo sozinho(a). Existe um caminho seguro pra sair do modo sobrevivência.",
  subheadline:
    "Conheça o ecossistema de saúde mental que ajuda você a curar feridas emocionais e retomar o controle da sua vida — todos os dias, com apoio real.",
  cta: "DESBLOQUEAR MEU PRESENTE EXCLUSIVO",
};

export const AGITACAO = {
  titulo: "Você sente que está só sobrevivendo, não vivendo?",
  corpo: [
    'O cansaço que o sono não cura. A ansiedade que aperta o peito do nada. A culpa toda vez que tenta dizer "não". A sensação de estar sempre no limite, segurando tudo pra não desabar.',
  ],
};

export const SOLUCAO = {
  titulo: "A Comunidade Psicoaplique é o seu porto seguro.",
  corpo:
    "Cura não acontece no isolamento. Aqui a psicologia encontra a prática diária num ambiente contínuo de suporte. Não é só conteúdo — é uma rede de apoio que caminha com você.",
};

export const ENTREGAVEIS = {
  titulo: "O que você vai encontrar no nosso ecossistema:",
  cards: [
    "Encontros ao vivo focados em dores reais",
    "Ferramentas práticas pra crises de ansiedade",
    "Acervo de aulas direto ao ponto",
    "Espaço de troca seguro e sem julgamentos",
  ],
};

export const IDENTIFICACAO = {
  titulo: "A Comunidade é exatamente pra você que:",
  itens: [
    'Quer parar de ter o "dedo podre" nas relações',
    'Precisa aprender a dizer "não" sem sentir culpa',
    "Sofre com a síndrome da boazinha ou do salvador",
    "Quer construir uma base emocional sólida",
  ],
};

export const AUTORIDADE = {
  titulo: "Quem vai guiar a sua jornada?",
  corpo:
    "Dr. Paulo de Tarso atende na trincheira do consultório há anos, ajudando centenas de pessoas reais a destravarem a própria mente e reconstruírem uma base emocional sólida. Sua abordagem une rigor clínico e prática diária — sem jargão, sem promessa milagrosa, com transformação de verdade.",
  // TODO: inserir credenciais/registro profissional reais do Dr. Paulo aqui.
  credenciais: "TODO: registro profissional / formação do Dr. Paulo de Tarso",
};

export const PROVA_SOCIAL = {
  titulo: "Quem já saiu do modo sobrevivência:",
  // TODO: substituir pelos prints reais anonimizados (imagens em /public)
  // e por 2–3 vídeos curtos de membros (embeds).
};

export const FINAL = {
  titulo: "Dê o primeiro passo pela sua saúde mental hoje.",
  cta: "DESBLOQUEAR MEU PRESENTE EXCLUSIVO",
};

export const POPUP = {
  titulo: "Parabéns! Seu presente foi desbloqueado",
  subtitulo: `Você acaba de ganhar R$ 100 de desconto na assinatura da Comunidade Psicoaplique + o mini-curso [BÔNUS] "${BONUS_NOME}".`,
  urgencia:
    "Atenção: esse benefício não vai por e-mail. Só é liberado pra quem resgatar agora com o nosso time.",
  cta: "RESGATAR DESCONTO NO WHATSAPP",
};

/** Monta o link do WhatsApp do pop-up de revelação. */
export function buildWhatsAppUrl(): string {
  return `https://wa.me/${NUMERO_COMERCIAL}?text=${encodeURIComponent(
    MENSAGEM_WHATSAPP,
  )}`;
}
