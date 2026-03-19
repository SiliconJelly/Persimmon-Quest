"use client";

import { motion } from "framer-motion";

interface NarrativeOverlayProps {
  productName: string;
  subName: string;
  description: string;
  sections: { title: string; subtitle: string }[];
  stats: { label: string; val: string }[];
  features: string[];
}

export default function NarrativeOverlay({
  productName,
  subName,
  description,
  sections,
  stats,
  features
}: NarrativeOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-16 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-lg"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-persimmon">Persimmon Quest</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{productName}</h2>
          <p className="mt-2 text-lg text-zinc-200">{subName}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">{description}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-lg"
            >
              <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{section.subtitle}</p>
            </motion.article>
          ))}
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="pointer-events-auto grid gap-4 rounded-2xl border border-persimmon/25 bg-black/50 p-6 backdrop-blur-xl md:grid-cols-2"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-persimmon">Clinical Dashboard</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-zinc-950/60 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                  <p className="mt-1 font-mono text-xl text-white">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-persimmon">Boardroom Highlights</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-persimmon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
