import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/metadata";

const lastModified = new Date("2026-04-01T00:00:00-03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/assinatura", "/privacy", "/terms"].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
