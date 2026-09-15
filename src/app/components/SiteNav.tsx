"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["Products", "/"],
  ["Connect", "/connect"],
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
    if (href === "/connect" && pathname === "/demo") return true;
    return pathname.startsWith(href);
  }

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={`site-nav pq-nav ${isVisible ? "site-nav--visible" : "site-nav--hidden"}`}
    >
      <div className="pq-shell pq-nav-inner">
        <Link href="/" className="pq-brand" aria-label="Persimmon Quest home">
          <span className="pq-logo-shell">
            <img className="pq-logo" src="/media/logo.png" alt="" aria-hidden="true" />
          </span>
          <span className="pq-brand-copy">
            <span className="pq-brand-title">Persimmon Quest</span>
          </span>
        </Link>
        <div className="pq-nav-links">
          {navItems.map(([item, href]) => {
            // A fresh lobby visit also resets the hash-based simulated session.
            const NavigationLink = href === "/connect" ? "a" : Link;
            return <NavigationLink className={`pq-nav-link ${isActive(href) ? "is-active" : ""}`} href={href} aria-current={isActive(href) ? "page" : undefined} key={item}>
              {item}
            </NavigationLink>;
          })}
        </div>
        <Link className="pq-nav-contact" href="/contact">
          Let’s talk
          <ArrowUpRight size={15} />
        </Link>
        <button
          className="pq-menu-button"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div id="mobile-navigation" className={`pq-mobile-nav ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="pq-shell">
          <div className="pq-mobile-panel" role="navigation" aria-label="Mobile navigation">
            {navItems.map(([item, href]) => {
              const NavigationLink = href === "/connect" ? "a" : Link;
              return <NavigationLink
                className={`pq-mobile-link ${isActive(href) ? "is-active" : ""}`}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                key={item}
                tabIndex={isOpen ? undefined : -1}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </NavigationLink>;
            })}
            <Link className="pq-mobile-link pq-mobile-link--primary" href="/contact" tabIndex={isOpen ? undefined : -1}>
              Let’s talk <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
