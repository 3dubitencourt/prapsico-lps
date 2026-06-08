export const CHECKOUT_URL = "https://pay.voompcreators.com.br/9348";
export const WHATSAPP_URL =
  "https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site.";
export const PRICE_MONTHLY = 257;
export const PRICE_LABEL = "R$ 257/MÊS";
export const INSTALLMENTS_LABEL = "12x sem juros no cartão";
export const OFFER_ANCHOR = "oferta";

export const PAIN_POINTS = [
  "Tenho o chamado pra ajudar pessoas, mas não tenho diploma de Psicologia",
  "Já fiz cursos de terapia alternativa, mas falta reconhecimento formal",
  "Tenho medo de atender e não saber o que fazer",
  "Quero uma profissão de verdade, não só um certificado de fim de semana",
  "Busco formação séria, mas não posso parar de trabalhar pra estudar",
];

export const FOUR_PILLARS = [
  {
    icon: "GraduationCap",
    title: "Método",
    desc: "Currículo estruturado em 12 meses, com base científica em psicanálise e neurociência aplicada à clínica.",
  },
  {
    icon: "UserCheck",
    title: "Mentoria",
    desc: "Aulas diretas com o Psicólogo Paulo de Tarso e corpo docente especialista em formação clínica.",
  },
  {
    icon: "Handshake",
    title: "Supervisão",
    desc: "Núcleo de Atendimento Social com prática supervisionada por profissionais experientes — você atende com rede.",
  },
  {
    icon: "Award",
    title: "Reconhecimento",
    desc: "Certificação Prapsico em parceria com a Anhanguera, alinhada às diretrizes do MEC.",
  },
] as const;

// TODO: Substituir pela grade real fornecida pela Prapsico
export const CURRICULUM_12 = [
  {
    month: 1,
    title: "Fundamentos da Psicanálise",
    topics: [
      "História e marcos da psicanálise",
      "O inconsciente e a estrutura psíquica",
      "Setting terapêutico básico",
    ],
  },
  {
    month: 2,
    title: "Neurociência Aplicada",
    topics: [
      "Bases neurobiológicas do comportamento",
      "Emoção, memória e trauma",
      "Implicações clínicas",
    ],
  },
  {
    month: 3,
    title: "A Escuta Clínica",
    topics: [
      "Atenção flutuante e neutralidade",
      "Transferência e contratransferência",
      "Primeiras entrevistas e enquadre",
    ],
  },
  {
    month: 4,
    title: "Psicopatologia Geral",
    topics: [
      "Sintoma, signo e estrutura",
      "Quadros clínicos e diagnóstico diferencial",
      "Articulação com a neurociência",
    ],
  },
  {
    month: 5,
    title: "Manejo Clínico do Sofrimento",
    topics: [
      "Ansiedade, depressão e luto",
      "Intervenções clínicas baseadas em evidência",
      "Estudos de caso reais",
    ],
  },
  {
    month: 6,
    title: "Início dos Atendimentos Supervisionados",
    topics: [
      "Entrada no Núcleo de Atendimento Social",
      "Triagem e indicação",
      "Primeiros atendimentos com supervisão",
    ],
  },
  {
    month: 7,
    title: "Vínculo e Aliança Terapêutica",
    topics: [
      "Construção do vínculo clínico",
      "Rupturas e reparos da aliança",
      "Ética profissional na relação",
    ],
  },
  {
    month: 8,
    title: "Clínica Contemporânea",
    topics: [
      "Sofrimentos da contemporaneidade",
      "Casais, famílias e adolescentes",
      "Demandas atuais e adaptações de método",
    ],
  },
  {
    month: 9,
    title: "Identidade Clínica e Estilo",
    topics: [
      "Construindo a sua identidade como terapeuta",
      "Limites do método e do profissional",
      "Como conduzir um processo do início ao fim",
    ],
  },
  {
    month: 10,
    title: "Gestão de Consultório",
    topics: [
      "Honorários, agenda e contratos",
      "Aspectos administrativos da prática",
      "Posicionamento profissional",
    ],
  },
  {
    month: 11,
    title: "Marketing Ético para Terapeutas",
    topics: [
      "Como construir autoridade sem ferir a ética",
      "Conteúdo, presença digital e indicação",
      "Comunicação clínica responsável",
    ],
  },
  {
    month: 12,
    title: "Encerramento e Certificação",
    topics: [
      "Apresentação de caso clínico final",
      "Avaliação supervisionada",
      "Entrega da certificação Prapsico × Anhanguera",
    ],
  },
];

export const JOURNEY_STEPS = [
  {
    label: "Semana 1",
    title: "Acesso à plataforma",
    desc: "Onboarding, boas-vindas e primeiro módulo liberado.",
  },
  {
    label: "Mês 3",
    title: "Primeiras supervisões",
    desc: "Estudos de caso reais com supervisores experientes.",
  },
  {
    label: "Mês 6",
    title: "Início dos atendimentos",
    desc: "Você começa a atender no Núcleo de Atendimento, com rede e supervisão.",
  },
  {
    label: "Mês 9",
    title: "Sua identidade clínica",
    desc: "Construção do estilo próprio + gestão de consultório.",
  },
  {
    label: "Mês 12",
    title: "Conclusão + certificação",
    desc: "Entrega da certificação e suporte pra montar seu consultório.",
  },
];

