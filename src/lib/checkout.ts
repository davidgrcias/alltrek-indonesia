import { z } from "zod";
import { calculateCartTotals } from "./cart";
import type { CartItem, Fulfillment, Order, PaymentMethod } from "./types";

export const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    city: z.string().min(2),
    address: z.string().min(5),
    notes: z.string().optional(),
  }),
  fulfillment: z.enum(["delivery", "pickup"]),
  paymentMethod: z.enum(["bank-transfer", "qris", "cash-pickup"]),
});

export const CHECKOUT_DRAFT_STORAGE_KEY = "alltrek-checkout-draft";

export const checkoutDraftSchema = z.object({
  customer: z
    .object({
      name: z.string().trim().max(120).optional(),
      email: z.string().trim().max(160).optional(),
      phone: z.string().trim().max(60).optional(),
      city: z.string().trim().max(120).optional(),
      address: z.string().trim().max(500).optional(),
      notes: z.string().trim().max(500).optional(),
    })
    .optional(),
  fulfillment: z.enum(["delivery", "pickup"]).optional(),
  paymentMethod: z.enum(["bank-transfer", "qris", "cash-pickup"]).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutDraft = z.infer<typeof checkoutDraftSchema>;

type CheckoutDraftStorage = Pick<Storage, "getItem" | "removeItem" | "setItem">;

export function validateCheckout(input: unknown) {
  return checkoutSchema.safeParse(input);
}

export function readCheckoutDraft(storage: Pick<Storage, "getItem" | "removeItem">) {
  try {
    const stored = storage.getItem(CHECKOUT_DRAFT_STORAGE_KEY);
    if (!stored) {
      return undefined;
    }

    const parsed = checkoutDraftSchema.safeParse(JSON.parse(stored));
    if (!parsed.success) {
      storage.removeItem(CHECKOUT_DRAFT_STORAGE_KEY);
      return undefined;
    }

    return parsed.data;
  } catch {
    storage.removeItem(CHECKOUT_DRAFT_STORAGE_KEY);
    return undefined;
  }
}

export function writeCheckoutDraft(storage: CheckoutDraftStorage, draft: CheckoutDraft) {
  storage.setItem(CHECKOUT_DRAFT_STORAGE_KEY, JSON.stringify(checkoutDraftSchema.parse(draft)));
}

export function createOrderId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ATK-${date}-${random}`;
}

export function createOrder(
  input: {
    customer: CheckoutInput["customer"];
    fulfillment: Fulfillment;
    paymentMethod: PaymentMethod;
  },
  items: CartItem[],
  now = new Date(),
): Order {
  const parsed = checkoutSchema.parse(input);
  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totals = calculateCartTotals(items, parsed.fulfillment);

  return {
    id: createOrderId(now),
    customer: parsed.customer,
    fulfillment: parsed.fulfillment,
    paymentMethod: parsed.paymentMethod,
    items,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    total: totals.total,
    status: "confirmed",
    createdAt: now.toISOString(),
  };
}
