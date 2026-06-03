"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { alternateLocale, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = alternateLocale(locale);

  return (
    <Link
      href={switchLocalePath(pathname, nextLocale)}
      className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-200 px-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
    >
      <Languages className="size-4" />
      {nextLocale.toUpperCase()}
    </Link>
  );
}
