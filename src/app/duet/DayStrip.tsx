"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

// One day with Sage Duo, morning walk to evening read, drifting past like a film roll. Each frame says when, who
// (the wellness profiles from the plan finder) and what was picked up: persimmon from the band, sage from the clothes
// and shoes, ivory where it all lands in Quest View. Frames come from scripts/studio/day.py.
type From = "band" | "body" | "view";
type Moment = { src: string; wide?: boolean; time: string; title: string; who: string; signals: [From, string][]; alt: string };

const DAY: Moment[] = [
  { src: "walk", time: "07:10", title: "Morning walk", who: "The Everyday Mover", signals: [["band", "Calm"], ["body", "Gait rhythm"]], alt: "Woman in a lilac hoodie on a morning walk, wearing a qBand and smart walking shoes" },
  { src: "pickleball", wide: true, time: "09:00", title: "Pickleball doubles", who: "The Social Explorer", signals: [["band", "Focus"], ["body", "Balance"]], alt: "A couple playing pickleball, both wearing Sage Duo, in sensing tops and smart shoes" },
  { src: "tai-chi", time: "10:30", title: "Tai chi", who: "The Mindful Mover", signals: [["band", "Calm"], ["body", "Posture"]], alt: "Woman practising tai chi in a courtyard, wearing Sage Duo" },
  { src: "pilates", wide: true, time: "11:30", title: "Core Pilates", who: "The Strength Builder", signals: [["band", "Focus"], ["body", "Muscle activity"]], alt: "Man on a mat holding a persimmon ball, wearing Sage Duo and a sensing polo, with Pilates on qPad One beside him" },
  { src: "pool", time: "14:00", title: "Water rhythm", who: "The Gentle Return", signals: [["band", "Calm"], ["band", "Head motion"]], alt: "Woman moving through a pool, wearing Sage Duo" },
  { src: "word-quest", wide: true, time: "16:00", title: "Word Quest", who: "The Social Explorer", signals: [["band", "Focus"]], alt: "Woman wearing Sage Duo, tapping a Word Quest card on qPad One" },
  { src: "stretch", time: "18:00", title: "Seated stretch", who: "The Gentle Return", signals: [["band", "Calm"], ["body", "Range of motion"]], alt: "Woman in a side stretch on a mat, wearing Sage Duo" },
  { src: "together", wide: true, time: "19:30", title: "Look back together", who: "The Everyday Mover", signals: [["view", "Today in Quest View"]], alt: "Couple on a bench, both wearing Sage Duo, looking back on the day on qPad One" },
  { src: "read", wide: true, time: "21:00", title: "Wind down", who: "The Mindful Mover", signals: [["band", "Calm"]], alt: "Man reading on qPad One in the evening, wearing Sage Duo" }
];

function Frames({ copy = false }: { copy?: boolean }) {
  return (
    <ul className="q-roll__set" aria-hidden={copy || undefined}>
      {DAY.map((m) => (
        <li key={m.src} className={`q-roll__frame ${m.wide ? "is-wide" : ""}`}>
          <img src={`/media/site/day/${m.src}.webp`} width={m.wide ? 1200 : 720} height={900} alt={copy ? "" : m.alt} loading="lazy" />
          <span className="q-roll__time">{m.time}</span>
          <div className="q-roll__cap">
            <span className="q-roll__who">{m.who}</span>
            <b>{m.title}</b>
            <span className="q-roll__signals">
              {m.signals.map(([from, label]) => <span key={label} className={`q-sig q-sig--${from}`}><i />{label}</span>)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function DayStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`q-roll ${paused ? "is-paused" : ""}`}>
      <div className="q-roll__window">
        <div className="q-roll__track">
          <Frames />
          <Frames copy />
        </div>
      </div>
      <div className="q-shell q-roll__foot">
        <ul className="q-roll__key" aria-label="What the colours mean">
          <li><i className="q-roll__dot q-roll__dot--band" /><b>Sage Duo</b> focus, calm and head motion</li>
          <li><i className="q-roll__dot q-roll__dot--body" /><b>Clothes and shoes</b> how you move</li>
          <li><i className="q-roll__dot q-roll__dot--view" /><b>Quest View</b> your whole day, in one place</li>
        </ul>
        <button type="button" className="q-media-toggle q-roll__toggle" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play the day strip" : "Pause the day strip"}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
