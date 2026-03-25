"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { nav } from "@/data/content";

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo/logo-orange-border.png"
            alt="Persimmon Quest"
            width={32}
            height={32}
            className="logo-shine h-8 w-8 rounded-md transition-all duration-300"
            priority
          />
          <span className="brand-text text-sm font-semibold tracking-[0.2em] text-white transition-all duration-300">
            {t(nav.brand)}
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-white/30 hover:text-white"
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN / 日本語" : "日本語 / EN"}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-block rounded-full bg-persimmon px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(244,82,45,0.5)] transition hover:brightness-110"
          >
            {t(nav.cta)}
          </a>
        </div>
      </nav>
    </header>
  );
}
