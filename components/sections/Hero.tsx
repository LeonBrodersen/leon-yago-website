import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

const AWARD_BADGES = [
  "Michelin",
  "Time Out",
  "Asia's 50 Best",
  "Condé Nast",
];

export function Hero({ imageSrc, imageAlt = "" }: HeroProps = {}) {
  return (
    <section
      id="hero"
      aria-label="Willkommen bei Sao"
      className="relative flex min-h-[90vh] flex-col overflow-hidden bg-bg-dark"
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-bg-dark/40"
          />
        </>
      )}

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-24 sm:px-8 lg:px-12">
        <h1 className="text-center text-display text-ink-on-dark">
          Willkommen bei Sao
        </h1>
      </div>

      <div className="relative z-10 pb-10 sm:pb-14">
        <ul
          aria-label="Auszeichnungen"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 text-xs uppercase tracking-[0.3em] text-ink-on-dark/70 sm:px-8 lg:px-12"
        >
          {AWARD_BADGES.map((badge, i) => (
            <li key={badge} className="flex items-center gap-x-6">
              <span>{badge}</span>
              {i < AWARD_BADGES.length - 1 && (
                <span aria-hidden="true" className="text-accent">
                  ✦
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
