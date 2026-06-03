"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { alternateLocale, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = alternateLocale(locale);

  return (
    <motion.span whileTap={{ scale: 0.95 }} className="inline-flex">
      <Link
        href={switchLocalePath(pathname, nextLocale)}
        className="button-rise inline-flex h-10 items-center gap-2 rounded-[8px] border border-stone-900/15 bg-white px-3 text-sm font-semibold text-stone-800"
      >
        <Languages className="size-4" />
        {nextLocale.toUpperCase()}
      </Link>
    </motion.span>
  );
}