// Áreas de especialidade do corpo docente — exibidas enquanto os nomes reais não estão liberados.
// TODO: Quando a Prapsico enviar os nomes/fotos reais, trocar este array por FACULTY_PEOPLE com photos.
export const FACULTY_AREAS = [
  {
    icon: "Stethoscope",
    title: "Psicologia Clínica",
    desc: "Psicopatologia contemporânea, diagnóstico diferencial e estudos de caso reais.",
  },
  {
    icon: "Brain",
    title: "Neurociência Aplicada",
    desc: "Bases neurobiológicas do comportamento e clínica baseada em evidências.",
  },
  {
    icon: "Sparkles",
    title: "Psicanálise & Supervisão",
    desc: "Setting clínico, vínculo terapêutico e prática supervisionada.",
  },
] as const;

// TODO: Substituir pelos depoimentos reais (com foto, autorização e link de vídeo)
export const TESTIMONIALS = [
  {
    initials: "MA",
    name: "Marina A.",
    before: "Cuidadora",
    after: "Psicoterapeuta com consultório próprio",
    quote:
      "Eu sempre quis ajudar, mas não tinha como voltar à faculdade. A certificação me deu método e segurança pra atender. Hoje tenho agenda cheia.",
  },
  {
    initials: "RC",
    name: "Rafael C.",
    before: "Coach",
    after: "Psicoterapeuta — atende online e presencial",
    quote:
      "A diferença que a supervisão fez é absurda. Eu saí da formação atendendo de verdade, não improvisando.",
  },
  {
    initials: "JS",
    name: "Juliana S.",
    before: "Pedagoga",
    after: "Psicoterapeuta especializada em adolescentes",
    quote:
      "O método é sério, o corpo docente é presente e o reconhecimento da Anhanguera abriu portas pra mim. Vale cada centavo.",
  },
];

export const BONUSES = [
  {
    icon: "Target",
    title: "Marketing pra Terapeutas",
    desc: "Como construir audiência, autoridade e lotar a agenda usando internet — sem ferir o código de ética.",
  },
  {
    icon: "Scale",
    title: "Aula de Legislação com Advogado",
    desc: "Diretrizes e aspectos legais pra você atuar com segurança jurídica, do contrato à confidencialidade.",
  },
] as const;

export const OFFER_INCLUDES = [
  "Acesso completo à plataforma por 12 meses",
  "Aulas ao vivo + gravadas",
  "Supervisão no Núcleo de Atendimento Social",
  "Bônus: Marketing pra Terapeutas",
  "Bônus: Aula de Legislação",
  "Suporte da equipe acadêmica",
];

export const FAQS = [
  {
    q: "Qual a diferença entre certificação e pós-graduação?",
    a: "A certificação habilita você a atuar como psicoterapeuta com método e supervisão — é o caminho de entrada na profissão. A pós-graduação é uma especialização lato sensu pra quem já é psicólogo formado. Os dois caminhos são reconhecidos e seguem as diretrizes do MEC, mas atendem perfis e estágios diferentes.",
  },
  {
    q: "Quem pode fazer a certificação?",
    a: "Qualquer pessoa com Ensino Médio completo pode se inscrever. Não exigimos graduação em Psicologia — a certificação foi desenhada justamente pra formar psicoterapeutas a partir do zero, com método e supervisão.",
  },
  {
    q: "As aulas são ao vivo ou gravadas?",
    a: "O modelo é híbrido: aulas gravadas em alta qualidade (você assiste no seu ritmo) + encontros ao vivo periódicos com o Paulo e o corpo docente pra tirar dúvidas, estudos de caso e supervisão.",
  },
  {
    q: "Ao concluir a certificação, já posso atuar?",
    a: "Sim. A certificação prepara você pra atuar como psicoterapeuta, com método estruturado, supervisão real durante o curso e o reconhecimento da parceria Prapsico × Anhanguera.",
  },
  {
    q: "Vai ter atendimento prático?",
    a: "Sim. A partir do mês 6, você começa a atender pacientes reais no Núcleo de Atendimento Social, sempre com supervisão de profissionais experientes. Você não sai daqui sem ter atendido.",
  },
  {
    q: "Quais são as opções de pagamento?",
    a: "Você pode parcelar em até 12x sem juros no cartão (R$ 257/mês) ou pagar via boleto. Pagamento seguro processado pela Voomp Creators.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Você tem suporte da equipe acadêmica durante todo o curso — dúvidas técnicas, pedagógicas e clínicas. O canal direto é via plataforma + grupo de alunos no WhatsApp.",
  },
  {
    q: "E se eu nunca tiver atendido ninguém?",
    a: "Melhor ainda. A certificação foi desenhada pra formar do zero. Você começa pelos fundamentos, evolui passo a passo e só atende com supervisão. Ninguém é jogado na clínica sozinho aqui.",
  },
];
