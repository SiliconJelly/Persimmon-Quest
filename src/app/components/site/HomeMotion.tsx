"use client";

import { type MotionStyle, type MotionValue, motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import AutoVideo from "./AutoVideo";

/* ---------- Hero: a three beat story told by scrolling ----------
   1. On arrival, only "The fabric of a longer life" weaves in.
   2. Scrolling weaves in "woven with better insights", one word at a time.
   3. The film draws back into a framed plate, the title steps back,
      and the four subtitle lines arrive one by one like a sentence being spoken. */
const LINE_TWO = ["woven", "with", "better", "insights"];
const STORY = ["We don\u2019t make the fabrics", "We make them sense you", "Your clothes translate your body", "Daily quests keep you moving"];
// Scroll progress windows for each beat (0 to 1 across the hero)
const WORDS_FROM = 0.06, WORD_STEP = 0.05, WORD_SPAN = 0.09;
const PLATE_FROM = 0.36, PLATE_TO = 0.56;
const STORY_FROM = 0.54, STORY_STEP = 0.1, STORY_SPAN = 0.07;

/** Each word rises out of its own mask, alternating from above and below like warp and weft. */
function Weave({ text, start = 0, step = 0.07 }: { text: string; start?: number; step?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="q-weave"><span className={i % 2 ? "is-weft" : "is-warp"} style={{ animationDelay: `${start + i * step}s` }}>{word}</span></span>
        </Fragment>
      ))}
    </>
  );
}

/** The same weave, but each word is driven by scroll instead of time. */
function ScrollWord({ word, i, p, still }: { word: string; i: number; p: MotionValue<number>; still: boolean }) {
  const a = WORDS_FROM + i * WORD_STEP;
  // Travel well past the mask so tails like the "g" never peek out, and stay invisible until the word's turn.
  const y = useTransform(p, [a, a + WORD_SPAN], [i % 2 ? "-150%" : "150%", "0%"]);
  const o = useTransform(p, [a, a + WORD_SPAN * 0.4], [0, 1]);
  return <span className="q-weave"><motion.span className="q-weave__word" style={still ? undefined : ({ y, "--o": o } as unknown as MotionStyle)}>{word}</motion.span></span>;
}

