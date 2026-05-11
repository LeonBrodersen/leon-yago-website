@AGENTS.md

# Sao — Vietnamesisches Restaurant (Compact Briefing)

Single-Page-Landing für **Sao**, ein modernes vietnamesisches Restaurant von Köchin
Linh Tran. Layout-Basis: Dribbble „Lunar"-Design (italienisch), adaptiert auf
vietnamesisch. **UI-Sprache: Deutsch** (Briefing-Englisch wird beim Build
übersetzt). Vietnamesische Gerichtnamen mit korrekten Diakritika behalten
(Phở, Bún Chả, Chè).
Tonalität: elegant, warm, persönlich. Hanoi → Huế → Saigon, drei Regionen
ehrlich vereint. Fine-dining-Anspruch ohne Pho-Imbiss-Klischees.

**Voller Briefing-Text** (Speisekarte komplett, Chef-Bio, Awards-Liste, Sektions-
Details): `docs/briefing-full.md` — nur lesen, wenn ich Content für eine konkrete
Sektion brauche.

---

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 (CSS-first via `@theme`) ·
`next/font` (Cormorant + Inter, mit `vietnamese` Subset!) · `next/image` ·
`lucide-react` · `react-hook-form` + `zod` für Reservation-Formular · shadcn/ui
on-demand.

---

## Design-Tokens (`app/globals.css`)

### Farben
| Token | Hex | Use-Case |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Reinweiß, primärer BG |
| `--color-bg-cream` | `#FAF6F0` | Soft-Sections, Menu-BG |
| `--color-bg-dark` | `#2A1F18` | Schwarzbraun: Signature Dishes, Reservation |
| `--color-bg-darker` | `#1C140F` | Footer, tiefe Akzente |
| `--color-ink` | `#1A1410` | Tiefes Braun-Schwarz, Text + Headlines |
| `--color-ink-muted` | `#6B5D4F` | Body-Text, Captions |
| `--color-ink-on-dark` | `#F3EBDF` | Cremiges Weiß für Text auf dunklem BG |
| `--color-ink-muted-on-dark` | `#B0A28A` | Gedämpft auf dunklem BG |
| `--color-accent` | `#B8553A` | Terracotta — Tab-Active, kleine CTAs |
| `--color-accent-soft` | `#F0D9CC` | Badges |
| `--color-border` | `#E8E0D2` | Trennlinien hell |
| `--color-border-dark` | `#3F2F23` | Trennlinien auf dunkel |

Tailwind-Utilities: `bg-bg-cream`, `text-ink`, `bg-bg-dark`, `text-ink-on-dark`, etc.

### Fonts
- **Cormorant Garamond** (Serif, weights 300/400/500) → Display + Headlines.
  Hero: weight 400 (NICHT bold), elegante hohe Strichkontraste. Vietnamesische
  Diakritika via `vietnamese` Subset — sonst hässliches Fallback bei Phở.
- **Inter** (Variable Sans, weights 400/500/600) → Body, UI, Tabs, Formular.
  `vietnamese` Subset MUSS auch hier gesetzt sein.

CSS-Vars: `--font-serif` (= Cormorant), `--font-sans` (= Inter). Per `@layer
base` automatisch h1–h6 auf serif, body auf sans gesetzt.

### Type-Scale
| Utility | Wert |
|---|---|
| `text-display` | `clamp(3.5rem, 8vw, 6.5rem)` — „Welcome to Sao" |
| `text-h1` | `clamp(2rem, 4vw, 3rem)` — Sektion-Titel |
| `text-h2` | `clamp(1.5rem, 3vw, 2rem)` — Sub-Headlines |
| `text-xl` | Card-Titel, Gerichtnamen |
| `text-base` | Body |
| `text-sm` | Labels, Captions, Preise |

### Spacing & Container
- Sektion-Padding vertikal: `py-16` mobile · `py-24` tablet · `py-32` desktop
- Sektion-Padding horizontal: `px-6 sm:px-8 lg:px-12`
- Container max-width: `max-w-6xl` default · `max-w-4xl` schmal (Chef, Menu)
  · `max-w-7xl` wide (Hero, Galerie)

---

## Komponenten-Patterns

### Primary CTA (Reserve Now)
```tsx
<button className="bg-ink hover:bg-ink-muted text-bg-cream px-10 py-4 font-medium tracking-wide text-sm uppercase transition-colors duration-200">
  Reserve Now
</button>
```
Schwarz auf weiß. Eckig (max `rounded-sm`). Uppercase, tracking-wide.

### Tab-Button (Menu-Kategorien)
```tsx
// Active
<button className="bg-bg-dark text-bg-cream px-6 py-2 text-sm transition-colors">
  Starters
</button>
// Inactive
<button className="border border-border text-ink px-6 py-2 text-sm transition-colors hover:bg-bg-cream">
  Mains
</button>
```

