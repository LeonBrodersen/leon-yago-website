"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Speisen", href: "#speisen" },
  { label: "Bier", href: "#bier" },
  { label: "Über uns", href: "#story" },
  { label: "Kontakt", href: "#reservierung" },
] as const;

const SCROLL_THRESHOLD = 64;

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const linkPrefix = isHome ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const overHero = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        overHero
          ? "bg-transparent"
          : "bg-bg border-b border-border"
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12"
      >
        <a
          href="/"
          className={`font-serif text-base transition-colors duration-200 sm:text-lg ${
            overHero ? "text-bg" : "text-ink"
          }`}
        >
          Wirtshaus zum Mitterhofer
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={`${linkPrefix}${link.href}`}
                className={`text-sm transition-colors duration-200 ${
                  overHero
                    ? "text-bg/90 hover:text-bg"
                    : "text-ink hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`${linkPrefix}#reservierung`}
          className="hidden bg-accent px-6 py-3 text-sm font-medium tracking-wide text-bg transition-colors duration-200 hover:bg-accent-hover md:inline-flex md:items-center"
        >
          Reservieren
        </a>

        <button
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(true)}
          className={`md:hidden transition-colors duration-200 ${
            overHero ? "text-bg" : "text-ink"
          }`}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
          className="fixed inset-0 z-50 bg-bg md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 sm:px-8">
            <span className="font-serif text-base text-ink sm:text-lg">
              Wirtshaus zum Mitterhofer
            </span>
            <button
              type="button"
              aria-label="Menü schließen"
              onClick={() => setMobileOpen(false)}
              className="text-ink"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-col gap-6 px-6 py-12 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={`${linkPrefix}${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="block font-serif text-h2 text-ink transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={`${linkPrefix}#reservierung`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center bg-accent px-8 py-4 font-medium tracking-wide text-bg transition-colors duration-200 hover:bg-accent-hover"
              >
                Reservieren
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
