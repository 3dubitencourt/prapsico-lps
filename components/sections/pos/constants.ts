export const CHECKOUT_URL = "https://pay.voompcreators.com.br/7861";
export const WHATSAPP_URL =
  "https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site.";
export const PRICE_MONTHLY = 427;
export const PRICE_LABEL = "R$ 427/MÊS";
export const TOTAL_PRICE_LABEL = "R$ 5.124";
export const HOUR_COST_LABEL = "~R$ 14";
export const INSTALLMENTS_LABEL = "12x sem juros no cartão";
export const OFFER_ANCHOR = "oferta-pos";

export const PAIN_POINTS_POS = [
  "Saí da graduação sem saber por onde começar a atender",
  "Já fiz cursos rápidos de abordagens, mas falta integração teórica",
  "Quero base científica, não modismo nem misticismo embalado de psicologia",
  "Procuro uma pós que entregue conteúdo — não só certificado",
  "Quero abordagem baseada em evidências pra aplicar no consultório",
];

export const COMPARISON_ROWS = [
  {
    label: "Abordagem",
    commom: "Generalista, ecletismo sem profundidade",
    ours: "Foco em Psicologia Positiva + Neurociência Afetiva",
  },
  {
    label: "Corpo docente",
    commom: "Especialistas e mestres",
    ours: "Doutores e mestres com produção científica na área",
  },
  {
    label: "Conteúdo",
    commom: "Repetição da graduação",
    ours: "Aprofundamento clínico + base em evidências",
  },
  {
    label: "Aplicação prática",
    commom: "Estudos de caso teóricos",
    ours: "Demos clínicas + supervisão real",
  },
  {
    label: "Reconhecimento",
    commom: "Variável",
    ours: "MEC + parceria Anhanguera",
  },
] as const;

// TODO: Substituir pela grade real fornecida pela Prapsico
// Total: 30+30+40+30+40+30+40+30+40+50 = 360h
export const CURRICULUM_POS = [
  {
    n: 1,
    title: "Fundamentos da Psicologia Positiva",
    hours: 30,
    topics: [
      "Bases teóricas e científicas",
      "Modelo PERMA e florescimento humano",
      "Pesquisas seminais da área",
    ],
  },
  {
    n: 2,
    title: "Neurociência Afetiva Aplicada",
    hours: 30,
    topics: [
      "Bases neurobiológicas da emoção",
      "Sistemas afetivos e regulação",
      "Implicações clínicas",
    ],
  },
  {
    n: 3,
    title: "Intervenções Baseadas em Evidências",
    hours: 40,
    topics: [
      "Protocolos validados em Psi Positiva",
      "Aplicação clínica e adaptação cultural",
      "Mensuração de resultados",
    ],
  },
  {
    n: 4,
    title: "Modelo PERMA · Florescimento Aplicado",
    hours: 30,
    topics: [
      "Emoções positivas, engajamento e relações",
      "Significado e realização",
      "Plano clínico individualizado",
    ],
  },
  {
    n: 5,
    title: "Emoções e Regulação Afetiva",
    hours: 40,
    topics: [
      "Mapeamento emocional na clínica",
      "Disregulação afetiva e estratégias terapêuticas",
      "Neurobiologia da regulação",
    ],
  },
  {
    n: 6,
    title: "Relacionamentos, Significado e Propósito",
    hours: 30,
    topics: [
      "Vínculo e capital social terapêutico",
      "Construção de sentido e logoterapia contemporânea",
      "Aplicação em casais e grupos",
    ],
  },
  {
    n: 7,
    title: "Mindfulness e Autocompaixão na Clínica",
    hours: 40,
    topics: [
      "MBSR, MBCT e protocolos integrados",
      "Autocompaixão (Neff/Gilbert) na prática",
      "Demos clínicas supervisionadas",
    ],
  },
  {
    n: 8,
    title: "Psi Positiva em Contextos Clínicos",
    hours: 30,
    topics: [
      "Depressão, ansiedade e trauma",
      "Adolescentes, adultos e idosos",
      "Indicação e contraindicação",
    ],
  },
  {
    n: 9,
    title: "Pesquisa Aplicada e Análise Crítica de Evidências",
    hours: 40,
    topics: [
      "Leitura de papers e meta-análises",
      "Métodos de pesquisa em Psi Positiva",
      "Como integrar evidência à decisão clínica",
    ],
  },
  {
    n: 10,
    title: "TCC + Estudos de Caso Clínicos",
    hours: 50,
    topics: [
      "Estruturação do trabalho de conclusão",
      "Estudo de caso aprofundado com supervisão",
      "Defesa e entrega da certificação Anhanguera",
    ],
  },
];

