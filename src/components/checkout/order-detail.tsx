"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { getCartLines } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import { getOrderFromStorage } from "@/lib/orders";
import { getWhatsAppUrl, store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale, Order } from "@/lib/types";

export function OrderDetail({ id, dict, locale }: { id: string; dict: Dictionary; locale: Locale }) {
  const snapshotRef = useRef<{ id: string; order: Order | null } | null>(null);
  const order = useSyncExternalStore<Order | null | undefined>(
    () => () => undefined,
    () => {
      if (snapshotRef.current?.id === id) {
        return snapshotRef.current.order;
      }
      const nextOrder = getOrderFromStorage(window.localStorage, id) ?? null;
      snapshotRef.current = { id, order: nextOrder };
      return nextOrder;
    },
    () => undefined,
  );

  if (order === undefined) {
    return <section className="mx-auto max-w-5xl px-4 py-12 text-stone-600">{dict.common.loading}</section>;
  }

  if (!order) {
    return (
      <section className="mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-semibold text-stone-950">{dict.order.notFound}</h1>
        <Link
          href={localizePath(locale, "/products")}
          className="mt-6 inline-flex h-11 items-center rounded-md bg-emerald-900 px-5 text-sm font-semibold text-white"
        >
          {dict.common.continueShopping}
        </Link>
      </section>
    );
  }

  const lines = getCartLines(order.items);
  const whatsappMessage = `Halo Alltrek, saya ingin konfirmasi pesanan mock ${order.id} dengan total ${formatPrice(order.total)}.`;

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
      <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 size-8 text-emerald-800" />
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-800">{dict.order.status}</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">{dict.order.successTitle}</h1>
            <p className="mt-3 max-w-2xl text-stone-600">{dict.order.successCopy}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Info label={dict.order.title} value={order.id} />
          <Info label={dict.checkout.payment} value={order.paymentMethod} />
          <Info label={dict.checkout.fulfillment} value={order.fulfillment} />
          <Info label={dict.checkout.phone} value={order.customer.phone} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-900 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {dict.common.contactWhatsApp}
          </a>
          <a
            href={store.tokopediaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-200 px-5 text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            {dict.common.tokopedia}
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      <aside className="h-fit rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-950">{dict.cart.summary}</h2>
        <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
          {lines.map((line) => (
            <div key={`${line.productId}-${line.variantId}`} className="py-3 text-sm">
              <p className="line-clamp-1 font-semibold text-stone-950">{line.product.name}</p>
              <p className="mt-1 text-stone-500">
                {line.quantity} x {formatPrice(line.unitPrice)}
              </p>
            </div>
          ))}
        </div>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-600">{dict.common.subtotal}</dt>
            <dd className="font-semibold text-stone-950">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">{dict.common.shipping}</dt>
            <dd className="font-semibold text-stone-950">{order.shipping ? formatPrice(order.shipping) : dict.common.free}</dd>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base">
            <dt className="font-semibold text-stone-950">{dict.common.total}</dt>
            <dd className="font-semibold text-stone-950">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-stone-200 p-3">
      <p className="text-xs font-semibold uppercase text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-950">{value}</p>
    </div>
  );
}
