import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { getDictionary, isLocale, locales, localizePath } from "@/lib/i18n";
import { availabilityLabels, categoryLabels, getProductBySlug, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const dict = getDictionary(locale);
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_480px]">
        <ProductGallery product={product} locale={locale} />
        <ProductPurchasePanel product={product} dict={dict} locale={locale} />
      </section>

      <section className="border-y border-stone-900/10 bg-[#fffdf7]/75">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold text-stone-950">{dict.product.highlights}</h2>
            <ul className="mt-5 space-y-3">
              {product.features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex gap-3 border-l-2 border-amber-400 bg-white/50 py-2 pl-3 pr-2 text-sm leading-6 text-stone-700"
                >
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-800" />
                  <span className="sr-only">{index + 1}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-semibold text-stone-950">{dict.product.details}</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label={dict.common.category} value={categoryLabels[product.category][locale]} />
              <Info label={dict.common.availability} value={availabilityLabels[product.availability][locale]} />
              <Info label={dict.product.capacity} value={product.capacity ?? "-"} />
              <Info label={dict.product.weather} value={product.weather ?? "-"} />
            </dl>
            <Link
              href={localizePath(locale, "/products")}
              className="button-rise mt-6 inline-flex h-10 items-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-4 text-sm font-semibold text-stone-800"
            >
              <ArrowLeft className="size-4" />
              {dict.common.back}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Reveal>
          <h2 className="text-2xl font-semibold text-stone-950">{dict.product.pairWith}</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} dict={dict} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-stone-900/15 bg-white p-3">
      <p className="text-xs font-semibold uppercase text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-950">{value}</p>
    </div>
  );
}
