import { describe, expect, it } from "vitest";
import { calculateCartTotals, getCartLines, normalizeCart } from "./cart";

describe("cart utilities", () => {
  it("normalizes duplicate cart lines", () => {
    const items = normalizeCart([
      { productId: "eclipta", variantId: "ivory-pro", quantity: 1 },
      { productId: "eclipta", variantId: "ivory-pro", quantity: 2 },
    ]);

    expect(items).toEqual([{ productId: "eclipta", variantId: "ivory-pro", quantity: 3 }]);
  });

  it("calculates totals with free delivery threshold", () => {
    const totals = calculateCartTotals([{ productId: "eclipta", variantId: "ivory-pro", quantity: 1 }]);

    expect(totals.subtotal).toBe(3050000);
    expect(totals.shipping).toBe(0);
    expect(totals.total).toBe(3050000);
  });

  it("hydrates cart lines from catalog data", () => {
    const lines = getCartLines([{ productId: "rygen", variantId: "black", quantity: 2 }]);

    expect(lines[0].product.name).toContain("RYGEN");
    expect(lines[0].lineTotal).toBe(280000);
  });
});
