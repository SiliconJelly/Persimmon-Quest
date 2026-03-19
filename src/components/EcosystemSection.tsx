"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const wings = [
  {
    id: "wing-01",
    title: "Wing 01 — Acoustic Biomarkers",
    description:
      "Detect stress signatures and respiratory variance from ambient interaction patterns."
  },
  {
    id: "wing-02",
    title: "Wing 02 — AI-Guided Osekkai",
    description:
      "Orchestrate context-aware check-ins for residents before escalation is required."
  },
  {
    id: "wing-03",
    title: "Wing 03 — Outcome Intelligence",
    description:
      "Convert daily routines into measurable care outcomes for directors and investors."
  }
];

export default function EcosystemSection() {
  const [active, setActive] = useState(wings[0].id);

  return (
    <section className="mx-auto mt-28 w-full max-w-7xl px-6 pb-20 md:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-3xl font-semibold text-white md:text-5xl"
      >
        One integrated eldercare intelligence network.
      </motion.h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {wings.map((wing) => {
          const isActive = active === wing.id;
          return (
            <motion.article
              key={wing.id}
              onMouseEnter={() => setActive(wing.id)}
              className={`cursor-pointer rounded-2xl border p-6 transition-all duration-500 ${
                isActive
                  ? "border-persimmon/50 bg-persimmon/10 md:col-span-2"
                  : "border-white/10 bg-black/40 md:col-span-1"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{wing.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{wing.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