### Sektion-Header (zentriert, mit ✦-Ornament)
```tsx
<div className="text-center space-y-3 mb-16">
  <p className="text-xs uppercase tracking-[0.3em] text-ink-muted inline-flex items-center gap-3">
    <span aria-hidden>✦</span>
    Cooked by the best chefs
    <span aria-hidden>✦</span>
  </p>
  <h2 className="text-h1 text-ink">Meet Linh Tran</h2>
</div>
```

### MenuItem (Speisekarte mit Underline-Hover)
```tsx
<div className="flex items-baseline justify-between gap-4 py-4 border-b border-border group cursor-pointer">
  <h3 className="text-base text-ink group-hover:underline underline-offset-4">{name}</h3>
  <span className="text-ink-muted text-sm whitespace-nowrap">${price}</span>
</div>
```
KEIN font-serif auf Item-Namen (sans-Body, einfacher Look).

### DishCard (Signature Dishes — KEINE Border, dunkler BG)
```tsx
<div className="bg-bg-darker p-4 flex flex-col gap-4">
  <div className="aspect-[4/5] relative overflow-hidden">
    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
  </div>
  <div className="flex items-center justify-between text-ink-on-dark">
    <h3 className="text-base">{dish.name}</h3>
    <span className="text-sm flex items-center gap-1">
      ${dish.price}
      <ArrowUpRight className="w-3 h-3" />
    </span>
  </div>
</div>
```

### Award-Card (Logo-Grid 4×2)
- Subtle Border (`border border-border`), generöses Padding, Logo zentriert,
  quadratisches Format, kein Schatten.

---

## Anti-Patterns — wenn Code dahin kippt, ist es FALSCH

- ❌ **Glassmorphism / Frosted Glass** — passt nicht
- ❌ **Gradient-Backgrounds** — solid colors only
- ❌ **Animierte BG-Effekte** (Blobs, Particles, Aurora) — Ruhe + Eleganz
- ❌ **Emoji-Icons** — Lucide-SVGs oder dezente Unicode-Ornamente (✦, ★) erlaubt;
  🍜/🍵 etc. = sofort billig
- ❌ **„Modern Tech-Startup"-Optik** — keine bunten Badges, keine Gradient-Buttons
- ❌ **Auto-Play-Slideshows mit Punkten** — statisches Bild reicht
- ❌ **Speisekarte als PDF-Link** — voll interaktiv mit Tabs
- ❌ **„Authentic Vietnamese Flavors"-Geschwurbel** — konkret, ehrlich, Chef-zentriert
- ❌ **Vietnam-Klischee-Bilder** (Reisbauern-mit-Hut, Halong-Postcard, Bambusvorhang,
  Drachen-Logo). Fokus auf Essen, Atmosphäre, Chef.
- ❌ **Knalliges Vietnam-Flaggen-Rot/Gelb/Bambusgrün** — Terracotta ist der Akzent
- ❌ **Abgerundete Buttons** (kein `rounded-xl`) — scharfe Ecken oder max `rounded-sm`
- ❌ **Mehr als 6 Schriftgrößen-Stufen**
- ❌ **Fehlende oder falsche Diakritika** — Phở (nicht Pho), Bún Chả (nicht Bun Cha),
  Chè (nicht Che), Bánh (nicht Banh). Immer korrekt.

---

## Build-Reihenfolge

Setup ✓ → Navigation → Hero → Signature Dishes → Menu (Tabs) → Chef →
Awards → Reservation (Formular) → Footer → Polish-Pass

Pro Sektion: PLAN → FREIGABE → BUILD → REVIEW. Nicht eher zur nächsten.

---

## Quality-Check pro Sektion

- Mobile (375px), Tablet (768px), Desktop (1440px) sauber
- Hover- und Focus-States auf allen klickbaren Elementen
- Kontrast Text/Background ≥ 4.5:1 (auch auf dunklem BG!)
- `next/image` mit Alt-Text für alle Bilder
- Keine Console-Warnings, keine TS-Errors
- Animations respektieren `prefers-reduced-motion`
- Form-Validierung funktioniert (Reservation)
- Vietnamesische Diakritika werden korrekt gerendert (Phở, Bún Chả, Chè)

---

## Projektstruktur

```
app/
  layout.tsx       # Fonts (vietnamese subset!), Metadata, html lang="en"
  page.tsx         # Single-Page mit allen Sektionen
  globals.css      # Tailwind + @theme Tokens + base layer
  impressum/, datenschutz/, not-found.tsx  # Legal stubs + 404
components/
  Navigation.tsx        # Sticky header, zentriertes Logo, Secondary-Nav
  MenuItem.tsx          # Underline-Hover Item
  DishCard.tsx          # Signature-Dish-Card (dunkler BG, kein Border)
  sections/             # Hero, SignatureDishes, Menu, Chef, Awards,
                        # Reservation, Footer
  ui/                   # shadcn-Komponenten (on-demand)
public/images/          # awards/, chef/, food/
docs/
  briefing-full.md      # Voller Sao-Briefing-Text
```
