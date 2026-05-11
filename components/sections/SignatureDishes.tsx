import { DishCard, type DishCardProps } from "@/components/DishCard";

const SIGNATURE_DISHES: ReadonlyArray<DishCardProps> = [
  { name: "Phở Bò Tái", price: "18", href: "#menu" },
  { name: "Bún Chả Hà Nội", price: "22", href: "#menu" },
  { name: "Chè Sao", price: "12", href: "#menu" },
];

export function SignatureDishes() {
  return (
    <section
      id="signature"
      className="scroll-mt-20 bg-bg-dark px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl space-y-4 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted-on-dark">
            Signatur
          </p>
          <h2 className="text-h1 text-ink-on-dark">
            Unsere Signatur-Gerichte
          </h2>
          <p className="text-ink-muted-on-dark">
            Entdecken Sie die Seele der vietnamesischen Küche in unseren
            Signatur-Gerichten.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {SIGNATURE_DISHES.map((dish) => (
            <DishCard key={dish.name} {...dish} />
          ))}
        </div>
      </div>
    </section>
  );
}
