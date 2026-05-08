# Wirtshaus zum Mitterhofer – Konzept-Redesign

> Demo-Projekt für Studio-Portfolio. Konzeptionelle Neugestaltung der bestehenden
> Website wirtshaus-zum-mitterhofer.com – nicht für den produktiven Einsatz.

---

## 1. Projekt-Kontext

### Was wir bauen
Eine Single-Page-Restaurant-Website für das **Wirtshaus zum Mitterhofer** in
Berlin-Kreuzberg. Es handelt sich um ein konzeptionelles Redesign der bestehenden
Website (von 2020), die strukturelle, visuelle und UX-Probleme hat. Die Demo
dient als Verkaufsbeispiel ("Vorher/Nachher") für unser Studio.

### Was die Site ausstrahlen muss
- **Gemütlich**, aber nicht klischeehaft. Keine Lederhose, kein Edelweiß, kein
  Bavaria-Folklore-Kitsch.
- **Persönlich.** Hannes Mitterhofer – der südtiroler Inhaber, der selbst bedient
  – ist die Hauptfigur, nicht das Logo.
- **Stolz auf Handwerk.** Eigenes Bier, Rezepte aus der Heimat, Riesen-Schnitzel.
- **Berlin-Kreuzberger Lässigkeit.** "Urständig, aber nicht plump." (Original-Zitat
  einer Yelp-Rezension.)

### Wer kommt auf die Site
- Stammgäste, die nach Tageskarte oder Reservierung suchen
- Neukunden aus Kreuzberg/Mitte, die "Schnitzel" gegoogelt haben
- Touristen aus dem deutschsprachigen Raum, die Südtiroler Küche suchen
- Eltern, die ihre Kinder in Kreuzberg besuchen (echtes Zitat aus den
  Testimonials)

### Was die Site KANN
- Vertrauen aufbauen (echte Story, echte Menschen, echte Yelp-Zitate)
- Speisen vollständig zeigen (kein PDF-Verweis)
- Reservierung ermöglichen (CTA, Telefon, Anfrage)
- Bier-USP rausspielen (Mitterhofer Helles + Keller Bier, Bier der Woche)

---

## 2. Tech-Stack & Setup

### Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (modernste Version)
- **shadcn/ui** für Basis-Komponenten (Button, Card, Dialog) – sparsam einsetzen
- **Lucide Icons** für Icon-Set
- **next/font** für Typografie (Self-Hosting der Google Fonts)
- **next/image** für alle Bilder (Performance!)

### Projektstruktur
```
app/
  layout.tsx           # Root-Layout, Fonts, Metadata
  page.tsx             # Single-Page mit allen Sektionen
  globals.css          # Tailwind + Custom Properties
components/
  sections/
    Hero.tsx
    Story.tsx
    Menu.tsx
    Beer.tsx
    Gallery.tsx
    Testimonials.tsx
    Reservation.tsx
    Location.tsx
    Footer.tsx
  ui/                  # shadcn-Komponenten
  Navigation.tsx       # Sticky Header
  MenuItem.tsx         # Wiederverwendbares Speisekarten-Item
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

Wir vermeiden bewusst das Standard-Wirtshaus-Klischee (warmes Braun + Beige +
Goldgelb). Stattdessen: **dunkles, ruhiges Anthrazit als Grundton**, mit einem
warmen Cremeweiß und einem signifikanten Akzent in **gedecktem Burgunderrot**
(Anlehnung an südtiroler Wein, gedeckter als Bayernrot).

```
/* Hauptfarben */
--color-bg:           #FAF6F1   /* Warmes Cremeweiß – Hauptbackground         */
--color-bg-alt:       #F0E9DF   /* Etwas dunkler für alternierende Sektionen */
--color-ink:          #1F1A17   /* Tiefes Anthrazit – Text, Headlines        */
--color-ink-muted:    #5C534D   /* Gedämpft – Body-Text, Labels              */

/* Akzentfarben */
--color-accent:       #7A1F2B   /* Tiefes Burgunderrot – Logo, CTAs, Links   */
--color-accent-hover: #5C1620   /* Dunklere Variante für Hover-States        */
--color-accent-soft:  #F4E4E1   /* Sehr helle Akzent-Variante für Badges     */

