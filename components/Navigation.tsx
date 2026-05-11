"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, UtensilsCrossed, CalendarDays } from "lucide-react";

const NAV_LINKS = [
  { label: "Über uns", href: "#chef", anchor: true },
  { label: "Speisekarte", href: "#menu", anchor: true },
  { label: "Kontakt", href: "#reservation", anchor: true },
  { label: "Reservierung", href: "#reservation", anchor: true },
  { label: "Shop", href: "/shop", anchor: false },
  { label: "News", href: "/news", anchor: false },
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

  const resolveHref = (link: (typeof NAV_LINKS)[number]) =>
    link.anchor ? `${linkPrefix}${link.href}` : link.href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        overHero ? "bg-transparent" : "border-b border-border bg-bg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href={`${linkPrefix}#menu`}
            aria-label="Zur Speisekarte"
            className={`transition-colors duration-200 ${
              overHero
                ? "text-ink-on-dark hover:text-bg-cream"
                : "text-ink hover:text-accent"
            }`}
          >
            <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href={`${linkPrefix}#reservation`}
            aria-label="Reservierung"
            className={`transition-colors duration-200 ${
              overHero
                ? "text-ink-on-dark hover:text-bg-cream"
                : "text-ink hover:text-accent"
            }`}
          >
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <Link
          href="/"
          className={`font-serif text-lg transition-colors duration-200 sm:text-xl ${
            overHero ? "text-ink-on-dark" : "text-ink"
          }`}
        >
          <span aria-hidden="true">✦ </span>Sao
        </Link>

        <Link
          href={`${linkPrefix}#reservation`}
          className={`hidden px-6 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors duration-200 md:inline-block ${
            overHero
              ? "bg-bg-cream text-ink hover:bg-bg"
              : "bg-ink text-bg-cream hover:bg-ink-muted"
          }`}
        >
          Reservieren
        </Link>

        <button
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(true)}
          className={`transition-colors duration-200 md:hidden ${
            overHero ? "text-ink-on-dark" : "text-ink"
          }`}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div
        className={`hidden border-t md:block ${
          overHero ? "border-ink-on-dark/20" : "border-border"
        }`}
      >
        <nav
          aria-label="Sekundäre Navigation"
          className="mx-auto max-w-7xl px-6 py-3 sm:px-8 lg:px-12"
        >
          <ul className="flex items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolveHref(link)}
                  className={`text-xs uppercase tracking-wider transition-colors duration-200 ${
                    overHero
                      ? "text-ink-on-dark/90 hover:text-ink-on-dark"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
          className="fixed inset-0 z-50 bg-bg md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 sm:px-8">
            <span className="font-serif text-lg text-ink">
              <span aria-hidden="true">✦ </span>Sao
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
              <li key={link.label}>
                <Link
                  href={resolveHref(link)}
                  onClick={() => setMobileOpen(false)}
                  className="block font-serif text-h2 text-ink transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href={`${linkPrefix}#reservation`}
                onClick={() => setMobileOpen(false)}
                className="inline-block bg-ink px-10 py-4 text-xs font-medium uppercase tracking-wide text-bg-cream transition-colors duration-200 hover:bg-ink-muted"
              >
                Reservieren
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
