# Sao – Vietnamesisches Restaurant Landing Page

> Demo-Projekt für Studio-Portfolio. Konzeptionelle Landing Page für ein
> fiktives vietnamesisches Restaurant "Sao" (vietnamesisch für "Stern").
> Layout-Basis: Dribbble-Design von Rijal (Shot #24593293). Nicht für den
> produktiven Einsatz.

---

## 1. Projekt-Kontext

### Was wir bauen
Eine Single-Page-Landing für **Sao**, ein modernes vietnamesisches Restaurant
mit Anspruch auf gehobene, authentische Küche. Inhaber-Chef ist **Linh Tran**,
geboren in Hanoi, ausgebildet zwischen Hanoi, Hue und Saigon. Die Seite soll
Eleganz, vietnamesische Tradition und kulinarisches Handwerk vermitteln –
modern interpretiert, ohne in Pho-Bowl-Imbiss-Klischees zu verfallen.

### Was die Site ausstrahlen muss
- **Elegant, aber warm.** Kein steriler Fine-Dining-Look. Erdige Töne, warmes
  Licht, atmosphärische Foodfotografie.
- **Persönlich.** Chef Linh Tran ist die Hauptfigur – Hanoi, Familienküche der
  Großmutter, Reise durch alle drei vietnamesischen Küchenregionen.
- **Stolz auf Handwerk.** Eigene Brühen (24h gezogen), frische Kräuter,
  hausgemachte Nudeln.
- **Moderne Vietnamesität.** Nicht Take-away-Pho, sondern Phở Bò Tái, Bún Chả
  Hà Nội, Chè Sao als Signature-Dessert.

### Wer kommt auf die Site
- Gäste, die online reservieren wollen
- Foodies, die die Karte und Chef-Story lesen
- Geschäftspartner, die einen repräsentativen Ort suchen
- Touristen mit Anspruch (englische Sprachversion vorbereitet)

### Was die Site KANN
- Direkt reservieren (Formular mit Name, Email, Telefon, Datum, Uhrzeit, Personen)
- Speisekarte nach Kategorien anzeigen (Starters, Pho & Noodles, Mains, Desserts, Drinks)
- Signature Dishes prominent zeigen (mit Preis und Bild)
- Chef-Story vermitteln (Linh Tran)
- Auszeichnungen / Pressestimmen zeigen (Michelin, Time Out, BBC, CNN etc.)
- Vertrauen aufbauen über Awards-Sektion

---

## 2. Tech-Stack & Setup

### Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (modernste Version)
- **shadcn/ui** für Basis-Komponenten (Button, Card, Dialog, Tabs) – sparsam
- **Lucide Icons** für Icon-Set
- **next/font** für Typografie (Self-Hosting der Google Fonts)
- **next/image** für alle Bilder (Performance!)
- **react-hook-form + zod** für das Reservierungsformular

### Projektstruktur
```
app/
  layout.tsx           # Root-Layout, Fonts, Metadata
  page.tsx             # Single-Page mit allen Sektionen
  globals.css          # Tailwind + Custom Properties
components/
  sections/
    Hero.tsx           # "Welcome to Sao" + Hero-Pho-Bild
    SignatureDishes.tsx # 3-Card-Grid (Phở Bò, Bún Chả, Chè Sao)
    Menu.tsx           # Tabs (Starters, Pho & Noodles, ...) + Liste
    Chef.tsx           # Linh Tran Portrait + Story
    Awards.tsx         # Michelin, Time Out, BBC, ... Logo-Grid
    Reservation.tsx    # Formular + Open Hours
    Footer.tsx
  ui/                  # shadcn-Komponenten
  Navigation.tsx       # Header mit Logo "Sao" mittig
  MenuItem.tsx         # Wiederverwendbares Speisekarten-Item
  DishCard.tsx         # Signature-Dish-Card
public/
  images/              # Stock-Fotos hier
```

### Performance-Ziele
- Lighthouse-Score: **95+** in allen Kategorien
- LCP < 2.5s
- Mobile-First entwickelt

---

## 3. Design-System

### 3.1 Farbpalette

Basis ist eine **erdige, warme Palette** mit Anklängen an vietnamesische
Lacktraditionen: tiefes Schwarzbraun (Sơn-Mài-Lack) als Akzent-Hintergrund,
dazu sauberes Cremeweiß, weiches Off-White. Statt eines knalligen Rot-Akzents
ein gedeckter terracotta-Ton (Anlehnung an vietnamesische Pagoden-Dächer).

```
/* Hauptfarben */
--color-bg:           #FFFFFF   /* Reinweiß – primärer Background            */
--color-bg-cream:     #FAF6F0   /* Cremeweiß – Soft-Sections, Menu-BG        */
--color-bg-dark:      #2A1F18   /* Tief-Schwarzbraun – Signature, Reservation*/
--color-bg-darker:    #1C140F   /* Noch tiefer – Footer, dunkle Akzente      */

/* Textfarben */
--color-ink:          #1A1410   /* Tiefes Braun-Schwarz – Headlines, Text    */
--color-ink-muted:    #6B5D4F   /* Gedämpft – Body-Text, Captions            */
--color-ink-on-dark:  #F3EBDF   /* Cremiges Weiß für Text auf dunklem BG     */
--color-ink-muted-on-dark: #B0A28A /* Gedämpft auf dunklem Hintergrund      */

/* Akzentfarben */
--color-accent:       #B8553A   /* Gedeckte Terracotta – Tab-Active, kleine CTAs */
--color-accent-soft:  #F0D9CC   /* Helle Terracotta-Variante für Badges     */

/* Funktional */
--color-border:       #E8E0D2   /* Subtle Trennlinien auf hellem BG          */
--color-border-dark:  #3F2F23   /* Trennlinien auf dunklem BG                */
```

**Anti-Pattern:** KEIN knalliges Vietnam-Flaggen-Rot mit Gelb-Stern, KEIN
Bambus-Grün, KEIN Drachen-Gold. Wir machen ein modernes Restaurant, keine
Themen-Kulisse.

### 3.2 Typografie

Zwei Fonts. Beide kostenlos via Google Fonts. Beide unterstützen die
vietnamesischen Diakritika (â, ă, ơ, ư, đ, Tonzeichen).

```
Display / Headlines:   Cormorant Garamond (Serif)
                       weights: 300, 400, 500
                       leichte, elegante Serif mit weiten Buchstaben
                       → vietnamesisches Latin-Set vollständig

Body / UI:             Inter (Variable, Sans)
                       weights: 400, 500, 600
                       → vietnamesisches Latin-Set vollständig
```

**Wichtig:** Beim Laden der Fonts den `latin-ext` und `vietnamese` Subset mit
einbinden, sonst werden Diakritika in Phở, Bún Chả, Bánh Mì hässlich gefallback.

```ts
// in layout.tsx
import { Cormorant_Garamond, Inter } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500"],
})
const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
})
```

**Warum Cormorant Garamond?** Elegante Serif mit hohen Strichkontrasten, passt
zur gehobenen Atmosphäre und rendert vietnamesische Diakritika sauber.

**Warum Inter?** Geometrischer, neutraler Sans für Body-Text, UI und Formular-
Labels. Hervorragender Vietnamese-Support.

#### Type-Scale

```
text-display    → clamp(3.5rem, 8vw, 6.5rem)  /* Hero "Welcome to Sao"       */
text-h1         → clamp(2rem, 4vw, 3rem)      /* "Our Signature Dishes"      */
text-h2         → clamp(1.5rem, 3vw, 2rem)    /* Sub-Headlines               */
text-h3         → text-xl                      /* Card-Titel, Gerichtnamen   */
text-body       → text-base                    /* Body-Text                  */
text-small      → text-sm                      /* Labels, Captions, Preise   */
```

#### Hierarchie-Regeln
- **Display-Hero:** Cormorant Garamond, weight 400, cremiges Weiß
- **Sektion-Headlines** (h1, h2): Cormorant, weight 400 (NICHT bold), zentriert
- **Sub-Labels** ("Cooked by the best chefs"): Inter, klein, mit Sternchen-
  Ornament daneben (✦ ───── ✦ Stil)
- **Body:** Inter regular, line-height 1.7
- **Preise:** Inter, regular, kleinere Größe, gedämpfte Farbe
- **CTAs / Buttons:** Inter, font-weight 500

### 3.3 Spacing-System

```
Sektion-Padding vertikal:
  Mobile:   py-16  (64px)
  Tablet:   py-24  (96px)
  Desktop:  py-32  (128px)

Sektion-Padding horizontal:
  px-6 sm:px-8 lg:px-12

Container max-width:
  Default:    max-w-6xl  (1152px)
  Schmal:     max-w-4xl  (Chef-Story, Menu)
  Hero/Wide:  max-w-7xl  (Hero, Galerie)
```

### 3.4 Komponenten-Patterns

#### Button
```tsx
// Primary CTA (Reserve Now)
<button className="
  bg-ink hover:bg-ink-muted
  text-bg-cream
  px-10 py-4
  font-medium tracking-wide text-sm uppercase
  transition-colors duration-200
">
  Reserve Now
</button>

// Tab Button (Menu)
<button className="
  bg-bg-dark text-bg-cream  // active
  // OR border border-border text-ink  // inactive
  px-6 py-2 text-sm
  transition-colors
">
  Starters
</button>
```

KEIN abgerundeter Button (kein `rounded-xl`). Im Vorbild-Design sind die
Buttons rechteckig mit minimal `rounded-sm`. Eckig = elegant.

#### Sektion-Header (zentriert, mit Ornament)
```tsx
<div className="text-center space-y-3 mb-16">
  <p className="text-xs uppercase tracking-[0.3em] text-ink-muted
                inline-flex items-center gap-3">
    <span>✦</span>
    Cooked by the best chefs
    <span>✦</span>
  </p>
  <h2 className="font-serif text-h1 text-ink">
    Meet Linh Tran
  </h2>
</div>
```

#### MenuItem (Speisekarte)
Links Gericht/Beschreibung, rechts Preis. Mit Underline-Hover:
```tsx
<div className="flex items-baseline justify-between gap-4 py-4
                border-b border-border group cursor-pointer">
  <div className="flex-1">
    <h3 className="font-sans text-base text-ink
                   group-hover:underline underline-offset-4">
      {name}
    </h3>
  </div>
  <div className="text-ink-muted text-sm whitespace-nowrap">
    ${price}
  </div>
</div>
```

#### DishCard (Signature Dishes)
Bild groß, darunter Name + Preis. Auf dunklem BG.
```tsx
<div className="bg-bg-darker p-4 flex flex-col gap-4">
  <div className="aspect-[4/5] relative overflow-hidden">
    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
  </div>
  <div className="flex items-center justify-between text-ink-on-dark">
    <h3 className="font-sans text-base">{dish.name}</h3>
    <span className="text-sm flex items-center gap-1">
      ${dish.price}
      <ArrowUpRight className="w-3 h-3" />
    </span>
  </div>
</div>
```

#### Card (für Awards)
- Sehr subtle Border (`border border-border`)
- Großes Padding, Logo zentriert
- Quadratisches Format
- Kein Schatten

---

## 4. Anti-Patterns – was wir NICHT machen

❌ **Keine Glassmorphism / Frosted Glass.** Nicht der Look.

❌ **Keine Gradient-Backgrounds.** Solid Colors only.

❌ **Keine animierten Hintergrund-Effekte** (keine bewegten Blobs, keine
   Particle-Effekte, kein Aurora). Ruhe und Eleganz.

❌ **Keine Emoji-Icons.** Wir nutzen Lucide-SVGs oder dezente Unicode-Ornamente
   (✦, ★). 🍜 als Pho-Icon = sofort billig.

❌ **Keine "Modern Tech-Startup"-Optik.** Keine bunten Badges, keine Gradient-
   Buttons, keine 3D-Illustrations.

❌ **Keine Auto-Play-Slideshows mit Punkten unten.** Statisches Bild reicht
   für die Demo.

❌ **Keine Speisekarte als PDF-Link.** Volle interaktive Karte mit Tabs.

❌ **Kein "Authentic Vietnamese Flavors"-Geschwurbel.** Konkrete Beschreibungen,
   echte Gerichte, Chef-Persönlichkeit.

❌ **Keine Vietnam-Klischee-Bilder** (Reisbauern mit Hut, Halong-Bucht-Postkarte,
   Schwarz-Weiß-Foto vom Mekong, neonbeleuchtetes Drachen-Logo, Bambusvorhang
   als Deko). Fokus auf Essen, Atmosphäre, Chef.

❌ **Keine zu vielen Schriftgrößen.** Maximal die definierten 5 Stufen.

❌ **Keine knalligen Akzente.** Kein knalliges Rot, kein Gold-Glitzer, kein
   Vietnam-Flaggen-Schema.

❌ **Keine fehlenden Diakritika.** Vietnamesische Gerichtnamen werden mit
   korrekten Tonzeichen geschrieben (Phở, nicht Pho; Bún Chả, nicht Bun Cha).

---

## 5. Sektions-Briefing

Pro Sektion: was rein muss, wie's aufgebaut ist, woran wir merken, dass es passt.
Referenz-Screenshots: siehe `design-refs/` Ordner.

### 5.1 Navigation (Sticky)

- **Logo zentriert:** "✦ Sao" in Cormorant, kleine Größe
- **Links neben Logo:** kleine Icons (Besteck, Telefon-Icon) für sekundäre Aktionen
- **Rechts neben Logo:** Sprachwahl (🇺🇸 Eng ▼ / 🇻🇳 Tiếng Việt)
- **Darunter zentriert:** Menüpunkte (About Us · Menu · Contacts · Reservations · Shop · News)
- **Transparenter Hintergrund** auf Hero, wechselt zu Weiß beim Scrollen
- Mobile: Hamburger → Fullscreen-Overlay-Menü

### 5.2 Hero – "Welcome to Sao"

**Layout:** Vollflächig, Höhe ~90vh. Großes Hintergrundbild einer hochwertig
angerichteten Schale Phở (klare Brühe, frische Kräuter, Limettenviertel,
Stäbchen). Headline groß über dem Bild.

**Inhalt:**
```
Display-Text:  "Welcome to Sao"               (Cormorant, riesig, weiß)

Unten zentriert:
  Award-Logos:  Michelin · ✦ · Time Out         (klein, in Weiß-Linie)
  Punkte:       ●○○○ (Slider-Indikator)         (dekorativ)

Optional rechts:
  Pfeil-Button für "next slide"                 (>)
```

**Bildwahl** (Unsplash):
Top-Down oder Side-Shot einer eleganten Phở-Schale auf dunklem Holztisch oder
heller Stoffunterlage. Suchterm: "pho vietnamese soup elegant", "pho bo top
view bowl", "vietnamese noodle soup dark".

### 5.3 Signature Dishes

**Layout:** Dunkler Schwarzbraun-Hintergrund. Sektion-Header oben links,
darunter drei Karten nebeneinander (Desktop) / gestapelt (Mobile).

**Inhalt:**
```
Headline:      "Our Signature Dishes"
Sublabel:      "Discover the soul of Vietnamese cuisine
                through our signature dishes."

Karten:
1. Phở Bò Tái                   $18.00
   (Bild: Phở-Schale mit rosa Rinderfilet, Kräuter)
2. Bún Chả Hà Nội              $22.00
   (Bild: Gegrilltes Schweinefleisch mit Reisnudeln, Kräutern)
3. Chè Sao                      $12.00
   (Bild: Geschichtetes Süßdessert mit Kokosmilch)
```

**Layout-Detail:** Jede Karte hat eine Pfeil-Icon (↗) neben dem Preis als
Hinweis auf Klickbarkeit.

### 5.4 Menu – "Our menu is a careful journey through Vietnam"

**Layout:** Cremeweißer Hintergrund. Sektion-Header zentriert. Darunter
horizontale Tabs. Zweispaltig: Links die Menüliste, rechts ein großes Bild der
aktuellen Kategorie.

**Tabs:**
- Starters (default active)
- Phở & Noodles
- Mains
- Desserts
- Drinks

**Beispiel-Inhalt (Starters):**
```
Gỏi Cuốn (Fresh Spring Rolls)               $12.00
Chả Giò (Crispy Spring Rolls)                $13.00
Bánh Xèo (Sizzling Crepe)                    $15.00
Bánh Cuốn (Steamed Rice Rolls)               $14.00
Nộm Hoa Chuối (Banana Blossom Salad)         $13.00
```

Beim Hover auf einen Eintrag: Bild rechts wechselt zum jeweiligen Gericht.
Default-Bild für Starters: Fresh Spring Rolls auf Holzbrett mit Dip.

**Bildwahl pro Kategorie:**
- Starters: Frühlingsrollen mit Erdnusssauce
- Phở & Noodles: Dampfende Phở-Schale
- Mains: Gegrilltes Schweinefleisch oder Caramel-Fisch im Tonkrug
- Desserts: Chè in Glas geschichtet
- Drinks: Vietnamese Iced Coffee (cà phê sữa đá)

### 5.5 Chef – "Meet Linh Tran"

**Layout:** Zweispaltig. Links: Großes Portrait des Chefs in der Küche
(Kochmütze, weiße Jacke). Darunter ein Zitat-Block in Weiß auf dunklem Overlay.
Rechts: Sektion-Header + Story + Stats.

**Linker Bereich (über Bild gelegt, unten):**
```
"  ↗
Vietnamese cooking is balance — sweet, salty,
sour, bitter, spicy, umami. At Sao, we honor
those five tastes with every bowl, every plate."
```

**Rechter Bereich:**
```
Sublabel:      ✦ Cooked by the best chefs ✦
Headline:      "Meet Linh Tran"

Body:
Chef Linh Tran, the culinary mind behind Sao, brings two decades
of obsession with Vietnamese cuisine to every dish on the menu.
Born in Hanoi, Linh grew up in her grandmother's kitchen, where
the long-simmered broths of Phở and the herb-bright salads of
the North shaped her palate. Her journey took her south through
Huế, where she studied imperial cuisine, and on to Saigon, where
she trained under some of the country's most respected chefs.
At Sao, she draws on all three regional traditions, sourcing
herbs and aromatics weekly and pulling broths for 24 hours
before they ever reach a bowl.

[View More]   (Outline-Button)

Stats (zwei Boxen nebeneinander):
  20+              15+
  Years of         Awards
  Experience       & Features
```

**Bildwahl:** Chef-Portrait, Frau mit Kochmütze in professioneller Küche,
ruhige Haltung. Unsplash: "chef portrait kitchen woman", "asian chef portrait".

### 5.6 Awards & Recognitions

**Layout:** Cremeweißer Hintergrund. Zentrierter Sektion-Header. Darunter ein
4×2-Grid (8 Logos) der Auszeichnungen / Pressestimmen.

**Inhalt:**
```
Headline:      "Our Awards and Recognitions"
Body:          "Sao is proud to be recognized among the world's most
                celebrated Vietnamese restaurants. From our Michelin
                star to features in international press, each accolade
                reflects our team's dedication to honoring tradition
                while pushing Vietnamese cuisine forward."

Logo-Grid (4x2):
  Reihe 1: Michelin (★) · Asia's 50 Best · Time Out · World Class
  Reihe 2: BBC · The Guardian · CNN · Condé Nast Traveler
```

**Hinweis:** Logos in SVG, in `public/images/awards/`. Für die Demo dürfen
generische "Award-Style"-Logos gebaut werden, falls echte Logos rechtlich
heikel sind.

### 5.7 Reservation – "Reserve now your table"

**Layout:** Dunkler Schwarzbraun-Hintergrund. Zweispaltig.
Links: Große Headline + Open Hours.
Rechts: Weißes Formular-Panel.

**Linker Bereich (auf dunklem BG):**
```
Headline:    "Reserve now your table and enjoy an
              unforgettable dining experience."
              (Cormorant, weiß, groß)

Open Hours:
  Tue – Fri    10:00 AM – 09:00 PM
  Sat – Sun    11:00 AM – 10:00 PM
  Mon          Closed
```

**Rechter Bereich (weißes Formular):**
```
Your Name           [Input: e.g. John]
Email Address       [Input: e.g. john@example.com]
Phone Number        [Input: e.g. +(123) 456-7890]

Date         Time           Number of Person
[dd/mm/yyyy] [Select time]  [1 Person ▼]

[ Reserve Now ]   (schwarzer Button, volle Breite)
```

**Wichtig:** Form-Validierung mit react-hook-form + zod. Für die Demo simulieren
wir den Submit (Toast: "Reservation request sent").

### 5.8 Footer

**Layout:** Weißer Hintergrund. Logo links, darunter Adresse und Copyright.
Sozial-Icons. Rechts: Footer-Navigation in Reihe.

**Inhalt:**
```
Logo:        ✦ Sao
Adresse:     797 Renner Land, Lake Kylesburg 27395
Copyright:   © 2026 Sao Restaurant. All Rights Reserved.

Social Icons: Standort · Instagram · LinkedIn · WhatsApp · TikTok

Footer-Nav: About Us · Reservations · Chefs · Open Hours · Contacts · Careers
```

---

## 6. Content – fertig

### Speisekarte (vollständig)

```
STARTERS

Gỏi Cuốn (Fresh Spring Rolls)                     $12.00
Rice paper rolls with shrimp, pork, herbs, vermicelli, peanut sauce.

Chả Giò (Crispy Spring Rolls)                     $13.00
Crispy rolls with pork, shrimp, wood-ear mushroom, taro.

Bánh Xèo (Sizzling Crepe)                         $15.00
Turmeric crepe filled with shrimp, pork belly, bean sprouts.

Bánh Cuốn (Steamed Rice Rolls)                    $14.00
Silky rice sheets with minced pork, wood-ear mushroom, fried shallots.

Nộm Hoa Chuối (Banana Blossom Salad)              $13.00
Shredded banana blossom, chicken, herbs, lime-fish-sauce dressing.


PHỞ & NOODLES

Phở Bò Tái                              ★         $18.00
24-hour beef broth, rare beef, banh pho noodles, herbs, lime.

Phở Bò Chín Nạm                                   $19.00
Beef broth with brisket and flank, banh pho noodles.

Phở Gà                                            $17.00
Aromatic chicken broth, poached chicken, rice noodles.

Bún Chả Hà Nội                          ★         $22.00
Grilled pork belly and patties, vermicelli, herbs, dipping broth.

Bún Bò Huế                                        $20.00
Spicy lemongrass-beef noodle soup from the imperial city.

Cao Lầu Hội An                                    $19.00
Thick noodles, char siu pork, herbs, crispy cracker — Hội An specialty.


MAINS

Cá Kho Tộ (Caramelized Clay Pot Fish)             $28.00
Catfish slow-braised in fish sauce caramel, ginger, chili.

Thịt Kho Tàu                                      $24.00
Braised pork belly and egg in coconut water caramel.

Gà Nướng Sả                                       $26.00
Lemongrass-marinated grilled half chicken, nuoc cham.

Sườn Nướng                                        $27.00
Char-grilled pork ribs, broken rice, pickled vegetables.

Tôm Rim                                           $32.00
Caramelized prawns with garlic, fish sauce, black pepper.


DESSERTS

Chè Sao                                           $12.00
Our signature: layered mung bean, taro, jelly, coconut cream.

Chè Ba Màu                                        $10.00
Classic three-color sweet bean dessert with crushed ice.

Bánh Flan Cà Phê                                   $9.00
Vietnamese coffee-infused caramel flan.

Kem Xôi                                           $11.00
Sticky rice ice cream with mango, peanuts, coconut.


DRINKS

Cà Phê Sữa Đá (Iced Coffee with Condensed Milk)    $7.00
Vietnamese drip coffee, slow-poured.

Cà Phê Trứng (Egg Coffee)                          $8.00
Hanoi-style: rich coffee under whipped egg cream.

Trà Sen (Lotus Tea)                                $6.00
Lotus-scented green tea, traditional ceramic pot.

Nước Mía (Sugarcane Juice)                         $7.00
Cold-pressed, kumquat, ice.

Bia Saigon                                         $8.00
Vietnamese lager, ice-cold.
```

### Signature Dishes (für Hero-Cards)

```
1. Phở Bò Tái                    $18.00
   24-hour broth, rare beef, fresh herbs.

2. Bún Chả Hà Nội                $22.00
   Grilled pork, vermicelli, dipping broth.

3. Chè Sao                       $12.00
   Layered sweet beans, taro, coconut cream.
```

### Chef-Bio (vollständig)

```
Chef Linh Tran, the culinary mind behind Sao, brings two decades of obsession
with Vietnamese cuisine to every dish on the menu. Born in Hanoi, Linh grew
up in her grandmother's kitchen, where the long-simmered broths of Phở and
the herb-bright salads of the North shaped her palate. Her journey took her
south through Huế, where she studied imperial cuisine, and on to Saigon, where
she trained under some of the country's most respected chefs. At Sao, she
draws on all three regional traditions, sourcing herbs and aromatics weekly
and pulling broths for 24 hours before they ever reach a bowl.

"Vietnamese cooking is balance — sweet, salty, sour, bitter, spicy, umami.
At Sao, we honor those five tastes with every bowl, every plate."
— Linh Tran

Stats:
- 20+ Years of Experience
- 15+ Awards & Features
```

### Awards (für Logo-Grid)

```
Reihe 1:
- Michelin ★ (One Star)
- Asia's 50 Best Restaurants
- Time Out
- World Class 2024

Reihe 2 (Press):
- BBC
- The Guardian
- CNN
- Condé Nast Traveler
```

---

## 7. Build-Reihenfolge (für Claude Code)

Wir bauen Sektion für Sektion. Pro Sektion: erst Struktur, dann Polish.

1. **Setup** – Next.js 14 + Tailwind v4 + Fonts (Cormorant + Inter, mit
   vietnamesischem Subset), Layout, globals
2. **Navigation** – Sticky Header mit zentriertem Logo
3. **Hero** – "Welcome to Sao" mit Phở-BG. Hier wird der Ton gesetzt.
4. **Signature Dishes** – Dunkler BG, 3 Cards
5. **Menu** – Tabs + zweispaltiges Layout mit Bild
6. **Chef** – Portrait + Story + Stats
7. **Awards** – Logo-Grid 4×2
8. **Reservation** – Formular auf dunklem BG
9. **Footer** – minimal
10. **Polish-Pass** – Hover-States, Mobile-Tweaks, Performance, Form-Validierung,
    vietnamesische Diakritika in allen Browsern testen

---

## 8. Prompt-Template für Claude Code (pro Sektion)

```
Hey, ich baue die Sektion {SECTION_NAME} für meine Sao-Restaurant-Demo.

Kontext: Siehe @CLAUDE.md (Design-System, Anti-Patterns, Content).
Referenz: Siehe Screenshot in design-refs/{SECTION_NAME}.png – das ist das
Ziel-Layout (Original ist ein italienisches Restaurant, ich adaptiere es für
ein vietnamesisches).

Bau eine {SECTION_NAME}-Komponente nach folgenden Vorgaben:
- Layout: {AUS DEM SEKTIONS-BRIEFING OBEN KOPIEREN}
- Inhalte: {AUS DEM CONTENT-BLOCK KOPIEREN}
- Wichtig: Halte dich strikt an die Anti-Patterns in CLAUDE.md.
- Vietnamesische Diakritika korrekt setzen (Phở, Bún Chả, Chè, etc.).

Nutze unsere Farb- und Typografie-Tokens via Tailwind. Keine Inline-Styles.
Komponente als TypeScript, mit Props falls sinnvoll.

Erst implementieren, dann zeigen wir uns das Ergebnis an und iterieren.
```

---

## 9. Quality-Check pro Sektion

- [ ] Sieht's auf Mobile (375px) sauber aus?
- [ ] Sieht's auf Tablet (768px) sauber aus?
- [ ] Sieht's auf Desktop (1440px) sauber aus?
- [ ] Hover-States auf allen klickbaren Elementen?
- [ ] Focus-States für Tastatur-Nav sichtbar?
- [ ] Kontrast-Ratio Text/Background mind. 4.5:1 (auch auf dunklem BG!)?
- [ ] Bilder via `next/image`, mit Alt-Text?
- [ ] Keine Console-Warnings im Browser?
- [ ] Animations respect `prefers-reduced-motion`?
- [ ] Form-Validierung funktioniert (Reservation)?
- [ ] Vietnamesische Diakritika werden korrekt gerendert (Phở, Bún Chả, ...)?

---

**Stand: Initiales Briefing. Wird während des Builds aktualisiert.**