export const JOURNEY_STEPS_POS = [
  {
    label: "Matrícula",
    title: "Acesso à plataforma",
    desc: "Onboarding institucional + boas-vindas + primeiro módulo liberado.",
  },
  {
    label: "Mês 1–4",
    title: "Fundamentos teóricos",
    desc: "Psicologia Positiva + Neurociência Afetiva com aulas ao vivo e gravadas.",
  },
  {
    label: "Mês 5–8",
    title: "Intervenções e supervisão",
    desc: "Protocolos baseados em evidências + demos clínicas supervisionadas.",
  },
  {
    label: "Mês 9–11",
    title: "Aprofundamento clínico",
    desc: "Estudos de caso aplicados e integração entre módulos.",
  },
  {
    label: "Mês 12",
    title: "TCC + Certificação",
    desc: "Trabalho de conclusão acompanhado e entrega da certificação Anhanguera.",
  },
];

// Áreas de especialidade do corpo docente — exibidas enquanto a Prapsico
// não envia nomes/fotos reais. Mesma estratégia da FACULTY_AREAS da Cert.
export const FACULTY_POS = [
  {
    initials: "PP",
    title: "Doutorado",
    name: "Psicologia Positiva Aplicada",
    specialty: "Doutores com produção científica na área",
    research: "Florescimento humano e bem-estar subjetivo",
    institution: "Corpo docente · Anhanguera-Prapsico",
  },
  {
    initials: "NA",
    title: "Doutorado",
    name: "Neurociência Afetiva",
    specialty: "Doutores em neurociência clínica",
    research: "Regulação emocional e neurobiologia clínica",
    institution: "Corpo docente · Anhanguera-Prapsico",
  },
  {
    initials: "IBE",
    title: "Mestrado",
    name: "Intervenções Baseadas em Evidências",
    specialty: "Mestres em pesquisa clínica aplicada",
    research: "Protocolos validados de Psicologia Positiva",
    institution: "Corpo docente · Anhanguera-Prapsico",
  },
  {
    initials: "MA",
    title: "Mestrado",
    name: "Mindfulness e Autocompaixão",
    specialty: "Mestres em práticas contemplativas clínicas",
    research: "MBCT aplicado a depressão recorrente",
    institution: "Corpo docente · Anhanguera-Prapsico",
  },
];

// TODO: Substituir pelos depoimentos reais (com foto/CRP/autorização)
export const TESTIMONIALS_POS = [
  {
    initials: "MV",
    name: "Mariana V.",
    crp: "CRP 06/123.456",
    role: "Psicóloga clínica · Belo Horizonte/MG",
    quote:
      "Eu tinha feito duas pós antes — esta foi a primeira que entregou base científica, não só certificado. Mudou completamente como eu fundamento minhas intervenções no consultório.",
    isVideo: false,
  },
  {
    initials: "RT",
    name: "Rodrigo T.",
    crp: "CRP 04/098.765",
    role: "Psicólogo clínico · São Paulo/SP",
    quote:
      "A diferença está nos doutores que ministram. Vi pesquisa atualizada, leitura crítica de papers e protocolos validados — não modismo. Foi onde minha clínica deu um salto técnico.",
    isVideo: false,
  },
  {
    initials: "LC",
    name: "Larissa C.",
    crp: "CRP 07/045.321",
    role: "Psicóloga clínica · Porto Alegre/RS",
    quote:
      "Procurava profundidade e supervisão real. A grade entrega isso — e o módulo de pesquisa aplicada me deixou apta a fundamentar caso por caso com evidência.",
    isVideo: false,
  },
  {
    initials: "FS",
    name: "Felipe S.",
    crp: "CRP 12/078.901",
    role: "Psicólogo clínico · Curitiba/PR",
    quote:
      "Vale o investimento. Pós lato sensu da Anhanguera, corpo docente com produção científica e supervisão clínica — comparável a programas presenciais privados com flexibilidade EAD.",
    isVideo: false,
  },
];

