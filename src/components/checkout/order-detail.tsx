"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, MessageCircle } from "lucide-react";
import { getCartLines } from "@/lib/cart";
import { motionEase } from "@/components/motion/reveal";
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
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: motionEase }}
        className="mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="text-3xl font-semibold text-stone-950">{dict.order.notFound}</h1>
        <Link
          href={localizePath(locale, "/products")}
          className="button-rise mt-6 inline-flex h-11 items-center rounded-[8px] bg-emerald-900 px-5 text-sm font-semibold text-white"
        >
          {dict.common.continueShopping}
        </Link>
      </motion.section>
    );
  }

  const lines = getCartLines(order.items);
  const whatsappMessage = `Halo Alltrek, saya ingin konfirmasi pesanan ${order.id} dengan total ${formatPrice(order.total)}.`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: motionEase }}
      className="mx-auto grid max-w-7xl items-start gap-6 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-8"
    >
      <div className="alive-card rounded-[8px] p-6">
        <div className="flex items-start gap-3">
          <motion.span
            initial={{ scale: 0.6, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="mt-1 grid size-10 place-items-center rounded-[8px] bg-emerald-900 text-white"
          >
            <CheckCircle2 className="size-6" />
          </motion.span>
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
            className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-emerald-900 px-5 text-sm font-semibold text-white"
          >
            <MessageCircle className="size-4" />
            {dict.common.contactWhatsApp}
          </a>
          <a
            href={store.tokopediaUrl}
            target="_blank"
            rel="noreferrer"
            className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-5 text-sm font-semibold text-stone-800"
          >
            {dict.common.tokopedia}
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      <aside className="alive-card sticky top-24 h-fit rounded-[8px] p-6">
        <h2 className="text-lg font-semibold text-stone-950">{dict.cart.summary}</h2>
        <div className="mt-5 divide-y divide-stone-900/10 border-y border-stone-900/10">
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
    </motion.section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-stone-900/15 bg-white/65 p-3">
      <p className="text-xs font-semibold uppercase text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-950">{value}</p>
    </div>
  );
}
