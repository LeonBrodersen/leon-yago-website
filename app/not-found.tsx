import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="pt-24 md:pt-32">
        <section className="px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              404
            </p>
            <h1 className="text-h1 text-ink">Diese Seite gibt's hier nicht.</h1>
            <p className="mx-auto max-w-prose text-ink-muted">
              Tippfehler, oder die Seite ist noch nicht da. Zurück zur
              Startseite — dort wartet eine 24-Stunden-Brühe und die Speisekarte.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-ink px-10 py-4 text-sm font-medium uppercase tracking-wide text-bg-cream transition-colors duration-200 hover:bg-ink-muted"
              >
                Zurück zu Sao
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
