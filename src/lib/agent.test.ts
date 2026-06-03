import { describe, expect, it } from "vitest";
import { parseAgentResponse } from "./agent";

describe("parseAgentResponse", () => {
  it("parses and clamps product IDs to the local catalog", () => {
    const parsed = parseAgentResponse(
      JSON.stringify({
        answer: "Pilih Eclipta dan Rygen untuk keluarga.",
        recommendedProductIds: ["eclipta", "missing", "rygen"],
        bundle: {
          title: "Family starter",
          productIds: ["eclipta", "missing", "stovy"],
          reason: "Tenda, tidur, dan lampu.",
        },
        cartPatch: {
          add: [
            { productId: "eclipta", variantId: "ivory-pro", quantity: 1 },
            { productId: "missing", quantity: 1 },
          ],
        },
        quickReplies: ["Budget 3 juta", "Untuk hujan", "Pickup toko", "Tambah lampu", "Extra"],
      }),
    );

    expect(parsed.recommendedProductIds).toEqual(["eclipta", "rygen"]);
    expect(parsed.bundle?.productIds).toEqual(["eclipta", "stovy"]);
    expect(parsed.cartPatch?.add).toHaveLength(1);
    expect(parsed.quickReplies).toHaveLength(4);
  });
});
