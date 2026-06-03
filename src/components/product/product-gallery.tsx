"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(product.images[0]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-stone-100">
        <Image src={active} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
      </div>
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(0, 8).map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(image)}
              className={[
                "relative aspect-square overflow-hidden rounded-md border bg-stone-100",
                active === image ? "border-emerald-800" : "border-stone-200",
              ].join(" ")}
            >
              <Image src={image} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
