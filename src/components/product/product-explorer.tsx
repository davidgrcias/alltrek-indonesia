"use client";

import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { motionEase } from "@/components/motion/reveal";
import { availabilityLabels, categoryLabels, categoryOrder, filterProducts } from "@/lib/products";
import type { Dictionary } from "@/dictionaries/id";
import type { Availability, Locale, Product, ProductCategory } from "@/lib/types";

export function ProductExplorer({
  products,
  dict,
  locale,
}: {
  products: Product[];
  dict: Dictionary;
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [availability, setAvailability] = useState<Availability | "all">("all");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filtered = useMemo(
    () => filterProducts(products, { query, category, availability, sort }),
    [availability, category, products, query, sort],
  );
  const controlClass =
    "h-11 rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-emerald-700 focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: motionEase }}
      className="mx-auto max-w-7xl px-6 py-12"
    >
      <div className="alive-card kinetic-border grid gap-3 overflow-hidden rounded-[8px] p-5 md:grid-cols-[1fr_220px_180px_180px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.products.search}
            className={`${controlClass} w-full pl-9`}
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ProductCategory | "all")}
          className={controlClass}
        >
          <option value="all">{dict.products.allCategories}</option>
          {categoryOrder.map((key) => (
            <option key={key} value={key}>
              {categoryLabels[key][locale]}
            </option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(event) => setAvailability(event.target.value as Availability | "all")}
          className={controlClass}
        >
          <option value="all">{dict.products.allStatus}</option>
          {Object.entries(availabilityLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label[locale]}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as typeof sort)}
          className={controlClass}
        >
          <option value="featured">{dict.products.featured}</option>
          <option value="price-asc">{dict.products.priceAsc}</option>
          <option value="price-desc">{dict.products.priceDesc}</option>
          <option value="rating">{dict.products.rating}</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={[
            "h-9 shrink-0 rounded-[8px] border px-3 text-xs font-semibold transition",
            category === "all"
              ? "border-stone-950 bg-stone-950 text-white"
              : "border-stone-900/15 bg-white text-stone-700 hover:border-emerald-800",
          ].join(" ")}
        >
          {dict.products.allCategories}
        </button>
        {categoryOrder.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={[
              "h-9 shrink-0 rounded-[8px] border px-3 text-xs font-semibold transition",
              category === key
                ? "border-emerald-900 bg-emerald-900 text-white"
                : "border-stone-900/15 bg-white text-stone-700 hover:border-emerald-800",
            ].join(" ")}
          >
            {categoryLabels[key][locale]}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-5 text-sm font-medium text-stone-600">
        {filtered.length} {dict.products.results}
      </motion.div>

      {filtered.length > 0 ? (
        <motion.div layout className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div key={product.id} layout exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.24 }}>
                <ProductCard product={product} dict={dict} locale={locale} eager={index < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="alive-card mt-8 rounded-[8px] p-10 text-center text-stone-600"
        >
          {dict.products.empty}
        </motion.div>
      )}
    </motion.section>
  );
}
