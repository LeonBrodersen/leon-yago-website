import { Star } from "lucide-react";

export interface MenuItemProps {
  name: string;
  description?: string;
  price: string;
  starred?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MenuItem({
  name,
  description,
  price,
  starred,
  onMouseEnter,
  onMouseLeave,
}: MenuItemProps) {
  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group flex items-baseline justify-between gap-4 border-b border-border py-4"
    >
      <div className="flex-1">
        <h3 className="flex items-center gap-2 text-base text-ink underline-offset-4 group-hover:underline">
          {name}
          {starred && (
            <>
              <Star
                aria-hidden="true"
                className="h-3.5 w-3.5 fill-accent text-accent"
              />
              <span className="sr-only">Signatur-Gericht</span>
            </>
          )}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        )}
      </div>
      <span className="whitespace-nowrap text-sm text-ink-muted">€{price}</span>
    </li>
  );
}
