import Link from "next/link";

import { Brand } from "@/components/brand";
import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <div className="site-footer__brand">
          <Brand footer />
          <p className="site-footer__copy">{siteConfig.description}</p>
        </div>

        <div className="site-footer__links">
          <Link href="/assinatura">Assinatura</Link>
          <Link href="/privacy">Política de Privacidade</Link>
          <Link href="/terms">Termos de Uso</Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </div>
      </div>
    </footer>
  );
}