/* Funktional */
--color-border:       #E5DCD0   /* Subtle Trennlinien                        */
--color-success:      #4A6741   /* Grün für "Verfügbar", "Reserviert"        */
```

**Anti-Pattern:** KEIN Goldgelb, KEIN Hellbraun mit Kupfer-Akzent, KEIN
Bayern-Blau-Weiß-Schema. Wir machen ein gepflegtes, modernes Wirtshaus, kein
Hofbräuhaus-Klon.

### 3.2 Typografie

Zwei Fonts. Beide kostenlos via Google Fonts.

```
Display / Headlines:   Fraunces (Variable, Serif)
                       weights: 400, 600
                       optical sizing für große Headlines

Body / UI:             Inter (Variable, Sans)
                       weights: 400, 500, 600
```

**Warum Fraunces?** Moderne Serif mit warmem Charakter. Bringt die "Tradition" des
Wirtshauses, ohne altbacken zu wirken. Auf Wirtshaus-Sites wird oft "Playfair
Display" genutzt – das ist ausgelutscht und zu elegant für ein bodenständiges
Lokal. Fraunces hat genau die richtige rustikale Note.

**Warum Inter?** Geometrischer, neutraler Sans für Body-Text und UI. Bewährt,
liest sich auf jeder Bildschirmgröße perfekt.

#### Type-Scale

```
text-display    → clamp(3rem, 6vw, 5rem)     /* Hero-Headline */
text-h1         → clamp(2rem, 4vw, 3rem)     /* Sektion-Titel */
text-h2         → clamp(1.5rem, 3vw, 2rem)   /* Sub-Headlines */
text-h3         → text-xl                     /* Card-Titel */
text-body       → text-base                   /* Body-Text */
text-small      → text-sm                     /* Labels, Captions */
```

#### Hierarchie-Regeln
- **Headlines** (h1, h2): Fraunces, font-weight 400 (NICHT bold)
- **Hero-Display:** Fraunces, font-weight 400, mit feinem letter-spacing
- **Sub-Labels** ("ÜBER UNS"): Inter, uppercase, tracking-wider, kleines Format
- **Body:** Inter regular, line-height 1.7 für gute Lesbarkeit
- **CTAs / Buttons:** Inter, font-weight 500 (medium), nicht bold

### 3.3 Spacing-System

Wir nutzen Tailwinds Default-Spacing (4px-Basis), aber halten uns an feste
Sektion-Padding-Regeln für Konsistenz:

```
Sektion-Padding vertikal:
  Mobile:   py-16  (64px)
  Tablet:   py-24  (96px)
  Desktop:  py-32  (128px)

Sektion-Padding horizontal:
  px-6 sm:px-8 lg:px-12

Container max-width:
  Default:    max-w-6xl  (1152px)
  Schmal:     max-w-4xl  (Story-Text, Testimonials)
  Hero/Wide:  max-w-7xl  (Galerie, Hero)
```

### 3.4 Komponenten-Patterns

#### Button
```tsx
// Primary CTA
<button className="
  bg-accent hover:bg-accent-hover
  text-white
  px-8 py-4
  font-medium tracking-wide
  transition-colors duration-200
  inline-flex items-center gap-2
">
  Tisch reservieren
  <ArrowRight className="w-4 h-4" />
</button>

// Secondary (Outline)
<button className="
  border border-ink
  text-ink hover:bg-ink hover:text-bg
  px-8 py-4
  font-medium
  transition-colors duration-200
">
  Speisekarte ansehen
</button>
```

KEIN abgerundeter Button (kein `rounded-xl`). Wir nutzen scharfe Ecken oder
allerhöchstens minimal `rounded-sm`. Das passt zur seriösen Wirtshaus-Ästhetik.

#### Sektion-Header
Jede Sektion startet mit einem zweizeiligen Header:
```tsx
<div className="space-y-4 mb-16">
  <p className="text-sm uppercase tracking-[0.2em] text-accent">
    Speisekarte
  </p>
  <h2 className="font-serif text-h1 text-ink">
    Was bei uns auf den Tisch kommt
  </h2>
</div>
```

#### MenuItem (Speisekarte-Eintrag)
Klassisches Restaurant-Layout: Gericht links, Punkte-Linie, Preis rechts.
```tsx
<div className="flex items-baseline gap-4 py-4 border-b border-border">
  <div className="flex-1">
    <h3 className="font-serif text-h3 text-ink">{name}</h3>
    <p className="text-ink-muted text-sm mt-1">{description}</p>
  </div>
  <div className="font-serif text-lg text-ink whitespace-nowrap">
    {price} €
  </div>
