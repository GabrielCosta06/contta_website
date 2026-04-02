export const siteConfig = {
  brandName: "Contta",
  name: "Contta Business",
  legalName: "Contta Tecnologia Ltda.",
  tagline: "Margem, caixa e contexto fiscal para PMEs brasileiras",
  description:
    "Software de inteligência financeira para PMEs brasileiras que precisam proteger margem, antecipar pressão de caixa e revisar contexto fiscal com mais clareza.",
  url: "https://contta.com.br",
  email: "contato@contta.com.br",
  phoneHref: "tel:+5562991780703",
  phoneDisplay: "(62) 99178-0703",
  whatsappHref:
    "https://wa.me/5562991780703?text=Ol%C3%A1%2C%20quero%20entender%20se%20a%20Contta%20faz%20sentido%20para%20revisar%20margem%2C%20caixa%20e%20risco%20fiscal%20da%20minha%20empresa.",
  logoHref: "/assets/contta-logo.svg",
  logoAlt: "Logo da Contta",
  markHref: "/assets/contta-mark.svg",
  samplePdfHref: "/assets/amostra-leitura-contta.pdf",
  socialCardHref: "/assets/social-card.svg",
  faviconHref: "/assets/favicon.svg",
} as const;

const LEGAL_UPDATED_AT = new Date("2026-03-10T00:00:00-03:00");

export const legalUpdatedLabel = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeZone: "America/Sao_Paulo",
}).format(LEGAL_UPDATED_AT);

export const navItems = [
  { label: "Entregas", href: "#entregas" },
  { label: "Amostra", href: "#amostra" },
  { label: "Método", href: "#fluxo" },
  { label: "Contato", href: "#contato" },
] as const;

export const challengeOptions = [
  { value: "precificacao-e-margem", label: "Precificação e margem" },
  { value: "caixa-e-pendencias", label: "Caixa e pendências" },
  { value: "regime-e-risco-fiscal", label: "Regime, imposto ou Fator R" },
  { value: "quadro-completo", label: "Quero revisar o quadro completo" },
] as const;

export const heroSignals = [
  { index: "01", title: "Preço", detail: "O preço ainda protege margem depois do custo, do desconto e do imposto?" },
  { index: "02", title: "Caixa", detail: "Os próximos 14 dias seguem saudáveis ou já existe uma lacuna de giro?" },
  { index: "03", title: "Fiscal", detail: "A leitura fiscal está segura ou depende de premissas que ainda não foram validadas?" },
] as const;

export const heroProof = [
  "Preço, custo e DRE na mesma leitura",
  "Caixa projetado antes do aperto",
  "Premissas fiscais visíveis",
] as const;

export const heroMetrics = [
  { label: "Margem esperada", value: "8,4%", detail: "abaixo do histórico" },
  { label: "Lacuna em 14 dias", value: "R$ 23 mil", detail: "antes do principal recebível" },
  { label: "Fator R", value: "27,2%", detail: "perto da linha crítica" },
] as const;

export const deliveryPillars = [
  {
    icon: "chart",
    tag: "Margem",
    kicker: "Proteção de margem",
    title: "Preço, custo e DRE no mesmo quadro.",
    description: "A Contta cruza preço, mix, custo, despesa e imposto antes da margem sumir no fim do mês.",
    signal: "Preço mínimo, desconto e mix na mesma leitura.",
    action: "Revisar preço mínimo, desconto, meta ou composição do mix antes de destruir rentabilidade.",
    reason: "O desvio quase sempre nasce em pequenos erros repetidos.",
  },
  {
    icon: "wallet",
    tag: "Caixa",
    kicker: "Clareza de caixa",
    title: "Pressão financeira com antecedência.",
    description: "Pendências, recebíveis e saídas deixam de competir no escuro e passam a formar uma cadência visível.",
    signal: "Lacuna de giro antes do vencimento crítico.",
    action: "Cobrar antes, reordenar pagamentos e segurar gasto não essencial com prazo mais claro.",
    reason: "A quebra acontece no timing, não apenas na receita consolidada.",
  },
  {
    icon: "receipt",
    tag: "Fiscal",
    kicker: "Contexto fiscal Brasil",
    title: "Regime, Fator R e premissas explícitas.",
    description: "O número fiscal deixa de parecer exato quando faltam hipóteses de enquadramento ou composição de folha.",
    signal: "Premissas fiscais visíveis antes da decisão.",
    action: "Revisar premissas com antecedência antes de confiar no fiscal para preço, caixa e margem.",
    reason: "No Brasil, contexto tributário muda leitura operacional.",
  },
] as const;

