"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, MapPin, PackageCheck, Truck } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { motionEase } from "@/components/motion/reveal";
import { CART_STORAGE_KEY, calculateCartTotals } from "@/lib/cart";
import { createOrder, validateCheckout } from "@/lib/checkout";
import { formatPrice } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import { writeOrderToStorage } from "@/lib/orders";
import { store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { Fulfillment, Locale, PaymentMethod } from "@/lib/types";

const inputClass =
  "mt-2 w-full rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]";

export function CheckoutForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const router = useRouter();
  const cart = useCart();
  const { setFulfillment } = cart;
  const [fulfillment, setFulfillmentState] = useState<Fulfillment>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank-transfer");
  const [error, setError] = useState("");
  const totals = useMemo(() => calculateCartTotals(cart.items, fulfillment), [cart.items, fulfillment]);

  useEffect(() => {
    setFulfillment(fulfillment);
  }, [fulfillment, setFulfillment]);

  function updateFulfillment(value: Fulfillment) {
    setFulfillmentState(value);
    cart.setFulfillment(value);
    if (value === "pickup") {
      setPaymentMethod("cash-pickup");
    } else if (paymentMethod === "cash-pickup") {
      setPaymentMethod("bank-transfer");
    }
  }

  if (cart.lines.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: motionEase }}
        className="mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="text-3xl font-semibold text-stone-950">{dict.cart.emptyTitle}</h1>
        <p className="mt-3 max-w-xl text-stone-600">{dict.cart.emptyCopy}</p>
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
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: motionEase }}
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const customer = {
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            phone: String(form.get("phone") ?? ""),
            city: String(form.get("city") || (fulfillment === "pickup" ? "Jakarta" : "")),
            address: String(form.get("address") || (fulfillment === "pickup" ? store.address : "")),
            notes: String(form.get("notes") ?? ""),
          };
          const input = { customer, fulfillment, paymentMethod };
          const validated = validateCheckout(input);
          if (!validated.success) {
            setError(dict.common.required);
            return;
          }

          try {
            const order = createOrder(validated.data, cart.items);
            writeOrderToStorage(window.localStorage, order);
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
            cart.clearCart();
            router.push(localizePath(locale, `/orders/${order.id}`));
          } catch (caught) {
            setError(caught instanceof Error ? caught.message : dict.agent.networkError);
          }
        }}
      >
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-800">
            {locale === "id" ? "Ringkas pesanan Alltrek" : "Alltrek order desk"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">{dict.checkout.title}</h1>
          <p className="mt-3 max-w-2xl text-stone-600">{dict.checkout.copy}</p>
        </div>

        <motion.fieldset
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.5, ease: motionEase }}
          className="alive-card rounded-[8px] p-6"
        >
          <legend className="flex items-center gap-2 px-1 text-sm font-semibold text-stone-950">
            <PackageCheck className="size-4" />
            {dict.checkout.fulfillment}
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { value: "delivery" as const, label: dict.checkout.delivery, icon: Truck },
              { value: "pickup" as const, label: dict.checkout.pickup, icon: MapPin },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateFulfillment(option.value)}
                className={[
                  "button-rise flex h-12 items-center gap-2 rounded-[8px] border px-3 text-sm font-semibold",
                  fulfillment === option.value
                    ? "border-emerald-800 bg-emerald-50 text-emerald-950"
                    : "border-stone-900/15 bg-white text-stone-700",
                ].join(" ")}
              >
                <option.icon className="size-4" />
                {option.label}
              </button>
            ))}
          </div>
        </motion.fieldset>

        <motion.fieldset
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.5, ease: motionEase }}
          className="alive-card rounded-[8px] p-6"
        >
          <legend className="px-1 text-sm font-semibold text-stone-950">{dict.checkout.contact}</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextInput label={dict.checkout.name} name="name" />
            <TextInput label={dict.checkout.email} name="email" type="email" />
            <TextInput label={dict.checkout.phone} name="phone" />
            <TextInput label={dict.checkout.city} name="city" />
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-stone-800">{dict.checkout.address}</span>
              <textarea
                name="address"
                rows={4}
                defaultValue={fulfillment === "pickup" ? store.address : ""}
                className={`${inputClass} py-2`}
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-stone-800">{dict.checkout.notes}</span>
              <textarea
                name="notes"
                rows={3}
                className={`${inputClass} py-2`}
              />
            </label>
          </div>
        </motion.fieldset>

        <motion.fieldset
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.5, ease: motionEase }}
          className="alive-card rounded-[8px] p-6"
        >
          <legend className="flex items-center gap-2 px-1 text-sm font-semibold text-stone-950">
            <CreditCard className="size-4" />
            {dict.checkout.payment}
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { value: "bank-transfer" as const, label: dict.checkout.bank },
              { value: "qris" as const, label: dict.checkout.qris },
              { value: "cash-pickup" as const, label: dict.checkout.cash },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPaymentMethod(option.value)}
                className={[
                  "button-rise h-12 rounded-[8px] border px-3 text-sm font-semibold",
                  paymentMethod === option.value
                    ? "border-emerald-800 bg-emerald-50 text-emerald-950"
                    : "border-stone-900/15 bg-white text-stone-700",
                ].join(" ")}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.fieldset>

        {error && <p className="rounded-[8px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="button-rise inline-flex h-12 w-full items-center justify-center rounded-[8px] bg-emerald-900 px-5 text-sm font-semibold text-white sm:w-auto"
        >
          {dict.checkout.placeOrder}
        </motion.button>
      </motion.form>

      <aside className="alive-card sticky top-24 h-fit rounded-[8px] p-6">
        <h2 className="text-lg font-semibold text-stone-950">{dict.cart.summary}</h2>
        <div className="mt-5 divide-y divide-stone-900/10 border-y border-stone-900/10">
          {cart.lines.map((line) => (
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
            <dd className="font-semibold text-stone-950">{formatPrice(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-600">{dict.common.shipping}</dt>
            <dd className="font-semibold text-stone-950">{totals.shipping ? formatPrice(totals.shipping) : dict.common.free}</dd>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-base">
            <dt className="font-semibold text-stone-950">{dict.common.total}</dt>
            <dd className="font-semibold text-stone-950">{formatPrice(totals.total)}</dd>
          </div>
        </dl>
      </aside>
    </motion.section>
  );
}

function TextInput({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label>
      <span className="text-sm font-semibold text-stone-800">{label}</span>
      <input
        name={name}
        type={type}
        className={`${inputClass} h-11`}
      />
    </label>
  );
}