export const BONUSES_POS = [
  {
    icon: "Target",
    title: "Marketing pra Psicólogos",
    desc: "Construção de autoridade clínica online com ética profissional (CFP). Posicionamento, conteúdo e comunicação responsável.",
  },
  {
    icon: "Scale",
    title: "Aula de Legislação Clínica com Advogado",
    desc: "Aspectos legais do exercício profissional, contratos, prontuário e confidencialidade — segurança jurídica do consultório.",
  },
] as const;

export const OFFER_INCLUDES_POS = [
  "Plataforma + aulas ao vivo + gravadas",
  "Supervisão e estudos de caso",
  "Trabalho de conclusão acompanhado",
  "Certificação Anhanguera reconhecida pelo MEC",
  "Bônus: Marketing pra Psicólogos",
  "Bônus: Aula de Legislação Clínica",
  "Suporte acadêmico durante todo o curso",
];

export const FAQS_POS = [
  {
    q: "Qual a diferença pra outras pós em Psicologia Positiva?",
    a: "Três pontos: corpo docente com doutores e mestres com produção científica na área (não generalistas), grade que prioriza profundidade clínica e pesquisa aplicada (não repetição da graduação) e parceria institucional com a Anhanguera reconhecida pelo MEC. Você sai com base em evidências, não com colagem de cursos rápidos.",
  },
  {
    q: "Preciso comprovar graduação em Psicologia?",
    a: "Sim. Por ser pós-graduação lato sensu, exigimos cópia do diploma de graduação em Psicologia antes da matrícula. Esse é o critério que diferencia uma pós formal de um curso livre.",
  },
  {
    q: "A certificação serve pra concurso público, mestrado ou doutorado?",
    a: "A pós lato sensu Anhanguera reconhecida pelo MEC é aceita em concursos públicos que exigem especialização e como pré-requisito de titulação em editais. Para ingresso em mestrado/doutorado (stricto sensu), o critério principal é o currículo acadêmico — a especialização agrega, mas o ingresso depende do processo seletivo de cada programa.",
  },
  {
    q: "Como funciona a supervisão e a aplicação prática?",
    a: "Você terá demos clínicas conduzidas pelo corpo docente, estudos de caso aplicados e supervisão real ao longo do curso (especialmente nos módulos 5 a 10). Não é estágio supervisionado da graduação — é prática clínica integrada à pós.",
  },
  {
    q: "As aulas são ao vivo ou gravadas?",
    a: "Modelo híbrido: aulas gravadas em alta qualidade que você assiste no seu ritmo + encontros ao vivo periódicos com o corpo docente para discussão de casos, supervisão e tira-dúvidas.",
  },
  {
    q: "Quem é o corpo docente?",
    a: "Doutores e mestres com produção científica em Psicologia Positiva, Neurociência Afetiva e clínica baseada em evidências, todos vinculados ao programa Anhanguera-Prapsico. A coordenação acadêmica é do Psicólogo Paulo de Tarso, coordenador da pós Anhanguera-Prapsico.",
  },
  {
    q: "E se eu já fiz outra pós?",
    a: "Sem problema. A maioria dos alunos chega aqui justamente porque outra pós não entregou a profundidade que buscavam. Não há sobreposição de conteúdo — o foco é Psicologia Positiva + Neurociência Afetiva, com aprofundamento que a maioria dos programas generalistas não cobre.",
  },
  {
    q: "Quais são as opções de pagamento?",
    a: "Você pode parcelar em até 12x sem juros no cartão (R$ 427/mês) ou pagar via boleto. Pagamento seguro processado pela Voomp Creators.",
  },
  {
    q: "Existe TCC?",
    a: "Sim. O módulo 10 (50h) é dedicado ao trabalho de conclusão na forma de estudo de caso clínico aprofundado, com supervisão e defesa. É o que credencia a certificação institucional Anhanguera.",
  },
  {
    q: "Como recebo a certificação Anhanguera?",
    a: "Após cumprir 360h de carga horária, frequência mínima nos encontros ao vivo e aprovação no TCC, a certificação lato sensu é emitida pela Anhanguera com o reconhecimento institucional do MEC. O processo de emissão é todo conduzido pela equipe acadêmica.",
  },
];
