import { Star } from "lucide-react";

export interface MenuItemProps {
  name: string;
  description?: string;
  price: string;
  highlight?: boolean;
  starred?: boolean;
  quote?: { text: string; source: string };
}

export function MenuItem({
  name,
  description,
  price,
  highlight,
  starred,
  quote,
}: MenuItemProps) {
  const containerClass = highlight
    ? "my-2 border border-border bg-bg p-6"
    : "border-b border-border py-4";

  return (
    <article className={containerClass}>
      <div className="flex items-baseline gap-4">
        <div className="flex-1">
          <h4 className="flex items-center gap-2 text-xl text-ink">
            {name}
            {starred && (
              <Star
                className="h-4 w-4 fill-accent text-accent"
                aria-label="Hausspezialität"
              />
            )}
          </h4>
          {description && (
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
          )}
        </div>
        <div className="whitespace-nowrap font-serif text-lg text-ink">
          {price} €
        </div>
      </div>
      {quote && (
        <blockquote className="mt-3 border-l-2 border-accent pl-3 text-sm italic text-ink-muted">
          „{quote.text}"
          <span className="not-italic"> — {quote.source}</span>
        </blockquote>
      )}
    </article>
  );
}
