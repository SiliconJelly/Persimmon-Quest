"use client";

import { Menu, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["Product", "#showcase"],
  ["Facility", "#facility"],
  ["Systems", "#systems"],
  ["Team", "#team"],
  ["Roadmap", "#roadmap"],
  ["Deploy", "#deploy"]
];

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed left-0 top-0 z-50 w-full border-b border-white/50 bg-chassis/78 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-3.5" aria-label="Persimmon Quest home" onClick={() => setIsOpen(false)}>
          <span className="nav-logo-shell">
            <img className="nav-logo-mark" src="/media/logo_3d.svg" alt="" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <span className="brand-title">Persimmon Quest</span>
            <span className="brand-subtitle">Pro aging neurotech OS for Japan</span>
          </span>
        </a>
        <div className="desktop-nav-links items-center gap-2">
          {navItems.map(([item, href]) => (
            <a className="nav-key" href={href} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a className="primary-key desktop-invest-link" href="#deploy">
          <Zap className="h-4 w-4" />
          Invest in Us
        </a>
        <button
          className="mobile-menu-button lg:hidden"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav-shell lg:hidden ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mobile-nav-panel" role="navigation" aria-label="Mobile navigation">
            {navItems.map(([item, href]) => (
              <a className="mobile-nav-link" href={href} key={item} tabIndex={isOpen ? undefined : -1} onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
            <a className="mobile-nav-link mobile-nav-link--primary" href="#deploy" tabIndex={isOpen ? undefined : -1} onClick={() => setIsOpen(false)}>
              <Zap className="h-4 w-4" />
              Invest in Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
