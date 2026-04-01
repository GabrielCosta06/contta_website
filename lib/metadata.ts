import { siteConfig } from "@/lib/site-content";

export function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return candidate?.replace(/\/$/, "") || siteConfig.url;
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

