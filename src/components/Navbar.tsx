"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [lang, setLang] = useState<"en" | "ja">("en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-white">
          PERSIMMON QUEST
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-white/30 hover:text-white"
            aria-label="Toggle language"
          >
            {lang === "en" ? "EN / JA" : "JA / EN"}
          </button>
          <a
            href="#contact"
            className="rounded-full bg-persimmon px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(244,82,45,0.5)] transition hover:brightness-110"
          >
            Pre-Book Ecosystem
          </a>
        </div>
      </nav>
    </header>
  );
}
