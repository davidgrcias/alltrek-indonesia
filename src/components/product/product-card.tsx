import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { availabilityLabels, categoryLabels, formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale, Product } from "@/lib/types";

export function ProductCard({
  product,
  dict,
  locale,
}: {
  product: Product;
  dict: Dictionary;
  locale: Locale;
}) {
  const category = categoryLabels[product.category][locale];
  const availability = availabilityLabels[product.availability][locale];

  return (
    <article className="group overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={localizePath(locale, `/products/${product.slug}`)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span key={badge} className="rounded bg-white/95 px-2 py-1 text-xs font-semibold text-stone-950">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold uppercase text-stone-500">
            <span>{category}</span>
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Star className="size-3.5 fill-amber-500" />
              {product.rating.toFixed(1)}
            </span>
          </div>
          <Link
            href={localizePath(locale, `/products/${product.slug}`)}
            className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-stone-950 hover:text-emerald-800"
          >
            {product.name}
          </Link>
          <p className="mt-2 text-xs font-medium text-stone-500">{availability}</p>
        </div>
        <div className="flex min-h-11 items-end justify-between gap-3">
          <div>
            <p className="font-semibold text-stone-950">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-stone-500 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
          <AddToCartButton
            product={product}
            compact
            label={dict.common.addToCart}
            addedLabel={dict.common.added}
          />
        </div>
      </div>
    </article>
  );
}
