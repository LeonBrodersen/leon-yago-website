import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function Impressum() {
  return (
    <>
      <Navigation />
      <main className="pt-24 md:pt-32">
        <section className="px-6 py-12 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-4xl space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Rechtliches
            </p>
            <h1 className="text-h1 text-ink">Impressum</h1>
            <p className="text-ink-muted">
              Diese Seite ist Teil eines Konzept-Redesigns und nicht produktiv
              im Einsatz. Die rechtspflichtigen Angaben werden vom Betreiber
              ergänzt.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
