"use client";

import { Activity, ArrowUpRight, BatteryCharging, Footprints, Hourglass, Play, Plus, Scale } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StepMap } from "../../components/site/ResearchCases";

// Quest Stride is our first main product, so its page explains the shoe in full:
// where the sensors sit, what the smart insole reads through one step, what it notices, charging, and the research behind it.

/* ---------- One step, read by the insole (illustration) ---------- */

// A left insole seen from above: heel at the bottom, big toe on the right.
const OUTLINE: [number, number][] = [
  [55, 292], [38, 288], [28, 275], [24, 255], [26, 230], [28, 205], [26, 180], [22, 150], [18, 120], [16, 95], [18, 70],
  [24, 50], [34, 34], [48, 22], [64, 12], [80, 8], [94, 10], [102, 22], [106, 40], [106, 62], [104, 85], [100, 108],
  [92, 135], [84, 160], [82, 185], [84, 210], [86, 235], [86, 258], [80, 278], [70, 289]
];
const outlinePath = `M${OUTLINE.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;

function inside(x: number, y: number) {
  let hit = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i], [xj, yj] = OUTLINE[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// A dot for every reading point inside the outline, kept clear of the edge.
const DOTS: [number, number][] = [];
for (let y = 16; y < 290; y += 10.5) for (let x = 20; x < 108; x += 10.5) {
  if (inside(x, y) && inside(x - 4, y) && inside(x + 4, y) && inside(x, y - 4) && inside(x, y + 4)) DOTS.push([x, y]);
}

type PhaseId = "land" | "roll" | "push";
// Where weight sits in each part of a step: [x, y, radius, strength]
const LOADS: Record<PhaseId, [number, number, number, number][]> = {
  land: [[52, 262, 26, 1], [38, 228, 18, 0.35]],
  roll: [[52, 258, 22, 0.45], [34, 190, 20, 0.75], [44, 120, 18, 0.55], [70, 100, 18, 0.5]],
  push: [[44, 96, 17, 0.75], [66, 90, 17, 0.9], [88, 96, 16, 0.85], [88, 32, 15, 1], [42, 50, 12, 0.45]]
};
// Where the centre of pressure sits at each moment
const CENTRE: Record<PhaseId, [number, number]> = { land: [52, 262], roll: [40, 175], push: [80, 50] };

const PHASES: { id: PhaseId; label: string; line: string }[] = [
  { id: "land", label: "Landing", line: "Your heel meets the ground first. A soft, even landing is the start of a steady step." },
  { id: "roll", label: "Rolling through", line: "Weight rolls along the outside of your foot toward the toes. This is where balance shows." },
  { id: "push", label: "Push-off", line: "The ball of your foot and big toe push you forward. A strong push-off carries energy into the next step." }
];

// Hanji to persimmon: quiet where there is little weight, warm where it gathers.
const RAMP = [[233, 228, 220], [217, 180, 143], [200, 86, 42], [143, 47, 18]];
function tint(v: number) {
  const t = Math.min(0.999, Math.max(0, v)) * (RAMP.length - 1);
  const i = Math.floor(t), f = t - i;
  const c = RAMP[i].map((a, k) => Math.round(a + (RAMP[i + 1][k] - a) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
const load = (p: PhaseId, x: number, y: number) =>
  LOADS[p].reduce((sum, [cx, cy, r, w]) => sum + w * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * r * r)), 0);

function InsoleStep() {
  const [phase, setPhase] = useState<PhaseId>("land");
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const play = () => {
    clearTimeout(timer.current);
    setPlaying(true);
    const order: PhaseId[] = ["land", "roll", "push"];
    const next = (i: number) => {
      setPhase(order[i]);
      timer.current = setTimeout(() => (i < order.length - 1 ? next(i + 1) : setPlaying(false)), 1300);
    };
    next(0);
  };
  const pick = (id: PhaseId) => { clearTimeout(timer.current); setPlaying(false); setPhase(id); };
  const current = PHASES.find((p) => p.id === phase)!;
  const [cx, cy] = CENTRE[phase];
  const path = `M${CENTRE.land.join(" ")} Q 30 220 ${CENTRE.roll.join(" ")} T ${CENTRE.push.join(" ")}`;

  return (
    <div className="q-insole">
      <svg className="q-insole__map" viewBox="0 0 120 300" role="img" aria-label={`Illustration of the pressure under a left foot during ${current.label.toLowerCase()}`}>
        <path d={outlinePath} className="q-insole__outline" />
        {DOTS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={3.6} style={{ fill: tint(load(phase, x, y)) }} />)}
        <path d={path} className="q-insole__path" />
        <circle cx={cx} cy={cy} r={6} className="q-insole__centre" />
      </svg>
      <div className="q-insole__side">
        <div className="q-insole__phases" role="group" aria-label="Part of the step">
          {PHASES.map((p) => (
            <button key={p.id} type="button" aria-pressed={phase === p.id} onClick={() => pick(p.id)}>{p.label}</button>
          ))}
        </div>
        <p className="q-insole__line" aria-live="polite">{current.line}</p>
        <button type="button" className="q-link q-insole__play" onClick={play} disabled={playing}>
          <Play size={16} aria-hidden="true" /> {playing ? "Playing a step" : "Play a step"}
        </button>
        <div className="q-insole__scale" aria-hidden="true"><span>Less weight</span><i /><span>More</span></div>
        <p className="q-hint">Illustration. Each dot stands for a pressure reading; the line is the path your weight takes.</p>
      </div>
    </div>
  );
}

/* ---------- What it notices ---------- */

const NOTICES = [
  { icon: Footprints, title: "Pressure", line: "Where your weight lands and how it moves from heel to toe, on every step." },
  { icon: Scale, title: "Balance", line: "Whether one foot carries more than the other, and how steady you stand between steps." },
  { icon: Activity, title: "Gait", line: "Your step rhythm, how long each foot stays on the ground, and how even your strides are." },
  { icon: Hourglass, title: "Tiredness", line: "As a walk goes on, steps can shorten and push-off can soften. Quest Stride compares the start and end of each walk to spot it." }
];

/* ---------- The page section ---------- */

export default function StrideDetails({ free, fabric }: { free: number; fabric: string }) {
  return (
    <div className="q-acc q-stride-acc">
      <details open>
        <summary>Where the sensors sit <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <div className="q-stride-acc__shoe"><StepMap tone="light" /></div>
          <p className="q-hint">{free ? `Room for ${free} more sensor${free > 1 ? "s" : ""}. Add it from your bag after you pre-order.` : "Every slot comes fitted."}</p>
        </div>
      </details>

      <details>
        <summary>The smart insole, step by step <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <p>A thin pressure insole sits under your whole foot. It reads where your weight goes through each step, while the motion core in the side cage follows the rhythm of your walk.</p>
          <InsoleStep />
        </div>
      </details>

      <details>
        <summary>What it notices <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <ul className="q-notices">
            {NOTICES.map(({ icon: Icon, title, line }) => (
              <li key={title}>
                <span className="q-notices__icon"><Icon size={20} aria-hidden="true" /></span>
                <span><b>{title}</b>{line}</span>
              </li>
            ))}
          </ul>
          {/* How a finding reaches you: one quiet note on qPad, never a chart to decode */}
          <figure className="q-stride-note">
            <figcaption className="q-hint">How it shows up in Quest View</figcaption>
            <p><b>Your left step was a little shorter on Tuesday.</b> Two gentle balance moves are ready for this morning.</p>
          </figure>
          <p className="q-hint">General wellness insight, not medical advice.</p>
        </div>
      </details>

      <details>
        <summary>Charging <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body">
          <div className="q-stride-charge">
            <span className="q-notices__icon"><BatteryCharging size={20} aria-hidden="true" /></span>
            <div>
              <p><b>Dock it and forget it.</b> Set the motion core on its dock overnight. It charges by itself and your walks sync to Quest View, so in the morning you just put your shoes on and go.</p>
            </div>
          </div>
        </div>
      </details>

      <details>
        <summary>The research behind it <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body q-stride-research">
          <p>Reading pressure inside a shoe is well studied. STRIV, who make research insoles for clinics and sports teams, show how much a thin insole can measure outside a lab.</p>
          <dl className="q-stride-facts">
            <div><dt>r 0.998</dt><dd>How closely their insoles tracked a Footscan lab plate, front to back. A perfect match would be 1.</dd></div>
            <div><dt>128</dt><dd>Pressure readings under each foot in their research insoles, with a motion sensor in each pod.</dd></div>
          </dl>
          <figure className="q-stride-fig">
            <img src="/media/shop/quest-stride/research/striv-pressure-maps.webp" alt="Four pressure maps of a left and right foot: where the foot lands, where pressure builds, where it stays before push-off, and the path the pressure takes through each step" width={1000} height={1306} loading="lazy" />
            <figcaption>Landing, building and push-off pressure, and the path weight takes through each step, from a STRIV research run.</figcaption>
          </figure>
          <div className="q-stride-figs">
            <figure className="q-stride-fig">
              <img src="/media/shop/quest-stride/research/striv-insoles.webp" alt="A pair of STRIV research insoles, each with a sensor pod on a short tail" width={1000} height={750} loading="lazy" />
              <figcaption>STRIV research insoles</figcaption>
            </figure>
            <figure className="q-stride-fig">
              <img src="/media/shop/quest-stride/research/striv-kit.webp" alt="A STRIV research kit: insoles, two sensor pods, a charging dock and a cable" width={1000} height={660} loading="lazy" />
              <figcaption>Their kit, with the charging dock</figcaption>
            </figure>
          </div>
          <p className="q-hint">Figures and images courtesy of STRIV, used with permission. They describe STRIV&apos;s research insoles, not Quest Stride&apos;s own specifications.</p>
          <a className="q-link" href="https://striv.run/research#kits" target="_blank" rel="noopener noreferrer">Read STRIV&apos;s research <ArrowUpRight size={16} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span></a>
        </div>
      </details>

      <details>
        <summary>Fabric and care <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body"><p style={{ margin: 0 }}>{fabric}. The motion core lifts out before washing.</p></div>
      </details>
      <details>
        <summary>Size guide <Plus size={20} aria-hidden="true" /></summary>
        <div className="q-acc__body"><p style={{ margin: 0 }}>Sizes are your foot length in millimetres. Between sizes, choose the larger one; the strap takes up the rest.</p></div>
      </details>
    </div>
  );
}
