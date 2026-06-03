import Link from "next/link";
import { ArrowRight, Building2, Compass, MapPin, Package, Phone, Store, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
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
  const bundleContent =
    locale === "id"
      ? [
          { title: "Paket hujan keluarga", copy: "Rangkaian tenda, tidur, masak, dan lampu untuk camp akhir pekan yang siap cuaca." },
          { title: "Display glamping", copy: "Produk berkarakter untuk venue, reseller, atau setup visual yang ingin tampil premium." },
          { title: "Starter ringkas", copy: "Perlengkapan awal yang efisien untuk camper baru tanpa mengorbankan fungsi utama." },
        ]
      : [
          { title: "Family rain kit", copy: "Tent, sleep, cooking, and lighting picks for a weather-ready weekend camp." },
          { title: "Glamping display", copy: "Character-rich gear for venues, resellers, or premium visual setups." },
          { title: "Compact starter", copy: "Efficient starter gear for new campers without losing the essentials." },
        ];

  return (
    <>
      <HomeHero dict={dict} locale={locale} />

      <section className="topo-lines border-b border-stone-900/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-3">
          {[
            { icon: Package, label: dict.home.statsProducts, value: `${products.length}+` },
            { icon: Store, label: dict.home.statsCategories, value: `${categoryOrder.length}` },
            { icon: MapPin, label: dict.home.statsStore, value: "Tomang" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="alive-card kinetic-border flex items-center gap-3 overflow-hidden rounded-[8px] p-4">
              <span className="grid size-11 place-items-center rounded-[8px] bg-emerald-900 text-white shadow-lg shadow-emerald-900/20">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold text-stone-950">{stat.value}</p>
                <p className="text-sm text-stone-600">{stat.label}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-emerald-800">
              <Compass className="size-4" />
              Alltrek field picks
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-950">{dict.home.bestSellers}</h2>
            <p className="mt-2 max-w-2xl text-stone-600">{dict.home.bestSellersCopy}</p>
          </div>
          <Link
            href={localizePath(locale, "/products")}
            className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-4 text-sm font-semibold text-stone-800"
          >
            {dict.common.viewProducts}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} dict={dict} locale={locale} eager={index < 4} />
          ))}
        </div>
      </section>

      <section className="border-y border-stone-900/10 bg-[#fffdf7]/72">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Reveal>
            <h2 className="text-3xl font-semibold text-stone-950">{dict.home.bundles}</h2>
          </Reveal>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {bundleProductIds.map((ids, index) => {
              const bundleProducts = ids
                .map((id) => products.find((product) => product.id === id))
                .filter((product): product is Product => Boolean(product));
              const content = bundleContent[index];
              return (
                <Reveal key={ids.join("-")} delay={index * 0.09}>
                  <div className="alive-card group overflow-hidden rounded-[8px] p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {index === 0 ? (
                        <Users className="size-5 text-emerald-800" />
                      ) : (
                        <Building2 className="size-5 text-emerald-800" />
                      )}
                      <h3 className="font-semibold text-stone-950">{content.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-stone-400">0{index + 1}</span>
                  </div>
                  <p className="mb-5 text-sm leading-6 text-stone-600">{content.copy}</p>
                  <div className="space-y-3">
                    {bundleProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={localizePath(locale, `/products/${product.slug}`)}
                        className="group/link flex items-center justify-between gap-3 border-l-2 border-amber-400 pl-3 text-sm font-medium text-stone-800 transition hover:border-emerald-800 hover:text-emerald-800"
                      >
                        <span className="line-clamp-1">{product.name}</span>
                        <ArrowRight className="size-3.5 shrink-0 opacity-0 transition group-hover/link:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="topo-lines bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <Reveal>
            <h2 className="text-3xl font-semibold">{dict.home.b2bTitle}</h2>
            <p className="mt-3 max-w-2xl text-emerald-50">{dict.home.b2bCopy}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl("Halo Alltrek, saya ingin konsultasi kebutuhan B2B outdoor.")}
                target="_blank"
                rel="noreferrer"
                className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-amber-400 px-4 text-sm font-semibold text-stone-950"
              >
                <Phone className="size-4" />
                {dict.common.contactWhatsApp}
              </a>
              <Link
                href={localizePath(locale, "/b2b")}
                className="button-rise inline-flex h-11 items-center justify-center rounded-[8px] border border-white/25 px-4 text-sm font-semibold text-white"
              >
                {dict.nav.b2b}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
          <div className="kinetic-border rounded-[8px] border border-white/15 bg-emerald-900/80 p-6">
            <p className="font-semibold">{store.name}</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50">{store.address}</p>
            <p className="mt-3 text-sm text-emerald-50">{store.phone}</p>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
