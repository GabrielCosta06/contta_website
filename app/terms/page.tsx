import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl } from "@/lib/metadata";
import { legalUpdatedLabel, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Regras básicas para uso do site da Contta e dos canais comerciais.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <main className="legal-main" id="conteudo">
      <div className="section-shell">
        <article className="legal-shell">
          <span className="eyebrow">Termos de Uso</span>
          <h1>Regras básicas para uso do site da Contta.</h1>
          <p className="legal-meta">Última atualização: {legalUpdatedLabel}.</p>

          <section className="legal-section">
            <h2>1. Objetivo do site</h2>
            <p>
              O site apresenta a Contta Business, seus canais de contato e a proposta atual do
              produto para margem, caixa e decisão fiscal de PMEs brasileiras.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Informações apresentadas</h2>
            <p>
              O conteúdo tem caráter informativo e comercial. Ele não substitui análise contábil,
              fiscal, jurídica ou financeira individualizada.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Uso do formulário e canais de contato</h2>
            <p>
              Ao usar o formulário ou os canais de contato, o visitante declara que fornecerá
              informações verdadeiras e que tem autorização para compartilhar dados da empresa
              quando aplicável.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Propriedade intelectual</h2>
            <p>
              Textos, elementos visuais, marcas e materiais publicados neste site pertencem à
              Contta ou a seus licenciantes e não podem ser reproduzidos sem autorização.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Limitação de responsabilidade</h2>
            <p>
              A Contta envida esforços para manter o site atualizado, mas não garante
              disponibilidade contínua, ausência de erros ou adequação do conteúdo a todos os
              contextos de negócio.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Atualizações</h2>
            <p>
              Estes termos podem ser ajustados para refletir mudanças no site, no atendimento
              comercial ou nas exigências legais aplicáveis.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Contato</h2>
            <p>
              Dúvidas sobre estes termos podem ser enviadas para{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </section>

          <div className="legal-actions">
            <Link className="button button--primary" href="/">
              Voltar para a Página Inicial
            </Link>
            <Link className="button button--secondary" href="/privacy">
              Ler Política de Privacidade
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

