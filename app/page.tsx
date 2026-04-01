import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import {
  brazilPoints,
  contactBullets,
  deliveryPillars,
  heroMetrics,
  heroProof,
  heroSignals,
  insightExamples,
  sampleDownloadItems,
  sampleHighlights,
  siteConfig,
  trustPoints,
  workflowSteps,
} from "@/lib/site-content";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: "+55 62 99178-0703",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: "+55 62 99178-0703",
        availableLanguage: ["Portuguese"],
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        url: siteConfig.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android, Windows, macOS",
        areaServed: "BR",
        inLanguage: "pt-BR",
        description: siteConfig.description,
      },
    ],
  };

  return (
    <main id="conteudo">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="home-hero">
        <div className="section-shell home-hero__grid">
          <Reveal className="home-hero__copy">
            <span className="eyebrow">Inteligência financeira para PMEs brasileiras</span>
            <p className="home-hero__brand">{siteConfig.name}</p>
            <h1 className="home-hero__title">
              Margem, caixa e contexto fiscal no mesmo quadro de decisão.
            </h1>
            <p className="home-hero__lead">
              Veja onde a margem aperta, quando o caixa vai tensionar e qual risco fiscal merece
              revisão antes do problema crescer.
            </p>

            <div className="home-hero__actions">
              <a className="button button--primary" href="#contato">
                Quero Entender Onde a Margem Aperta
              </a>
              <a
                className="button button--secondary"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>

            <div className="home-hero__subactions">
              <a
                className="text-link"
                href={siteConfig.samplePdfHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Exemplo de Leitura
              </a>
              <p className="home-hero__note">
                IA resume e explica. A responsabilidade legal segue com o contador.
              </p>
            </div>

            <ul className="home-hero__proof" aria-label="Capacidades atuais">
              {heroProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="home-hero__visual" delay={140}>
            <div className="decision-board" aria-labelledby="hero-board-title">
              <div className="decision-board__halo" aria-hidden="true"></div>
              <div className="decision-board__header">
                <span className="section-label">Leitura Inicial</span>
                <p>Três perguntas que a Contta ajuda a responder agora.</p>
              </div>

              <h2 id="hero-board-title" className="sr-only">
                Três perguntas que a Contta ajuda a responder agora
              </h2>

              <div className="decision-board__list">
                {heroSignals.map((signal) => (
                  <article className="decision-signal" key={signal.index}>
                    <span className="decision-signal__index">{signal.index}</span>
                    <div>
                      <h3>{signal.title}</h3>
                      <p>{signal.detail}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="decision-board__metrics">
                {heroMetrics.map((metric) => (
                  <div className="decision-metric" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.detail}</small>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="entregas">
        <div className="section-shell">
          <Reveal className="section-heading">
            <span className="eyebrow">O que a Contta entrega com mais força hoje</span>
            <h2>Três frentes para decidir melhor antes do caixa e da margem apertarem.</h2>
            <p>
              A plataforma é mais forte quando precisa conectar preço, giro e contexto fiscal no
              mesmo raciocínio.
            </p>
          </Reveal>

          <div className="pillar-grid">
            {deliveryPillars.map((pillar, index) => (
              <Reveal className="pillar" delay={index * 80} key={pillar.kicker}>
                <span className="section-label">{pillar.kicker}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <dl className="pillar__details">
                  <div>
                    <dt>Decisão que destrava</dt>
                    <dd>{pillar.action}</dd>
                  </div>
                  <div>
                    <dt>Por que importa</dt>
                    <dd>{pillar.reason}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="amostra">
        <div className="section-shell">
          <Reveal className="section-heading">
            <span className="eyebrow">Amostra de leitura Contta</span>
            <h2>Margem, caixa e fiscal organizados em um material que já aponta a próxima ação.</h2>
            <p>Veja o formato da leitura antes do contato comercial.</p>
          </Reveal>

          <div className="proof-layout">
            <Reveal className="proof-download" delay={40}>
              <span className="section-label">Artefato Tangível</span>
              <h3>Baixe a amostra completa de leitura</h3>
              <p>Resumo executivo, margem, caixa e fiscal em quatro páginas.</p>
              <ul className="proof-download__list">
                {sampleDownloadItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="button button--primary" href={siteConfig.samplePdfHref} download>
                Baixar Amostra de Leitura
              </a>
              <p className="proof-download__meta">PDF ilustrativo do formato de leitura atual da Contta.</p>
            </Reveal>

            <Reveal className="report-sheet" delay={120}>
              <header className="report-sheet__header">
                <div>
                  <span className="section-label">Resumo Executivo</span>
                  <h3>Horizonte de 30 dias</h3>
                </div>
                <span className="report-sheet__badge">PDF</span>
              </header>

              <div className="report-sheet__company">
                <strong>Ateliê Norte Serviços Ltda.</strong>
                <span>Competência: março de 2026</span>
              </div>

              <div className="report-sheet__kpis">
                {heroMetrics.map((metric) => (
                  <article className="report-kpi" key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.detail}</p>
                  </article>
                ))}
              </div>

              <div className="report-sheet__highlights">
                {sampleHighlights.map((highlight) => (
                  <article className="report-highlight" key={highlight.label}>
                    <span>{highlight.label}</span>
                    <p>{highlight.detail}</p>
                  </article>
                ))}
              </div>

              <p className="report-sheet__note">
                Exemplo ilustrativo baseado na estrutura atual de leitura da Contta. Não representa
                tela do produto.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--deep" id="fluxo">
        <div className="section-shell">
          <Reveal className="section-heading section-heading--light">
            <span className="eyebrow eyebrow--light">Como funciona</span>
            <h2>Um fluxo de software para agir antes do problema ganhar escala.</h2>
            <p>A Contta organiza a base, prioriza sinais e ajuda a agir cedo.</p>
          </Reveal>

          <div className="workflow-band">
            {workflowSteps.map((step, index) => (
              <Reveal className="workflow-step" delay={index * 90} key={step.step}>
                <span className="workflow-step__index">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="insights">
        <div className="section-shell">
          <Reveal className="section-heading">
            <span className="eyebrow">Exemplos de sinais</span>
            <h2>Sinais que pedem ação.</h2>
            <p>Três exemplos do tipo de leitura que a Contta destaca para orientar decisão.</p>
          </Reveal>

          <div className="insight-grid">
            {insightExamples.map((item, index) => (
              <Reveal className="insight" delay={index * 80} key={item.kicker}>
                <span className="section-label">{item.kicker}</span>
                <h3>{item.title}</h3>
                <div className="insight__stack">
                  <article className="insight__block">
                    <span>Cenário</span>
                    <p>{item.context}</p>
                  </article>
                  <article className="insight__block insight__block--signal">
                    <span>Sinal Numérico</span>
                    <strong>{item.signal}</strong>
                  </article>
                  <article className="insight__block">
                    <span>Ação Recomendada</span>
                    <p>{item.action}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="brasil">
        <div className="section-shell context-grid">
          <Reveal className="context-panel">
            <span className="eyebrow">Por que isso é diferente no Brasil</span>
            <h2>No Brasil, margem e caixa erram mais fácil quando tributo, prazo e custo são lidos separadamente.</h2>
            <div className="context-points">
              {brazilPoints.map((point) => (
                <article key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.detail}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="context-panel context-panel--solid" delay={120}>
            <span className="eyebrow eyebrow--light">Base operacional</span>
            <h2>Confiança vem de dados protegidos, sync visível e premissas claras.</h2>
            <div className="trust-grid">
              {trustPoints.map((point) => (
                <article key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.detail}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <div className="section-shell contact-grid">
          <Reveal className="contact-panel">
            <span className="eyebrow eyebrow--light">Contato orientado por decisão</span>
            <h2>Envie seu cenário e receba uma leitura inicial de margem, caixa e fiscal.</h2>
            <p>A equipe responde com uma leitura inicial e o próximo passo sugerido.</p>

            <ul className="contact-panel__bullets">
              {contactBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="contact-panel__actions">
              <a
                className="button button--light"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
              <a className="contact-panel__email" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </Reveal>

          <Reveal className="form-panel" delay={140}>
            <span className="section-label">Em menos de 1 minuto</span>
            <h2>Campos rápidos, um retorno claro pelo canal informado.</h2>
            <p>O formulário já entra com validação, feedback e persistência opcional em banco.</p>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
