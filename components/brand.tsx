import Link from "next/link";

import { siteConfig } from "@/lib/site-content";

type BrandProps = {
  footer?: boolean;
  compact?: boolean;
};

export function Brand({ footer = false, compact = false }: BrandProps) {
  return (
    <Link
      className={`brand${footer ? " brand--footer" : ""}${compact ? " brand--compact" : ""}`}
      href="/"
      aria-label="Voltar para o início da Contta Business"
    >
      <span className="brand__mark" aria-hidden="true">
        C
      </span>
      <span className="brand__text">
        <strong>{siteConfig.name}</strong>
        {!compact ? (
          <small>
            {footer ? siteConfig.legalName : "Margem, caixa e contexto fiscal para PMEs brasileiras"}
          </small>
        ) : null}
      </span>
    </Link>
  );
}
