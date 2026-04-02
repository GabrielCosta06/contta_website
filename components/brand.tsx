import Link from "next/link";

import { ConttaLogo } from "@/components/contta-logo";
import { siteConfig } from "@/lib/site-content";

type BrandProps = {
  footer?: boolean;
  compact?: boolean;
};

export function Brand({ footer = false, compact = false }: BrandProps) {
  const detail = footer ? siteConfig.legalName : siteConfig.tagline;

  return (
    <Link
      className={`brand${footer ? " brand--footer" : ""}${compact ? " brand--compact" : ""}`}
      href="/"
      aria-label={`Voltar para a página inicial da ${siteConfig.brandName}`}
    >
      <ConttaLogo className="brand__logo" alt="" loading="eager" />
      {!compact ? (
        <span className="brand__text">
          <span className="brand__eyebrow">{siteConfig.name}</span>
          <small>{detail}</small>
        </span>
      ) : null}
    </Link>
  );
}
