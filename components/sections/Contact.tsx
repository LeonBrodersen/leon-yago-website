import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Fichtestra%C3%9Fe+1%2C+10967+Berlin";

export function Contact() {
  return (
    <section
      id="reservierung"
      className="scroll-mt-20 bg-bg-alt px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl space-y-4 md:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Kontakt
          </p>
          <h2 className="text-h1 text-ink">Reservierung & Anfahrt.</h2>
        </div>

        <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-3 lg:gap-6">
          <a
            href="tel:+493069566909"
            className="group block border border-border bg-bg p-8 transition-colors duration-200 hover:bg-accent"
          >
            <Phone
              aria-hidden="true"
              className="mb-4 h-6 w-6 text-accent transition-colors group-hover:text-bg"
            />
            <p className="text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-bg/80">
              Telefonisch
            </p>
            <p className="mt-2 font-serif text-h2 text-ink transition-colors group-hover:text-bg">
              030 / 69 56 69 09
            </p>
            <p className="mt-3 text-sm text-ink-muted transition-colors group-hover:text-bg/80">
              Tisch reservieren oder Tageskarte erfragen.
            </p>
          </a>

          <a
            href="mailto:hannes@wirtshaus-zum-mitterhofer.com"
            className="group block border border-border bg-bg p-8 transition-colors duration-200 hover:bg-accent"
          >
            <Mail
              aria-hidden="true"
              className="mb-4 h-6 w-6 text-accent transition-colors group-hover:text-bg"
            />
            <p className="text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-bg/80">
              Per Email
            </p>
            <p className="mt-2 break-all font-serif text-xl text-ink transition-colors group-hover:text-bg">
              hannes@wirtshaus-zum-mitterhofer.com
            </p>
            <p className="mt-3 text-sm text-ink-muted transition-colors group-hover:text-bg/80">
              Wir antworten meistens am gleichen Tag.
            </p>
          </a>

          <div className="border border-border bg-bg p-8">
            <MapPin
              aria-hidden="true"
              className="mb-4 h-6 w-6 text-accent"
            />
            <p className="text-sm uppercase tracking-[0.2em] text-ink-muted">
              Vorbeischauen
            </p>
            <p className="mt-2 font-serif text-xl text-ink">
              Fichtestraße 1<br />
              10967 Berlin
            </p>
            <p className="mt-3 text-sm text-ink-muted">Wir freuen uns.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Adresse in Google Maps öffnen — externer Link"
            className="group relative flex aspect-[4/3] items-center justify-center border border-border bg-bg transition-colors duration-200 hover:bg-bg-alt"
          >
            <div className="text-center">
              <MapPin
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-accent"
              />
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-ink">
                Berlin-Kreuzberg
              </p>
            </div>
            <ExternalLink
              aria-hidden="true"
              className="absolute right-4 top-4 h-4 w-4 text-ink-muted transition-colors group-hover:text-accent"
            />
          </a>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-h2 text-ink">Öffnungszeiten</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-ink-muted">
                <dt>Mo – Fr</dt>
                <dd>16:00 – 24:00 Uhr</dd>
                <dt>Sa, So, Feiertage</dt>
                <dd>17:00 – 24:00 Uhr</dd>
              </dl>
            </div>
            <div>
              <h3 className="mb-4 text-h2 text-ink">Anfahrt</h3>
              <p className="text-ink-muted">
                <span className="font-medium text-ink">U7 Südstern</span> — 4
                Min Fußweg
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
