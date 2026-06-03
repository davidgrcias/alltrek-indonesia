"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
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

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_180px_180px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.products.search}
            className="h-11 w-full rounded-md border border-stone-200 pl-9 pr-3 text-sm outline-none focus:border-emerald-700"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ProductCategory | "all")}
          className="h-11 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-emerald-700"
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
          className="h-11 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-emerald-700"
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
          className="h-11 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-emerald-700"
        >
          <option value="featured">{dict.products.featured}</option>
          <option value="price-asc">{dict.products.priceAsc}</option>
          <option value="price-desc">{dict.products.priceDesc}</option>
          <option value="rating">{dict.products.rating}</option>
        </select>
      </div>

      <div className="mt-5 text-sm font-medium text-stone-600">
        {filtered.length} {dict.products.results}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} dict={dict} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-stone-200 bg-white p-10 text-center text-stone-600">
          {dict.products.empty}
        </div>
      )}
    </section>
  );
}
