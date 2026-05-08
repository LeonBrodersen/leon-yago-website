import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 text-bg sm:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div className="space-y-3">
            <p className="font-serif text-xl text-bg">
              Wirtshaus zum Mitterhofer
            </p>
            <p className="text-sm text-bg/70">
              Südtirol mitten in Kreuzberg. Seit Jahren.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-bg/60">
              Kontakt
            </p>
            <address className="space-y-2 text-sm not-italic text-bg/80">
              <p>
                Fichtestraße 1
                <br />
                10967 Berlin
              </p>
              <p>
                <a
                  href="tel:+493069566909"
                  className="transition-colors hover:text-bg"
                >
                  030 / 69 56 69 09
                </a>
              </p>
              <p>
                <a
                  href="mailto:hannes@wirtshaus-zum-mitterhofer.com"
                  className="break-all transition-colors hover:text-bg"
                >
                  hannes@wirtshaus-zum-mitterhofer.com
                </a>
              </p>
            </address>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-bg/60">
              Rechtliches
            </p>
            <ul className="space-y-2 text-sm text-bg/80">
              <li>
                <Link
                  href="/impressum"
                  className="transition-colors hover:text-bg"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="transition-colors hover:text-bg"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-bg/20 pt-6 text-xs text-bg/50">
          Konzept-Redesign — nicht produktiv im Einsatz.
        </div>
      </div>
    </footer>
  );
}