export const workflowSteps = [
  {
    step: "1",
    icon: "layers",
    eyebrow: "Base única",
    title: "Organizar a base financeira",
    detail: "Receita, custo, despesa, orçamento e fiscal mínimo entram no mesmo sistema de leitura.",
    outcome: "A leitura começa com menos fricção entre áreas e planilhas.",
  },
  {
    step: "2",
    icon: "target",
    eyebrow: "Prioridade real",
    title: "Priorizar sinais de decisão",
    detail: "O software destaca o que pressiona margem, caixa e confiança fiscal agora.",
    outcome: "A equipe enxerga o que muda resultado, não só o que faz barulho.",
  },
  {
    step: "3",
    icon: "flow",
    eyebrow: "Ação prática",
    title: "Agir cedo",
    detail: "Com prioridade clara, o financeiro revisa preço, prazo, gasto ou encaminha a análise ao contador.",
    outcome: "A próxima ação fica mais simples, mais rápida e mais defensável.",
  },
] as const;

export const sampleHighlights = [
  {
    icon: "chart",
    label: "O que revisar agora",
    detail: "Preço mínimo, faixa de desconto e política comercial antes da próxima compra.",
  },
  {
    icon: "wallet",
    label: "Próxima ação financeira",
    detail: "Cobrar antes e reordenar pagamentos até D+11 para reduzir a lacuna.",
  },
  {
    icon: "receipt",
    label: "Premissa explícita",
    detail: "O custo fiscal ainda depende do enquadramento e da folha validada.",
  },
] as const;

export const sampleDownloadItems = [
  {
    icon: "file",
    title: "Resumo executivo",
    detail: "Os 3 sinais prioritários já organizados na primeira página.",
  },
  {
    icon: "chart",
    title: "Leitura de margem",
    detail: "Preço, custo, faixa mínima e ação recomendada no mesmo quadro.",
  },
  {
    icon: "wallet",
    title: "Pressão de caixa",
    detail: "Horizonte de 14 e 30 dias com lacuna prevista e timing visível.",
  },
  {
    icon: "receipt",
    title: "Contexto fiscal",
    detail: "Premissas, risco e encaminhamento ao contador sem zona cinzenta.",
  },
] as const;

export const insightExamples = [
  {
    icon: "chart",
    kicker: "Margem",
    title: "A margem caiu sem o desconto mudar.",
    context: "Preço a R$ 168; custo foi a R$ 114; despesa fixa em R$ 18; imposto em 7,6%.",
    signal: "Margem esperada: 8,4%",
    action: "Rever preço mínimo, desconto e mix antes da próxima compra.",
  },
  {
    icon: "wallet",
    kicker: "Caixa",
    title: "O mês fecha, mas os próximos 14 dias apertam.",
    context: "Saídas de R$ 86 mil; entradas confirmadas de R$ 63 mil nos próximos 14 dias.",
    signal: "Lacuna em 14 dias: R$ 23 mil",
    action: "Cobrar antes, renegociar prazo ou segurar compra não crítica.",
  },
  {
    icon: "receipt",
    kicker: "Fiscal",
    title: "A premissa fiscal ainda muda o número.",
    context: "Folha em 27,2% da receita; pró-labore e mix ainda afetam o Fator R.",
    signal: "Confiança fiscal: moderada",
    action: "Revisar enquadramento antes de usar o fiscal no preço.",
  },
] as const;

export const brazilPoints = [
  {
    icon: "shield",
    tag: "Tributo",
    title: "Tributação em movimento",
    detail: "Regime, anexos e Fator R mudam o custo real com facilidade.",
  },
  {
    icon: "flow",
    tag: "Prazo",
    title: "Giro desalinhado",
    detail: "Comprar em 30 dias e receber em 31 já pressiona a semana financeira.",
  },
  {
    icon: "layers",
    tag: "Custo",
    title: "Custo escondido",
    detail: "Despesa mal alocada faz o preço parecer saudável quando não está.",
  },
  {
    icon: "radar",
    tag: "Confiança",
    title: "Precisão ilusória",
    detail: "Premissas ocultas passam segurança demais para um número ainda incompleto.",
  },
] as const;

export const trustPoints = [
  {
    icon: "offline",
    title: "Offline-first",
    detail: "A operação continua funcionando mesmo com conexão instável.",
  },
  {
    icon: "lock",
    title: "Dados protegidos",
    detail: "Informação sensível fica em armazenamento local protegido.",
  },
  {
    icon: "sync",
    title: "Sync visível",
    detail: "Você enxerga o que sincronizou, falhou ou ficou pendente.",
  },
  {
    icon: "spark",
    title: "Premissas explícitas",
    detail: "Quando falta dado, a hipótese aparece com clareza na leitura.",
  },
  {
    icon: "boundary",
    title: "Limite contábil claro",
    detail: "Ajuda a rotina financeira sem invadir o papel do contador.",
  },
] as const;

export const contactBullets = [
  {
    icon: "chart",
    text: "Custo subiu e o preço ficou no automático.",
  },
  {
    icon: "wallet",
    text: "Caixa aperta antes dos recebíveis entrarem.",
  },
  {
    icon: "receipt",
    text: "Regime, Fator R ou premissas fiscais ainda geram dúvida.",
  },
] as const;
