@AGENTS.md

# Wirtshaus zum Mitterhofer — Compact Briefing

Single-Page-Restaurant-Site, konzeptionelles Redesign. Berlin-Kreuzberg, südtiroler
Wirtshaus. Tonalität: gemütlich aber nicht klischeehaft, persönlich (Hannes
Mitterhofer ist die Hauptfigur), urständig aber nicht plump.

**Voller Briefing-Text** (Story-Copy, komplette Speisekarte, Testimonials,
Sektions-Details): `docs/briefing-full.md` — nur lesen, wenn ich Content für eine
konkrete Sektion brauche.

---

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 (CSS-first via `@theme` in
`globals.css`) · `next/font` · `next/image` · `lucide-react` · shadcn/ui nur
on-demand.

---

## Design-Tokens (`app/globals.css`)

### Farben
| Token | Hex | Use-Case |
|---|---|---|
| `--color-bg` | `#FAF6F1` | Cremeweiß, Haupt-Background |
| `--color-bg-alt` | `#F0E9DF` | Alternierende Sektionen |
| `--color-ink` | `#1F1A17` | Anthrazit, Text & Headlines, Footer-BG |
| `--color-ink-muted` | `#5C534D` | Body-Text, Captions, Labels |
| `--color-accent` | `#7A1F2B` | Burgunderrot, Logo, CTAs, Links, Sub-Labels |
| `--color-accent-hover` | `#5C1620` | Button-Hover |
| `--color-accent-soft` | `#F4E4E1` | Badges |
| `--color-border` | `#E5DCD0` | Subtle Trennlinien |
| `--color-success` | `#4A6741` | "Verfügbar" / "Reserviert" |

Tailwind-Utilities: `bg-bg`, `text-ink`, `bg-accent`, `border-border`, etc.

### Fonts
- **Fraunces** (Variable Serif, weights 400 + 600) → Display & Headlines.
  h1/h2 immer `font-weight: 400` (NICHT bold). Per `@layer base` automatisch auf
  alle h1-h6 gesetzt.
- **Inter** (Variable Sans, weights 400/500/600) → Body, UI, Buttons (medium 500),
  Sub-Labels (uppercase + tracking-wider). Body-line-height 1.7.

CSS-Vars: `--font-serif` (= `--font-fraunces`), `--font-sans` (= `--font-inter`).

### Type-Scale
| Utility | Wert |
|---|---|
| `text-display` | `clamp(3rem, 6vw, 5rem)` — Hero |
| `text-h1` | `clamp(2rem, 4vw, 3rem)` — Sektion-Titel |
| `text-h2` | `clamp(1.5rem, 3vw, 2rem)` — Sub-Headlines |
| `text-xl` | Card-Titel (Tailwind default) |
| `text-base` | Body |
| `text-sm` | Labels, Captions |

Maximal diese 6 Stufen — keine weiteren Größen.

### Spacing & Container
- Sektion-Padding vertikal: `py-16` mobile · `py-24` tablet · `py-32` desktop
- Sektion-Padding horizontal: `px-6 sm:px-8 lg:px-12`
- Container max-width: `max-w-6xl` default · `max-w-4xl` schmal (Story, Testimonials)
  · `max-w-7xl` wide (Hero, Galerie)

---

## Komponenten-Patterns

### Buttons (KEIN `rounded-xl`, scharfe Ecken oder max `rounded-sm`)

```tsx
// Primary
<button className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-bg px-8 py-4 font-medium tracking-wide transition-colors duration-200">
  Tisch reservieren <ArrowRight className="w-4 h-4" />
</button>

// Secondary (Outline)
<button className="border border-ink text-ink hover:bg-ink hover:text-bg px-8 py-4 font-medium transition-colors duration-200">
  Speisekarte ansehen
</button>
```

### Sektion-Header (immer zweizeilig)
```tsx
<div className="space-y-4 mb-16">
  <p className="text-sm uppercase tracking-[0.2em] text-accent">Speisekarte</p>
  <h2 className="text-h1 text-ink">Was bei uns auf den Tisch kommt</h2>
</div>
```

### MenuItem (typografisch, KEIN Bild)
```tsx
<div className="flex items-baseline gap-4 py-4 border-b border-border">
  <div className="flex-1">
    <h3 className="text-xl text-ink">{name}</h3>
    <p className="text-ink-muted text-sm mt-1">{description}</p>
  </div>
  <div className="text-lg text-ink whitespace-nowrap">{price} €</div>
</div>
```

### Card (Bier, Galerie)
Subtle Border (`border border-border`), generöses Padding (`p-8`), kein Schatten,
Hover = leichte BG-Veränderung, kein Lift-Effekt.

---

## Anti-Patterns — wenn Code dahin kippt, ist es FALSCH

- ❌ **Glassmorphism / Frosted Glass** — passt nicht zu Wirtshaus
- ❌ **Gradients** (besonders kein Purple-to-Pink AI-Look) — solid colors only
- ❌ **Animierte BG-Effekte** (Blobs, Particles, Aurora) — Ruhe ausstrahlen
- ❌ **Emoji-Icons** — ausschließlich Lucide-SVGs (🍺 = sofort billig)
- ❌ **Tech-Startup-Optik** — keine bunten Badges, keine Gradient-Buttons, keine 3D
- ❌ **Auto-Play-Slideshows im Hero** — statisches Foto oder ein ruhiges Video
- ❌ **Speisekarte als PDF-Link** — volle interaktive Karte
- ❌ **Bilder bei jedem Speisekarten-Eintrag** — wirkt wie Lieferdienst-App
- ❌ **„Mit Liebe gekocht"-Geschwurbel** — klare, ehrliche Sprache (wie Hannes spricht)
- ❌ **Hipster-Stockfotos mit Personen-Posen** — nur Atmosphäre, Essen, Bier, Räume
- ❌ **Goldgelb / Bayern-Blau / Hellbraun-Kupfer** — wir sind kein Hofbräuhaus-Klon
- ❌ **Abgerundete Buttons** (`rounded-xl`) — scharfe Ecken oder max `rounded-sm`
- ❌ **Mehr als 6 Schriftgrößen-Stufen**

---

## Build-Reihenfolge

Setup ✓ → Navigation → Hero → Story → Speisekarte → Bier → Galerie →
Testimonials → Reservierung + Anfahrt → Footer → Polish-Pass

Pro Sektion: PLAN → FREIGABE → BUILD → REVIEW. Nicht eher zur nächsten.

---

## Quality-Check pro Sektion

- Mobile (375px), Tablet (768px), Desktop (1440px) sauber
- Hover- und Focus-States auf allen klickbaren Elementen
- Kontrast Text/Background ≥ 4.5:1
- `next/image` mit Alt-Text für alle Bilder
- Keine Console-Warnings, keine TS-Errors
- Animations respektieren `prefers-reduced-motion` (in `globals.css` global gesetzt)

---

## Projektstruktur

```
app/
  layout.tsx       # Fonts, Metadata, html lang="de"
  page.tsx         # Single-Page mit allen Sektionen
  globals.css      # Tailwind + @theme Tokens + base layer
components/
  sections/        # Hero.tsx, Story.tsx, Menu.tsx, Beer.tsx, ...
  ui/              # shadcn-Komponenten (on-demand)
  Navigation.tsx, MenuItem.tsx
public/images/
docs/
  briefing-full.md # Voller Briefing-Text (Content, Sektions-Details)
```
