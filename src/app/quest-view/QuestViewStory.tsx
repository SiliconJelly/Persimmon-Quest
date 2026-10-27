"use client";

import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, Brain, Check, Eye, Hand, Lock, Mic, MousePointerClick, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AutoVideo from "../components/site/AutoVideo";
import { Reveal } from "../components/site/HomeMotion";
import QPad, { AquaFace, BrainMapFace, CalmFace, FamilyFace, FlowFace, LanternFace, LocalAIFace, MorningFace, MoveFace, NightFace, PhotoFace, type QKey, QKEYS, QuestFace, RestFace } from "../components/site/QPad";
import { Rail } from "../components/site/Storefront";

/* ---------- The four keys, each a beat in the sticky story ---------- */
const BEATS: { key: QKey; title: string; line: string; face: React.ReactNode; label: string }[] = [
  {
    key: "move", title: "Press Move. Off you go.",
    line: "Today's walk begins. Your clothes count each step and notice how steady it is, so you never have to.",
    face: <MoveFace />, label: "Move screen: morning walk, 4,860 steps, stride steady, balance good, 14 of 20 minutes."
  },
  {
    key: "calm", title: "Press Calm. Breathe with it.",
    line: "Put on your qBand and follow the circle. The headband reads your brain activity and simply tells you when your mind has settled.",
    face: <CalmFace />, label: "Calm screen: breathing circle, mind moving from busy to settling to settled, 6 minutes 40 left."
  },
  {
    key: "rest", title: "Rest is already done.",
    line: "The soft Movement Tank follows your breathing through the night while you do nothing at all. In the morning, one plain sentence about how you rested.",
    face: <RestFace />, label: "Rest screen: last night, slept well, woke once, 7 hours 20 minutes asleep."
  },
  {
    key: "quest", title: "Your quest. Made for today.",
    line: "One key for one gentle suggestion, shaped by how you slept, moved and felt this week. Say yes, or not today.",
    face: <QuestFace />, label: "Your quest screen: you slept lightly, so today's walk is shorter. 20 minutes by the river, then a short calm session."
  }
];

const HIGHLIGHTS = [
  { href: "#keys", label: "Four keys" },
  { href: "#learns", label: "It learns you" },
  { href: "#mind", label: "Your brain" },
  { href: "#access", label: "Every way in" },
  { href: "#cases", label: "Every kind of wellness" },
  { href: "#together", label: "All in one place" },
  { href: "#family", label: "Family and privacy" }
];

