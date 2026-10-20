"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Audience, productBySlug } from "../../catalog";
import ProductCard from "./ProductCard";

/* ---------- Video story carousel (arrow controlled, autoplays, always pausable) ---------- */
export type Story = {
  id: string;
  eyebrow: string;
  title: string;
  line: string;
  cta: { label: string; href: string };
  image?: string;
  video?: string;
  /** A composed visual (coded UI, sketch or framed video) staged on the dark field instead of full-bleed media. */
  visual?: React.ReactNode;
  alt: string;
};

const SLIDE_MS = 7000;

export function StoryCarousel({ stories, label }: { stories: Story[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false); // hover or focus inside pauses rotation (WCAG 2.2.2)
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const count = stories.length;
  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || held) return;
    const t = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, held, go]);

  // Only the visible slide's videos play, including any inside a staged visual; pausing the carousel pauses them too.
  useEffect(() => {
    slides.current.forEach((el, i) => {
      el?.querySelectorAll("video").forEach((v) => {
        v.muted = true;
        if (i === index && !paused) v.play().catch(() => {});
        else v.pause();
      });
    });
  }, [index, paused]);

  return (
    <section
      className="q-stories"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false); }}
    >
      <div className="q-stories__track" aria-live={paused ? "polite" : "off"}>
        {stories.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { slides.current[i] = el; }}
            className={`q-story ${s.visual ? "q-story--stage" : ""} ${i === index ? "is-on" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            {s.visual ? (
              <div className="q-story__stage">{s.visual}</div>
            ) : s.video ? (
              <video className="q-story__media" src={s.video} poster={s.image} muted loop playsInline preload="metadata" aria-label={s.alt} />
            ) : s.image ? (
              <img className="q-story__media" src={s.image} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} />
            ) : null}
            <div className="q-story__scrim" aria-hidden="true" />
            <div className="q-shell q-story__copy">
              <span className="q-mono">{s.eyebrow}</span>
              <h3 className="q-story__title">{s.title}</h3>
              <p>{s.line}</p>
              <Link className="q-btn q-btn--light" href={s.cta.href} tabIndex={i === index ? undefined : -1}>{s.cta.label}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="q-shell q-stories__controls">
        <div className="q-stories__dots">
          {stories.map((s, i) => (
            <button key={s.id} type="button" className={`q-stories__dot ${i === index ? "is-on" : ""}`} onClick={() => go(i)} aria-label={`Show story ${i + 1}: ${s.title}`} aria-current={i === index}>
              <span style={i === index && !paused && !held ? { animationDuration: `${SLIDE_MS}ms` } : undefined} />
            </button>
          ))}
        </div>
        <div className="q-stories__buttons">
          <button type="button" className="q-roundbtn" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play stories" : "Pause stories"}>
            {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
          <button type="button" className="q-roundbtn" onClick={() => go(index - 1)} aria-label="Previous story"><ChevronLeft size={22} aria-hidden="true" /></button>
          <button type="button" className="q-roundbtn" onClick={() => go(index + 1)} aria-label="Next story"><ChevronRight size={22} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rail: horizontal scroller with arrow controls ---------- */
export function Rail({ title, eyebrow, aside, children, label }: { title: string; eyebrow?: string; aside?: React.ReactNode; children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, children]);

  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <div className="q-rail">
      <div className="q-shell q-rail__head">
        <div style={{ display: "grid", gap: 8 }}>
          {eyebrow && <span className="q-mono q-mono--bronze">{eyebrow}</span>}
          <h2 className="q-h2">{title}</h2>
        </div>
        <div className="q-rail__tools">
          {aside}
          <div className="q-rail__arrows">
            <button type="button" className="q-roundbtn q-roundbtn--ink" onClick={() => nudge(-1)} disabled={edge.start} aria-label={`Scroll ${label} back`}><ChevronLeft size={22} aria-hidden="true" /></button>
            <button type="button" className="q-roundbtn q-roundbtn--ink" onClick={() => nudge(1)} disabled={edge.end} aria-label={`Scroll ${label} forward`}><ChevronRight size={22} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <ul ref={ref} className="q-rail__track" onScroll={measure} aria-label={label}>
        {children}
      </ul>
    </div>
  );
}

/* ---------- New arrivals rail with Women / Men tabs ---------- */
const tabs: { id: Audience; label: string }[] = [
  { id: "women", label: "Women" },
  { id: "men", label: "Men" }
];

// A hand set running order for each tab: the signature pieces first, then what goes with them.
const ARRIVALS: Record<Audience, string[]> = {
  women: ["breather-top", "quest-hood", "movement-tank", "movement-hood", "movement-leggings", "quest-stride", "everyday-socks", "grip-gloves"],
  men: ["everyday-polo", "quest-hood", "walking-shorts", "movement-hood", "breather-vest", "quest-stride", "everyday-socks", "grip-gloves"]
};

export function ProductRail({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const [tab, setTab] = useState<Audience>("women");
  const list = ARRIVALS[tab].map((slug) => productBySlug(slug)!);
  const label = tabs.find((t) => t.id === tab)!.label;

  return (
    <Rail
      title={title}
      eyebrow={eyebrow}
      label={`${title}, ${label}`}
      aside={
        <div className="q-tabs" role="group" aria-label="Show products for">
          {tabs.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      }
    >
      {list.map((p, i) => (
        <li key={`${tab}-${p.slug}`} className="q-rail__item"><ProductCard product={p} audience={tab} priority={i < 2} /></li>
      ))}
      <li className="q-rail__item q-rail__more">
        <Link href={`/shop?c=${tab}`} className="q-link">Shop all {label.toLowerCase()} <ChevronRight size={18} aria-hidden="true" /></Link>
      </li>
    </Rail>
  );
}
