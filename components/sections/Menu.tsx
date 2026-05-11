"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem, type MenuItemProps } from "@/components/MenuItem";
import { Reveal } from "@/components/Reveal";

interface Category {
  id: string;
  label: string;
  defaultImage: { src: string; alt: string };
  items: MenuItemProps[];
}

const CATEGORIES: ReadonlyArray<Category> = [
  {
    id: "vorspeisen",
    label: "Vorspeisen",
    defaultImage: {
      src: "/images/menu/vorspeisen.jpg",
      alt: "Vietnamesische Sommerrollen mit Dipping-Sauce.",
    },
    items: [
      {
        name: "Gỏi Cuốn (Frische Sommerrollen)",
        description:
          "Reispapier-Rollen mit Garnelen, Schweinefleisch, Kräutern, Glasnudeln und Erdnusssoße.",
        price: "12",
      },
      {
        name: "Chả Giò (Knusprige Sommerrollen)",
        description:
          "Knusprige Rollen mit Schweinefleisch, Garnelen, Mu-Err-Pilzen und Taro.",
        price: "13",
      },
      {
        name: "Bánh Xèo (Knuspriger Kurkuma-Pfannkuchen)",
        description:
          "Kurkuma-Pfannkuchen gefüllt mit Garnelen, Schweinebauch und Sojasprossen.",
        price: "15",
      },
      {
        name: "Bánh Cuốn (Gedämpfte Reisrollen)",
        description:
          "Seidige Reisteig-Rollen mit Hackfleisch, Mu-Err-Pilzen und gerösteten Schalotten.",
        price: "14",
      },
      {
        name: "Nộm Hoa Chuối (Bananenblüten-Salat)",
        description:
          "Geraspelte Bananenblüte, Hähnchen, Kräuter, Limetten-Fischsoßen-Dressing.",
        price: "13",
      },
    ],
  },
  {
    id: "pho",
    label: "Phở & Nudeln",
    defaultImage: {
      src: "/images/menu/pho.jpg",
      alt: "Schüssel mit Phở-Brühe, Reisnudeln, Fleisch und Kräutern.",
    },
    items: [
      {
        name: "Phở Bò Tái",
        description:
          "24-Stunden-Rinderbrühe, blutiges Rindfleisch, Bánh-Phở-Nudeln, Kräuter, Limette.",
        price: "18",
        starred: true,
      },
      {
        name: "Phở Bò Chín Nạm",
        description: "Rinderbrühe mit Brust und Bauch, Bánh-Phở-Nudeln.",
        price: "19",
      },
      {
        name: "Phở Gà",
        description: "Aromatische Hühnerbrühe, pochiertes Hähnchen, Reisnudeln.",
        price: "17",
      },
      {
        name: "Bún Chả Hà Nội",
        description:
          "Gegrillter Schweinebauch und Frikadellen, Reisnudeln, Kräuter, Dipping-Brühe.",
        price: "22",
        starred: true,
      },
      {
        name: "Bún Bò Huế",
        description:
          "Scharfe Zitronengras-Rindersuppe aus der Kaiserstadt Huế.",
        price: "20",
      },
      {
        name: "Cao Lầu Hội An",
        description:
          "Dicke Nudeln, Char-Siu-Schwein, Kräuter, knusprige Cracker — Spezialität aus Hội An.",
        price: "19",
      },
    ],
  },
  {
    id: "hauptgerichte",
    label: "Hauptgerichte",
    defaultImage: {
      src: "/images/menu/hauptgerichte.jpg",
      alt: "Teller mit gegrilltem Fleisch und Gemüse, vietnamesischer Stil.",
    },
    items: [
      {
        name: "Cá Kho Tộ (Karamellisierter Fisch im Tontopf)",
        description: "Wels langsam geschmort in Fischsoßen-Karamell, Ingwer, Chili.",
        price: "28",
      },
      {
        name: "Thịt Kho Tàu",
        description: "Geschmorter Schweinebauch und Ei in Kokoswasser-Karamell.",
        price: "24",
      },
      {
        name: "Gà Nướng Sả",
        description:
          "Zitronengras-mariniertes gegrilltes halbes Hähnchen, Nước-Chấm-Soße.",
        price: "26",
      },
      {
        name: "Sườn Nướng",
        description: "Holzkohle-Grill-Spareribs, Bruchreis, eingelegtes Gemüse.",
        price: "27",
      },
      {
        name: "Tôm Rim",
        description: "Karamellisierte Garnelen mit Knoblauch, Fischsoße, schwarzem Pfeffer.",
        price: "32",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    defaultImage: {
      src: "/images/menu/desserts.jpg",
      alt: "Cremeweißes Dessert mit Toppings in einer Schale.",
    },
    items: [
      {
        name: "Chè Sao",
        description: "Unsere Signatur: geschichtete Mungbohnen, Taro, Gelee, Kokoscreme.",
        price: "12",
      },
      {
        name: "Chè Ba Màu",
        description: "Klassisches dreifarbiges Bohnen-Dessert mit Crushed Ice.",
        price: "10",
      },
      {
        name: "Bánh Flan Cà Phê",
        description: "Karamell-Flan mit vietnamesischem Kaffee.",
        price: "9",
      },
      {
        name: "Kem Xôi",
        description: "Klebreis-Eis mit Mango, Erdnüssen, Kokos.",
        price: "11",
      },
    ],
  },
  {
    id: "getraenke",
    label: "Getränke",
    defaultImage: {
      src: "/images/menu/getraenke.jpg",
      alt: "Vietnamesischer Phin-Tropfkaffee neben einem Glas Eiswasser.",
    },
    items: [
      {
        name: "Cà Phê Sữa Đá (Eiskaffee mit Kondensmilch)",
        description: "Vietnamesischer Tropfkaffee, langsam aufgegossen.",
        price: "7",
      },
      {
        name: "Cà Phê Trứng (Ei-Kaffee)",
        description: "Hanoi-Stil: kräftiger Kaffee unter geschlagener Eiercreme.",
        price: "8",
      },
      {
        name: "Trà Sen (Lotusblüten-Tee)",
        description: "Mit Lotus aromatisierter Grüntee, traditioneller Keramikkrug.",
        price: "6",
      },
      {
        name: "Nước Mía (Zuckerrohrsaft)",
        description: "Kaltgepresst, mit Kumquat, Eis.",
        price: "7",
      },
      {
        name: "Bia Saigon",
        description: "Vietnamesisches Lagerbier, eiskalt.",
        price: "8",
      },
    ],
  },
];

export function Menu() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const displayedItem =
    activeCategory.items[hoveredIndex ?? 0] ?? activeCategory.items[0];
  const displayedImage = displayedItem.imageSrc
    ? {
        src: displayedItem.imageSrc,
        alt: displayedItem.imageAlt ?? displayedItem.name,
      }
    : activeCategory.defaultImage;

  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-bg-cream px-6 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 md:mb-14">
          <div className="space-y-3 text-center">
            <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
              <span aria-hidden="true">✦</span>
              Speisekarte
              <span aria-hidden="true">✦</span>
            </p>
            <h2 className="text-h1 text-ink">
              Unsere Karte ist eine Reise durch Vietnam.
            </h2>
          </div>
        </Reveal>

        <ul
          aria-label="Speisekarten-Kategorien"
          className="mb-10 flex flex-wrap items-center justify-center gap-2 md:mb-14"
        >
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={cat.id === activeId}
                onClick={() => {
                  setActiveId(cat.id);
                  setHoveredIndex(null);
                }}
                className={`whitespace-nowrap px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  cat.id === activeId
                    ? "bg-bg-dark text-bg-cream"
                    : "border border-border text-ink hover:bg-bg"
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <ul aria-label="Gerichte der ausgewählten Kategorie">
            {activeCategory.items.map((item, i) => (
              <MenuItem
                key={item.name}
                {...item}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </ul>

          <div className="relative hidden aspect-[4/5] overflow-hidden border border-border bg-bg md:sticky md:top-32 md:block md:self-start">
            <Image
              key={`${activeCategory.id}-${displayedImage.src}`}
              src={displayedImage.src}
              alt={displayedImage.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
