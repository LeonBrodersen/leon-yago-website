"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Über uns", href: "#chef", anchor: true },
  { label: "Speisekarte", href: "#menu", anchor: true },
  { label: "Kontakt", href: "#reservation", anchor: true },
  { label: "Reservierung", href: "#reservation", anchor: true },
  { label: "Shop", href: "/shop", anchor: false },
  { label: "News", href: "/news", anchor: false },
] as const;

const PHONE_HREF = "tel:+493012345678";
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="hidden flex-1 md:block" />

        <Link
          href="/"
          className={`font-serif text-lg transition-colors duration-200 sm:text-xl ${
            overHero ? "text-ink-on-dark" : "text-ink"
          }`}
        >
          <span aria-hidden="true">✦ </span>Sao
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-2 md:flex lg:gap-3">
          <a
            href={PHONE_HREF}
            className={`inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors duration-200 ${
              overHero
                ? "border-ink-on-dark/40 text-ink-on-dark hover:bg-bg-cream hover:text-ink"
                : "border-ink text-ink hover:bg-ink hover:text-bg-cream"
            }`}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Anrufen
          </a>
          <Link
            href={`${linkPrefix}#reservation`}
            className={`inline-block px-5 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors duration-200 ${
              overHero
                ? "bg-bg-cream text-ink hover:bg-bg"
                : "bg-ink text-bg-cream hover:bg-ink-muted"
            }`}
          >
            Reservieren
          </Link>
        </div>

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
            <li className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href={PHONE_HREF}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 border border-ink px-8 py-4 text-xs font-medium uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-ink hover:text-bg-cream"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Anrufen
              </a>
              <Link
                href={`${linkPrefix}#reservation`}
                onClick={() => setMobileOpen(false)}
                className="inline-block bg-ink px-10 py-4 text-center text-xs font-medium uppercase tracking-wide text-bg-cream transition-colors duration-200 hover:bg-ink-muted"
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
