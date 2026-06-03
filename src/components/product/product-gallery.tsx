"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { motionEase } from "@/components/motion/reveal";
import type { Locale, Product } from "@/lib/types";

export function ProductGallery({ product, locale }: { product: Product; locale: Locale }) {
  const [active, setActive] = useState(product.images[0]);

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, ease: motionEase }}
        className="alive-card relative aspect-[4/3] overflow-hidden rounded-[8px] bg-stone-100"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04, clipPath: "inset(0 0 0 18%)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0, scale: 0.98, clipPath: "inset(0 18% 0 0)" }}
            transition={{ duration: 0.48, ease: motionEase }}
            className="absolute inset-0"
          >
            <Image
              src={active}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/22 via-transparent to-transparent" />
      </motion.div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-500">
        <span className="h-px flex-1 bg-stone-900/15" />
        {product.images.length} {locale === "id" ? "foto" : "views"}
      </div>
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(0, 8).map((image) => (
            <motion.button
              key={image}
              type="button"
              onClick={() => setActive(image)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className={[
                "relative aspect-square overflow-hidden rounded-[8px] border bg-stone-100 transition",
                active === image ? "border-emerald-800 shadow-lg shadow-emerald-900/10" : "border-stone-900/15",
              ].join(" ")}
            >
              <Image src={image} alt="" fill sizes="120px" className="object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
