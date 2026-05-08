import Image from "next/image";

interface BeerProps {
  imageSrc?: string;
  imageAlt?: string;
}

const BEERS: ReadonlyArray<{
  name: string;
  badge?: string;
  subtitle: string;
  description: string;
}> = [
  {
    name: "Mitterhofer Helles",
    badge: "NEU",
    subtitle: "Helles Lager · 5,1 % Vol. · vom Fass",
    description:
      "Unser jüngstes Bier. Hell, klar, mit feiner Hopfenbittere – genau richtig zum Schnitzel.",
  },
  {
    name: "Mitterhofer Keller Bier",
    subtitle: "Naturtrüb · ungefiltert · 5,4 % Vol.",
    description:
      "Unser ungefilterter Klassiker. Malzig, mit Charakter, naturtrüb. Hauptbier hinter der Theke.",
  },
  {
    name: "Bier der Woche",
    subtitle: "Wechselnde Spezialität · vom kleinen Brauer",
    description:
      "Jede Woche ein anderes. Letzte Woche ein Räucherbier aus Bamberg. Was es heute gibt – fragen Sie Hannes.",
  },
];

export function Beer({ imageSrc, imageAlt = "" }: BeerProps = {}) {
  const onImage = Boolean(imageSrc);

  return (
    <section
      id="bier"
      className="relative scroll-mt-20 overflow-hidden px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl space-y-4 md:mb-16">
          <p
            className={`text-sm uppercase tracking-[0.2em] ${
              onImage ? "text-accent-soft" : "text-accent"
            }`}
          >
            Bier
          </p>
          <h2 className={`text-h1 ${onImage ? "text-bg" : "text-ink"}`}>
            Eigenes Bier. Vom Fass.
          </h2>
          <p className={onImage ? "text-bg/80" : "text-ink-muted"}>
            Drei Biere stehen immer auf der Karte. Zwei davon brauen wir selbst.
            Das dritte wechselt jede Woche.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {BEERS.map((beer) => (
            <article
              key={beer.name}
              className={`border border-border p-8 transition-colors duration-200 ${
                onImage
                  ? "bg-bg hover:bg-bg-alt"
                  : "bg-bg-alt hover:bg-bg"
              }`}
            >
              {beer.badge && (
                <span className="mb-4 inline-block border border-accent px-2 py-1 text-xs uppercase tracking-[0.2em] text-accent">
                  {beer.badge}
                </span>
              )}
              <h3 className="text-xl text-ink">{beer.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{beer.subtitle}</p>
              <p className="mt-4 text-ink-muted">{beer.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