</div>
```

KEIN Bild bei jedem Gericht. Das wirkt wie eine Lieferdienst-App. Stattdessen:
typografisch sauber, mit gelegentlichen Highlight-Bildern dazwischen.

#### Card (für Bier-Sektion, Galerie)
- Sehr subtle Border (`border border-border`)
- Padding generös (`p-8`)
- Kein Schatten (`shadow-none`)
- Transition bei Hover: leichte BG-Veränderung, kein Lift-Effekt

---

## 4. Anti-Patterns – was wir NICHT machen

Diese Liste ist genauso wichtig wie der Rest. Wenn der Code in eine dieser
Richtungen kippt, ist es falsch.

❌ **Keine Glassmorphism / Frosted Glass.** Das passt nicht zu einem Wirtshaus.

❌ **Keine Gradient-Backgrounds.** Schon gar keine Purple-to-Pink Gradients
   (Standard-AI-Look). Solid Colors only.

❌ **Keine animierten Hintergrund-Effekte** (keine bewegten Blobs, keine
   Particle-Effekte, kein Aurora). Ruhe ausstrahlen.

❌ **Keine Emoji-Icons.** Wir nutzen Lucide-SVGs. 🍺 als Bier-Icon = sofort billig.

❌ **Keine "Modern Tech-Startup"-Optik.** Keine bunten Badges mit "NEW", keine
   Gradient-Buttons, keine 3D-Illustrations.

❌ **Keine Auto-Play-Slideshows im Hero.** Statisches großes Foto oder ein
   einziges, ruhiges Hintergrundvideo. Nichts, was zwingt mitzulesen.

❌ **Keine Speisekarte als PDF-Link.** Volle interaktive Karte. Punkt.

❌ **Kein "Wir kochen mit Liebe"-Geschwurbel.** Klare, ehrliche Sprache. So wie
   Hannes selbst spricht.

❌ **Keine Stockfotos von lachenden Hipster-Models** mit Burger in der Hand. Wenn
   Stockfotos, dann von Atmosphäre, Essen, Bier, Räumlichkeiten – keine
   Personen-Posen.

❌ **Keine zu vielen Schriftgrößen.** Maximal die definierten 5 Stufen.

---

## 5. Sektions-Briefing

Pro Sektion: was rein muss, wie's aufgebaut ist, woran wir merken, dass es passt.

### 5.1 Navigation (Sticky)

- Logo links: "Wirtshaus zum Mitterhofer" in Fraunces, kleine Größe
- Rechts: Menüpunkte (Speisen · Bier · Über uns · Kontakt) + CTA "Reservieren"
- Transparenter Hintergrund auf Hero, wechselt zu Cremeweiß beim Scrollen
- Mobile: Hamburger → Fullscreen-Overlay-Menü

### 5.2 Hero

**Layout:** Vollflächig, Höhe ~85vh. Großes Hintergrundbild mit dunklem Overlay
(rgba(31, 26, 23, 0.4)). Inhalt linksbündig, vertikal zentriert.

**Inhalt:**
```
Klein, oben:   "BERLIN-KREUZBERG"           (uppercase, tracking-wider, accent)
Display-Text:  "Südtirol mitten              (Fraunces, 3-5rem, weiß)
                in Kreuzberg."
Sub:           "Schnitzel, Knödel, eigenes   (Inter, weiß-90%, max 60ch)
                Bier vom Fass. Seit Jahren
                Stammlokal für die, die
                wissen, was gut ist."
