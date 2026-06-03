"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { motionEase } from "@/components/motion/reveal";
import { availabilityLabels, categoryLabels, formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale, Product } from "@/lib/types";

export function ProductCard({
  product,
  dict,
  locale,
  eager = false,
}: {
  product: Product;
  dict: Dictionary;
  locale: Locale;
  eager?: boolean;
}) {
  const category = categoryLabels[product.category][locale];
  const availability = availabilityLabels[product.availability][locale];
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.58, ease: motionEase }}
      className="alive-card group overflow-hidden rounded-[8px]"
    >
      <Link href={localizePath(locale, `/products/${product.slug}`)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/5 to-transparent opacity-80 transition group-hover:opacity-95" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span key={badge} className="rounded bg-white px-2 py-1 text-xs font-semibold text-stone-950 shadow-sm">
                {badge}
              </span>
            ))}
          </div>
          <span className="absolute bottom-3 right-3 inline-flex size-9 translate-y-2 items-center justify-center rounded-[8px] bg-amber-400 text-stone-950 opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
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
          <p className="mt-3 inline-flex rounded border border-emerald-900/15 bg-emerald-900/5 px-2 py-1 text-xs font-semibold text-emerald-900">
            {availability}
          </p>
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
    </motion.article>
  );
}
