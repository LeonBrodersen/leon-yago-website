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
            <h1 className="text-h1 text-ink">Die Seite gibt's hier nicht.</h1>
            <p className="mx-auto max-w-prose text-ink-muted">
              Tippfehler, oder die Seite ist noch nicht da. Geh zurück zur
              Startseite — da gibt's Schnitzel und Bier vom Fass.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-accent px-8 py-4 font-medium tracking-wide text-bg transition-colors duration-200 hover:bg-accent-hover"
              >
                Zurück zur Startseite
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
