import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, getSiteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Contta | Business para margem, caixa e decisão fiscal com contexto Brasil",
    template: "%s | Contta",
  },
  description: siteConfig.description,
  keywords: [
    "inteligência financeira PMEs",
    "proteção de margem",
    "fluxo de caixa",
    "precificação",
    "DRE",
    "Fator R",
    "risco fiscal",
    "Contta",
    "Contta Business",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  icons: {
    icon: [{ url: siteConfig.faviconHref, type: "image/svg+xml" }],
    shortcut: [siteConfig.faviconHref],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: absoluteUrl("/"),
    siteName: siteConfig.brandName,
    title: "Contta | Business para margem, caixa e decisão fiscal com contexto Brasil",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.socialCardHref),
        width: 1200,
        height: 630,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contta | Business para margem, caixa e decisão fiscal com contexto Brasil",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.socialCardHref)],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fbff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo principal
        </a>
        <SiteHeader />
        <div className="page-root">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