CTAs:          [Tisch reservieren] [Speisekarte]
```

**Bildwahl** (Unsplash):
Innenraum eines warmen, gemütlichen Wirtshauses bei Abendlicht. Holz, Kerzenlicht.
Suchterm-Tipp: "german restaurant interior", "rustic dining wood candle"

### 5.3 Story / Über uns

**Layout:** Zweispaltig. Links: Bild (Hannes hinter der Theke, oder
Wirtshaus-Außenansicht). Rechts: Text mit Sektion-Header.

**Text** (genau so verwenden):
> Hannes Mitterhofer hat sein Wirtshaus dort eröffnet, wo niemand ein Wirtshaus
> erwarten würde: in Berlin-Kreuzberg.
>
> Was als kleines Lokal begann, ist heute Stammlokal für die Nachbarschaft – und
> Pflichtstation für alle, die wissen wollen, wie alpenländische Küche
> schmeckt, wenn sie wirklich ernst genommen wird. Knödel in allen Variationen.
> Schmorgerichte mit Zeit. Ein Wiener Schnitzel, das die Konkurrenz alt
> aussehen lässt.
>
> Hannes steht selbst hinter der Theke. Wer ihn fragt, bekommt die Geschichte
> zu jedem Bier, jedem Wein, jedem Gericht.
>
> Südtirol mitten in Berlin. So einfach ist das.

### 5.4 Speisekarte

**Layout:** Schmaler Container (max-w-4xl). Kategorien als horizontale Tabs oder
als sticky Sidebar (Desktop).

**Struktur:**
- Suppen & Kleinigkeiten
- Knödel & Schmankerln
- Vom Tiroler Grill (mit dem Schnitzel-Highlight, evtl. eingerahmt)
- Süßes
- Hinweis auf wechselnde Tageskarte (CTA: "Aktuelle Tageskarte erfragen")

Inhalt: siehe Speisekarte-Block weiter unten in Abschnitt "Content".

### 5.5 Bier

**Layout:** Drei Cards nebeneinander (Desktop) / gestapelt (Mobile). Mittelpunkt
der Sektion.

**Inhalte:**
1. **Mitterhofer Helles** – Badge "NEU", kurze Beschreibung
2. **Mitterhofer Keller Bier** – Hauptprodukt, Naturtrüb, ungefiltert
3. **Bier der Woche** – Wechselnde Spezialität

Dahinter ein größerer Hintergrund mit Bier-Foto (Pexels: "german beer", "wheat
beer pour").

### 5.6 Galerie

**Layout:** Asymmetrisches Grid mit 6-8 Bildern. Kein gleichförmiges 3x3-Grid –
das wirkt langweilig. Stattdessen verschiedene Bildgrößen wie ein
Zeitschriften-Layout.

**Bildmotive** (Unsplash-Suche):
- "schnitzel german food"
- "knödel dumpling"
- "kaiserschmarrn"
- "wirtshaus interior"
- "beer fass tap"
- "pretzel dark beer"
- "berlin kreuzberg restaurant"

### 5.7 Testimonials

**Layout:** Drei Zitate in großer Typo, sehr ruhig. KEIN
Karussell-mit-Punkten-Klischee. Einfach drei Zitate untereinander oder
nebeneinander, je nach Größe.

**Inhalte:** Die echten Yelp-Zitate (siehe Content-Block).

### 5.8 Reservierung

**Layout:** Klare CTA-Sektion. Kein langes Formular. Drei Optionen:
1. Telefonisch: Große, klickbare Telefonnummer
2. Anfragen per Email: einfache Maillink
3. Vorbeischauen: Adresse + "Wir freuen uns"

KEIN externes Reservierungs-Tool für die Demo – aber der Platz ist vorgesehen,
falls man später z.B. Resmio einbindet.

### 5.9 Anfahrt + Öffnungszeiten

**Layout:** Zweispaltig. Links: OpenStreetMap oder Mapbox-Karte mit Marker.
Rechts: Adresse, Öffnungszeiten, U-Bahn-Anfahrt.

**Inhalte:**
```
Adresse:  Fichtestraße 1, 10967 Berlin (Kreuzberg)
Tel:      030/69566909

Öffnungszeiten:
Mo – Fr:        16:00 – 24:00 Uhr
Sa, So, Feiert.: 17:00 – 24:00 Uhr

Nächste U-Bahn: U7 Südstern (4 Min Fußweg)
```

### 5.10 Footer

Minimalistisch. Cremeweiß auf Anthrazit-Hintergrund.
- Logo + kurzer Tagline
- Kontakt-Infos
- Impressum, Datenschutz
- "Konzept-Redesign – nicht produktiv im Einsatz" (Hinweis fürs Demo-Setting)

---

## 6. Content – fertig

### Speisekarte (vollständig)

```
SUPPEN & KLEINIGKEITEN

Frittatensuppe                                     6,50 €
Klare Rinderbrühe mit hauchdünnen Pfannkuchenstreifen.

Brotzeitplatte                                    12,50 €
Speck, Kaminwurzn, Bergkäse, Butter, Senf, Brot.


KNÖDEL & SCHMANKERLN

Dreierlei Knödel                                  16,80 €
Speck-, Käse- und Spinatknödel auf brauner Butter mit Parmesan.

