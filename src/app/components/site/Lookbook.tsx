"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { type RefObject, useEffect, useRef, useState } from "react";
import { type Audience, lookFor, productBySlug } from "../../catalog";

// The homepage lookbook: women and men side by side in one studio. Choosing a piece shows it worn.
type Pick = { slug: string; colour: string };

const LOOKS: Record<Audience, Pick[]> = {
  women: [
    { slug: "quest-hood", colour: "Pine" },
    { slug: "breather-top", colour: "Pearl" },
    { slug: "movement-tank", colour: "Rose" },
    { slug: "movement-hood", colour: "Pearl" }
  ],
  men: [
    { slug: "quest-hood", colour: "Midnight" },
    { slug: "everyday-polo", colour: "Sage" },
    { slug: "walking-shorts", colour: "Mist" },
    { slug: "movement-hood", colour: "Mist" }
  ]
};

function resolve(who: Audience, pick: Pick) {
  const product = productBySlug(pick.slug)!;
  const colour = product.colorways.find((c) => c.name === pick.colour)!;
  const look = lookFor(colour, who)!;
  const query = new URLSearchParams();
  if (colour !== product.colorways[0]) query.set("colour", colour.name.toLowerCase());
  if (product.gender === "unisex") query.set("on", who);
  return { product, colour, look, href: `/shop/${product.slug}?${query}` };
}

function Panel({ who }: { who: Audience }) {
  const picks = LOOKS[who].map((p) => resolve(who, p));
  const [on, setOn] = useState(0);
  const [prev, setPrev] = useState(-1);
  // Only pictures someone has asked for are loaded; the first one is there from the start.
  const [seen, setSeen] = useState<number[]>([0]);
  const label = who === "women" ? "Women" : "Men";
  const current = picks[on];

  // The last photo stays underneath while the new one dissolves in, so the frame never dips to blank.
  const choose = (i: number) => {
    if (i === on) return;
    setPrev(on); setOn(i);
    setSeen((s) => (s.indexOf(i) > -1 ? s : [...s, i]));
  };
  const warm = (i: number) => { const img = new Image(); img.src = picks[i].look.full; };

  return (
    <figure className="q-look">
      <Link href={current.href} className="q-look__frame">
        {seen.map((i) => (
          <img key={i} className={`q-look__img ${i === on ? "is-on" : i === prev ? "is-prev" : ""}`} src={picks[i].look.full} alt={i === on ? picks[i].look.alt : ""} width={1200} height={1500} loading="lazy" />
        ))}
      </Link>
      <figcaption className="q-look__bar">
        <div className="q-look__now">
          <h3 className="q-look__who">{label}</h3>
          <p className="q-look__piece" aria-live="polite"><Link href={current.href}>{current.product.name}</Link> in {current.colour.name}</p>
          <Link className="q-link" href={`/shop?c=${who}`}>Shop {label.toLowerCase()} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="q-look__picks" role="group" aria-label={`${label}'s pieces`}>
          {picks.map((p, i) => (
            <button
              key={`${p.product.slug}-${p.colour.name}`}
              type="button"
              className="q-look__pick"
              aria-pressed={i === on}
              aria-label={`${p.product.name} in ${p.colour.name}`}
              onPointerEnter={() => warm(i)}
              onFocus={() => warm(i)}
              onClick={() => choose(i)}
            >
              <img src={p.colour.still} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

/** The backdrop: our feather jacquard with a sensor pod tucked in its fold, multiplied into the section's own colour.
    A soft light follows the pointer and raises the stitches where it falls; with no pointer it drifts on its own.
    The relief comes from scripts/studio/knit.py, which also prints where the pod sits (73.0%, 51.9%). */
function Knit({ section }: { section: RefObject<HTMLElement | null> }) {
  const knit = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const s = section.current, k = knit.current;
    if (!s || !k || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0, x = 0, y = 0;
    const paint = () => {
      frame = 0;
      const r = k.getBoundingClientRect();
      k.style.setProperty("--lx", `${(((x - r.left) / r.width) * 100).toFixed(1)}%`);
      k.style.setProperty("--ly", `${(((y - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; k.classList.add("is-lit"); if (!frame) frame = requestAnimationFrame(paint); };
    const leave = () => k.classList.remove("is-lit");
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerleave", leave);
    return () => { s.removeEventListener("pointermove", move); s.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); };
  }, [section]);
  return (
    <div ref={knit} className="q-knit" aria-hidden="true">
      <div className="q-knit__fabric">
        <img className="q-knit__base" src="/media/site/material/knit.webp" width={1400} height={933} alt="" loading="lazy" />
        <img className="q-knit__lit" src="/media/site/material/knit.webp" width={1400} height={933} alt="" loading="lazy" />
      </div>
      <span className="q-knit__light" />
      <span className="q-knit__pod" />
    </div>
  );
}

export default function Lookbook() {
  const section = useRef<HTMLElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const inView = useInView(head, { once: true, margin: "0px 0px -18% 0px" });
  // The reveal is armed only when the heading starts below the fold, so nothing already on screen ever hides.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = head.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);
  const stage = armed ? (inView ? "is-in" : "is-pending") : "";

  return (
    <section ref={section} className="q-lookbook" aria-labelledby="lookbook-title">
      <Knit section={section} />
      <div ref={head} className={`q-shell q-lookbook__head ${stage}`}>
        {/* Two lines fitted to one width, the second turning to italic */}
        <h2 id="lookbook-title" className="q-fit">
          <span className="q-fit__mask q-fit__mask--1"><span className="q-fit__line">Wearable wellness</span></span>{" "}
          <span className="q-fit__mask q-fit__mask--2"><span className="q-fit__line">In your own style</span></span>
        </h2>
        {/* The clothes join the qBand and qPad people start with; the way in is the founding bundle */}
        <div className="q-lookbook__sub">
          <p className="q-lead">Choose your look. Personalize your sensors. Your clothes and qBand meet on qPad, in Quest View, with daily quests to keep your mind and body moving.</p>
          <p className="q-lookbook__first">Be among the first to wear what comes next</p>
          <Link className="q-btn q-btn--ink" href="/duet">Get early access</Link>
        </div>
      </div>
      <div className="q-shell q-lookbook__pair">
        <Panel who="women" />
        <Panel who="men" />
      </div>
    </section>
  );
}
