import Image from "next/image";

interface StoryProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function Story({ imageSrc, imageAlt = "" }: StoryProps = {}) {
  return (
    <section
      id="story"
      className="scroll-mt-20 px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="relative aspect-[4/5] w-full border border-border bg-bg-alt">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Über uns
          </p>
          <h2 className="text-h1 text-ink">
            Hannes Mitterhofer hat sein Wirtshaus dort eröffnet, wo niemand ein
            Wirtshaus erwarten würde: in Berlin-Kreuzberg.
          </h2>
          <div className="space-y-4 text-ink-muted">
            <p>
              Was als kleines Lokal begann, ist heute Stammlokal für die
              Nachbarschaft – und Pflichtstation für alle, die wissen wollen,
              wie alpenländische Küche schmeckt, wenn sie wirklich ernst
              genommen wird. Knödel in allen Variationen. Schmorgerichte mit
              Zeit. Ein Wiener Schnitzel, das die Konkurrenz alt aussehen lässt.
            </p>
            <p>
              Hannes steht selbst hinter der Theke. Wer ihn fragt, bekommt die
              Geschichte zu jedem Bier, jedem Wein, jedem Gericht.
            </p>
          </div>
          <p className="pt-4 text-h2 text-ink">
            Südtirol mitten in Berlin. So einfach ist das.
          </p>
        </div>
      </div>
    </section>
  );
}
