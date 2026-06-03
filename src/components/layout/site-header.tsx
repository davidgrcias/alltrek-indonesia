"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Mountain, ShoppingCart, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { LanguageSwitch } from "./language-switch";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();
  const homePath = localizePath(locale);
  const links = [
    { href: homePath, label: dict.nav.home },
    { href: localizePath(locale, "/products"), label: dict.nav.products },
    { href: localizePath(locale, "/b2b"), label: dict.nav.b2b },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#fffdf7] shadow-[0_8px_30px_rgba(28,25,23,0.06)]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"
      >
        <Link href={homePath} className="group inline-flex items-center gap-2 text-stone-950">
          <motion.span
            whileHover={{ rotate: -6, scale: 1.04 }}
            className="grid size-9 place-items-center rounded-[8px] bg-[linear-gradient(135deg,#064e3b,#0d9488_55%,#f59e0b)] text-white shadow-lg shadow-emerald-900/20"
          >
            <Mountain className="size-5" />
          </motion.span>
          <span className="font-semibold tracking-normal">
            Alltrek <span className="text-emerald-800">Indonesia</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.href === homePath ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-[8px] px-3 py-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
              >
                {active && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 -z-10 rounded-[8px] bg-emerald-900/10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch locale={locale} />
          <Link
            href={localizePath(locale, "/cart")}
            className="button-rise relative inline-flex h-10 items-center gap-2 rounded-[8px] bg-stone-950 px-3 text-sm font-semibold text-white"
          >
            <ShoppingCart className="size-4" />
            {dict.nav.cart}
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                className="ml-1 rounded bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-stone-950"
              >
                {count}
              </motion.span>
            )}
          </Link>
        </div>

        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          whileTap={{ scale: 0.94 }}
          className="grid size-10 place-items-center rounded-[8px] border border-stone-900/15 bg-white text-stone-900 md:hidden"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-stone-900/10 bg-[#fffdf7]/96 px-4 md:hidden"
          >
            <div className="flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-emerald-900/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <LanguageSwitch locale={locale} />
              <Link
                href={localizePath(locale, "/cart")}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] bg-stone-950 px-3 text-sm font-semibold text-white"
              >
                <ShoppingCart className="size-4" />
                {dict.nav.cart}
                {count > 0 && <span className="rounded bg-amber-400 px-1.5 text-xs text-stone-950">{count}</span>}
              </Link>
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-[8px] border border-emerald-900/15 bg-emerald-900/5 px-3 py-2 text-xs font-semibold text-emerald-950">
              <Sparkles className="size-3.5" />
              Alltrek Camp Advisor
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
