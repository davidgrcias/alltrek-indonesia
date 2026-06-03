"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, ShoppingBag } from "lucide-react";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

const heroPoster =
  "https://www.alltrekoutdoor.com/cdn/shop/files/TES_COVER_BARU_tentastic1.jpg?v=1760948980";

export function HomeHero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-stone-950 text-white">
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      >
        <source src="/media/alltrek-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-stone-950/20" />
      <div className="relative mx-auto flex min-h-[72svh] max-w-7xl items-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-normal text-amber-300">
            {dict.home.heroEyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-100 sm:text-lg">
            {dict.home.heroCopy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={localizePath(locale, "/products")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 text-sm font-semibold text-stone-950 hover:bg-amber-300"
            >
              <ShoppingBag className="size-4" />
              {dict.home.heroPrimary}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("alltrek-agent-open"))}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20"
            >
              <Bot className="size-4" />
              {dict.home.heroSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
