"use client";

import Link from "next/link";
import { AnimatePresence, type MotionValue, type Variants, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";

// The homepage opening, told in one pinned scroll: the title over the headband in a warm studio, the headband coming
// closer, then turning to show the sensors inside it as the room dims and a brain comes down above it, its signals
// running into them; then the band lies down beside a qPad that wakes when its signal reaches it and swipes through
// what the day looked like, then the same qPad in the hands of two people on a bench.
// The pictures move with the scroll. The words change by step instead: each chapter's title takes the spotlight, then
// settles into the footer while its caption takes over, so no line of type is ever left half way.
// Media comes from scripts/studio/story.py, which also prints GLASS: where the screen sits.

// The headband from three angles, all on one shared frame at one scale. It turns once per scene, always the same way
// round: from the front under the title, to show its sensors under the brain, to its side beside the qPad.
const BAND = { w: 1400, h: 861 };
const ANGLES = {
  front: "/media/site/qband-sage-duo/band-front.webp",
  three: "/media/site/qband-sage-duo/band-three.webp",
  side: "/media/site/qband-sage-duo/band-side.webp"
} as const;
type Angle = keyof typeof ANGLES;
const TURN: Angle[] = ["front", "three", "side"];
// Where the sensors sit inside the band in its three-quarter view, and its light in the side view (shares of the frame)
const SENSORS = [[0.254, 0.209], [0.379, 0.165], [0.521, 0.159], [0.654, 0.194], [0.768, 0.256]] as const;
const LIGHT3 = { x: 0.446, y: 0.904 };
const LED = { x: 0.095, y: 0.642 };
// The brain in warm porcelain, and a map of its folds for the light to run along
const BRAIN = { src: "/media/site/qband-sage-duo/brain.webp", folds: "/media/site/qband-sage-duo/brain-folds.webp", w: 657, h: 900 };
const PAD = { src: "/media/site/qband-sage-duo/qpad-off.webp", w: 1196, h: 1046 };
// The couple's photo, and where the qPad in their hands sits in it (centre and width, as shares of the photo)
const COUPLE = { src: "/media/site/qband-sage-duo/couple.webp", w: 1800, h: 1200, x: 0.624, y: 0.461, pw: 0.187 };
// Screens are drawn flat at 1000 x 640, then laid onto the glass of the tablet render
const GLASS = "matrix3d(1.11424, 0.125319, 0, 0.000168639, 0.0501512, 1.03101, 0, -8.01867e-05, 0, 0, 1, 0, 114, 64, 0, 1)";

const TITLE = { lead: "The mind-body", accent: "synchronization" };

// Where each beat sits along the scroll, from 0 (top of the story) to 1 (its end). Beats overlap, so something is
// always moving: the band turns and sinks while the room dims and the brain comes down, then it lies down beside the
// qPad while the brain rises away and the qPad is lifted into view.
const T = {
  intro: [0.012, 0.089] as const, // the band comes closer from under the title, to its place beside the words
  stage: [0.115, 0.165] as const, // it turns to show its sensors and sinks to make room for the brain
  night: [0.118, 0.172] as const, // the room dims to night around them
  brain: [0.128, 0.176] as const, // the brain comes down into the light
  fire: [0.158, 0.185] as const, // it lights up along its folds
  sparks: [0.17, 0.205] as const, // its signals run down into the band's sensors
  lift: [0.285, 0.32] as const, // the brain rises away
  dock: [0.31, 0.42] as const, // the band turns to its side and settles above the qPad
  arrive: [0.331, 0.429] as const, // the qPad is lifted up, screen off
  signal: [0.406, 0.458] as const, // the band's signal travels to it
  wake: [0.454, 0.488] as const, // the screen comes on
  morph: [0.718, 0.83] as const // the qPad becomes the one in the couple's hands
};
// Where the band turns: to its sensors as the brain arrives, to its side as it leaves for the qPad
const TURNS = [0.122, 0.316];

const SCREENS = [
  { id: "read", at: [0.502, 0.592], photo: "read", alt: "A man in a qBand reading on his qPad at home", from: "qBand", title: "Calm while you read", line: "Calm held for 18 minutes" },
  { id: "walk", at: [0.592, 0.666], photo: "walk", alt: "A woman on her morning walk in a lavender Quest Hood and smart shoes", from: "Quest Hood and Quest Stride", title: "A steadier morning walk", line: "An even stride for 2.1 km" },
  { id: "melody", at: [0.666, 2], photo: "melody", alt: "A woman in a qBand practising the piano, qPad on the stand", from: "qBand", title: "Focus at the piano", line: "Focus held for 12 minutes" }
] as const;

// Each chapter starts where the scroll reaches `at`; before the first one, the title has the screen to itself
const CHAPTERS = [
  { at: 0.0325, title: "Wear it", line: "Meet Sage Duo. A soft headband for curious minds and bodies in motion. From your first stretch to your next healthy activity." },
  { at: 0.128, title: "Sense it", line: "Your brain hums with tiny sparks of electricity. Dry sensors inside Sage Duo listen through your forehead, no gel needed, and send them to qPad as focus and calm." },
  { at: 0.383, title: "See it", line: "qPad wakes up with you and finds your rhythm. Explore something new, and turn daily routines into something you look forward to better every day." },
  { at: 0.586, title: "Full body on one screen", line: "Your qBand, custom-made sensing clothes, and smart footwear, together on Quest View. See small steps become progress. And find your own pace." },
  { at: 0.838, title: "Live it together", line: "More to learn about our bodies. More ways to move. More new stories with the people you choose." },
  { at: 0.927, title: "Your first year in one box", line: "qBand, qPad and 12 months of Quest View, all bundled for our founding members." }
] as const;
const ORDER = { label: "Pre-order", href: "/duet" };
// How long a chapter's title holds the spotlight before it settles into the footer, unless the reader scrolls on
const HOLD = 1000;
const HOLD_SCROLL = 0.028;

/* ---------- small helpers ---------- */
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smooth = (t: number) => t * t * (3 - 2 * t);
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/** Raw (linear) progress of v through [a, b]. */
const along = (v: number, [a, b]: readonly number[]) => clamp01((v - a) / (b - a));
/** Piecewise-linear keyframes over progress, like useTransform's arrays. */
function keys(v: number, at: readonly number[], vals: readonly number[]) {
  if (v <= at[0]) return vals[0];
  for (let i = 1; i < at.length; i++) if (v <= at[i]) return mix(vals[i - 1], vals[i], smooth((v - at[i - 1]) / (at[i] - at[i - 1] || 1)));
  return vals[vals.length - 1];
}
/** Scroll-linked keyframes, computed on the main thread so every layer reads the same moment of the scroll
    (array-form opacity can be handed to a separate accelerated timeline that drifts from the transforms). */
const useKeys = (p: MotionValue<number>, at: readonly number[], vals: readonly number[]) => useTransform(() => keys(p.get(), at, vals));

/** An EEG-like trace from (x0, y0) to (x1, y1): a steady rhythm that swells in short bursts, quiet at both ends. */
function trace(x0: number, y0: number, x1: number, y1: number, cycles = 9, amp = 22) {
  const steps = 160;
  const len = Math.hypot(x1 - x0, y1 - y0) || 1;
  const nx = -(y1 - y0) / len, ny = (x1 - x0) / len;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const off = Math.sin(t * Math.PI * 2 * cycles) * amp * Math.sin(Math.PI * t) * (0.55 + 0.45 * Math.sin(t * Math.PI * 3.2 + 0.6));
    pts.push(`${(x0 + (x1 - x0) * t + nx * off).toFixed(1)} ${(y0 + (y1 - y0) * t + ny * off).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

type Box = { cx: number; cy: number; w: number };
type Pose = Box & { o?: number; rotate?: number; rotateX?: number; blur?: number };

/** Where everything sits for a given viewport: the words beside the devices on wide screens, above them on tall ones.
    `words` is how far down the tallest chapter reaches, so the devices never sit under the text, and `title` where the
    opening title ends, which only the band has to clear, and only while the title is there. */
function plan(w: number, h: number, words = h * 0.36, title = h * 0.4) {
  const wide = w >= 720 && w / h > 1.05;
  const V = wide
    ? { l: w * 0.4, t: h * 0.1, r: w * 0.98, b: h * 0.94 }
    : { l: w * 0.04, t: Math.max(h * 0.34, words + 24), r: w * 0.96, b: h - 104 };
  const vw = V.r - V.l, vh = V.b - V.t, vx = (V.l + V.r) / 2, vy = (V.t + V.b) / 2;
  const bandA = BAND.w / BAND.h, padA = PAD.w / PAD.h, brainA = BRAIN.w / BRAIN.h;
  const hero: Box = { cx: vx, cy: vy, w: Math.min(vw * 0.98, vh * 0.95 * bandA) };
  // Under the title the band floats centred in the room left below it: from the front on wide screens, where the
  // band (44% of its frame's height, a little below centre) reads as a calm line; at an angle on narrow ones.
  const below = title + 32, room = h - 76 - below;
  const intro: Box = wide
    ? (() => { const bw = Math.min(w * 0.62, (room * 0.86 * bandA) / 0.44); return { cx: w / 2, cy: below + room / 2 - 0.05 * (bw / bandA), w: bw }; })()
    : { cx: w / 2, cy: below + room * 0.42, w: Math.min(w * 0.94, room * 0.8 * bandA) };
  // Under the brain the band shows the sensors inside it, low in the device area, with the brain floating above it,
  // close enough for its signals to reach them
  const sw = wide ? Math.min(vw * 0.72, vh * 0.6 * bandA) : Math.min(vw * 0.86, vh * 0.5 * bandA);
  const stage: Box = { cx: vx, cy: wide ? V.t + vh * 0.75 : V.b - sw / bandA / 2, w: sw };
  const brain: Box = { cx: vx, cy: V.t + vh * (wide ? 0.25 : 0.2), w: vh * (wide ? 0.44 : 0.36) * brainA };
  const padW = wide ? Math.min(vw * 0.8, vh * 0.78 * padA) : Math.min(vw * 0.94, vh * 0.62 * padA), padH = padW / padA;
  const on: Box = wide ? { cx: V.l + vw * 0.6, cy: V.t + vh * 0.6, w: padW } : { cx: vx + vw * 0.02, cy: V.b - padH / 2, w: padW };
  // Beside the qPad the band lies on its side, large, just above the qPad's upper left corner, with its light over the
  // qPad's left edge so its signal can drop onto the frame
  const dw = wide ? Math.min(vw * 0.6, on.w * 0.82) : vw * 0.74, dh = dw / bandA;
  const ledX = on.cx - on.w * (wide ? 0.66 : 0.42);
  const rest = on.cy - padH * 0.5 - (wide ? 16 : 44); // where the band's lower edge rests
  const dock: Box = { cx: ledX + (0.5 - LED.x) * dw, cy: Math.max(V.t + dh * 0.24, rest - dh * 0.272), w: dw };
  // The couple's photo, fitted into the device area (a little wider on phones)
  const fw = wide ? Math.min(vw, vh * 1.5) : Math.min(w * 0.92, vh * 1.5);
  const F = { l: vx - fw / 2, t: vy - fw / 1.5 / 2, w: fw };
  return { w, h, wide, intro, hero, stage, brain, dock, on, F };
}
type Plan = ReturnType<typeof plan>;

/** Where the photo's own qPad is, and how big the photo is drawn, part way (e) through the hand-over. */
function handover(L: Plan, e: number) {
  const k0 = L.on.w / (COUPLE.pw * L.F.w);
  const s = Math.pow(k0, 1 - e); // scale eases in log space, so the zoom out feels even
  const px = COUPLE.x * L.F.w, py = COUPLE.y * (L.F.w / 1.5);
  const cx = mix(L.on.cx, L.F.l + px, e), cy = mix(L.on.cy, L.F.t + py, e);
  return { s, cx, cy, px, py };
}

/** A piece placed by its centre: position, size, turn and fade all come from one pose per frame. */
function usePlaced(p: MotionValue<number>, size: MotionValue<Plan>, base: number, aspect: number, at: (v: number, L: Plan) => Pose): Record<string, unknown> {
  const pose = useTransform(() => at(p.get(), size.get()));
  return {
    x: useTransform(() => pose.get().cx),
    y: useTransform(() => pose.get().cy),
    scale: useTransform(() => pose.get().w / base),
    rotate: useTransform(() => pose.get().rotate ?? 0),
    rotateX: useTransform(() => pose.get().rotateX ?? 0),
    opacity: useTransform(() => pose.get().o ?? 1),
    filter: useTransform(() => `blur(${(pose.get().blur ?? 0).toFixed(2)}px)`),
    width: base, marginLeft: -base / 2, marginTop: -base / aspect / 2, transformPerspective: 1400
  };
}

/* ---------- the words: one step at a time, on a clock rather than the scroll ---------- */
const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.55, 0, 0.75, 0.2] as const;
const soft = { opacity: 0, filter: "blur(10px)" };
const clear = { opacity: 1, filter: "blur(0px)" };
/** A chapter title in the spotlight. When it hands over, it shrinks and drops towards the footer, where it lands. */
const spotTitle: Variants = {
  enter: { ...soft, y: 28 },
  show: { ...clear, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
  leave: (handoff: boolean) => (handoff
    ? { opacity: 0, y: "34vh", scale: 0.3, filter: "blur(2px)", transition: { duration: 0.6, ease: EASE_IN } }
    : { ...soft, y: -16, transition: { duration: 0.35 } })
};
const spotLine: Variants = {
  enter: { ...soft, y: 20 },
  show: { ...clear, y: 0, transition: { duration: 0.9, delay: 0.22, ease: EASE } },
  leave: { ...soft, y: -14, transition: { duration: 0.35 } }
};

/** One story on the qPad. Stories change the way a tablet turns a page: the next slides in over the last,
    its photo travelling a little slower than its frame, while the last one slips back and dims. */
function Screen({ p, s }: { p: MotionValue<number>; s: (typeof SCREENS)[number] }) {
  const [a, b] = s.at;
  const into = useTransform(() => outCubic(along(p.get(), [a - 0.03, a + 0.004])));
  const out = useTransform(() => smooth(along(p.get(), [b - 0.004, b + 0.03])));
  const x = useTransform(() => `${(1 - into.get()) * 100 - out.get() * 30}%`);
  const imgX = useTransform(() => `${(1 - into.get()) * -45}%`);
  const shade = useTransform(() => out.get() * 0.55);
  return (
    <motion.figure className="q-bws__screen" style={{ x }}>
      <motion.img src={`/media/site/qband-sage-duo/${s.photo}.webp`} alt={s.alt} width={1000} height={667} style={{ x: imgX }} />
      <figcaption>
        <span className="q-bws__from"><i aria-hidden="true" />{s.from}</span>
        <b>{s.title}</b>
        <span className="q-bws__read">{s.line}</span>
      </figcaption>
      <motion.span className="q-bws__shade" style={{ opacity: shade }} aria-hidden="true" />
    </motion.figure>
  );
}

/** One of the brain's signals: drawn down to its sensor as the scroll goes on, then a spark of light runs along it
    over and over, and the sensor brightens as each one arrives. */
function Stream({ p, d, i }: { p: MotionValue<number>; d: string; i: number }) {
  const draw = useKeys(p, [T.sparks[0] + i * 0.004, T.sparks[1] - (SENSORS.length - 1 - i) * 0.002], [1, 0]);
  return (
    <>
      <motion.path className="q-bws__stream" d={d} pathLength={1} style={{ strokeDashoffset: draw }} />
      <path className="q-bws__spark" d={d} pathLength={100} style={{ animationDelay: `${(-0.37 * i).toFixed(2)}s` }} />
    </>
  );
}

/** For anyone who prefers less motion: the same story, laid out in order and standing still. */
function Still() {
  return (
    <section className="q-bws q-bws--still" aria-labelledby="bws-title">
      <div className="q-shell q-bws__flow">
        <h1 id="bws-title" className="q-bws__title">{TITLE.lead} <em>{TITLE.accent}</em></h1>
        {CHAPTERS.map((c, i) => (
          <div key={c.title} className="q-bws__chapter">
            <h2 className="q-bws__beat">{c.title}</h2>
            <p className="q-bws__line">{c.line}</p>
            {i === 0 && <img src={ANGLES.front} alt="Sage Duo from the front: a sage woven headband with two soft forehead pods" width={BAND.w} height={BAND.h} />}
            {i === 1 && <img src={ANGLES.three} alt="Inside Sage Duo: dry sensors along the band, where it rests on the forehead" width={BAND.w} height={BAND.h} />}
            {i === 2 && <img src="/media/site/qband-sage-duo/read.webp" alt={SCREENS[0].alt} width={1000} height={667} />}
            {i === 4 && <img src={COUPLE.src} alt="Two people on a bench after a morning walk, both in qBands, sharing a qPad" width={COUPLE.w} height={COUPLE.h} />}
          </div>
        ))}
        <div className="q-bws__links">
          <Link className="q-btn q-btn--primary" href={ORDER.href}>{ORDER.label}</Link>
        </div>
      </div>
    </section>
  );
}

export default function QBandStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Everything follows the scroll through one spring, so the whole scene moves with the same weight and settles
  // softly when the scrolling stops, instead of stepping with every notch of the wheel.
  const p = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.6, restDelta: 0.0002 });

  // The layout follows the viewport; until it is measured, a desktop guess keeps the server render sensible
  const [L, setL] = useState<Plan>(() => plan(1440, 900));
  const [ready, setReady] = useState(false);
  const [copyH, setCopyH] = useState(0);
  // Once the first measured frame is on screen, changes animate; before that (the server's desktop guess giving way to
  // the real viewport) they apply at once, so a phone never sees the band turn on load
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const r = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(r);
  }, [ready]);
  const size = useMotionValue<Plan>(L);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const sync = () => {
      const copy = copyRef.current, hero = heroRef.current;
      const tallest = Math.max(0, ...Array.from(measureRef.current?.children ?? []).map((c) => (c as HTMLElement).offsetHeight));
      const next = plan(el.clientWidth, el.clientHeight, (copy?.offsetTop ?? 0) + tallest, hero ? hero.offsetTop + hero.offsetHeight : undefined);
      size.set(next); setL(next); setCopyH(tallest); setReady(true);
    };
    sync();
    // Measure again once the display face has loaded, since the words' heights depend on it
    document.fonts?.ready.then(sync);
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size]);

  // Which chapter the scroll is in (-1 while the title has the screen), and whether its title or its caption is up.
  // Coming back up into a chapter goes straight to its caption.
  const [chapter, setChapter] = useState(-1);
  const [phase, setPhase] = useState<"title" | "line">("title");
  // Which way the band faces (an index into TURN), and whether night has come in far enough for light type
  const [turn, setTurn] = useState(0);
  const [night, setNight] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    let i = -1;
    CHAPTERS.forEach((c, k) => { if (v >= c.at) i = k; });
    if (i !== chapter) {
      setPhase(i < chapter ? "line" : "title");
      setChapter(i);
    } else if (i >= 0 && phase === "title" && v > CHAPTERS[i].at + HOLD_SCROLL) setPhase("line");
    // The band turns a little past each turning point, so a scroll resting on one never makes it flicker
    let n = turn;
    while (n < TURNS.length && v > TURNS[n] + 0.003) n++;
    while (n > 0 && v < TURNS[n - 1] - 0.003) n--;
    if (n !== turn) setTurn(n);
    const dark = v > T.night[0] + (T.night[1] - T.night[0]) * 0.35;
    if (dark !== night) setNight(dark);
  });
  useEffect(() => {
    if (chapter < 0 || phase !== "title") return;
    const t = window.setTimeout(() => setPhase("line"), HOLD);
    return () => window.clearTimeout(t);
  }, [chapter, phase]);
  // A title leaving for its own caption hands over to the footer; any other change simply clears
  const shown = useRef(chapter);
  const handoff = shown.current === chapter;
  useEffect(() => { shown.current = chapter; }, [chapter]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (CHAPTERS[i].at + 0.02) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  const angle: Angle = TURN[turn];

  // The band: under the title, then closer and larger beside the words, one picture gliding the whole way; then down
  // under the brain, and an arc up to rest above the qPad (up eases faster than across, so the path curves). It stays
  // level throughout, and bows out before the hand-over.
  const band = usePlaced(p, size, L.hero.w, BAND.w / BAND.h, (v, P) => {
    const s = smooth(along(v, T.intro)), g = smooth(along(v, T.stage)), t = along(v, T.dock);
    const leave = smooth(along(v, [T.morph[0] - 0.035, T.morph[0] + 0.01]));
    const cx = mix(mix(P.intro.cx, P.hero.cx, s), P.stage.cx, g);
    const cy = mix(mix(P.intro.cy, P.hero.cy, s), P.stage.cy, g);
    const w = mix(mix(P.intro.w, P.hero.w, s), P.stage.w, g);
    return {
      cx: mix(cx, P.dock.cx, smooth(t)), cy: mix(cy, P.dock.cy, outCubic(t)) - leave * 30,
      w: mix(w, P.dock.w, smooth(t)) * (1 - leave * 0.08), o: 1 - leave, blur: leave * 6
    };
  });
  // The brain comes down out of the dark into focus above the band, and later rises away again
  const brain = usePlaced(p, size, L.brain.w, BRAIN.w / BRAIN.h, (v, P) => {
    const a = along(v, T.brain), e = outCubic(a), b = smooth(along(v, T.lift));
    return {
      cx: P.brain.cx, cy: P.brain.cy - (1 - e) * P.h * 0.2 - b * P.h * 0.16, w: P.brain.w * mix(0.86, 1, e) * (1 + b * 0.06),
      o: clamp01(a * 1.6) * (1 - b), blur: (1 - e) * 10 + b * 8
    };
  });
  const fire = useKeys(p, [T.fire[0], T.fire[1], T.lift[0], T.lift[0] + 0.02], [0, 1, 1, 0]);
  const streamsO = useKeys(p, [T.sparks[0] - 0.004, T.sparks[0], T.lift[0], T.lift[0] + 0.015], [0, 1, 1, 0]);
  const sparksO = useKeys(p, [T.sparks[1] - 0.01, T.sparks[1], T.lift[0], T.lift[0] + 0.015], [0, 1, 1, 0]);
  // The studio's light follows the band, so it always sits in the brightest part of the room
  const light = { x: band.x as MotionValue<number>, y: band.y as MotionValue<number> };
  // The qPad: lifted up from below and tilted towards you as it comes, then it rides the hand-over into the photo,
  // fading as the photo's own qPad takes its place
  const pad = usePlaced(p, size, L.on.w, PAD.w / PAD.h, (v, P) => {
    if (v < T.morph[0]) {
      const t = along(v, T.arrive), e = outCubic(t);
      return { cx: P.on.cx, cy: P.on.cy + (1 - e) * P.h * 0.55, w: P.on.w * mix(0.86, 1, e), rotateX: 34 * (1 - e), o: clamp01(t * 2.2) };
    }
    const e = smooth(along(v, T.morph)), m = handover(P, e);
    return { cx: m.cx, cy: m.cy, w: COUPLE.pw * P.F.w * m.s, o: 1 - smooth(along(e, [0.15, 0.55])) };
  });
  // The couple's photo opens out from the qPad in their hands, coming into focus as it settles
  const photoX = useTransform(() => { const P = size.get(), m = handover(P, smooth(along(p.get(), T.morph))); return m.cx - m.s * m.px; });
  const photoY = useTransform(() => { const P = size.get(), m = handover(P, smooth(along(p.get(), T.morph))); return m.cy - m.s * m.py; });
  const photoS = useTransform(() => handover(size.get(), smooth(along(p.get(), T.morph))).s);
  const photoO = useKeys(p, [T.morph[0], T.morph[0] + 0.03], [0, 1]);
  const photoBlur = useTransform(() => `blur(${(10 * (1 - smooth(along(p.get(), [T.morph[0], T.morph[0] + 0.08])))).toFixed(2)}px)`);
  const photoR = useKeys(p, [T.morph[0] + 0.06, T.morph[1]], [0, 20]);

  // The room dims: a soft-edged circle of night closes in on the brain and the band until they are the only light, and
  // its warm heart follows the band across to the qPad
  const dusk = (v: number, P: Plan) => {
    const t = smooth(along(v, T.dock));
    return { x: mix(P.stage.cx, P.on.cx, t), y: mix((P.brain.cy + P.stage.cy) / 2, P.on.cy, t) };
  };
  const duskX = useTransform(() => `${dusk(p.get(), size.get()).x.toFixed(1)}px`);
  const duskY = useTransform(() => `${dusk(p.get(), size.get()).y.toFixed(1)}px`);
  const dim = useTransform(() => {
    const P = size.get(), v = p.get(), c = dusk(v, P);
    const reach = Math.hypot(Math.max(c.x, P.w - c.x), Math.max(c.y, P.h - c.y)); // past the farthest corner
    return `${mix(reach * 1.15, -reach * 0.4, smooth(along(v, T.night))).toFixed(1)}px`;
  });
  const glow = useKeys(p, [T.wake[0], T.wake[1], T.morph[0], T.morph[0] + 0.06], [0, 1, 1, 0]);
  const draw = useKeys(p, T.signal, [1, 0]);
  const signalO = useKeys(p, [T.signal[0] - 0.01, T.signal[0], T.morph[0] - 0.03, T.morph[0]], [0, 1, 1, 0]);
  const live = useTransform(() => (p.get() > T.signal[1] && p.get() < T.morph[0] ? 1 : 0));
  // The screen wakes: a soft bloom of light, then the first words, which slide away as the first story comes in
  const bloom = useKeys(p, [T.wake[0], T.wake[0] + 0.012, T.wake[1]], [0, 1, 0]);
  const bloomS = useKeys(p, [T.wake[0], T.wake[0] + 0.012], [0.04, 1]);
  const hello = useKeys(p, [T.wake[0] + 0.01, T.wake[1]], [0, 1]);
  const helloX = useTransform(() => `${-30 * smooth(along(p.get(), [SCREENS[0].at[0] - 0.03, SCREENS[0].at[0] + 0.004]))}%`);

  // The brain's signals: each leaves its underside, spread across it as the sensors are spread across the band, and
  // curves down into its sensor
  const bandA = BAND.w / BAND.h, stageH = L.stage.w / bandA, brainH = L.brain.w / (BRAIN.w / BRAIN.h);
  const at = (x: number, y: number) => ({ x: L.stage.cx + (x - 0.5) * L.stage.w, y: L.stage.cy + (y - 0.5) * stageH });
  const streams = SENSORS.map(([sx, sy]) => {
    const t = at(sx, sy), u = ((sx - 0.511) / 0.257) * 0.62;
    const o = { x: L.brain.cx + (u * L.brain.w) / 2, y: L.brain.cy + (brainH / 2) * Math.sqrt(1 - u * u) * 0.86 };
    const k = (t.y - o.y) * 0.5;
    return { ...t, d: `M${o.x.toFixed(1)} ${o.y.toFixed(1)} C${o.x.toFixed(1)} ${(o.y + k).toFixed(1)} ${t.x.toFixed(1)} ${(t.y - k).toFixed(1)} ${t.x.toFixed(1)} ${t.y.toFixed(1)}` };
  });
  const light3 = at(LIGHT3.x, LIGHT3.y);

  // The band's signal drops from the light on its pod onto the qPad's left edge, clear of the glass
  const dockH = L.dock.w / bandA, padH = L.on.w / (PAD.w / PAD.h);
  const from = { x: L.dock.cx + (LED.x - 0.5) * L.dock.w, y: L.dock.cy + (LED.y - 0.5) * dockH };
  const to = { x: L.on.cx - L.on.w * 0.446, y: L.on.cy - padH * 0.118 };
  const d = trace(from.x, from.y, to.x, to.y, Math.max(3, Math.round(Math.hypot(to.x - from.x, to.y - from.y) / 42)), L.wide ? 14 : 10);

  if (reduce) return <Still />;

  const c = chapter >= 0 ? CHAPTERS[chapter] : null;
  const last = chapter === CHAPTERS.length - 1;

  return (
    <section ref={ref} className={`q-bws ${ready ? "is-ready" : ""} ${night ? "is-night" : ""}`} aria-labelledby="bws-title">
      <div ref={stage} className="q-bws__sticky">
        <motion.div className="q-bws__light" style={light} aria-hidden="true" />
        <motion.div className="q-bws__dusk" style={{ "--cx": duskX, "--cy": duskY, "--r": dim } as unknown as CSSProperties} aria-hidden="true" />
        <motion.div className="q-bws__glow" style={{ opacity: glow, left: L.on.cx, top: L.on.cy, width: L.on.w * 1.7, height: L.on.w * 1.3 }} aria-hidden="true" />

        <motion.div className="q-bws__photo" style={{ width: L.F.w, x: photoX, y: photoY, scale: photoS, opacity: photoO, filter: photoBlur, borderRadius: photoR, transformOrigin: "0 0" }}>
          <img src={COUPLE.src} alt="Two people on a bench after a morning walk, both in qBands, sharing a qPad" width={COUPLE.w} height={COUPLE.h} loading="lazy" />
        </motion.div>

        {/* Everything that floats shares one slow rise and fall, so the signals stay joined to what they connect */}
        <motion.div className="q-bws__brain" style={{ ...brain, "--fire": fire } as unknown as CSSProperties} aria-hidden="true">
          <div className="q-bws__bob">
            <img src={BRAIN.src} alt="" width={BRAIN.w} height={BRAIN.h} loading="lazy" />
            <span className="q-bws__fire" style={{ "--folds": `url(${BRAIN.folds})` } as CSSProperties} />
          </div>
        </motion.div>

        <svg className="q-bws__sparks q-bws__bob" aria-hidden="true">
          <motion.g style={{ opacity: streamsO }}>
            {streams.map((s, i) => <Stream key={i} p={p} d={s.d} i={i} />)}
          </motion.g>
          <motion.g style={{ opacity: sparksO }}>
            {streams.map((s, i) => <circle key={i} className="q-bws__sensor" cx={s.x} cy={s.y} r={L.wide ? 5 : 3.5} style={{ animationDelay: `${(-0.37 * i - 0.95).toFixed(2)}s` }} />)}
            <circle className="q-bws__sensor" cx={light3.x} cy={light3.y} r={L.wide ? 6 : 4} style={{ animationDelay: "-1.69s" }} />
          </motion.g>
        </svg>

        <motion.svg className="q-bws__signal q-bws__bob" style={{ opacity: signalO }} aria-hidden="true">
          <motion.path className="q-bws__trace" d={d} pathLength={1} style={{ strokeDashoffset: draw }} />
          <motion.path className="q-bws__pulse" d={d} pathLength={100} style={{ opacity: live }} />
          <circle className="q-bws__node" cx={from.x} cy={from.y} r={4.5} />
          <circle className="q-bws__node" cx={to.x} cy={to.y} r={4.5} />
        </motion.svg>

        <motion.div className="q-bws__pad" style={pad}>
          <div className="q-bws__bob">
            <img src={PAD.src} alt="qPad, an ivory tablet with four soft keys below the screen" width={PAD.w} height={PAD.h} />
            <div className="q-bws__glass" style={{ "--k": L.on.w / PAD.w, "--glass": GLASS } as CSSProperties}>
              <div className="q-bws__display">
                <motion.div className="q-bws__hello" style={{ opacity: hello, x: helloX }}>
                  <span className="q-bws__from"><i aria-hidden="true" />qBand is on</span>
                  <b>Good morning</b>
                  <svg viewBox="0 0 600 60" aria-hidden="true"><path d={trace(0, 30, 600, 30, 14, 18)} /></svg>
                </motion.div>
                {SCREENS.map((s) => <Screen key={s.id} p={p} s={s} />)}
                <motion.span className="q-bws__bloom" style={{ opacity: bloom, scaleY: bloomS }} aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* The band floats level and sways a few degrees either way, a light sliding over it as it turns, like a model
            on a slow turntable. When a scene changes it turns on: the last view swings away and clears before the next
            swings in from the same side, so two pictures are never seen at once. */}
        <motion.div className="q-bws__band" style={band} role="img" aria-label="Sage Duo, a sage woven headband with two soft forehead pods and dry sensors inside">
          <div className="q-bws__float">
            <div className="q-bws__turn">
              {TURN.map((a) => {
                const k = TURN.indexOf(a) - TURN.indexOf(angle);
                return (
                  <motion.div key={a} className="q-bws__view" initial={false} style={{ transformPerspective: 1100, "--src": `url(${ANGLES[a]})` } as unknown as CSSProperties}
                    animate={k === 0
                      ? { opacity: 1, rotateY: 0, scale: 1, filter: "blur(0px)", visibility: "visible", transition: { duration: settled ? 0.85 : 0, delay: settled ? 0.3 : 0, ease: EASE } }
                      : { opacity: 0, rotateY: k < 0 ? -24 : 24, scale: 0.96, filter: "blur(8px)", transition: { duration: settled ? 0.32 : 0, ease: EASE_IN }, transitionEnd: { visibility: "hidden" } }}>
                    <img src={ANGLES[a]} alt="" width={BAND.w} height={BAND.h} fetchPriority={a === "front" ? "high" : undefined} />
                    <i className="q-bws__sheen" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="q-shell q-bws__words">
          <motion.div ref={heroRef} className="q-bws__hero" initial={false}
            animate={chapter < 0 ? { ...clear, scale: 1 } : { opacity: 0, filter: "blur(12px)", scale: 0.97 }}
            transition={{ duration: chapter < 0 ? 0.8 : 0.5, ease: EASE }}>
            <h1 id="bws-title" className="q-bws__title">{TITLE.lead} <em>{TITLE.accent}</em></h1>
          </motion.div>

          {/* The spotlight: one chapter's title, then its caption. The words are written out for screen readers below. */}
          <div ref={copyRef} className={`q-bws__copy ${night ? "" : "is-day"}`} style={L.wide && copyH ? { height: copyH } : undefined}>
            <AnimatePresence custom={handoff}>
              {c && phase === "title" && (
                <motion.p key={`t${chapter}`} className="q-bws__spot-title" aria-hidden="true" custom={handoff}
                  variants={spotTitle} initial="enter" animate="show" exit="leave">{c.title}</motion.p>
              )}
              {c && phase === "line" && (
                <motion.div key={`l${chapter}`} className="q-bws__spot-line" variants={spotLine} initial="enter" animate="show" exit="leave">
                  <p aria-hidden="true">{c.line}</p>
                  {last && <Link className="q-btn q-btn--primary" href={ORDER.href}>{ORDER.label}</Link>}
                </motion.div>
              )}
            </AnimatePresence>
            {/* Every title and caption, laid out invisibly, so the devices can be kept clear of the tallest */}
            <div ref={measureRef} className="q-bws__measure" aria-hidden="true">
              {CHAPTERS.flatMap((m, i) => [
                <p key={`t${i}`} className="q-bws__spot-title">{m.title}</p>,
                <div key={`l${i}`} className="q-bws__spot-line"><p>{m.line}</p>{i === CHAPTERS.length - 1 && <span className="q-btn">{ORDER.label}</span>}</div>
              ])}
            </div>
          </div>

          <div className="q-sr">
            {CHAPTERS.map((m) => (
              <div key={m.title}><h2>{m.title}</h2><p>{m.line}</p></div>
            ))}
          </div>
        </div>

        {/* Where you are in the story, and a way to jump to any part of it. Each title comes to rest here once its
            caption is up, so it is never on screen twice. */}
        <motion.nav className="q-bws__rail" aria-label="qBand story" initial={false}
          animate={chapter >= 0 ? { opacity: 1, visibility: "visible" } : { opacity: 0, transitionEnd: { visibility: "hidden" } }}
          transition={{ duration: 0.6 }}>
          <ol>
            {CHAPTERS.map((m, i) => (
              <li key={m.title}>
                <button type="button" aria-current={i === chapter ? "step" : undefined} aria-label={m.title} onClick={() => jump(i)}><i /></button>
              </li>
            ))}
          </ol>
          <span className="q-bws__now" aria-hidden="true">
            <AnimatePresence>
              {c && phase === "line" && (
                <motion.span key={chapter} initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.25, ease: EASE } }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}>{c.title}</motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.nav>
        <motion.span className="q-bws__cue" initial={false} animate={{ opacity: chapter < 0 ? 1 : 0 }} transition={{ duration: 0.5 }} aria-hidden="true">Scroll<i /></motion.span>
      </div>
    </section>
  );
}
