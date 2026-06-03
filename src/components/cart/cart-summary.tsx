"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, PackageOpen, Plus, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { motionEase } from "@/components/motion/reveal";
import { formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function CartSummary({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { lines, subtotal, shipping, total, updateQuantity, removeItem, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: motionEase }}
        className="mx-auto flex min-h-[56vh] max-w-3xl flex-col items-center justify-center px-4 text-center"
      >
        <span className="mb-5 grid size-16 place-items-center rounded-[8px] bg-emerald-900 text-white shadow-xl shadow-emerald-900/20">
          <PackageOpen className="size-8" />
        </span>
        <h1 className="text-3xl font-semibold text-stone-950">{dict.cart.emptyTitle}</h1>
        <p className="mt-3 max-w-xl text-stone-600">{dict.cart.emptyCopy}</p>
        <Link
          href={localizePath(locale, "/products")}
          className="button-rise mt-6 inline-flex h-11 items-center rounded-[8px] bg-emerald-900 px-5 text-sm font-semibold text-white"
        >
          {dict.common.continueShopping}
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: motionEase }}
      className="mx-auto grid max-w-7xl items-start gap-6 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-8"
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-stone-950">{dict.cart.title}</h1>
          <button
            type="button"
            onClick={clearCart}
            className="button-rise inline-flex h-10 items-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm font-medium text-stone-700"
          >
            <Trash2 className="size-4" />
            {dict.cart.clear}
          </button>
        </div>
        <div className="mt-6 divide-y divide-stone-900/10 border-y border-stone-900/10 bg-white/45">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.div
                key={`${line.productId}-${line.variantId}`}
                layout
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.28, ease: motionEase }}
                className="grid gap-4 py-5 sm:grid-cols-[1fr_auto]"
              >
                <div className="flex gap-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-[8px] bg-stone-100">
                    <Image src={line.product.images[0]} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <Link
                      href={localizePath(locale, `/products/${line.product.slug}`)}
                      className="font-semibold text-stone-950 hover:text-emerald-800"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-stone-500">{line.variant?.name}</p>
                    <p className="mt-2 text-sm font-semibold text-stone-900">{formatPrice(line.unitPrice)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="inline-flex h-10 items-center rounded-[8px] border border-stone-900/15 bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.productId, line.variantId, line.quantity - 1)}
                    className="grid size-10 place-items-center text-stone-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.productId, line.variantId, line.quantity + 1)}
                    className="grid size-10 place-items-center text-stone-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(line.productId, line.variantId)}
                  className="grid size-10 place-items-center rounded-[8px] border border-stone-900/15 bg-white text-stone-500 hover:text-red-700"
                  aria-label={dict.common.remove}
                  title={dict.common.remove}
                >
                  <Trash2 className="size-4" />
                </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <aside className="alive-card sticky top-24 h-fit rounded-[8px] p-6">
        <h2 className="text-lg font-semibold text-stone-950">{dict.cart.summary}</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-600">{dict.common.subtotal}</dt>
            <dd className="font-semibold text-stone-950">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">{dict.common.shipping}</dt>
            <dd className="font-semibold text-stone-950">{shipping ? formatPrice(shipping) : dict.common.free}</dd>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base">
            <dt className="font-semibold text-stone-950">{dict.common.total}</dt>
            <dd className="font-semibold text-stone-950">{formatPrice(total)}</dd>
          </div>
        </dl>
        <Link
          href={localizePath(locale, "/checkout")}
          className="button-rise mt-6 inline-flex h-11 w-full items-center justify-center rounded-[8px] bg-emerald-900 px-4 text-sm font-semibold text-white"
        >
          {dict.cart.checkout}
        </Link>
      </aside>
    </motion.section>
  );
}
