"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { nav, footer } from "@/data/content";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-white">{t(nav.brand)}</p>
          <p className="mt-2 text-xs text-zinc-400">{t(footer.tagline)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-300">
          <a href="#" className="transition hover:text-persimmon">
            {t(footer.links.whitepapers)}
          </a>
          <a href="#" className="transition hover:text-persimmon">
            {t(footer.links.compliance)}
          </a>
          <a href="mailto:founder@persimmon.quest" className="transition hover:text-persimmon">
            {t(footer.links.contact)}
          </a>
        </div>
      </div>
    </footer>
  );
}
