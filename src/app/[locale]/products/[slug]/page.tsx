import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { getDictionary, isLocale, locales, localizePath } from "@/lib/i18n";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

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
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_480px]">
        <ProductGallery product={product} />
        <ProductPurchasePanel product={product} dict={dict} locale={locale} />
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-stone-950">{dict.product.highlights}</h2>
            <ul className="mt-5 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="border-l-2 border-amber-400 pl-3 text-sm leading-6 text-stone-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-stone-950">{dict.product.details}</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label={dict.common.category} value={product.category} />
              <Info label={dict.common.availability} value={product.availability} />
              <Info label={dict.product.capacity} value={product.capacity ?? "-"} />
              <Info label={dict.product.weather} value={product.weather ?? "-"} />
            </dl>
            <Link
              href={localizePath(locale, "/products")}
              className="mt-6 inline-flex h-10 items-center rounded-md border border-stone-200 px-4 text-sm font-semibold text-stone-800 hover:bg-stone-50"
            >
              {dict.common.back}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-semibold text-stone-950">{dict.product.pairWith}</h2>
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
    <div className="rounded-md border border-stone-200 p-3">
      <p className="text-xs font-semibold uppercase text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-950">{value}</p>
    </div>
  );
}
