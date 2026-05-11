import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Shop",
};

export default function Shop() {
  return (
    <>
      <Navigation />
      <main className="pt-24 md:pt-32">
        <section className="px-6 py-12 sm:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Shop
            </p>
            <h1 className="text-h1 text-ink">Demnächst.</h1>
            <p className="mx-auto max-w-prose text-ink-muted">
              Unser Shop ist in Vorbereitung — bald gibt's hier Geschenkgutscheine,
              hauseigene Brühen zum Mitnehmen und mehr.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
