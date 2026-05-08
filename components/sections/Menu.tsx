import { Phone } from "lucide-react";
import { MenuItem, type MenuItemProps } from "@/components/MenuItem";

interface Category {
  id: string;
  shortLabel: string;
  title: string;
  items: MenuItemProps[];
}

const CATEGORIES: Category[] = [
  {
    id: "suppen",
    shortLabel: "Suppen",
    title: "Suppen & Kleinigkeiten",
    items: [
      {
        name: "Frittatensuppe",
        description: "Klare Rinderbrühe mit hauchdünnen Pfannkuchenstreifen.",
        price: "6,50",
      },
      {
        name: "Brotzeitplatte",
        description: "Speck, Kaminwurzn, Bergkäse, Butter, Senf, Brot.",
        price: "12,50",
      },
    ],
  },
  {
    id: "knoedel",
    shortLabel: "Knödel",
    title: "Knödel & Schmankerln",
    items: [
      {
        name: "Dreierlei Knödel",
        description:
          "Speck-, Käse- und Spinatknödel auf brauner Butter mit Parmesan.",
        price: "16,80",
      },
      {
        name: "Käsespätzle",
        description: "Hausgemacht, mit Bergkäse und Röstzwiebeln.",
        price: "14,50",
      },
      {
        name: "Herrengröstl",
        description: "Mit Krautsalat (mit Currynote, ja wirklich).",
        price: "15,80",
      },
    ],
  },
  {
    id: "grill",
    shortLabel: "Grill",
    title: "Vom Tiroler Grill",
    items: [
      {
        name: "Wiener Schnitzel vom Kalb",
        description:
          "Riesenportion. Mit Petersilienkartoffeln und Preiselbeeren.",
        price: "24,80",
        highlight: true,
        starred: true,
        quote: {
          text: "Schnitzel, das selbst Berlins Schnitzel-Lokalen den Schneid abkauft.",
          source: "Yelp",
        },
      },
      {
        name: "Schnitzel „Tris“",
        description: "Drei kleine Schnitzel: Kalb, Schwein, Hähnchen.",
        price: "22,50",
      },
      {
        name: "Kalbsgulasch",
        description: "Mit Speckknödel.",
        price: "19,80",
      },
      {
        name: "Geschmorte Ochsenbäckchen",
        description: "Mit Selleriepüree und Rotweinjus.",
        price: "23,50",
      },
    ],
  },
  {
    id: "suesses",
    shortLabel: "Süßes",
    title: "Süßes",
    items: [
      {
        name: "Kaiserschmarren",
        description: "Mit Pflaumenkompott, Puderzucker.",
        price: "9,80",
      },
      {
        name: "Apfelstrudel",
        description: "Hausgemacht. Mit Vanillesauce.",
        price: "7,50",
      },
    ],
  },
];

export function Menu() {
  return (
    <section
      id="speisen"
      className="scroll-mt-20 bg-bg-alt px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 space-y-4 md:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Speisekarte
          </p>
          <h2 className="text-h1 text-ink">
            Was bei uns auf den Tisch kommt
          </h2>
        </div>

        <nav
          aria-label="Speisekarten-Kategorien"
          className="sticky top-16 z-40 mb-12 border-y border-border bg-bg-alt"
        >
          <ul className="flex gap-6 overflow-x-auto py-3 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="whitespace-nowrap">
                <a
                  href={`#${cat.id}`}
                  className="text-ink-muted transition-colors duration-200 hover:text-accent"
                >
                  {cat.shortLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-32">
              <h3 className="mb-4 text-h2 text-ink">{cat.title}</h3>
              <div>
                {cat.items.map((item) => (
                  <MenuItem key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-border bg-bg p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">
            Wechselnde Tageskarte
          </p>
          <p className="mb-6 text-ink-muted">
            Jeden Tag neu. Bitte fragen Sie nach unserer aktuellen Tageskarte.
          </p>
          <a
            href="tel:+493069566909"
            className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Aktuelle Tageskarte erfragen
          </a>
        </div>
      </div>
    </section>
  );
}
