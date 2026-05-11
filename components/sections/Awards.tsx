import { Star } from "lucide-react";

const AWARDS: ReadonlyArray<{ name: string; michelin?: boolean }> = [
  { name: "Michelin", michelin: true },
  { name: "Asia's 50 Best" },
  { name: "Time Out" },
  { name: "World Class" },
  { name: "BBC" },
  { name: "The Guardian" },
  { name: "CNN" },
  { name: "Condé Nast Traveler" },
];

export function Awards() {
  return (
    <section
      id="awards"
      className="scroll-mt-20 bg-bg-cream px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
            <span aria-hidden="true">✦</span>
            Anerkennungen
            <span aria-hidden="true">✦</span>
          </p>
          <h2 className="text-h1 text-ink">
            Auszeichnungen & Anerkennungen
          </h2>
          <p className="mx-auto max-w-3xl text-ink-muted">
            Sao zählt zu den weltweit gefeiertsten vietnamesischen Restaurants.
            Vom Michelin-Stern bis zu Erwähnungen in internationaler Presse —
            jede Anerkennung spiegelt die Hingabe unseres Teams wider, Tradition
            zu ehren und vietnamesische Küche zugleich weiterzudenken.
          </p>
        </div>

        <ul
          aria-label="Auszeichnungen und Pressestimmen"
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6"
        >
          {AWARDS.map((award) => (
            <li
              key={award.name}
              className="flex aspect-square items-center justify-center border border-border bg-bg p-4 text-center"
            >
              {award.michelin ? (
                <div className="flex flex-col items-center gap-2">
                  <Star
                    aria-hidden="true"
                    className="h-5 w-5 fill-accent text-accent"
                  />
                  <span className="font-serif text-base text-ink">
                    {award.name}
                  </span>
                </div>
              ) : (
                <span className="font-serif text-base text-ink">
                  {award.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
