import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "News",
};

export default function News() {
  return (
    <>
      <Navigation />
      <main className="pt-24 md:pt-32">
        <section className="px-6 py-12 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              News
            </p>
            <h1 className="text-h1 text-ink">Demnächst.</h1>
            <p className="mx-auto max-w-prose text-ink-muted">
              Hier kommen bald Neuigkeiten: saisonale Karten-Wechsel, Chef-Events,
              Presseberichte. Schauen Sie wieder rein.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
