import { getProductById } from "./products";
import type { CartItem, CartLine } from "./types";

export const CART_STORAGE_KEY = "alltrek-cart";

export function normalizeCart(items: CartItem[]) {
  const map = new Map<string, CartItem>();

  for (const item of items) {
    if (!item.productId || item.quantity <= 0) {
      continue;
    }

    const key = `${item.productId}:${item.variantId ?? "default"}`;
    const existing = map.get(key);
    map.set(key, {
      productId: item.productId,
      variantId: item.variantId,
      quantity: Math.min(99, (existing?.quantity ?? 0) + Math.floor(item.quantity)),
    });
  }

  return Array.from(map.values());
}

export function getCartLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];

  for (const item of normalizeCart(items)) {
    const product = getProductById(item.productId);
    if (!product) {
      continue;
    }

    const variant =
      product.variants.find((candidate) => candidate.id === item.variantId) ?? product.variants[0];
    const unitPrice = variant?.price ?? product.price;
    lines.push({
      ...item,
      variantId: variant?.id,
      product,
      variant,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    });
  }

  return lines;
}

export function calculateSubtotal(items: CartItem[]) {
  return getCartLines(items).reduce((total, line) => total + line.lineTotal, 0);
}

export function calculateShipping(items: CartItem[], fulfillment: "delivery" | "pickup" = "delivery") {
  if (fulfillment === "pickup" || items.length === 0) {
    return 0;
  }

  const subtotal = calculateSubtotal(items);
  return subtotal >= 2500000 ? 0 : 45000;
}

export function calculateCartTotals(
  items: CartItem[],
  fulfillment: "delivery" | "pickup" = "delivery",
) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(items, fulfillment);
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

export function upsertCartItem(items: CartItem[], nextItem: CartItem) {
  return normalizeCart([...items, nextItem]);
}

export function updateCartQuantity(
  items: CartItem[],
  productId: string,
  variantId: string | undefined,
  quantity: number,
) {
  return normalizeCart(
    items
      .map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
      )
      .filter((item) => item.quantity > 0),
  );
}

export function removeCartItem(items: CartItem[], productId: string, variantId?: string) {
  return items.filter((item) => {
    if (item.productId !== productId) {
      return true;
    }

    return variantId !== undefined && item.variantId !== variantId;
  });
}
