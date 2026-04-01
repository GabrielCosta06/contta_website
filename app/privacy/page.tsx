import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl } from "@/lib/metadata";
import { legalUpdatedLabel, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Contta trata os dados enviados pelo site e pelo formulário comercial.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <main className="legal-main" id="conteudo">
      <div className="section-shell">
        <article className="legal-shell">
          <span className="eyebrow">Política de Privacidade</span>
          <h1>Como a Contta trata os dados enviados pelo site.</h1>
          <p className="legal-meta">Última atualização: {legalUpdatedLabel}.</p>

          <section className="legal-section">
            <h2>1. Dados coletados</h2>
            <p>
              Coletamos apenas as informações enviadas voluntariamente no formulário de contato:
              nome, empresa, principal desafio, canal preferido, WhatsApp ou e-mail e o aceite do
              contato comercial.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Finalidade do uso</h2>
            <p>
              Os dados são usados para retorno comercial, avaliação inicial de aderência ao produto
              e continuidade da conversa pelos canais escolhidos pela Contta e pelo titular.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Compartilhamento</h2>
            <p>
              A Contta não vende os dados enviados pelo site. O compartilhamento, quando
              necessário, fica restrito a fornecedores operacionais envolvidos no atendimento
              comercial e na infraestrutura do site.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Base legal e consentimento</h2>
            <p>
              O envio do formulário depende de consentimento explícito do usuário para contato
              comercial. Esse consentimento pode ser revogado a qualquer momento mediante
              solicitação pelos canais oficiais da empresa.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Retenção e segurança</h2>
            <p>
              Os dados são mantidos pelo tempo necessário ao atendimento e às obrigações legais
              aplicáveis. A Contta adota medidas razoáveis de segurança compatíveis com a natureza
              das informações recebidas.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Direitos do titular</h2>
            <p>Você pode solicitar confirmação, correção, exclusão ou esclarecimentos sobre os seus dados.</p>
            <ul className="legal-list">
              <li>Solicitar acesso ao conteúdo enviado.</li>
              <li>Corrigir informações desatualizadas ou incorretas.</li>
              <li>Revogar o consentimento e pedir exclusão quando aplicável.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>7. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, fale com a
              Contta pelo e-mail <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou
              pelo telefone <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
            </p>
          </section>

          <div className="legal-actions">
            <Link className="button button--primary" href="/#contato">
              Voltar para Contato
            </Link>
            <Link className="button button--secondary" href="/terms">
              Ler Termos de Uso
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

