"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function CartSummary({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { lines, subtotal, shipping, total, updateQuantity, removeItem, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold text-stone-950">{dict.cart.emptyTitle}</h1>
        <p className="mt-3 max-w-xl text-stone-600">{dict.cart.emptyCopy}</p>
        <Link
          href={localizePath(locale, "/products")}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-emerald-900 px-5 text-sm font-semibold text-white"
        >
          {dict.common.continueShopping}
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-stone-950">{dict.cart.title}</h1>
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-200 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Trash2 className="size-4" />
            {dict.cart.clear}
          </button>
        </div>
        <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
          {lines.map((line) => (
            <div key={`${line.productId}-${line.variantId}`} className="grid gap-4 py-5 sm:grid-cols-[1fr_auto]">
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
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="inline-flex h-10 items-center rounded-md border border-stone-200">
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
                  className="grid size-10 place-items-center rounded-md border border-stone-200 text-stone-500 hover:text-red-700"
                  aria-label={dict.common.remove}
                  title={dict.common.remove}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="h-fit rounded-md border border-stone-200 bg-white p-5 shadow-sm">
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
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-900 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {dict.cart.checkout}
        </Link>
      </aside>
    </section>
  );
}
