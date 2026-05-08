import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images?: ReadonlyArray<GalleryImage>;
}

const SLOTS: ReadonlyArray<{ label: string; layoutClass: string }> = [
  {
    label: "Wirtshaus-Innenraum",
    layoutClass: "aspect-[4/3] md:col-span-8",
  },
  {
    label: "Wiener Schnitzel",
    layoutClass: "aspect-[3/4] md:col-span-4",
  },
  {
    label: "Knödel",
    layoutClass: "aspect-[1/1] md:col-span-4",
  },
  {
    label: "Bier vom Fass",
    layoutClass: "aspect-[1/1] md:col-span-4",
  },
  {
    label: "Kaiserschmarren",
    layoutClass: "aspect-[3/4] md:col-span-4",
  },
  {
    label: "Berlin-Kreuzberg",
    layoutClass: "aspect-[3/2] md:col-span-7",
  },
  {
    label: "Brezn & dunkles Bier",
    layoutClass: "aspect-[3/4] md:col-span-5",
  },
];

export function Gallery({ images = [] }: GalleryProps = {}) {
  return (
    <section
      id="galerie"
      className="scroll-mt-20 bg-bg-alt px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl space-y-4 md:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Galerie
          </p>
          <h2 className="text-h1 text-ink">
            Eindrücke aus dem Wirtshaus.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {SLOTS.map((slot, i) => {
            const image = images[i];
            return (
              <div
                key={slot.label}
                className={`relative overflow-hidden border border-border bg-bg ${slot.layoutClass}`}
              >
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink-muted/60">
                      {slot.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
