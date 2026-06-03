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

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function validateCheckout(input: unknown) {
  return checkoutSchema.safeParse(input);
}

export function createOrderId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ATK-${date}-${random}`;
}

export function createMockOrder(
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
    status: "mock-paid",
    createdAt: now.toISOString(),
  };
}
