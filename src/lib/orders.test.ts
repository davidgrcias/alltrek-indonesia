import { describe, expect, it } from "vitest";
import { getOrderFromStorage, readOrdersFromStorage, writeOrderToStorage } from "./orders";
import type { Order } from "./types";

function createMemoryStorage(): Storage {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => Array.from(values.keys())[index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
}

const order: Order = {
  id: "ATK-20260603-ABCDE",
  customer: {
    name: "David",
    email: "david@example.com",
    phone: "081312202716",
    city: "Jakarta",
    address: "Jl. Mandala Raya No.8",
  },
  fulfillment: "pickup",
  paymentMethod: "cash-pickup",
  items: [{ productId: "rygen", variantId: "black", quantity: 1 }],
  subtotal: 140000,
  shipping: 0,
  total: 140000,
  status: "confirmed",
  createdAt: "2026-06-03T08:00:00.000Z",
};

describe("order storage utilities", () => {
  it("writes and reads local orders", () => {
    const storage = createMemoryStorage();

    writeOrderToStorage(storage, order);

    expect(readOrdersFromStorage(storage)).toHaveLength(1);
    expect(getOrderFromStorage(storage, order.id)?.total).toBe(140000);
  });
});
