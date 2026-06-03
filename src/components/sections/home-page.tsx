import Link from "next/link";
import { Building2, MapPin, Package, Phone, Store, Users } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { HomeHero } from "./home-hero";
import { categoryOrder, getFeaturedProducts, products } from "@/lib/products";
import { localizePath } from "@/lib/i18n";
import { getWhatsAppUrl, store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale, Product } from "@/lib/types";

const bundleProductIds = [
  ["eclipta", "stovy", "castry", "rygen"],
  ["peak-villa", "starion", "tenka-table", "guitor-chair"],
  ["evoria", "volark", "comfy", "pyro-stove"],
];

export function HomePage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const featured = getFeaturedProducts(8);

  return (
    <>
      <HomeHero dict={dict} locale={locale} />

      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3">
          {[
            { icon: Package, label: dict.home.statsProducts, value: `${products.length}+` },
            { icon: Store, label: dict.home.statsCategories, value: `${categoryOrder.length}` },
            { icon: MapPin, label: dict.home.statsStore, value: "Tomang" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-md bg-emerald-50 text-emerald-900">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold text-stone-950">{stat.value}</p>
                <p className="text-sm text-stone-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">{dict.home.bestSellers}</h2>
            <p className="mt-2 max-w-2xl text-stone-600">{dict.home.bestSellersCopy}</p>
          </div>
          <Link
            href={localizePath(locale, "/products")}
            className="inline-flex h-11 items-center justify-center rounded-md border border-stone-200 px-4 text-sm font-semibold text-stone-800 hover:bg-white"
          >
            {dict.common.viewProducts}
          </Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} dict={dict} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-3xl font-semibold text-stone-950">{dict.home.bundles}</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {bundleProductIds.map((ids, index) => {
              const bundleProducts = ids
                .map((id) => products.find((product) => product.id === id))
                .filter((product): product is Product => Boolean(product));
              return (
                <div key={ids.join("-")} className="rounded-md border border-stone-200 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    {index === 0 ? <Users className="size-5 text-emerald-800" /> : <Building2 className="size-5 text-emerald-800" />}
                    <h3 className="font-semibold text-stone-950">
                      {index === 0 ? "Family rain-ready" : index === 1 ? "Glamping display" : "Budget starter"}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {bundleProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={localizePath(locale, `/products/${product.slug}`)}
                        className="block border-l-2 border-amber-400 pl-3 text-sm font-medium text-stone-800 hover:text-emerald-800"
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold">{dict.home.b2bTitle}</h2>
            <p className="mt-3 max-w-2xl text-emerald-50">{dict.home.b2bCopy}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl("Halo Alltrek, saya ingin konsultasi kebutuhan B2B outdoor.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-amber-400 px-4 text-sm font-semibold text-stone-950"
              >
                <Phone className="size-4" />
                {dict.common.contactWhatsApp}
              </a>
              <Link
                href={localizePath(locale, "/b2b")}
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/25 px-4 text-sm font-semibold text-white hover:bg-white/10"
              >
                {dict.nav.b2b}
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-white/15 p-5">
            <p className="font-semibold">{store.name}</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">{store.address}</p>
            <p className="mt-3 text-sm text-emerald-50">{store.phone}</p>
          </div>
        </div>
      </section>
    </>
  );
}
