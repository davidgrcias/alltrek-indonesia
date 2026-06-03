import { describe, expect, it } from "vitest";
import { getDictionary, lookup, switchLocalePath } from "./i18n";

describe("i18n helpers", () => {
  it("looks up nested dictionary values", () => {
    expect(lookup(getDictionary("id"), "nav.products")).toBe("Produk");
    expect(lookup(getDictionary("en"), "checkout.title")).toBe("Mock checkout");
  });

  it("switches locale while preserving the path", () => {
    expect(switchLocalePath("/id/products/eclipta", "en")).toBe("/en/products/eclipta");
  });
});
