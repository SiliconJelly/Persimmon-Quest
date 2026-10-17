"use client";

import { ArrowRight, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { products, won } from "../../catalog";
import { useBag } from "./BagContext";
import Monogram, { EMBLEM } from "./Monogram";

const links = [
  { label: "New in", href: "/shop" },
  { label: "Women", href: "/shop?gender=women" },
  { label: "Men", href: "/shop?gender=men" },
  { label: "Shoes", href: "/shop?category=Shoes" },
  { label: "Duet", href: "/duet" },
  { label: "Quest View", href: "/quest-view" }
];
const menuLinks = [...links, { label: "Plans", href: "/plans" }, { label: "Research", href: "/research" }, { label: "About", href: "/team" }];

// How far the visitor must scroll up, continuously, before the bar comes back.
const SHOW_AFTER_UP_PX = 72;
const HIDE_AFTER_DOWN_PX = 8;
// The resting bar's height: the pill only takes over once the resting bar has scrolled out of view.
const BAR_PX = 72;

/** Reads the query string for active states; isolated so the nav itself never suspends. */
function QuerySync({ onChange }: { onChange: (query: string) => void }) {
  const params = useSearchParams();
  useEffect(() => { onChange(params.toString()); }, [params, onChange]);
  return null;
}

function Strip() {
  const dismiss = () => {
    document.documentElement.dataset.strip = "hidden";
    try { localStorage.setItem("pq-strip", "hidden"); } catch { /* storage unavailable */ }
  };
  return (
    <div className="q-strip" role="region" aria-label="Announcement">
      <p className="q-strip__text">
        <svg className="q-strip__star" viewBox="42 42 16 16" aria-hidden="true"><path d={EMBLEM.star} fill="currentColor" /></svg>
        <span>New drop: Quest Stride<span className="q-strip__lede">, made for the long run</span></span>
        <Link className="q-strip__chip" href="/shop/quest-stride">Shop now <span><ArrowRight size={14} aria-hidden="true" /></span></Link>
      </p>
      <button type="button" className="q-strip__close" onClick={dismiss} aria-label="Dismiss announcement"><X size={18} aria-hidden="true" /></button>
    </div>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => { inputRef.current?.focus(); }, []);

  const term = q.trim().toLowerCase();
  const results = term
    ? products.filter((p) => `${p.name} ${p.category} ${p.ritual} ${p.line}`.toLowerCase().includes(term))
    : products.slice(0, 4);

  return (
    <div className="q-search" role="search">
      <form
        onSubmit={(e) => { e.preventDefault(); if (results[0]) { router.push(`/shop/${results[0].slug}`); onClose(); } }}
      >
        <label className="q-search__field">
          <Search size={20} aria-hidden="true" />
          <span className="q-sr">Search products</span>
          <input ref={inputRef} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Polo, shoes, headband…" autoComplete="off" />
        </label>
      </form>
      <p className="q-mono" style={{ margin: "14px 8px 0" }} aria-live="polite">
        {term ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Popular"}
      </p>
      {results.length ? (
        <ul className="q-search__results">
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/shop/${p.slug}`} onClick={onClose}>
                <img src={p.cut} alt="" />
                <span><b style={{ fontWeight: 600 }}>{p.name}</b><br /><span className="q-hint">{p.category}</span></span>
                <span className="q-tabular">{won(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="q-search__empty">Nothing matches “{q}”. Try “walk” or “shoes”.</p>
      )}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { count } = useBag();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // How much of the announcement strip is still on screen, so the menu sheet starts below the bar.
  const [stripOffset, setStripOffset] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement | null>(null);
  const pinned = menuOpen || searchOpen;
  const pinnedRef = useRef(pinned);
  pinnedRef.current = pinned;

  // Scrolling down, the resting bar simply scrolls away with the page: no morph, no fade.
  // Only a deliberate scroll up brings the bar back, and it returns as the floating pill.
  // Near the top of the page it settles back into the resting bar.
  useEffect(() => {
    let lastY = window.scrollY;
    let up = 0;
    let down = 0;
    let frame = 0;
    let reveal = 0;
    let pill = false;
    setScrolled(false);
    setHidden(false);
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const strip = document.querySelector<HTMLElement>(".q-strip");
      const stripH = strip ? strip.offsetHeight : 0;
      headerRef.current?.style.setProperty("--nav-scroll", `${Math.min(Math.max(0, y - stripH), BAR_PX + 40)}px`);
      if (pinnedRef.current) { up = down = 0; return; }
      if (delta > 0) { down += delta; up = 0; }
      else if (delta < 0) { up -= delta; down = 0; }
      if (pill) {
        if (y <= stripH + 4) { pill = false; setScrolled(false); setHidden(false); return; }
        if (down > HIDE_AFTER_DOWN_PX) setHidden(true);
        else if (up > SHOW_AFTER_UP_PX) setHidden(false);
      } else if (up > SHOW_AFTER_UP_PX && y > stripH + BAR_PX) {
        // Swap to the pill while it is still off screen, then slide it in.
        pill = true;
        setHidden(true);
        setScrolled(true);
        reveal = requestAnimationFrame(() => { reveal = requestAnimationFrame(() => setHidden(false)); });
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); cancelAnimationFrame(reveal); };
  }, [pathname]);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      if (searchOpen) { setSearchOpen(false); searchBtnRef.current?.focus(); }
    };
    const onPointer = (e: PointerEvent) => {
      if (searchOpen && shellRef.current && !shellRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    if (menuOpen) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [pinned, menuOpen, searchOpen]);

  const isActive = (href: string) => {
    const [path, q] = href.split("?");
    if (q) return pathname === path && new URLSearchParams(query).toString().includes(q);
    if (path === "/shop") return pathname === "/shop" && !query;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleSearch = (btn: HTMLButtonElement) => {
    searchBtnRef.current = btn;
    setMenuOpen(false);
    setSearchOpen((v) => !v);
  };

  return (
    <>
      <Suspense fallback={null}><QuerySync onChange={setQuery} /></Suspense>
      <Strip />
      <header ref={headerRef} className={`q-nav ${hidden && !pinned ? "is-hidden" : ""} ${scrolled && !menuOpen ? "is-scrolled" : ""}`}>
        <div className="q-nav__shell" ref={shellRef}>
          <nav className="q-nav__bar" aria-label="Main">
            <Link href="/" className="q-wordmark" aria-label="Persimmon Quest, home">
              <Monogram className="q-wordmark__mono" />
              <span className="q-wordmark__text">Persimmon Quest</span>
            </Link>
            <ul className="q-nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link className="q-nav__link" href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="q-nav__actions">
              <button type="button" className="q-searchbtn" aria-expanded={searchOpen} onClick={(e) => toggleSearch(e.currentTarget)}>
                <Search size={20} strokeWidth={1.6} aria-hidden="true" /> Search
              </button>
              <button type="button" className="q-iconbtn q-nav__search-icon" aria-label="Search" aria-expanded={searchOpen} onClick={(e) => toggleSearch(e.currentTarget)}>
                <Search size={22} strokeWidth={1.6} aria-hidden="true" />
              </button>
              <Link className="q-iconbtn" href="/bag" aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
                <ShoppingBag size={22} strokeWidth={1.6} aria-hidden="true" />
                {count > 0 && <span className="q-badge" aria-hidden="true">{count}</span>}
              </Link>
              {!pathname.startsWith("/plans") && <Link className="q-nav__cta" href="/plans">Find my plan</Link>}
              <button
                className="q-iconbtn q-nav__menu-btn"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="q-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => {
                  const strip = document.querySelector(".q-strip");
                  setStripOffset(strip ? Math.max(0, strip.getBoundingClientRect().bottom) : 0);
                  setSearchOpen(false);
                  setMenuOpen((v) => !v);
                }}
              >
                <span className="q-burger" aria-hidden="true"><span /><span /></span>
              </button>
            </div>
          </nav>
          {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
        </div>
      </header>
      {menuOpen && (
        <div id="q-menu" className="q-menu" style={{ paddingTop: `calc(var(--nav-h) + ${stripOffset}px + 16px)` }}>
          {menuLinks.map((l, i) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              {l.label}<span>{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
