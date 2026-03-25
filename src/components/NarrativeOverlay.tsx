"use client";

import { motion } from "framer-motion";
import { useLanguage, type Bilingual } from "@/lib/LanguageContext";
import { productLabels } from "@/data/content";

interface NarrativeOverlayProps {
  productName: Bilingual;
  subName: Bilingual;
  description: Bilingual;
  sections: { title: Bilingual; subtitle: Bilingual }[];
  stats: { label: Bilingual; val: string }[];
  features: Bilingual[];
}

export default function NarrativeOverlay({
  productName,
  subName,
  description,
  sections,
  stats,
  features
}: NarrativeOverlayProps) {
  const { t } = useLanguage();

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 md:px-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-6 backdrop-blur-lg"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-persimmon">{t(productLabels.brandLine)}</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">{t(productName)}</h2>
          <p className="mt-2 text-base text-zinc-200 sm:text-lg">{t(subName)}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">{t(description)}</p>
        </motion.div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          {sections.map((section) => (
            <motion.article
              key={t(section.title)}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-5 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-white sm:text-xl">{t(section.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{t(section.subtitle)}</p>
            </motion.article>
          ))}
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="pointer-events-auto grid gap-4 rounded-2xl border border-persimmon/25 bg-black/50 p-4 sm:p-6 backdrop-blur-xl grid-cols-1 md:grid-cols-2"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-persimmon">{t(productLabels.clinicalDashboard)}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={t(stat.label)} className="rounded-xl border border-white/10 bg-zinc-950/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{t(stat.label)}</p>
                  <p className="mt-1 font-mono text-xl text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-persimmon">{t(productLabels.boardroomHighlights)}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {features.map((feature) => (
                <li key={t(feature)} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-persimmon" />
                  <span>{t(feature)}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