/** The centrepiece: qPad stays put while each scroll beat presses the next key. */
function KeySequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setBeat(Math.min(BEATS.length - 1, Math.max(0, Math.floor(v * BEATS.length)))));

  // Pressing a key takes the reader to that beat, so they are really using the keypad.
  const press = (k: QKey) => {
    const i = BEATS.findIndex((b) => b.key === k);
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const y = el.getBoundingClientRect().top + window.scrollY + travel * ((i + 0.5) / BEATS.length);
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    setBeat(i);
  };

  if (reduce) {
    return (
      <section id="keys" className="qv-keys qv-keys--still q-shell" aria-labelledby="keys-title">
        <h2 id="keys-title" className="q-display qv-center">Press a key. <em>That&rsquo;s it.</em></h2>
        {BEATS.map((b) => (
          <div key={b.key} className="qv-beat-still">
            <QPad active={b.key} label={b.label}>{b.face}</QPad>
            <div><h3 className="qv-beat__title">{b.title}</h3><p className="qv-beat__line">{b.line}</p></div>
          </div>
        ))}
      </section>
    );
  }

  const current = BEATS[beat];
  return (
    <section ref={ref} id="keys" className="qv-keys" aria-labelledby="keys-title">
      <div className="qv-keys__sticky">
        <h2 id="keys-title" className="q-display qv-keys__title">Press a key. <em>That&rsquo;s it.</em></h2>
        <div className="qv-keys__stage">
          <QPad active={current.key} onKey={press} label={current.label} className="qv-keys__pad">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.key}
                className="qv-face"
                initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.face}
              </motion.div>
            </AnimatePresence>
          </QPad>
          <div className="qv-keys__copy" aria-live="polite">
            <ol className="qv-keys__steps" aria-hidden="true">
              {BEATS.map((b, i) => <li key={b.key} className={i === beat ? "is-on" : i < beat ? "is-past" : ""}>{QKEYS[i].label}</li>)}
            </ol>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="qv-beat__title">{current.title}</h3>
                <p className="qv-beat__line">{current.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- The companion's notes across one week ---------- */
const WEEK = [
  { day: "Monday", note: "Lovely walk this morning. Same time tomorrow?" },
  { day: "Wednesday", note: "You slept lightly. Today's walk is a little shorter." },
  { day: "Friday", note: "Three calm sessions this week. Your mind settled faster each time." },
  { day: "Sunday", note: "A quiet week, and that is fine. Rest counts too." }
];


/* ---------- On-device intelligence: threads from each sensor weave into today's quest ---------- */
const SOURCES = [
  { img: "movement-tank", label: "Last night's rest", from: "Movement Tank" },
  { img: "walking-shorts", label: "This week's walks", from: "Walking Shorts" },
  { img: "breather-top", label: "Calm breathing", from: "Breather Top" }
];

function LocalAI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setReady(true); return; }
    const t = setTimeout(() => setReady(true), 2600);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  return (
    <section id="ai" className="qv-section q-shell" aria-labelledby="ai-title">
      <Reveal className="qv-center qv-head">
        <h2 id="ai-title" className="q-display">Intelligence that lives <em>on your qPad.</em></h2>
        <p className="q-lead">Quest View thinks right here, on the qPad in your home. It weaves together what your clothes and headband noticed, and hands you one simple plan.</p>
      </Reveal>
      <div ref={ref} className={`qv-loom ${inView ? "is-on" : ""}`}>
        <ul className="qv-loom__sources">
          {SOURCES.map((s) => (
            <li key={s.img}>
              <span className="qv-loom__tile"><img src={`/media/shop/${s.img}/sketch.webp`} alt="" /></span>
              <span><b>{s.label}</b><small>{s.from}</small></span>
            </li>
          ))}
        </ul>
        <svg className="qv-loom__threads" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
          {[50, 150, 250].map((y, i) => (
            <motion.path
              key={y}
              d={`M0 ${y} C 90 ${y}, 110 150, 200 150`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        <div className="qv-loom__pad">
          <QPad active="quest" label={ready ? "qPad: ready for you. A shorter walk today, then six minutes of calm." : "qPad: weaving today's quest from last night's rest, this week's walks and your calm sessions."}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={ready ? "ready" : "weaving"} className="qv-face" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <LocalAIFace ready={ready} />
              </motion.div>
            </AnimatePresence>
          </QPad>
        </div>
      </div>
      <ul className="qv-promise-row">
        <li><b>Thinks at home</b>Suggestions are worked out on qPad itself.</li>
        <li><b>Learns only you</b>No comparing you with strangers. Just your own rhythm.</li>
        <li><b>Asks very little</b>No forms, no settings. Wear it, and it learns.</li>
      </ul>
    </section>
  );
}

/* ---------- Brain insights, made readable, and a calm game to play ---------- */
function MindSection() {
  const [eyes, setEyes] = useState<"open" | "closed">("closed");
  return (
    <section id="mind" className="qv-dark" aria-labelledby="mind-title">
      <div className="q-shell qv-mind">
        <Reveal className="qv-mind__intro">
          <div className="qv-mind__copy">
            <h2 id="mind-title" className="q-display">Your brain, <em>in plain words.</em></h2>
            <p className="q-lead">Put on your qBand and sit back. qPad turns your brain activity into a simple map and a sentence anyone can read, then makes calm a game worth coming back to.</p>
            <ol className="qv-words">
              <li><b>Settling</b><span>Your thoughts are slowing down.</span></li>
              <li><b>Focused</b><span>Attention is steady and clear.</span></li>
              <li><b>Deep rest</b><span>Your body recovers through the night.</span></li>
            </ol>
          </div>
          <img className="qv-mind__photo" src="/media/site/people/buri-seated.webp" alt="An older Korean woman wearing a qBand, seated beside her qPad on a small table" width={1350} height={900} loading="lazy" />
        </Reveal>
        <div className="qv-mind__pads">
          <Reveal className="qv-mind__pad">
            <QPad active="calm" label={`Brain map with eyes ${eyes}: calm, drifting, thinking and busy mind shown on four head maps, with a plain sentence explaining them.`}>
              <BrainMapFace eyes={eyes} />
            </QPad>
            <div className="qv-toggle" role="group" aria-label="Show brain map with">
              <button type="button" aria-pressed={eyes === "open"} onClick={() => setEyes("open")}>Eyes open</button>
              <button type="button" aria-pressed={eyes === "closed"} onClick={() => setEyes("closed")}>Eyes closed</button>
            </div>
            <p className="qv-caption">A brain map, explained in one sentence.</p>
          </Reveal>
          <Reveal delay={0.1} className="qv-mind__pad">
            <QPad active="calm" label="Lantern game: stay calm to keep the lantern glowing. 64 percent calm held, 5 day streak, level 4 on the river path."><LanternFace /></QPad>
            <p className="qv-caption">The lantern glows while you stay calm. Streaks, points and new paths keep it fun.</p>
          </Reveal>
        </div>
        <p className="qv-foot">General wellness insights, not medical advice.</p>
      </div>
    </section>
  );
}

/* ---------- Every way in: keys, touch, voice, or hands-free with your qBand ---------- */
const WAYS = [
  { icon: Hand, title: "Touch", line: "Large buttons on a bright screen." },
  { icon: MousePointerClick, title: "Four keys", line: "Raised, colour coded, easy to find by feel." },
  { icon: Mic, title: "Voice", line: "Ask for your walk, a song or a call." },
  { icon: Brain, title: "Hands-free", line: "With your qBand, choose with a moment of focus." }
];

function Access() {
  return (
    <section id="access" className="qv-section q-shell" aria-labelledby="access-title">
      <Reveal className="qv-center qv-head">
        <h2 id="access-title" className="q-display">Every way <em>in.</em></h2>
        <p className="q-lead">Four keys for most days. For anyone who needs it, touch, voice and qBand open qPad without lifting a hand.</p>
      </Reveal>
      <ul className="qv-ways">
        {WAYS.map(({ icon: Icon, title, line }) => (
          <li key={title}><Icon aria-hidden="true" /><b>{title}</b><span>{line}</span></li>
        ))}
      </ul>
      <div className="qv-stories">
        <Reveal className="qv-story">
          <div className="qv-story__media">
            <AutoVideo src="/media/film/hands-free-reply.mp4" poster="/media/film/hands-free-reply.webp" label="A wheelchair user replying to messages hands-free" className="qv-story__video" toggleClassName="q-media-toggle qv-story__toggle" />
          </div>
          <h3>Replies without lifting a hand.</h3>
          <p>Messages from family appear on qPad. With your qBand, a moment of focus picks the reply.</p>
        </Reveal>
        <Reveal delay={0.08} className="qv-story">
          <div className="qv-story__media">
            <AutoVideo src="/media/film/proud-moment.mp4" poster="/media/film/proud-moment.webp" label="A wheelchair user sharing a proud moment with his daughter through qPad" className="qv-story__video" toggleClassName="q-media-toggle qv-story__toggle" />
          </div>
          <h3>Never left out of the moment.</h3>
          <p>Calls, events and celebrations stay within reach, whatever your mobility.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Case studies: one qPad, every kind of wellness ---------- */
const CASES: { id: string; title: string; line: string; face: React.ReactNode; bg: string; pairs: { name: string; slug: string }[] }[] = [
  { id: "aqua", title: "Water aerobics", line: "From the poolside table, qPad calls each set in big type with a steady beat.", face: <AquaFace />, bg: "qv-case--pool", pairs: [{ name: "Movement Hood", slug: "movement-hood" }] },
  { id: "flow", title: "Pilates and yoga", line: "Breath counts and gentle cues, while your leggings notice when your core is working.", face: <FlowFace />, bg: "qv-case--flow", pairs: [{ name: "Movement Leggings", slug: "movement-leggings" }, { name: "Breather Top", slug: "breather-top" }] },
  { id: "sleep", title: "Sleep", line: "A dim clock all night. A kind sentence about your rest by morning.", face: <NightFace />, bg: "qv-case--sleep", pairs: [{ name: "Movement Tank", slug: "movement-tank" }] },
  { id: "calm", title: "Meditation", line: "Follow the breathing circle as your qBand shows your mind settling.", face: <CalmFace />, bg: "qv-case--calm", pairs: [{ name: "qBand Everyday", slug: "qband-everyday" }] },
  { id: "walk", title: "The morning walk", line: "Steps and steadiness from your clothes, ready on qPad when you get home.", face: <MoveFace />, bg: "qv-case--walk", pairs: [{ name: "Everyday Polo", slug: "everyday-polo" }, { name: "Quest Stride", slug: "quest-stride" }] },
  { id: "photo", title: "A frame for family", line: "Between sessions, qPad shows the photos your family shares.", face: <PhotoFace />, bg: "qv-case--photo", pairs: [] }
];

function Cases() {
  return (
    <section id="cases" className="qv-section qv-cases">
      <Reveal className="q-shell qv-center qv-head">
        <h2 className="q-display">One qPad. <em>Every kind of wellness.</em></h2>
        <p className="q-lead">In the pool, on the mat, at rest or on the move, qPad keeps you company. Pair it with smart wear and it sees even more.</p>
      </Reveal>
      <Rail title="Ways people use it" label="qPad use cases">
        {CASES.map((c) => (
          <li key={c.id} className="q-rail__item qv-case-item">
            <article className={`qv-case ${c.bg}`}>
              <div className="qv-case__stage">
                <QPad label={`${c.title} on qPad`} className="qpad--mini">{c.face}</QPad>
              </div>
              <div className="qv-case__copy">
                <h3>{c.title}</h3>
                <p>{c.line}</p>
                {c.pairs.length > 0 && (
                  <p className="qv-case__pairs">Pairs with {c.pairs.map((p, i) => (
                    <span key={p.slug}>{i > 0 && " and "}<Link href={`/shop/${p.slug}`}>{p.name}</Link></span>
                  ))}</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </Rail>
    </section>
  );
}

export default function QuestViewStory() {
  return (
    <>
      {/* 1. Welcome */}
      <section className="qv-hero" aria-labelledby="qv-title">
        <div className="q-shell qv-center">
          <h1 id="qv-title" className="q-display-xl qv-hero__title">Welcome, <em>Quest View.</em></h1>
          <p className="qv-hero__lead">Wellness for the long run. All in one place.</p>
        </div>
        <div className="qv-hero__device">
          <QPad active="quest" label="Quest View morning screen: good morning Monica, a gentle day ahead, polo, qBand and Quest Stride connected.">
            <MorningFace />
          </QPad>
        </div>
        <nav className="q-shell qv-highlights" aria-label="On this page">
          {HIGHLIGHTS.map((h) => <a key={h.href} href={h.href}>{h.label}</a>)}
        </nav>
      </section>

      {/* 2. The keys */}
      <KeySequence />

      {/* 3a. On-device intelligence */}
      <LocalAI />

      {/* 3. Personal intelligence */}
      <section id="learns" className="qv-section q-shell" aria-labelledby="learns-title">
        <Reveal className="qv-center qv-head">
          <h2 id="learns-title" className="q-display">It learns <em>your rhythm.</em></h2>
          <p className="q-lead">No settings to manage. No charts to read. Quest View quietly notices how you move, rest and feel, then offers one gentle idea a day.</p>
        </Reveal>
        <div className="qv-learn">
          <ol className="qv-learn__steps">
            {[["Notices", "Your clothes and headband sense as you live. Nothing to type, nothing to remember."],
              ["Understands", "Over the weeks it learns your good days, your slower ones and what helps."],
              ["Suggests", "One quest each morning, kind to how you feel. You can always say not today."]].map(([t, l], i) => (
              <li key={t}><Reveal delay={i * 0.06}><b>{t}</b><span>{l}</span></Reveal></li>
            ))}
          </ol>
          <div className="qv-week" aria-label="Notes from Quest View across one week">
            {WEEK.map((w, i) => (
              <Reveal key={w.day} delay={i * 0.08} className="qv-note">
                <span className="qv-note__day">{w.day}</span>
                <p>{w.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brain insights and the calm game */}
      <MindSection />

      {/* 5. Accessibility */}
      <Access />

      {/* 6. Case studies */}
      <Cases />

      {/* 6. Everything together */}
      <section id="together" className="qv-section q-shell" aria-labelledby="together-title">
        <Reveal className="qv-center qv-head">
          <h2 id="together-title" className="q-display">All wellness. <em>One place.</em></h2>
          <p className="q-lead">Your clothes, qBand and phone all feed one quiet layer on qPad, which turns what it senses into a day that suits you.</p>
        </Reveal>
        <div className="qv-layers">
          <Reveal className="qv-layer">
            <p className="qv-layer__name">Sense</p>
            <div className="qv-layer__sketches">
              {["everyday-polo", "qband-everyday", "quest-stride"].map((s) => <img key={s} src={`/media/shop/${s}/sketch.webp`} alt="" />)}
            </div>
            <p>Smart clothes, qBand and the Quest View phone app</p>
          </Reveal>
          <span className="qv-layers__arrow" aria-hidden="true"><ArrowRight /></span>
          <Reveal delay={0.08} className="qv-layer qv-layer--core">
            <p className="qv-layer__name">Understand</p>
            <QPad active="quest" label="Quest View on qPad" className="qpad--mini"><QuestFace /></QPad>
            <p>Quest View on qPad learns your rhythm</p>
          </Reveal>
          <span className="qv-layers__arrow" aria-hidden="true"><ArrowRight /></span>
          <Reveal delay={0.16} className="qv-layer">
            <p className="qv-layer__name">Guide</p>
            <ul className="qv-layer__list">
              <li><Check aria-hidden="true" />A daily quest</li>
              <li><Check aria-hidden="true" />Walk, Flow and Rest programs</li>
              <li><Check aria-hidden="true" />A weekly note for family</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7. Family and privacy */}
      <section id="family" className="qv-section q-shell qv-family" aria-labelledby="family-title">
        <Reveal className="qv-family__device">
          <QPad label="Family face: Jiwoo would like to say hello"><FamilyFace /></QPad>
        </Reveal>
        <Reveal delay={0.08} className="qv-family__copy">
          <h2 id="family-title" className="q-display">Family, <em>gently in the loop.</em></h2>
          <p className="q-lead">One press to answer a call. A weekly note they can read. And you decide what they see.</p>
          <ul className="qv-promises">
            <li><Users aria-hidden="true" /><span><b>You choose what is shared.</b> Steps, sessions, sleep: each one is a switch you control.</span></li>
            <li><Eye aria-hidden="true" /><span><b>No surprises.</b> Family sees the weekly note, never live readings unless you allow it.</span></li>
            <li><Lock aria-hidden="true" /><span><b>Yours to keep.</b> Your wellness data belongs to you and stays private.</span></li>
          </ul>
        </Reveal>
      </section>

      {/* 8. Close */}
      <section className="qv-close" aria-labelledby="close-title">
        <div className="q-shell qv-close__grid">
        <img className="qv-close__photo" src="/media/site/people/buri-holding.webp" alt="An older Korean woman wearing a qBand, smiling as she holds her qPad" width={880} height={1100} loading="lazy" />
        <Reveal className="qv-head qv-close__copy">
          <h2 id="close-title" className="q-display">Quest View comes with <em>every qPad.</em></h2>
          <p className="q-lead">Access adds personal Walk, Flow and Rest programs, new sessions every month and the weekly family note. With Duet, your first year is included. Every piece of smart wear you add gives it more to understand.</p>
          <div className="qv-close__actions">
            <Link className="q-btn q-btn--primary" href="/plans">Find your plan</Link>
            <Link className="q-link" href="/duet">Meet Duet</Link>
            <Link className="q-link" href="/shop">Shop smart wear</Link>
          </div>
        </Reveal>
        </div>
      </section>
    </>
  );
}
