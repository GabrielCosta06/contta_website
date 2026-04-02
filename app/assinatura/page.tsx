import type { Metadata } from "next";
import Link from "next/link";

import { ConttaLogo } from "@/components/contta-logo";
import { FeatureIcon } from "@/components/feature-icon";
import { Reveal } from "@/components/reveal";
import { absoluteUrl } from "@/lib/metadata";
import {
  siteConfig,
  subscriptionFaqs,
  subscriptionIncludes,
  subscriptionJourney,
  subscriptionPlans,
  subscriptionProof,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Assinatura",
  description:
    "Conheça a assinatura Contta Business para rotina recorrente de margem, caixa e contexto fiscal em PMEs brasileiras.",
  alternates: {
    canonical: absoluteUrl("/assinatura"),
  },
};

export default function SubscriptionPage() {
  return (
    <main className="subscription-main" id="conteudo">
      <section className="subscription-hero">
        <div className="section-shell subscription-hero__grid">
          <Reveal className="subscription-hero__copy">
            <span className="eyebrow eyebrow--light">Assinatura Contta Business</span>

            <div className="subscription-hero__brand">
              <ConttaLogo className="subscription-hero__logo" alt={siteConfig.logoAlt} />
              <span className="subscription-hero__badge">Business</span>
            </div>

            <h1 className="subscription-hero__title">
              Uma assinatura para transformar margem, caixa e contexto fiscal em rotina de decisão.
            </h1>

            <p className="subscription-hero__lead">
              A proposta comercial é ajustada ao ritmo, ao porte e à profundidade que a sua
              operação realmente precisa. Sem tabela engessada, sem excesso de escopo e sem deixar
              o time decidir no escuro.
            </p>

            <div className="subscription-hero__actions">
              <a
                className="button button--light"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero Receber uma Proposta
              </a>
              <Link className="button button--secondary" href="/#amostra">
                Ver Exemplo de Leitura
              </Link>
            </div>

            <p className="subscription-hero__note">
              O valor e a cadência são apresentados após um diagnóstico rápido da empresa.
            </p>

            <ul className="subscription-hero__proof" aria-label="Características da assinatura">
              {subscriptionProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="subscription-board" delay={120}>
            <div className="subscription-board__halo" aria-hidden="true"></div>

            <header className="subscription-board__header">
              <span className="section-label section-label--light">Estrutura comercial</span>
              <h2>Diagnóstico, implantação e cadência no mesmo desenho.</h2>
              <p>
                A assinatura nasce para sustentar leitura recorrente, não para entregar um pacote
                desconectado da operação.
              </p>
            </header>

            <div className="subscription-board__stack">
              {subscriptionJourney.map((step) => (
                <article className="subscription-board__step" key={step.step}>
                  <div className="subscription-board__step-head">
                    <span className="workflow-step__index">{step.step}</span>
                    <div className="workflow-story__icon">
                      <FeatureIcon name={step.icon} />
                    </div>
                  </div>

                  <div className="subscription-board__step-copy">
                    <span>{step.eyebrow}</span>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <article className="subscription-board__summary">
              <span>Modelo comercial</span>
              <strong>Escopo ajustado ao porte, à cadência e ao grau de decisão que a empresa precisa ganhar.</strong>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="section-shell">
          <Reveal className="section-heading">
            <span className="eyebrow">O que entra na assinatura</span>
            <h2>Um desenho comercial que protege margem, antecipa caixa e explicita contexto fiscal.</h2>
            <p>
              A assinatura é construída para que a empresa ganhe leitura recorrente com utilidade
              prática no comercial e no financeiro.
            </p>
          </Reveal>

          <div className="capability-grid">
            {subscriptionIncludes.map((item, index) => (
              <Reveal className="capability-card" delay={index * 80} key={item.title}>
                <div className="capability-card__head">
                  <div className="capability-card__icon">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <div className="capability-card__labels">
                    <span className="section-label">{item.kicker}</span>
                    <span className="capability-card__tag">{item.tag}</span>
                  </div>
                </div>

                <div className="capability-card__copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <article className="capability-card__signal">
                  <span>Sinal que fica visível</span>
                  <strong>{item.signal}</strong>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section subscription-plans-section">
        <div className="section-shell">
          <Reveal className="section-heading subscription-plans-section__heading">
            <span className="eyebrow">Desenhos de assinatura</span>
            <h2>Três formatos para orientar a conversa comercial sem prender a proposta em uma tabela rígida.</h2>
            <p>
              Os exemplos abaixo mostram a lógica da assinatura. O fechamento final considera porte,
              cadência, profundidade da leitura e complexidade operacional.
            </p>
          </Reveal>

          <Reveal className="subscription-plans-note" delay={40}>
            <strong>Sem preço fixo de vitrine.</strong>
            <p>
              A Contta prefere fechar a assinatura com mais aderência do que vender um plano bonito
              e pouco útil depois do onboarding.
            </p>
          </Reveal>

          <div className="subscription-plan-grid">
            {subscriptionPlans.map((plan, index) => (
              <Reveal
                className={`subscription-plan${plan.featured ? " subscription-plan--featured" : ""}`}
                delay={index * 90}
                key={plan.name}
              >
                <div className="subscription-plan__eyebrow">
                  <span>{plan.kicker}</span>
                  <span>{plan.cadence}</span>
                </div>

                <div className="subscription-plan__title">
                  <h3>{plan.name}</h3>
                  {plan.featured ? <span>Mais aderente</span> : null}
                </div>

                <p className="subscription-plan__fit">{plan.fit}</p>
                <p className="subscription-plan__highlight">{plan.highlight}</p>

                <ul className="subscription-plan__list">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <a
                  className={`button ${plan.featured ? "button--light" : "button--secondary"}`}
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quero Entender Este Desenho
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--deep">
        <div className="section-shell">
          <Reveal className="section-heading section-heading--light">
            <span className="eyebrow eyebrow--light">Como a assinatura entra na rotina</span>
            <h2>O ganho aparece quando a leitura vira ritmo de decisão.</h2>
            <p>
              A assinatura funciona melhor quando o time comercial e financeiro passa a agir com
              mais clareza e menos ruído entre áreas.
            </p>
          </Reveal>

          <div className="workflow-track">
            {subscriptionJourney.map((step, index) => (
              <Reveal className="workflow-story" delay={index * 90} key={step.title}>
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

      <section className="section">
        <div className="section-shell">
          <Reveal className="section-heading">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2>Ajuste comercial com limite claro de escopo e responsabilidade.</h2>
            <p>
              A assinatura nasce para apoiar a rotina financeira da PME com mais contexto, sem
              confundir leitura operacional com parecer legal ou contábil.
            </p>
          </Reveal>

          <div className="subscription-faq-grid">
            {subscriptionFaqs.map((item, index) => (
              <Reveal className="subscription-faq" delay={index * 70} key={item.title}>
                <div className="subscription-faq__head">
                  <div className="subscription-faq__icon">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <div>
                    <span>{item.kicker}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>{item.answer}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="subscription-cta" delay={140}>
            <div className="subscription-cta__copy">
              <span className="section-label">Próximo passo</span>
              <h2>Receba uma proposta pensada para o momento real da sua operação.</h2>
              <p>
                Se a sua empresa precisa ganhar mais clareza de margem, caixa ou contexto fiscal,
                a conversa inicial já ajuda a definir o escopo certo.
              </p>
            </div>

            <div className="subscription-cta__actions">
              <a
                className="button button--primary"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Contta
              </a>
              <Link className="button button--secondary" href="/#contato">
                Ir para o Formulário
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
