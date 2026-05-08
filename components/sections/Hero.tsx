import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({ imageSrc, imageAlt = "" }: HeroProps = {}) {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink px-6 sm:px-8 lg:px-12"
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/40"
          />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-soft">
          Berlin-Kreuzberg
        </p>
        <h1 className="max-w-3xl text-display text-bg">
          Südtirol mitten in Kreuzberg.
        </h1>
        <p className="max-w-prose text-bg/80">
          Schnitzel, Knödel, eigenes Bier vom Fass. Seit Jahren Stammlokal für
          die, die wissen, was gut ist.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <a
            href="#reservierung"
            className="inline-flex items-center gap-2 bg-accent px-8 py-4 font-medium tracking-wide text-bg transition-colors duration-200 hover:bg-accent-hover"
          >
            Tisch reservieren
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#speisen"
            className="inline-flex items-center border border-bg px-8 py-4 font-medium tracking-wide text-bg transition-colors duration-200 hover:bg-bg hover:text-ink"
          >
            Speisekarte
          </a>
        </div>
      </div>
    </section>
  );
}
