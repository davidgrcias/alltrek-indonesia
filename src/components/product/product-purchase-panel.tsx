"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Minus, Plus, ShieldCheck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { motionEase } from "@/components/motion/reveal";
import { availabilityLabels, categoryLabels, formatPrice } from "@/lib/products";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale, Product } from "@/lib/types";

export function ProductPurchasePanel({
  product,
  dict,
  locale,
}: {
  product: Product;
  dict: Dictionary;
  locale: Locale;
}) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const selectedVariant = product.variants.find((variant) => variant.id === variantId);
  const price = selectedVariant?.price ?? product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.64, ease: motionEase }}
      className="alive-card rounded-[8px] p-5"
    >
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge, index) => (
          <motion.span
            key={badge}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: motionEase }}
            className="rounded bg-emerald-900/10 px-2.5 py-1 text-xs font-semibold text-emerald-900"
          >
            {badge}
          </motion.span>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold uppercase text-stone-500">
        {categoryLabels[product.category][locale]}
      </p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight text-stone-950">{product.name}</h1>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <motion.p
          key={price}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-stone-950"
        >
          {formatPrice(price)}
        </motion.p>
        {product.compareAtPrice && (
          <p className="pb-1 text-sm text-stone-500 line-through">{formatPrice(product.compareAtPrice)}</p>
        )}
        {product.discountLabel && (
          <span className="mb-1 rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">
            {product.discountLabel}
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
        <div className="rounded-[8px] border border-stone-900/15 bg-white/60 p-3">
          <p className="text-xs font-semibold uppercase text-stone-500">{dict.common.availability}</p>
          <p className="mt-1 font-semibold text-stone-950">{availabilityLabels[product.availability][locale]}</p>
        </div>
        <div className="rounded-[8px] border border-stone-900/15 bg-white/60 p-3">
          <p className="text-xs font-semibold uppercase text-stone-500">{dict.product.capacity}</p>
          <p className="mt-1 font-semibold text-stone-950">{product.capacity ?? "-"}</p>
        </div>
      </div>

      {product.variants.length > 0 && (
        <label className="mt-5 block text-sm font-semibold text-stone-800">
          {dict.product.chooseVariant}
          <select
            value={variantId}
            onChange={(event) => setVariantId(event.target.value)}
            className="mt-2 h-11 w-full rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-emerald-700 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name} - {formatPrice(variant.price ?? product.price)}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="inline-flex h-11 w-full items-center justify-between rounded-[8px] border border-stone-900/15 bg-white sm:w-36">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="grid size-11 place-items-center rounded-[8px] transition hover:bg-stone-950/5"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            className="grid size-11 place-items-center rounded-[8px] transition hover:bg-stone-950/5"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <AddToCartButton
          product={product}
          variantId={variantId}
          quantity={quantity}
          label={dict.common.addToCart}
          addedLabel={dict.common.added}
        />
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-[8px] border border-emerald-900/10 bg-emerald-900/5 p-3 text-sm text-stone-600">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-800" />
        <p>{dict.product.sourceCopy}</p>
      </div>

      <a
        href={product.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="button-rise mt-4 inline-flex h-10 items-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm font-semibold text-stone-700"
      >
        {dict.common.source}
        <ExternalLink className="size-4" />
      </a>
    </motion.div>
  );
}
