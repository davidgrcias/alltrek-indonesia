import { describe, expect, it } from "vitest";
import { filterProducts, products } from "./products";

describe("filterProducts", () => {
  it("finds tents by use case and sorts by price", () => {
    const result = filterProducts(products, {
      query: "family",
      category: "tents",
      sort: "price-asc",
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.category === "tents")).toBe(true);
    expect(result[0].price).toBeLessThanOrEqual(result.at(-1)?.price ?? 0);
  });

  it("filters unavailable products", () => {
    const soldOut = filterProducts(products, { availability: "sold-out" });

    expect(soldOut.length).toBeGreaterThan(0);
    expect(soldOut.every((product) => product.availability === "sold-out")).toBe(true);
  });
});
