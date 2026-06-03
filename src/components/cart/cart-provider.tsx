"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  calculateCartTotals,
  getCartLines,
  removeCartItem,
  updateCartQuantity,
  upsertCartItem,
} from "@/lib/cart";
import type { CartItem, Fulfillment } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  lines: ReturnType<typeof getCartLines>;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  setFulfillment: (fulfillment: Fulfillment) => void;
};

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "quantity"; productId: string; variantId?: string; quantity: number }
  | { type: "remove"; productId: string; variantId?: string }
  | { type: "clear" };

const CartContext = createContext<CartContextValue | undefined>(undefined);

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add":
      return upsertCartItem(items, action.item);
    case "quantity":
      return updateCartQuantity(items, action.productId, action.variantId, action.quantity);
    case "remove":
      return removeCartItem(items, action.productId, action.variantId);
    case "clear":
      return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      dispatch({ type: "hydrate", items: stored ? (JSON.parse(stored) as CartItem[]) : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hydrated, items]);

  const addItem = useCallback((item: CartItem) => dispatch({ type: "add", item }), []);
  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) =>
      dispatch({ type: "quantity", productId, variantId, quantity }),
    [],
  );
  const removeItem = useCallback(
    (productId: string, variantId?: string) => dispatch({ type: "remove", productId, variantId }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo(() => {
    const lines = getCartLines(items);
    const totals = calculateCartTotals(items, fulfillment);

    return {
      items,
      lines,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setFulfillment,
    };
  }, [addItem, clearCart, fulfillment, hydrated, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}
