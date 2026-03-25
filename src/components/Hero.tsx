"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { hero } from "@/data/content";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16 md:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(244,82,45,0.25),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(255,140,90,0.22),transparent_35%),linear-gradient(to_bottom,#0a0a0a,#0a0a0a)]" />
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.28em] text-persimmon"
        >
          {t(hero.eyebrow)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-5xl text-3xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl"
        >
          {t(hero.headline)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
          className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg"
        >
          {t(hero.body)}
        </motion.p>
      </div>
    </section>
  );
}
