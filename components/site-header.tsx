"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import { usePathname } from "next/navigation";

import { Brand } from "@/components/brand";
import { navItems } from "@/lib/site-content";

function resolveNavHref(pathname: string, href: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }

  return href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const syncScrolled = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 12);
  });

  useEffect(() => {
    syncScrolled();

    window.addEventListener("scroll", syncScrolled, { passive: true });

    return () => window.removeEventListener("scroll", syncScrolled);
  }, [syncScrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`site-header${isScrolled || pathname !== "/" ? " is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Brand compact />

        <button
          className={`site-header__toggle${isOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <div className={`site-header__panel${isOpen ? " is-open" : ""}`} id="site-navigation">
          <nav className="site-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={resolveNavHref(pathname, item.href)}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="button button--primary button--compact site-header__cta"
            href={pathname === "/" ? "#contato" : "/#contato"}
            onClick={() => setIsOpen(false)}
          >
            Falar com a Contta
          </Link>
        </div>
      </div>
    </header>
  );
}
