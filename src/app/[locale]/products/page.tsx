import { notFound } from "next/navigation";
import { Compass } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductExplorer } from "@/components/product/product-explorer";
import { getDictionary, isLocale } from "@/lib/i18n";
import { products } from "@/lib/products";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <>
      <section className="topo-lines border-b border-stone-900/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-emerald-800">
              <Compass className="size-4" />
              Alltrek Indonesia
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-stone-950">{dict.products.title}</h1>
            <p className="mt-3 max-w-2xl text-stone-600">{dict.products.copy}</p>
          </Reveal>
        </div>
      </section>
      <ProductExplorer products={products} dict={dict} locale={locale} />
    </>
  );
}
