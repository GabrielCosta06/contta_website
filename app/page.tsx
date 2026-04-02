import { ConttaLogo } from "@/components/contta-logo";
import { FeatureIcon } from "@/components/feature-icon";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { absoluteUrl } from "@/lib/metadata";
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
        logo: absoluteUrl(siteConfig.logoHref),
        image: absoluteUrl(siteConfig.socialCardHref),
        email: siteConfig.email,
        telephone: "+55 19 99836-8671",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: "+55 19 99836-8671",
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
        image: absoluteUrl(siteConfig.socialCardHref),
        brand: {
          "@type": "Brand",
          name: siteConfig.brandName,
          logo: absoluteUrl(siteConfig.logoHref),
        },
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
            <div className="home-hero__brand">
              <ConttaLogo
                className="home-hero__logo"
                alt={siteConfig.logoAlt}
                loading="eager"
              />
              <span className="home-hero__brand-badge">{siteConfig.name}</span>
            </div>
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

          <div className="capability-grid">
            {deliveryPillars.map((pillar, index) => (
              <Reveal className="capability-card" delay={index * 80} key={pillar.kicker}>
                <div className="capability-card__head">
                  <div className="capability-card__icon">
                    <FeatureIcon name={pillar.icon} />
                  </div>
                  <div className="capability-card__labels">
                    <span className="section-label">{pillar.kicker}</span>
                    <span className="capability-card__tag">{pillar.tag}</span>
                  </div>
                </div>

                <div className="capability-card__copy">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>

                <article className="capability-card__signal">
                  <span>Sinal que aparece</span>
                  <strong>{pillar.signal}</strong>
                </article>

                <dl className="capability-card__meta">
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
              <div className="proof-download__stack">
                {sampleDownloadItems.map((item) => (
                  <article className="proof-download-item" key={item.title}>
                    <div className="proof-download-item__icon">
                      <FeatureIcon name={item.icon} />
                    </div>
                    <div className="proof-download-item__body">
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
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
                    <div className="report-highlight__head">
                      <div className="report-highlight__icon">
                        <FeatureIcon name={highlight.icon} />
                      </div>
                      <span>{highlight.label}</span>
                    </div>
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

          <div className="workflow-track">
            {workflowSteps.map((step, index) => (
              <Reveal className="workflow-story" delay={index * 90} key={step.step}>
                <div className="workflow-story__head">
                  <span className="workflow-step__index">{step.step}</span>
                  <div className="workflow-story__icon">
                    <FeatureIcon name={step.icon} />
                  </div>
                </div>

                <div className="workflow-story__copy">
                  <span className="workflow-story__eyebrow">{step.eyebrow}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>

                <article className="workflow-story__outcome">
                  <span>Resultado</span>
                  <p>{step.outcome}</p>
                </article>
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

          <div className="signal-gallery">
            {insightExamples.map((item, index) => (
              <Reveal className="signal-card" delay={index * 80} key={item.kicker}>
                <div className="signal-card__header">
                  <div className="signal-card__icon">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <div className="signal-card__intro">
                    <span className="section-label">{item.kicker}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>

                <article className="signal-card__metric">
                  <span>Sinal numérico</span>
                  <strong>{item.signal}</strong>
                </article>

                <div className="signal-card__stack">
                  <article className="signal-card__body">
                    <span>Cenário</span>
                    <p>{item.context}</p>
                  </article>
                  <article className="signal-card__body">
                    <span>Ação recomendada</span>
                    <p>{item.action}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft context-section" id="brasil">
        <div className="section-shell">
          <Reveal className="section-heading context-section__heading">
            <span className="eyebrow">Por que isso é diferente no Brasil</span>
            <h2>Sem contexto Brasil, margem e caixa parecem saudáveis até o problema aparecer.</h2>
            <p>
              A Contta organiza tributo, prazo, custo e premissas em uma leitura mais fácil de
              escanear e mais rápida de agir.
            </p>
          </Reveal>

          <div className="context-showcase">
            <Reveal className="showcase-card showcase-card--market">
              <div className="showcase-card__intro">
                <span className="section-label">Atritos do mercado</span>
                <h3>Quatro pontos que distorcem a leitura financeira.</h3>
                <p>O risco raramente vem de um número isolado. Ele nasce do contexto escondido.</p>
              </div>

              <div className="showcase-chip-row" aria-label="Principais fatores">
                {brazilPoints.map((point) => (
                  <span className="showcase-chip" key={point.tag}>
                    {point.tag}
                  </span>
                ))}
              </div>

              <div className="showcase-list">
                {brazilPoints.map((point) => (
                  <article className="showcase-item showcase-item--market" key={point.title}>
                    <div className="showcase-item__icon">
                      <FeatureIcon name={point.icon} />
                    </div>
                    <div className="showcase-item__body">
                      <span className="showcase-item__tag">{point.tag}</span>
                      <h4>{point.title}</h4>
                      <p>{point.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="showcase-card showcase-card--platform" delay={120}>
              <div className="showcase-card__intro showcase-card__intro--light">
                <span className="section-label section-label--light">Leitura confiável</span>
                <h3>O que a plataforma deixa visível para a decisão ficar mais segura.</h3>
                <p>Mais leitura operacional, menos suposição escondida no processo.</p>
              </div>

              <div className="showcase-list showcase-list--platform">
                {trustPoints.map((point) => (
                  <article className="showcase-item showcase-item--platform" key={point.title}>
                    <div className="showcase-item__icon showcase-item__icon--light">
                      <FeatureIcon name={point.icon} />
                    </div>
                    <div className="showcase-item__body">
                      <h4>{point.title}</h4>
                      <p>{point.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <div className="section-shell contact-grid">
          <Reveal className="contact-panel">
            <span className="eyebrow eyebrow--light">Contato orientado por decisão</span>
            <h2>Envie seu cenário e receba uma leitura inicial de margem, caixa e fiscal.</h2>
            <p>A equipe responde com uma leitura inicial e o próximo passo sugerido.</p>

            <ul className="contact-signal-list">
              {contactBullets.map((item) => (
                <li className="contact-signal" key={item.text}>
                  <div className="contact-signal__icon">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <div className="contact-signal__body">
                    <p>{item.text}</p>
                  </div>
                </li>
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