Käsespätzle                                       14,50 €
Hausgemacht, mit Bergkäse und Röstzwiebeln.

Herrengröstl                                      15,80 €
Mit Krautsalat (mit Currynote, ja wirklich).


VOM TIROLER GRILL

Wiener Schnitzel vom Kalb              ★          24,80 €
Riesenportion. Mit Petersilienkartoffeln und Preiselbeeren.
"Schnitzel, das selbst Berlins Schnitzel-Lokalen den Schneid abkauft." – Yelp

Schnitzel "Tris"                                  22,50 €
Drei kleine Schnitzel: Kalb, Schwein, Hähnchen.

Kalbsgulasch                                      19,80 €
Mit Speckknödel.

Geschmorte Ochsenbäckchen                         23,50 €
Mit Selleriepüree und Rotweinjus.


SÜßES

Kaiserschmarren                                    9,80 €
Mit Pflaumenkompott, Puderzucker.

Apfelstrudel                                       7,50 €
Hausgemacht. Mit Vanillesauce.


WECHSELNDE TAGESKARTE
Bitte fragen Sie unsere Tageskarte – jeden Tag neu.
```

### Testimonials (echt, Yelp)

```
"Mittlerweile unser Stammlokal um die Ecke. Der Klassiker ist das riesige
Wiener Schnitzel, das selbst den bekannten Schnitzel-Lokalen in Berlin den
Schneid abkaufen kann."
— Katharina S.

"Überraschend anders für Kreuzberg. Urständiges Lokal mit Wirtshausambiente
ohne plumpe Blasmusik. Lustiges Publikum: Eltern aus (Rest-)Deutschland, die
ihre Kinder in Kreuzberg besuchen dürfen und ordentlich essen gehen wollen."
— Mellow_Dramatic

"Ein uriges kleines Lokal mit netter Bedienung. Das Schnitzel war
ausgezeichnet und von der Portion her auch sehr gut."
— Milooman
```

---

## 7. Build-Reihenfolge (für Claude Code)

Wir bauen Sektion für Sektion. Pro Sektion: erst Struktur, dann Polish.

1. **Setup** – Next.js 14 + Tailwind v4 + Fonts, Layout, globals
2. **Navigation** – Sticky Header
3. **Hero** – das wichtigste Stück, hier wird der Ton gesetzt
4. **Story** – kurz, klare Hierarchie
5. **Speisekarte** – sauberes Listing
6. **Bier-Sektion** – Cards mit USP
7. **Galerie** – asymmetrisches Grid
8. **Testimonials** – ruhige Zitate
9. **Reservierung + Anfahrt** – kombinierbar
10. **Footer** – minimal
11. **Polish-Pass** – Hover-States, Mobile-Tweaks, Performance

---

## 8. Prompt-Template für Claude Code (pro Sektion)

```
Hey, ich baue die Sektion {SECTION_NAME} für mein Demo-Restaurant.

Kontext: Siehe @CLAUDE.md (Design-System, Anti-Patterns, Content).

Bau eine {SECTION_NAME}-Komponente nach folgenden Vorgaben:
- Layout: {AUS DEM SEKTIONS-BRIEFING OBEN KOPIEREN}
- Inhalte: {AUS DEM CONTENT-BLOCK KOPIEREN}
- Wichtig: Halte dich strikt an die Anti-Patterns in CLAUDE.md.

Nutze unsere Farb- und Typografie-Tokens via Tailwind. Keine Inline-Styles.
Komponente als TypeScript, mit Props falls sinnvoll.

Erst implementieren, dann zeigen wir uns das Ergebnis an und iterieren.
```

---

## 9. Quality-Check pro Sektion

Bevor eine Sektion als "fertig" gilt, prüfen:

- [ ] Sieht's auf Mobile (375px) sauber aus?
- [ ] Sieht's auf Tablet (768px) sauber aus?
- [ ] Sieht's auf Desktop (1440px) sauber aus?
- [ ] Hover-States auf allen klickbaren Elementen?
- [ ] Focus-States für Tastatur-Nav sichtbar?
- [ ] Kontrast-Ratio Text/Background mind. 4.5:1?
- [ ] Bilder via `next/image`, mit Alt-Text?
- [ ] Keine Console-Warnings im Browser?
- [ ] Animations respect `prefers-reduced-motion`?

---

**Stand: Initiales Briefing. Wird während des Builds aktualisiert.**
