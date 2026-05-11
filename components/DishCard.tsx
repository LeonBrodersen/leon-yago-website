import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface DishCardProps {
  name: string;
  price: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function DishCard({
  name,
  price,
  href,
  imageSrc,
  imageAlt = "",
}: DishCardProps) {
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-dark">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between text-ink-on-dark">
        <h3 className="text-base">{name}</h3>
        <span className="flex items-center gap-1 text-sm">
          €{price}
          <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex flex-col gap-4 bg-bg-darker p-4 transition-colors duration-200 hover:bg-bg-dark"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="flex flex-col gap-4 bg-bg-darker p-4">{body}</article>
  );
}
