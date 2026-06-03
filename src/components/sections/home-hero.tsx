"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Map, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { motionEase } from "@/components/motion/reveal";
import { localizePath } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/id";
import type { Locale } from "@/lib/types";

const heroPoster = "/media/videoherolandscape-poster.webp";

export function HomeHero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroSignals =
    locale === "id"
      ? [
          { label: "Cuaca", value: "PU 3000-4500MM" },
          { label: "Setup", value: "Keluarga & grup" },
          { label: "Pickup", value: "Tomang, Jakarta" },
        ]
      : [
          { label: "Weather", value: "PU 3000-4500MM" },
          { label: "Setup", value: "Family & group" },
          { label: "Pickup", value: "Tomang, Jakarta" },
        ];

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;

    const playHeroVideo = () => {
      void video.play().catch(() => undefined);
    };

    playHeroVideo();
    video.addEventListener("canplay", playHeroVideo, { once: true });

    return () => {
      video.removeEventListener("canplay", playHeroVideo);
    };
  }, []);

  return (
    <section className="relative min-h-[74svh] overflow-hidden bg-stone-950 text-white">
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroPoster}
        className="pointer-events-none absolute inset-0 size-full object-cover object-center"
      >
        <source src="/media/videoherolandscape-optimized.webm" type="video/webm" />
        <source src="/media/videoherolandscape-optimized.mp4" type="video/mp4" />
        <source src="/media/videoherolandscape.mp4" type="video/mp4" />
      </video>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-scan absolute inset-0"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: motionEase }}
        className="absolute left-0 top-28 hidden h-px w-[62vw] origin-left bg-amber-300/80 md:block"
      />
      <div className="relative mx-auto grid min-h-[74svh] max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: motionEase }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-amber-300">
            <Sparkles className="size-4" />
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
              className="button-rise inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-amber-400 px-5 text-sm font-semibold text-stone-950"
            >
              <ShoppingBag className="size-4" />
              {dict.home.heroPrimary}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("alltrek-agent-open"))}
              className="button-rise inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/30 bg-stone-950/45 px-5 text-sm font-semibold text-white"
            >
              <Bot className="size-4" />
              {dict.home.heroSecondary}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: motionEase }}
          className="hidden lg:block"
        >
          <div className="kinetic-border rounded-[8px] border border-white/20 bg-stone-950/78 p-5 shadow-2xl shadow-stone-950/40">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-[8px] bg-amber-300 text-stone-950">
                <Map className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-stone-300">Camp readiness</p>
                <p className="font-semibold text-white">Gear route locked</p>
              </div>
            </div>
            <div className="my-5 h-0.5 route-strip" />
            <div className="grid gap-3">
              {heroSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: motionEase }}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-stone-300">{signal.label}</span>
                  <span className="text-sm font-semibold text-white">{signal.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-[8px] bg-white/10 p-3 text-sm leading-6 text-stone-100">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-amber-300" />
              <span>
                {locale === "id"
                  ? "Rekomendasi produk disiapkan sesuai kapasitas, cuaca, dan cara ambil."
                  : "Product picks are matched to capacity, weather, and fulfillment."}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
