"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.button
      type="button"
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      whileHover={disabled ? undefined : { y: -2 }}
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
        "button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border px-4 text-sm font-semibold",
        compact ? "w-11 px-0" : "w-full sm:w-auto",
        disabled
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400"
          : added
            ? "border-amber-400 bg-amber-400 text-stone-950"
            : "border-emerald-900 bg-emerald-900 text-white",
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {added ? <Check className="size-4" /> : compact ? <Plus className="size-4" /> : <ShoppingCart className="size-4" />}
      {!compact && <span>{added ? addedLabel : label}</span>}
    </motion.button>
  );
}
