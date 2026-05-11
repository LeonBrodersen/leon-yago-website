import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface ChefProps {
  imageSrc?: string;
  imageAlt?: string;
}

const QUOTE_TEXT =
  "Vietnamesisches Kochen ist Balance — süß, salzig, sauer, bitter, scharf, Umami. Bei Sao ehren wir diese fünf Geschmäcker in jeder Schüssel, auf jedem Teller.";

const BIO_PARAGRAPHS = [
  "Linh Tran, die kulinarische Stimme hinter Sao, bringt zwei Jahrzehnte Hingabe an die vietnamesische Küche in jedes Gericht der Karte. Geboren in Hanoi, wuchs Linh in der Küche ihrer Großmutter auf — dort prägten die stundenlang gezogenen Phở-Brühen und die kräuterhellen Salate des Nordens ihren Gaumen.",
  "Ihr Weg führte sie weiter südlich nach Huế, wo sie die kaiserliche Küche studierte, und nach Saigon, wo sie unter einigen der angesehensten Köche des Landes lernte. Bei Sao verwebt sie die drei regionalen Traditionen — bezieht Kräuter und Aromaten wöchentlich frisch und zieht ihre Brühen 24 Stunden, bevor sie je in eine Schüssel kommen.",
];

export function Chef({
  imageSrc,
  imageAlt = "Linh Tran in der Küche",
}: ChefProps = {}) {
  return (
    <section
      id="chef"
      className="scroll-mt-20 bg-bg px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Reveal className="relative aspect-[3/4] overflow-hidden bg-bg-dark md:aspect-auto">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm uppercase tracking-[0.2em] text-ink-muted-on-dark/70">
                  Chef-Portrait
                </p>
              </div>
            )}

            <blockquote className="absolute inset-x-0 bottom-0 bg-bg-darker p-6 md:p-8">
              <Quote
                aria-hidden="true"
                className="mb-3 h-6 w-6 text-accent"
              />
              <p className="font-serif text-base text-ink-on-dark md:text-lg">
                {QUOTE_TEXT}
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-muted-on-dark">
                — Linh Tran
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-6">
            <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
              <span aria-hidden="true">✦</span>
              Gekocht von der besten Köchin
              <span aria-hidden="true">✦</span>
            </p>
            <h2 className="text-h1 text-ink">Linh Tran kennenlernen</h2>
            <div className="space-y-4 text-ink-muted">
              {BIO_PARAGRAPHS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div>
              <a
                href="#menu"
                className="inline-block border border-ink px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-ink transition-colors duration-200 hover:bg-ink hover:text-bg-cream"
              >
                Mehr erfahren
              </a>
            </div>
            <div className="mt-2 grid grid-cols-2 divide-x divide-border border-y border-border">
              <div className="px-4 py-6 text-center">
                <p className="font-serif text-h2 text-ink">20+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                  Jahre Erfahrung
                </p>
              </div>
              <div className="px-4 py-6 text-center">
                <p className="font-serif text-h2 text-ink">15+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                  Auszeichnungen
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
