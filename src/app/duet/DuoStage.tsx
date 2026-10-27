"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// The Duet landing in one picture: Sage Duo rests in front of qPad One, a light runs from the sensors inside the band
// to the tablet, and its dark screen wakes into a breathing session. Cutouts and the glass mapping come from
// scripts/studio/story.py, the same ones the homepage story uses.
const PAD = { src: "/media/site/qband-sage-duo/qpad-off.webp", w: 1196, h: 1046 };
const BAND = { src: "/media/site/qband-sage-duo/band-three.webp", w: 1400, h: 861 };
// Lays a flat 1000 x 640 screen onto the tablet's glass
const GLASS = "matrix3d(1.11424, 0.125319, 0, 0.000168639, 0.0501512, 1.03101, 0, -8.01867e-05, 0, 0, 1, 0, 114, 64, 0, 1)";
// In the stage's 1000 x 700 frame: from the electrode right of centre inside the band, up and over into the glass
const SIGNAL = "M322 368 C 334 262, 414 206, 497 246";

export default function DuoStage() {
  const pad = useRef<HTMLDivElement>(null);

  // The screen is laid out at 1000 x 640 and scaled to the tablet as drawn, so it follows the glass at any width
  useEffect(() => {
    const el = pad.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--k", String(el.clientWidth / PAD.w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="q-duo__stage" role="img" aria-label="Sage Duo resting in front of qPad One. A light runs from the sensors inside the headband to the tablet, and its screen wakes into a breathing session.">
      <span className="q-duo__floor q-duo__floor--pad" />
      <span className="q-duo__floor q-duo__floor--band" />
      <div className="q-duo__pad" ref={pad}>
        <img src={PAD.src} width={PAD.w} height={PAD.h} alt="" />
        <div className="q-duo__glass" style={{ "--glass": GLASS } as CSSProperties}>
          <div className="q-duo__screen">
            <span className="q-duo__status"><i />qBand is on</span>
            <span className="q-duo__breath"><i /><i /><i /></span>
            <b>Breathe with me</b>
            <span className="q-duo__sub">Your calm, as it settles</span>
          </div>
        </div>
      </div>
      <img className="q-duo__band" src={BAND.src} width={BAND.w} height={BAND.h} alt="" />
      <svg className="q-duo__signal" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <path className="q-duo__trace" d={SIGNAL} pathLength={1} />
        <path className="q-duo__spark" d={SIGNAL} pathLength={100} />
        <circle className="q-duo__node" cx="322" cy="368" r="5" />
        <circle className="q-duo__node q-duo__node--end" cx="497" cy="246" r="5" />
      </svg>
    </div>
  );
}
