import { z } from "zod";
import { products } from "./products";

export const agentRequestSchema = z.object({
  locale: z.enum(["id", "en"]).default("id"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(16),
  cart: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string().optional(),
        quantity: z.number().int().positive().max(99),
      }),
    )
    .default([]),
});

export const agentResponseSchema = z.object({
  answer: z.string().min(1),
  recommendedProductIds: z.array(z.string()).default([]),
  bundle: z
    .object({
      title: z.string(),
      productIds: z.array(z.string()),
      reason: z.string(),
    })
    .optional(),
  cartPatch: z
    .object({
      add: z
        .array(
          z.object({
            productId: z.string(),
            variantId: z.string().optional(),
            quantity: z.number().int().positive().max(20),
          }),
        )
        .optional(),
      remove: z.array(z.string()).optional(),
    })
    .optional(),
  quickReplies: z.array(z.string()).default([]),
});

export type AgentRequestInput = z.infer<typeof agentRequestSchema>;
export type ParsedAgentResponse = z.infer<typeof agentResponseSchema>;

const productIds = new Set(products.map((product) => product.id));

export function parseAgentResponse(rawText: string): ParsedAgentResponse {
  const trimmed = rawText.trim();
  const jsonText =
    trimmed.startsWith("{") && trimmed.endsWith("}")
      ? trimmed
      : (trimmed.match(/\{[\s\S]*\}/)?.[0] ?? trimmed);
  const parsed = JSON.parse(jsonText);
  const response = agentResponseSchema.parse(parsed);

  return {
    ...response,
    recommendedProductIds: response.recommendedProductIds
      .filter((id) => productIds.has(id))
      .slice(0, 6),
    bundle: response.bundle
      ? {
          ...response.bundle,
          productIds: response.bundle.productIds.filter((id) => productIds.has(id)).slice(0, 6),
        }
      : undefined,
    cartPatch: response.cartPatch
      ? {
          add: response.cartPatch.add
            ?.filter((item) => productIds.has(item.productId))
            .slice(0, 6),
          remove: response.cartPatch.remove?.filter((id) => productIds.has(id)).slice(0, 6),
        }
      : undefined,
    quickReplies: response.quickReplies.slice(0, 4),
  };
}

export function buildAgentSystemPrompt(locale: "id" | "en", catalogContext: unknown) {
  return [
    "You are Alltrek Camp Advisor, a shopping agent for Alltrek Indonesia.",
    "Use Gemini reasoning to recommend products by group size, weather, family/solo/glamping use, budget, and cart contents.",
    "Only recommend product IDs that exist in the provided catalog context.",
    "You may compare products, build starter bundles, explain pickup/store info, answer FAQ, and propose add-to-cart changes through cartPatch.",
    "If a product is sold out or preorder, say that clearly and recommend an available substitute when possible.",
    "Store details: Jakarta store at Jl. Mandala Raya No.8, Tomang, Jakarta Barat. Phone/WhatsApp 0813-1220-2716. Hours Monday-Saturday 09.00-20.00, Sunday 10.00-20.00.",
    `Respond in ${locale === "id" ? "Bahasa Indonesia" : "English"}.`,
    "Return strict JSON only with keys: answer, recommendedProductIds, bundle, cartPatch, quickReplies.",
    `Catalog context: ${JSON.stringify(catalogContext)}`,
  ].join("\n");
}
