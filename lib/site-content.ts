export const siteConfig = {
  name: "Contta Business",
  legalName: "Contta Tecnologia Ltda.",
  description:
    "Software de inteligência financeira para PMEs brasileiras que precisam proteger margem, antecipar pressão de caixa e revisar contexto fiscal com mais clareza.",
  url: "https://contta.com.br",
  email: "contato@contta.com.br",
  phoneHref: "tel:+5562991780703",
  phoneDisplay: "(62) 99178-0703",
  whatsappHref:
    "https://wa.me/5562991780703?text=Ol%C3%A1%2C%20quero%20entender%20se%20a%20Contta%20faz%20sentido%20para%20revisar%20margem%2C%20caixa%20e%20risco%20fiscal%20da%20minha%20empresa.",
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
    kicker: "Proteção de margem",
    title: "Preço, custo e DRE no mesmo quadro.",
    description: "A Contta cruza preço, mix, custo, despesa e imposto antes da margem sumir no fim do mês.",
    action: "Revisar preço mínimo, desconto, meta ou composição do mix antes de destruir rentabilidade.",
    reason: "O desvio quase sempre nasce em pequenos erros repetidos.",
  },
  {
    kicker: "Clareza de caixa",
    title: "Pressão financeira com antecedência.",
    description: "Pendências, recebíveis e saídas deixam de competir no escuro e passam a formar uma cadência visível.",
    action: "Cobrar antes, reordenar pagamentos e segurar gasto não essencial com prazo mais claro.",
    reason: "A quebra acontece no timing, não apenas na receita consolidada.",
  },
  {
    kicker: "Contexto fiscal Brasil",
    title: "Regime, Fator R e premissas explícitas.",
    description: "O número fiscal deixa de parecer exato quando faltam hipóteses de enquadramento ou composição de folha.",
    action: "Revisar premissas com antecedência antes de confiar no fiscal para preço, caixa e margem.",
    reason: "No Brasil, contexto tributário muda leitura operacional.",
  },
] as const;

export const workflowSteps = [
  {
    step: "1",
    title: "Organizar a base financeira",
    detail: "Receita, custo, despesa, orçamento e fiscal mínimo entram no mesmo sistema de leitura.",
  },
  {
    step: "2",
    title: "Priorizar sinais de decisão",
    detail: "O software destaca o que pressiona margem, caixa e confiança fiscal agora.",
  },
  {
    step: "3",
    title: "Agir cedo",
    detail: "Com prioridade clara, o financeiro revisa preço, prazo, gasto ou encaminha a análise ao contador.",
  },
] as const;

export const sampleHighlights = [
  {
    label: "O que revisar agora",
    detail: "Preço mínimo, faixa de desconto e política comercial antes da próxima compra.",
  },
  {
    label: "Próxima ação financeira",
    detail: "Cobrar antes e reordenar pagamentos até D+11 para reduzir a lacuna.",
  },
  {
    label: "Premissa explícita",
    detail: "O custo fiscal ainda depende do enquadramento e da folha validada.",
  },
] as const;

export const sampleDownloadItems = [
  "Resumo executivo com os 3 sinais prioritários.",
  "Leitura de margem com preço, custo, faixa mínima e ação recomendada.",
  "Pressão de caixa em 14 e 30 dias com lacuna prevista.",
  "Contexto fiscal com premissas, risco e encaminhamento ao contador.",
] as const;

export const insightExamples = [
  {
    kicker: "Margem",
    title: "A margem caiu sem o desconto mudar.",
    context: "Preço a R$ 168; custo foi a R$ 114; despesa fixa em R$ 18; imposto em 7,6%.",
    signal: "Margem esperada: 8,4%",
    action: "Rever preço mínimo, desconto e mix antes da próxima compra.",
  },
  {
    kicker: "Caixa",
    title: "O mês fecha, mas os próximos 14 dias apertam.",
    context: "Saídas de R$ 86 mil; entradas confirmadas de R$ 63 mil nos próximos 14 dias.",
    signal: "Lacuna em 14 dias: R$ 23 mil",
    action: "Cobrar antes, renegociar prazo ou segurar compra não crítica.",
  },
  {
    kicker: "Fiscal",
    title: "A premissa fiscal ainda muda o número.",
    context: "Folha em 27,2% da receita; pró-labore e mix ainda afetam o Fator R.",
    signal: "Confiança fiscal: moderada",
    action: "Revisar enquadramento antes de usar o fiscal no preço.",
  },
] as const;

export const brazilPoints = [
  {
    title: "Complexidade tributária",
    detail: "Regime, anexos, Fator R e obrigações mudam a leitura do custo real.",
  },
  {
    title: "Capital de giro desalinhado",
    detail: "Comprar em 30 dias e receber em 31 ainda pode quebrar a semana financeira.",
  },
  {
    title: "Estrutura de custo pouco visível",
    detail: "Despesa fixa mal alocada faz preço parecer melhor do que realmente é.",
  },
  {
    title: "Falsa confiança",
    detail: "Número incompleto parece exato quando faltam premissas e revisão operacional.",
  },
] as const;

export const trustPoints = [
  { title: "Offline-first", detail: "A operação não depende de conexão o tempo inteiro." },
  { title: "Dados locais criptografados", detail: "Informação sensível fica em armazenamento local protegido." },
  { title: "Visibilidade de sync", detail: "Você vê o que sincronizou, falhou ou está pendente." },
  { title: "Premissas explícitas", detail: "Quando falta dado, a hipótese aparece na leitura." },
  { title: "Limite contábil claro", detail: "Apoia a rotina financeira, mas não substitui o contador." },
] as const;

export const contactBullets = [
  "Custo subiu e o preço ficou no automático.",
  "Caixa aperta antes dos recebíveis entrarem.",
  "Regime, Fator R ou premissas fiscais ainda geram dúvida.",
] as const;
