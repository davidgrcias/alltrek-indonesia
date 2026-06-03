"use client";

import { useState } from "react";
import { Check, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "./cart-provider";
import type { Product } from "@/lib/types";

type AddToCartButtonProps = {
  product: Product;
  variantId?: string;
  quantity?: number;
  label: string;
  addedLabel: string;
  compact?: boolean;
};

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  label,
  addedLabel,
  compact,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const disabled = product.availability === "sold-out";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        addItem({
          productId: product.id,
          variantId: variantId ?? product.variants[0]?.id,
          quantity,
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={[
        "inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition",
        compact ? "w-11 px-0" : "w-full sm:w-auto",
        disabled
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
          : "border-emerald-900 bg-emerald-900 text-white hover:bg-emerald-800",
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {added ? <Check className="size-4" /> : compact ? <Plus className="size-4" /> : <ShoppingCart className="size-4" />}
      {!compact && <span>{added ? addedLabel : label}</span>}
    </button>
  );
}
