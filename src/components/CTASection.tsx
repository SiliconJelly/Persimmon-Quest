"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ctaSection } from "@/data/content";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <article className="rounded-2xl border border-persimmon/30 bg-persimmon/10 p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-persimmon">{t(ctaSection.investor.label)}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{t(ctaSection.investor.heading)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">{t(ctaSection.investor.body)}</p>
          <a
            href="mailto:founder@persimmon.quest?subject=Investor%20Inquiry"
            className="mt-6 inline-block rounded-full bg-persimmon px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:brightness-110"
          >
            {t(ctaSection.investor.cta)}
          </a>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-persimmon">{t(ctaSection.director.label)}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{t(ctaSection.director.heading)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{t(ctaSection.director.body)}</p>
          <a
            href="mailto:founder@persimmon.quest?subject=Facility%20Consultation"
            className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-100 transition hover:border-persimmon hover:text-persimmon"
          >
            {t(ctaSection.director.cta)}
          </a>
        </article>
      </div>
    </section>
  );
}
