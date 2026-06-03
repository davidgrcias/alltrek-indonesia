import { describe, expect, it, vi } from "vitest";
import { createOrder, validateCheckout } from "./checkout";

const validInput = {
  customer: {
    name: "David Garcia",
    email: "david@example.com",
    phone: "081312202716",
    city: "Jakarta",
    address: "Jl. Mandala Raya No.8",
    notes: "Pickup sore",
  },
  fulfillment: "pickup" as const,
  paymentMethod: "cash-pickup" as const,
};

describe("checkout utilities", () => {
  it("validates required customer fields", () => {
    expect(validateCheckout(validInput).success).toBe(true);
    expect(validateCheckout({ ...validInput, customer: { ...validInput.customer, email: "bad" } }).success).toBe(
      false,
    );
  });

  it("creates a confirmed order", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.123456);
    const order = createOrder(
      validInput,
      [{ productId: "rygen", variantId: "black", quantity: 2 }],
      new Date("2026-06-03T08:00:00.000Z"),
    );

    expect(order.id).toMatch(/^ATK-20260603-/);
    expect(order.status).toBe("confirmed");
    expect(order.shipping).toBe(0);
    expect(order.total).toBe(280000);
    vi.restoreAllMocks();
  });
});
