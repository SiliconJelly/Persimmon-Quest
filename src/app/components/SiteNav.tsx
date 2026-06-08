"use client";

import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["Product", "/"],
  ["For Clinicians", "/for-clinicians"],
  ["Team", "/team"],
  ["Roadmap", "/roadmap"],
  ["Contact", "/contact"]
] as const;

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

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

  useEffect(() => {
    setIsOpen(false);
    setIsVisible(true);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      if (currentScrollY < 160 || isScrollingUp || isOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      ref={navRef}
      className={`site-nav fixed left-0 top-0 z-50 w-full border-b border-white/50 bg-chassis/78 backdrop-blur-xl ${isVisible ? "site-nav--visible" : "site-nav--hidden"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3.5" aria-label="Persimmon Quest home">
          <span className="nav-logo-shell">
            <img className="nav-logo-mark" src="/media/logo_3d.svg" alt="" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <span className="brand-title">Persimmon Quest</span>
            <span className="brand-subtitle">Pro aging neurotech OS for Japan</span>
          </span>
        </Link>
        <div className="desktop-nav-links items-center gap-2">
          {navItems.map(([item, href]) => (
            <Link className={`nav-key ${isActive(href) ? "nav-key--active" : ""}`} href={href} key={item}>
              {item}
            </Link>
          ))}
        </div>
        <Link className="primary-key desktop-invest-link" href="/contact">
          <Zap className="h-4 w-4" />
          Invest in Us
        </Link>
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
              <Link
                className={`mobile-nav-link ${isActive(href) ? "mobile-nav-link--active" : ""}`}
                href={href}
                key={item}
                tabIndex={isOpen ? undefined : -1}
              >
                {item}
              </Link>
            ))}
            <Link className="mobile-nav-link mobile-nav-link--primary" href="/contact" tabIndex={isOpen ? undefined : -1}>
              <Zap className="h-4 w-4" />
              Invest in Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
