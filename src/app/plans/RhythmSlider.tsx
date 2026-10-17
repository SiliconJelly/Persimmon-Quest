"use client";

import { RHYTHM_MAX, rhythmLabel, rhythmValueText } from "./quiz";

const ticks = [
  { at: 0, label: "Finding my rhythm" },
  { at: 2, label: "Once or twice" },
  { at: 4, label: "A few times" },
  { at: 7, label: "Almost daily" }
];

// Native range input: keyboard, touch and screen readers work without extra code.
export default function RhythmSlider({ value, onChange, labelledBy }: { value: number; onChange: (v: number) => void; labelledBy: string }) {
  const pct = (value / RHYTHM_MAX) * 100;
  return (
    <div className="q-rhythm">
      <p className="q-rhythm__readout" aria-hidden="true">
        <span className="q-rhythm__days q-tabular">{value === 0 ? "Starting" : `${value} ${value === 1 ? "day" : "days"}`}</span>
        <span>{value === 0 ? rhythmLabel(0) : `a week · ${rhythmLabel(value)}`}</span>
      </p>
      <input
        className="q-rhythm__input"
        type="range"
        min={0}
        max={RHYTHM_MAX}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-labelledby={labelledBy}
        aria-valuetext={rhythmValueText(value)}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      <div className="q-rhythm__ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t.at} style={{ left: `${(t.at / RHYTHM_MAX) * 100}%` }}>{t.label}</span>
        ))}
      </div>
    </div>
  );
}
