import { siteConfig } from "@/lib/site-content";

type ConttaLogoProps = {
  className?: string;
  alt?: string;
  kind?: "full" | "mark";
  loading?: "eager" | "lazy";
};

const logoDimensions = {
  full: { width: 340, height: 113 },
  mark: { width: 88, height: 108 },
} as const;

export function ConttaLogo({
  className,
  alt = "",
  kind = "full",
  loading = "lazy",
}: ConttaLogoProps) {
  const dimensions = logoDimensions[kind];

  return (
    <img
      className={className}
      src={kind === "mark" ? siteConfig.markHref : siteConfig.logoHref}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      loading={loading}
      decoding="async"
    />
  );
}
