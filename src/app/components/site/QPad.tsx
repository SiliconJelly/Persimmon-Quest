"use client";

import { BatteryFull, Brain, Footprints, Moon, Play, Video } from "lucide-react";
import { EMBLEM } from "./Monogram";

// qPad, drawn in code so its screen can show real Quest View faces and its keys can be pressed.
// Everything inside scales with the device (container units), from a small face tile to the hero.

export type QKey = "move" | "calm" | "rest" | "quest";

export const QKEYS: { id: QKey; label: string }[] = [
  { id: "move", label: "Move" },
  { id: "calm", label: "Calm" },
  { id: "rest", label: "Rest" },
  { id: "quest", label: "Your quest" }
];

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="42 42 16 16" aria-hidden="true"><path d={EMBLEM.star} fill="currentColor" /></svg>
  );
}

function KeyIcon({ id }: { id: QKey }) {
  if (id === "move") return <Footprints aria-hidden="true" />;
  if (id === "calm") return <Brain aria-hidden="true" />;
  if (id === "rest") return <Moon aria-hidden="true" />;
  return <Star />;
}

export default function QPad({
  children, active, onKey, className, label, keysLabel = "qPad keys"
}: {
  children: React.ReactNode;
  active?: QKey;
  onKey?: (k: QKey) => void;
  className?: string;
  /** Describes what the screen shows, for screen readers. */
  label: string;
  keysLabel?: string;
}) {
  return (
    <div className={`qpad ${className ?? ""}`}>
      <span className="qpad__stand" aria-hidden="true" />
      <div className="qpad__body">
        <span className="qpad__cam" aria-hidden="true" />
        <div className="qpad__screen" role="img" aria-label={label}>
          <div className="qpad__ui">{children}</div>
        </div>
        <div className="qpad__deck" role={onKey ? "group" : undefined} aria-label={onKey ? keysLabel : undefined}>
          <svg className="qpad__mark" viewBox={EMBLEM.viewBox} aria-hidden="true">
            {EMBLEM.petals.map((d, i) => <path key={i} d={d} fill="currentColor" />)}
            <path d={EMBLEM.star} fill="var(--c-persimmon)" />
          </svg>
          {QKEYS.map((k) =>
            onKey ? (
              <button key={k.id} type="button" className={`qpad__key qpad__key--${k.id}`} aria-pressed={active === k.id} onClick={() => onKey(k.id)}>
                <KeyIcon id={k.id} /><span className="q-sr">{k.label}</span>
              </button>
            ) : (
              <span key={k.id} className={`qpad__key qpad__key--${k.id} ${active === k.id ? "is-down" : ""}`} aria-hidden="true"><KeyIcon id={k.id} /></span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Faces: what Quest View shows on the screen ---------- */

function Top({ title }: { title: string }) {
  return (
    <div className="qf-top">
      <span className="qf-brand"><Star className="qf-star" />Quest View</span>
      <span>{title}</span>
      <span className="qf-top__right"><BatteryFull aria-hidden="true" />8:12</span>
    </div>
  );
}

export function MorningFace() {
  return (
    <div className="qf qf--morning">
      <Top title="Thursday" />
      <div className="qf-split">
        <div>
          <p className="qf-kicker">Good morning, Monica</p>
          <p className="qf-big">A gentle day ahead.</p>
          <p className="qf-text">Your quest is ready when you are.</p>
        </div>
        <div className="qf-devices">
          {["Polo", "qBand", "Quest Stride"].map((d) => <span key={d}><i />{d}</span>)}
        </div>
      </div>
    </div>
  );
}

export function MoveFace() {
  const ring = 2 * Math.PI * 40;
  return (
    <div className="qf qf--move">
      <Top title="Move" />
      <div className="qf-split">
        <div className="qf-stack">
          <p className="qf-kicker">Morning walk</p>
          <p className="qf-dots">4,860<small>steps</small></p>
          <div className="qf-meter"><span>Stride</span><b>Steady</b><i><em style={{ width: "82%" }} /></i></div>
          <div className="qf-meter"><span>Balance</span><b>Good</b><i><em style={{ width: "70%" }} /></i></div>
        </div>
        <div className="qf-ringwrap">
          <svg viewBox="0 0 100 100" className="qf-ring" aria-hidden="true">
            <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="40" strokeDasharray={ring} strokeDashoffset={ring * 0.36} />
          </svg>
          <p><b>14</b> of 20 min</p>
        </div>
      </div>
    </div>
  );
}

export function CalmFace() {
  return (
    <div className="qf qf--calm">
      <Top title="Calm" />
      <div className="qf-split">
        <div className="qf-breath" aria-hidden="true"><span /><span /><span /><b>Breathe in</b></div>
        <div className="qf-stack">
          <p className="qf-kicker">qBand is listening</p>
          <p className="qf-big">Your mind is settling.</p>
          <ol className="qf-states">
            <li className="is-past">Busy</li>
            <li className="is-past">Settling</li>
            <li className="is-now">Settled</li>
          </ol>
          <p className="qf-dots qf-dots--sm">06:40<small>left</small></p>
        </div>
      </div>
    </div>
  );
}

export function RestFace() {
  const night = [["Light", 22], ["Deep", 18], ["Light", 14], ["Dream", 12], ["Deep", 10], ["Awake", 4], ["Light", 20]] as const;
  return (
    <div className="qf qf--rest">
      <Top title="Rest" />
      <p className="qf-kicker">Last night</p>
      <p className="qf-big">Slept well, woke once.</p>
      <div className="qf-night" aria-hidden="true">
        {night.map(([k, w], i) => <span key={i} className={`is-${k.toLowerCase()}`} style={{ flexGrow: w }} />)}
      </div>
      <div className="qf-row">
        <span className="qf-dots qf-dots--sm">7h 20m<small>asleep</small></span>
        <span className="qf-text">Your breathing settled early. Deep rest followed.</span>
      </div>
    </div>
  );
}

export function QuestFace() {
  return (
    <div className="qf qf--quest">
      <Top title="Your quest" />
      <div className="qf-quest">
        <Star className="qf-quest__star" />
        <p className="qf-big">You slept lightly, so today&rsquo;s walk is shorter.</p>
        <p className="qf-text">20 minutes by the river, then a short calm session.</p>
        <div className="qf-actions"><span className="qf-btn"><Play aria-hidden="true" />Start</span><span className="qf-btn qf-btn--quiet">Not today</span></div>
      </div>
    </div>
  );
}

export function NightFace() {
  return (
    <div className="qf qf--night">
      <p className="qf-clock qf-clock--dim">22:40</p>
      <p className="qf-text"><Moon aria-hidden="true" /> Rest is on. Sleep well.</p>
    </div>
  );
}

export function FamilyFace() {
  return (
    <div className="qf qf--family">
      <img src="/media/site/people/family-ride.webp" alt="" />
      <div className="qf-family__bar">
        <span className="qf-avatar">J</span>
        <span><b>Jiwoo</b> would like to say hello</span>
        <span className="qf-btn"><Video aria-hidden="true" />Answer</span>
      </div>
    </div>
  );
}

/* ---------- On-device intelligence: today's quest being woven from what the sensors noticed ---------- */
export function LocalAIFace({ ready }: { ready: boolean }) {
  return (
    <div className="qf qf--ai">
      <Top title="On this qPad" />
      <div className="qf-ai">
        <div className={`qf-loom ${ready ? "is-ready" : ""}`} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ animationDelay: `${i * -0.7}s` }} />)}
        </div>
        {ready ? (
          <div className="qf-ai__out">
            <p className="qf-kicker">Ready for you</p>
            <p className="qf-big">A shorter walk today, then six minutes of calm.</p>
          </div>
        ) : (
          <div className="qf-ai__out">
            <p className="qf-kicker">Weaving today&rsquo;s quest</p>
            <p className="qf-text">From last night&rsquo;s rest, this week&rsquo;s walks and your calm sessions</p>
          </div>
        )}
        <span className="qf-chip">Thought through on qPad. Stays in your home.</span>
      </div>
    </div>
  );
}

/* ---------- Brain map in plain words ---------- */
type Eyes = "open" | "closed";
const BANDS = [
  { id: "calm", name: "Calm", hz: "8 to 13 Hz", open: [50, 70, 0.35], closed: [50, 74, 0.95] },
  { id: "drift", name: "Drifting", hz: "4 to 8 Hz", open: [50, 30, 0.45], closed: [50, 38, 0.6] },
  { id: "think", name: "Thinking", hz: "13 to 20 Hz", open: [50, 26, 0.8], closed: [50, 30, 0.4] },
  { id: "busy", name: "Busy mind", hz: "20 to 30 Hz", open: [36, 30, 0.5], closed: [40, 34, 0.2] }
] as const;
const levelColor = (l: number) => (l > 0.7 ? "#e8692f" : l > 0.45 ? "#e3cfa6" : "#8fa3b8");

function Head({ band, eyes }: { band: (typeof BANDS)[number]; eyes: Eyes }) {
  const [cx, cy, level] = band[eyes];
  const id = `hm-${band.id}-${eyes}`;
  return (
    <svg viewBox="0 0 100 100" className="qf-head" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx={`${cx}%`} cy={`${cy}%`} r="65%">
          <stop offset="0" stopColor={levelColor(level)} />
          <stop offset="0.55" stopColor="#e3cfa6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8fa3b8" />
        </radialGradient>
      </defs>
      <path d="M44 9 L50 2 L56 9" fill="none" stroke="rgba(245,242,237,.5)" strokeWidth="2" />
      <circle cx="50" cy="52" r="42" fill={`url(#${id})`} stroke="rgba(245,242,237,.35)" strokeWidth="1.5" />
      {[[50, 22], [34, 30], [66, 30], [50, 52], [24, 52], [76, 52], [38, 74], [62, 74]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill="#1a1715" />)}
    </svg>
  );
}

export function BrainMapFace({ eyes }: { eyes: Eyes }) {
  return (
    <div className="qf qf--brain">
      <Top title="Brain map" />
      <div className="qf-heads">
        {BANDS.map((b) => (
          <div key={b.id} className="qf-headcell">
            <Head band={b} eyes={eyes} />
            <b>{b.name}</b>
            <small>{b.hz}</small>
          </div>
        ))}
      </div>
      <p className="qf-explain"><Star className="qf-star" />{eyes === "closed"
        ? "Eyes closed, your calm rose. Most brains do this at rest."
        : "Eyes open, your thinking is bright and your busy mind stays low. Ready for the day."}</p>
    </div>
  );
}

/* ---------- Lantern: a calm game played with your qBand ---------- */
export function LanternFace() {
  return (
    <div className="qf qf--lantern">
      <Top title="Lantern game" />
      <div className="qf-split">
        <div className="qf-lantern" aria-hidden="true"><span /><i /></div>
        <div className="qf-stack">
          <p className="qf-kicker">Stay calm to keep it glowing</p>
          <p className="qf-dots">64<small>% calm held</small></p>
          <div className="qf-badges"><span>5 day streak</span><span>+40 quest points</span></div>
          <div className="qf-meter"><span>River path</span><b>Level 4</b><i><em style={{ width: "64%" }} /></i></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Case study faces ---------- */
export function AquaFace() {
  return (
    <div className="qf qf--aqua">
      <Top title="Water aerobics" />
      <div className="qf-split">
        <div className="qf-stack">
          <p className="qf-kicker">Set 3 of 5 · Arm circles</p>
          <p className="qf-dots">02:30</p>
          <p className="qf-text">Tempo 92 beats a minute. Next: gentle kicks</p>
        </div>
        <div className="qf-sets" aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <span key={n} className={n < 3 ? "is-done" : n === 3 ? "is-now" : ""} />)}</div>
      </div>
    </div>
  );
}

export function FlowFace() {
  return (
    <div className="qf qf--flow">
      <Top title="Pilates" />
      <div className="qf-split">
        <div className="qf-stack">
          <p className="qf-kicker">Cat and cow</p>
          <p className="qf-big">Breathe out as you round.</p>
          <div className="qf-badges"><span>Breath 3 of 6</span><span className="is-good">Core engaged</span></div>
        </div>
        <div className="qf-ringwrap">
          <div className="qf-hold" aria-hidden="true"><b>Hold</b></div>
        </div>
      </div>
    </div>
  );
}

export function PhotoFace() {
  return (
    <div className="qf qf--family">
      <img src="/media/site/people/family-walk.webp" alt="" />
      <div className="qf-photo__cap"><b>10:09</b><span>From Jiwoo, Sunday</span></div>
    </div>
  );
}
