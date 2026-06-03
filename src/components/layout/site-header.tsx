"use client";

import Link from "next/link";
import { Menu, Mountain, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { LanguageSwitch } from "./language-switch";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const links = [
    { href: localizePath(locale), label: dict.nav.home },
    { href: localizePath(locale, "/products"), label: dict.nav.products },
    { href: localizePath(locale, "/b2b"), label: dict.nav.b2b },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={localizePath(locale)} className="inline-flex items-center gap-2 text-stone-950">
          <span className="grid size-9 place-items-center rounded-md bg-emerald-900 text-white">
            <Mountain className="size-5" />
          </span>
          <span className="font-semibold tracking-normal">Alltrek Indonesia</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitch locale={locale} />
          <Link
            href={localizePath(locale, "/cart")}
            className="relative inline-flex h-10 items-center gap-2 rounded-md bg-stone-950 px-3 text-sm font-semibold text-white hover:bg-stone-800"
          >
            <ShoppingCart className="size-4" />
            {dict.nav.cart}
            {count > 0 && (
              <span className="ml-1 rounded bg-amber-400 px-1.5 py-0.5 text-xs font-bold text-stone-950">
                {count}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-md border border-stone-200 text-stone-900 md:hidden"
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <LanguageSwitch locale={locale} />
              <Link
                href={localizePath(locale, "/cart")}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-stone-950 px-3 text-sm font-semibold text-white"
              >
                <ShoppingCart className="size-4" />
                {dict.nav.cart}
                {count > 0 && <span className="rounded bg-amber-400 px-1.5 text-xs text-stone-950">{count}</span>}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
