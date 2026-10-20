"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Between the partner strip and the Quest View app: Brainwear on the head, qPad on the table, and one brain signal
// travelling between them. The stage is a horizon from hanji into the app's night, so the light page hands over to the dark one.

/** An EEG-like trace from (x0, y0) to (x1, y1): a steady rhythm that swells in short bursts, swinging across its own direction. */
function trace(x0: number, y0: number, x1: number, y1: number, cycles = 9, amp = 26) {
  const steps = 180;
  const len = Math.hypot(x1 - x0, y1 - y0);
  const nx = -(y1 - y0) / len, ny = (x1 - x0) / len;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ease = Math.sin(Math.PI * t); // quiet at both ends, where it meets the devices
    const burst = 0.55 + 0.45 * Math.sin(t * Math.PI * 3.2 + 0.6);
    const off = Math.sin(t * Math.PI * 2 * cycles) * amp * ease * burst;
    pts.push(`${(x0 + (x1 - x0) * t + nx * off).toFixed(1)} ${(y0 + (y1 - y0) * t + ny * off).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

// The wide stage is 1000 x 380; the phone stage is 1000 x 980. Ends sit at the band's sensors and the qPad screen.
const WIDE = { d: trace(392, 205, 628, 187), from: [392, 205], to: [628, 187] };
const TALL = { d: trace(600, 352, 560, 488, 5, 24), from: [600, 352], to: [560, 488] };

const BEATS = [
  { title: "Wear it", line: "A woven band with soft, dry sensors, on in seconds. Comfortable through yoga, tai chi or a long read." },
  { title: "See it", line: "qPad turns each session into one plain sentence, and shows how calm and focus change over the weeks." },
  { title: "Build it with us", line: "Universities, clinics and companies can co-create active ageing studies with people who choose to wear it every day." }
];

function Signal({ view, path, className }: { view: string; path: typeof WIDE; className: string }) {
  return (
    <svg className={`q-bw__signal ${className}`} viewBox={view} aria-hidden="true">
      <path className="q-bw__trace" d={path.d} pathLength={1} />
      <path className="q-bw__pulse" d={path.d} pathLength={100} />
      <circle className="q-bw__node" cx={path.from[0]} cy={path.from[1]} r={5} />
      <circle className="q-bw__node q-bw__node--end" cx={path.to[0]} cy={path.to[1]} r={5} />
    </svg>
  );
}

export default function BrainwearBridge() {
  const stage = useRef<HTMLDivElement>(null);
  const live = useInView(stage, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section className="q-bw" aria-labelledby="bw-title">
      <div className="q-shell q-bw__head">
        <h2 id="bw-title" className="q-bw__title">Brain science, worn every day.</h2>
        <div className="q-bw__aside">
          <p className="q-bw__lead">Brainwear reads calm and focus through soft, dry sensors, and qPad turns it into plain words. Studies move at the pace of daily life, not lab visits.</p>
          <div className="q-bw__actions">
            <Link className="q-btn q-btn--primary" href="/shop/brainwear-duo">Pre-order Brainwear Duo <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link className="q-link" href="/contact">Co-create a study</Link>
          </div>
        </div>
      </div>

      <div className={`q-bw__horizon ${live ? "is-live" : ""}`}>
        <div ref={stage} className="q-bw__stage">
          <Signal view="0 0 1000 380" path={WIDE} className="q-bw__signal--wide" />
          <Signal view="0 0 1000 980" path={TALL} className="q-bw__signal--tall" />
          <img className="q-bw__band" src="/media/site/brainwear/duo-hero.webp" alt="Brainwear Duo, a sage woven headband with two soft forehead pods" width={1200} height={733} loading="lazy" />
          <img className="q-bw__pad" src="/media/site/brainwear/qpad-hero.webp" alt="qPad showing Focus Garden, a breathing session, with its four keys along the side" width={1200} height={842} loading="lazy" />
        </div>
      </div>

      <div className="q-bw__night">
        <ol className="q-shell q-bw__beats">
          {BEATS.map((b) => (
            <li key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
