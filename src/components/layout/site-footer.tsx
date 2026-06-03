import Link from "next/link";
import { MapPin, Mountain, Phone } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import { store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="topo-lines border-t border-white/10 bg-stone-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={localizePath(locale)} className="inline-flex items-center gap-2 text-lg font-semibold">
            <span className="grid size-9 place-items-center rounded-[8px] bg-amber-400 text-stone-950">
              <Mountain className="size-5" />
            </span>
            <span>Alltrek Indonesia</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-200">{dict.footer.about}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{dict.footer.storeHours}</h2>
          <div className="mt-3 space-y-2 text-sm text-stone-200">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber-300" />
              <span>{store.address}</span>
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-amber-300" />
              <span>{store.phone}</span>
            </p>
            {store.hours.map((hour) => (
              <p key={hour.dayEn}>
                {locale === "id" ? hour.dayId : hour.dayEn}: {hour.time}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{dict.footer.social}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {store.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="button-rise rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
