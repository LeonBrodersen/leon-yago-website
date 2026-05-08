const TESTIMONIALS: ReadonlyArray<{ text: string; author: string }> = [
  {
    text: "Mittlerweile unser Stammlokal um die Ecke. Der Klassiker ist das riesige Wiener Schnitzel, das selbst den bekannten Schnitzel-Lokalen in Berlin den Schneid abkaufen kann.",
    author: "Katharina S.",
  },
  {
    text: "Überraschend anders für Kreuzberg. Urständiges Lokal mit Wirtshausambiente ohne plumpe Blasmusik. Lustiges Publikum: Eltern aus (Rest-)Deutschland, die ihre Kinder in Kreuzberg besuchen dürfen und ordentlich essen gehen wollen.",
    author: "Mellow_Dramatic",
  },
  {
    text: "Ein uriges kleines Lokal mit netter Bedienung. Das Schnitzel war ausgezeichnet und von der Portion her auch sehr gut.",
    author: "Milooman",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-4 md:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Stimmen
          </p>
          <h2 className="text-h1 text-ink">Was Gäste sagen.</h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.author} className="space-y-4">
              <p className="font-serif text-h2 leading-snug text-ink">
                „{t.text}"
              </p>
              <footer className="text-sm text-ink-muted">— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
