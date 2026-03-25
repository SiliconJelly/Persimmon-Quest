"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ecosystemSection } from "@/data/content";

export default function EcosystemSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(ecosystemSection.wings[0].id);

  return (
    <section className="mx-auto mt-20 w-full max-w-7xl px-4 pb-16 sm:px-6 sm:mt-28 sm:pb-20 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-2xl font-semibold text-white sm:text-3xl md:text-5xl"
      >
        {t(ecosystemSection.heading)}
      </motion.h2>

      <div className="mt-6 grid gap-4 sm:mt-8 grid-cols-1 md:grid-cols-3">
        {ecosystemSection.wings.map((wing) => {
          const isActive = active === wing.id;
          return (
            <motion.article
              key={wing.id}
              onMouseEnter={() => setActive(wing.id)}
              onClick={() => setActive(wing.id)}
              className={`cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-500 ${
                isActive
                  ? "border-persimmon/50 bg-persimmon/10 md:col-span-2"
                  : "border-white/10 bg-black/40 md:col-span-1"
              }`}
            >
              <h3 className="text-base font-semibold text-white sm:text-lg">{t(wing.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{t(wing.description)}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
