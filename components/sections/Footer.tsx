import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const FOOTER_NAV: ReadonlyArray<{
  label: string;
  href: string;
}> = [
  { label: "Über uns", href: "/#chef" },
  { label: "Reservierung", href: "/#reservation" },
  { label: "Speisekarte", href: "/#menu" },
  { label: "Auszeichnungen", href: "/#awards" },
  { label: "Shop", href: "/shop" },
  { label: "News", href: "/news" },
];

const CONTACT_LINKS: ReadonlyArray<{
  icon: typeof MapPin;
  label: string;
  href: string;
}> = [
  { icon: MapPin, label: "Standort", href: "#" },
  { icon: Mail, label: "Email an Sao", href: "mailto:hallo@sao-restaurant.com" },
  { icon: Phone, label: "Telefon", href: "tel:+493012345678" },
];

export function Footer() {
  return (
    <footer className="bg-bg px-6 py-12 sm:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            <Link href="/" className="block font-serif text-xl text-ink">
              <span aria-hidden="true">✦ </span>Sao
            </Link>
            <address className="text-sm not-italic text-ink-muted">
              797 Renner Land
              <br />
              Lake Kylesburg 27395
            </address>
            <ul className="flex items-center gap-4">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="block text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer-Navigation"
            className="md:flex md:items-start md:justify-end"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:max-w-md md:justify-end">
              {FOOTER_NAV.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Sao Restaurant. Alle Rechte vorbehalten.</p>
          <ul className="flex gap-4">
            <li>
              <Link
                href="/impressum"
                className="transition-colors duration-200 hover:text-ink"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="transition-colors duration-200 hover:text-ink"
              >
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
