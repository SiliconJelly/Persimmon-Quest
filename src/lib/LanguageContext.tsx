"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ja";

export type Bilingual = { en: string; ja: string };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (text: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  t: (text) => text.en
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "ja" : "en";
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const t = useCallback((text: Bilingual) => text[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