/** A subtitle line: arrives in ink, then quietens as the next line takes over. */
function StoryLine({ text, i, p, still }: { text: string; i: number; p: MotionValue<number>; still: boolean }) {
  const a = STORY_FROM + i * STORY_STEP;
  const next = a + STORY_STEP;
  const last = i === STORY.length - 1;
  const opacity = useTransform(p, last ? [a, a + STORY_SPAN] : [a, a + STORY_SPAN, next, next + STORY_SPAN], last ? [0, 1] : [0, 1, 1, 0.55]);
  const y = useTransform(p, [a, a + STORY_SPAN], [28, 0]);
  const blur = useTransform(p, [a, a + STORY_SPAN], [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  // Opacity goes through a CSS variable so it stays tied to scroll rather than an accelerated animation.
  return <motion.span className="q-hero__line" style={still ? undefined : ({ "--o": opacity, y, filter } as unknown as MotionStyle)}>{text}</motion.span>;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const plateProgress = (v: number) => clamp((v - PLATE_FROM) / (PLATE_TO - PLATE_FROM), 0, 1);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Final layout targets, measured from the real title and story so nothing collides at any screen size.
  const endScale = useMotionValue(0.62);
  const endTop = useMotionValue(15);
  const endRight = useMotionValue(3);
  const endBottom = useMotionValue(6);
  const endLeft = useMotionValue(52);

  useEffect(() => {
    if (reduce) return;
    const sticky = stickyRef.current, title = titleRef.current, story = storyRef.current;
    if (!sticky || !title || !story) return;
    const measure = () => {
      const vh = sticky.clientHeight;
      const wide = window.innerWidth >= 900;
      const top = title.offsetTop;
      const h = title.offsetHeight; // layout size, unaffected by the scale transform
      const storyH = story.offsetHeight;
      const gap = clamp(vh * 0.035, 20, 40);
      if (wide) {
        // Title and story share the left column; the plate takes the right.
        const scale = clamp((vh - top - storyH - 2 * gap - vh * 0.06) / h, 0.38, 0.62);
        story.style.top = `${top + h * scale + gap}px`;
        endScale.set(scale);
        endTop.set(15); endRight.set(3); endBottom.set(6); endLeft.set(52);
      } else {
        // Title, then story, then the plate below them, keeping at least a quarter of the screen for the film.
        const minPlate = vh * 0.24;
        const scale = clamp((vh - top - storyH - 3 * gap - minPlate) / h, 0.36, 0.6);
        const storyTop = top + h * scale + gap;
        story.style.top = `${storyTop}px`;
        endScale.set(scale);
        endTop.set(clamp(((storyTop + storyH + gap) / vh) * 100, 20, 80)); endRight.set(4); endBottom.set(3); endLeft.set(4);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sticky);
    ro.observe(title);
    ro.observe(story);
    return () => ro.disconnect();
  }, [reduce, endScale, endTop, endRight, endBottom, endLeft]);

  // The film draws back into a plate: right half on wide screens, lower part on narrow ones.
  const top = useTransform(() => endTop.get() * plateProgress(p.get()));
  const right = useTransform(() => endRight.get() * plateProgress(p.get()));
  const bottom = useTransform(() => endBottom.get() * plateProgress(p.get()));
  const left = useTransform(() => endLeft.get() * plateProgress(p.get()));
  const radius = useTransform(p, [PLATE_FROM, PLATE_TO], [0, 24]);
  const clip = useMotionTemplate`inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
  const veil = useTransform(p, [PLATE_FROM, PLATE_TO], [1, 0]);
  // The title steps back to make room for the story.
  const titleScale = useTransform(() => 1 + (endScale.get() - 1) * plateProgress(p.get()));

  return (
    <section ref={ref} className={`q-hero ${reduce ? "is-still" : ""}`} aria-labelledby="hero-title">
      <div className="q-hero__sticky" ref={stickyRef}>
        <motion.div className="q-hero__frame" style={reduce ? undefined : { clipPath: clip }}>
          <img className="q-hero__media" src="/media/site/hero/pilates-hero-3.webp" alt="" fetchPriority="high" />
          <motion.div className="q-hero__veil" style={reduce ? undefined : { opacity: veil }} />
        </motion.div>

        <motion.h1 ref={titleRef} id="hero-title" className="q-display-xl q-hero__title" style={reduce ? undefined : { scale: titleScale }}>
          <span className="q-hero__one"><Weave text="The fabric of a longer life" /></span>{" "}
          <em className="q-hero__two">
            {LINE_TWO.map((w, i) => <Fragment key={w}>{i > 0 && " "}<ScrollWord word={w} i={i} p={p} still={reduce} /></Fragment>)}
          </em>
        </motion.h1>

        <p ref={storyRef} className="q-hero__story">
          {STORY.map((line, i) => <StoryLine key={line} text={line} i={i} p={p} still={reduce} />)}
        </p>
      </div>
    </section>
  );
}

/* ---------- Chronophotography: two frames, still pose then motion trail, each with its own line ---------- */
const FRAMES = [
  // Both frames are cropped so her head sits at the same point (75% 80%), so the swap reads as one continuous movement.
  { src: "/media/site/hero/chrono-a.webp", alt: "Woman in her seventies lifting her legs in a Pilates roll, shown as a motion trail", line: ["Every piece", "is ", "planned."] },
  { src: "/media/site/hero/chrono-b.webp", alt: "The same woman settling back to rest on the floor", line: ["So you can make peace", "around ", " your moves."] }
] as const;

export function Chrono() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Discrete swap at the midpoint, then a timed crossfade, so the section never rests half-blended.
  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v > 0.5 ? 1 : 0));

  const Caption = ({ line }: { line: readonly string[] }) => (
    <p className="q-chrono__line">{line[0]}<br />{line[1]}<em>{line[2]}</em></p>
  );

  if (reduce) {
    return (
      <section className="q-section q-shell q-split" aria-label="Manifesto">
        {FRAMES.map((f) => (
          <figure key={f.src} className="q-tile">
            <img src={f.src} alt={f.alt} style={{ borderRadius: 20, width: "100%" }} loading="lazy" />
            <Caption line={f.line} />
          </figure>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="q-chrono" aria-label="Manifesto" data-stage={stage}>
      <div className="q-chrono__sticky">
        {FRAMES.map((f, i) => (
          <img key={f.src} className={`q-chrono__frame ${stage === i ? "is-on" : ""}`} src={f.src} alt={stage === i ? f.alt : ""} loading="lazy" />
        ))}
        {/* Line 1 sits top left. Line 2 floats above her head as a thought (her head is pinned at 75% 80%). */}
        <div className={`q-chrono__caption q-chrono__caption--top ${stage === 0 ? "is-on" : ""}`} aria-hidden={stage !== 0}>
          <div className="q-shell"><div className="q-chrono__fx"><Caption line={FRAMES[0].line} /></div></div>
        </div>
        <div className={`q-chrono__caption q-chrono__caption--thought ${stage === 1 ? "is-on" : ""}`} aria-hidden={stage !== 1}>
          <div className="q-thought__text q-chrono__fx"><Caption line={FRAMES[1].line} /></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Quest Stride drop: wireframe scan resolves into the finished shoe ---------- */
export function Stride() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "center 0.45"] });
  // The scan dissolves into the finished shoe: a soft crossfade with a little focus pull, no shapes.
  const shoeOpacity = useTransform(p, [0.35, 0.9], [0, 1]);
  const shoeBlur = useTransform(p, [0.35, 0.9], [10, 0]);
  const shoeFilter = useMotionTemplate`blur(${shoeBlur}px)`;
  const yearX = useTransform(p, [0, 1], ["6%", "-6%"]);

  return (
    <section className="q-stride q-section" aria-labelledby="stride-title">
      <motion.p className="q-stride__year" aria-hidden="true" style={reduce ? undefined : { x: yearX }}>2080</motion.p>
      <div className="q-shell q-stride__grid">
        <div ref={ref} className="q-stride__stage">
          <img className="q-stride__scan" src="/media/site/detail/shoe.webp" alt="" loading="lazy" />
          <motion.div style={{ position: "absolute", inset: 0, ...(reduce ? {} : { opacity: shoeOpacity, filter: shoeFilter }) }}>
            <div className="q-stride__shoe-bg" />
            <img className="q-stride__shoe q-float" src="/media/site/cut/shoe.webp" alt="Quest Stride shoes in oat and graphite" loading="lazy" />
          </motion.div>
          <span className="q-stage__tag q-mono">From scan to stride</span>
        </div>
        <div style={{ display: "grid", gap: 24 }}>
          <span className="q-mono q-mono--bronze">New drop · Walk</span>
          <h2 id="stride-title" className="q-display">Quest<br />Stride</h2>
          <p className="q-lead">Every step, considered. Shaped around how feet change with time.</p>
          <ul className="q-specs">
            <li><span className="q-mono q-mono--bronze">01</span><div><b>Pressure insole</b><span>Maps heel to toe, gently.</span></div></li>
            <li><span className="q-mono q-mono--bronze">02</span><div><b>One-pull strap</b><span>No laces. Easy grip tab.</span></div></li>
            <li><span className="q-mono q-mono--bronze">03</span><div><b>Motion core</b><span>Clicks out to charge.</span></div></li>
          </ul>
          <div className="q-hero__actions">
            <Link className="q-btn q-btn--ink" href="/shop/quest-stride">Shop Quest Stride · ₩269,000</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Simple in-view reveal for section heads ---------- */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
