import { Building2, ExternalLink, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getWhatsAppUrl, store } from "@/lib/store";

export default async function B2BPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <p className="text-sm font-semibold uppercase text-emerald-800">Alltrek Indonesia</p>
            <h1 className="mt-2 text-4xl font-semibold text-stone-950">{dict.b2b.title}</h1>
            <p className="mt-3 max-w-2xl text-stone-600">{dict.b2b.copy}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid gap-5 sm:grid-cols-3">
          {dict.b2b.cards.map((card, index) => (
            <Reveal key={card} delay={index * 0.08}>
            <div className="alive-card kinetic-border overflow-hidden rounded-[8px] p-5">
              <div className="flex items-center justify-between">
                <Building2 className="size-6 text-emerald-800" />
                <span className="text-xs font-semibold text-stone-400">0{index + 1}</span>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-stone-900">{card}</p>
            </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
        <aside className="alive-card sticky top-24 rounded-[8px] p-6">
          <h2 className="text-xl font-semibold text-stone-950">{dict.b2b.contactTitle}</h2>
          <div className="mt-5 space-y-4 text-sm text-stone-700">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-800" />
              <span>{store.address}</span>
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-emerald-800" />
              <span>{store.phone}</span>
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={getWhatsAppUrl("Halo Alltrek, saya ingin konsultasi B2B dan kemitraan.")}
              target="_blank"
              rel="noreferrer"
              className="button-rise inline-flex h-11 items-center justify-center rounded-[8px] bg-emerald-900 px-4 text-sm font-semibold text-white"
            >
              {dict.common.contactWhatsApp}
            </a>
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="button-rise inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-4 text-sm font-semibold text-stone-800"
            >
              {dict.common.maps}
              <ExternalLink className="size-4" />
            </a>
          </div>
        </aside>
        </Reveal>
      </section>
    </>
  );
}
