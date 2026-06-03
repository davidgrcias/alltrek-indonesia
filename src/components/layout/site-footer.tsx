import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import { store } from "@/lib/store";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href={localizePath(locale)} className="text-lg font-semibold">
            Alltrek Indonesia
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-300">{dict.footer.about}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{dict.footer.storeHours}</h2>
          <div className="mt-3 space-y-2 text-sm text-stone-300">
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
                className="rounded-md border border-white/15 px-3 py-2 text-sm text-stone-200 hover:bg-white/10"
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
