"use client";

import { Heart, Leaf, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const symbols = [{ name: "Sun", Icon: Sun }, { name: "Leaf", Icon: Leaf }, { name: "Heart", Icon: Heart }, { name: "Moon", Icon: Moon }];
const sequences = [[0, 2, 1], [1, 3, 0], [2, 0, 3], [3, 1, 2]];

export default function MemoryGame({ elapsed, running, onInteraction }: { elapsed: number; running: boolean; onInteraction: () => void }) {
  const [round, setRound] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [phase, setPhase] = useState<"idle" | "showing" | "recall" | "done" | "retry">("idle");
  const [position, setPosition] = useState(0);
  const [completed, setCompleted] = useState(0);
  const sequence = sequences[round % sequences.length];
  const offset = Math.max(0, elapsed - startedAt);
  const step = Math.floor(offset / 1.2);
  const active = phase === "showing" && step < sequence.length && offset % 1.2 < .85 ? sequence[step] : -1;

  useEffect(() => {
    if (phase === "showing" && step >= sequence.length) setPhase("recall");
  }, [phase, step, sequence.length]);

  function begin() { setStartedAt(elapsed); setPosition(0); setPhase("showing"); }
  function choose(index: number) {
    if (!running || phase !== "recall") return;
    onInteraction();
    if (sequence[position] !== index) { setPhase("retry"); return; }
    if (position === sequence.length - 1) { setCompleted(value => value + 1); setPhase("done"); }
    else setPosition(value => value + 1);
  }

  const title = phase === "showing" ? "Watch the sequence" : phase === "recall" ? "Your turn" : phase === "done" ? "A lovely little match" : phase === "retry" ? "Let’s try that again" : "A moment to remember";
  const caption = phase === "showing" ? "Follow the three highlighted symbols" : phase === "recall" ? `Repeat the sequence · ${position} of 3` : phase === "done" ? `${completed} ${completed === 1 ? "sequence" : "sequences"} matched` : phase === "retry" ? "No rush — take another look" : "Watch three symbols, then tap them in order";

  return (
    <div className="session-memory">
      <p className="pq-eyebrow">Recall & play</p><h2>{title}</h2><p role="status" aria-live="polite">{caption}{active >= 0 && <span className="sr-only"> · {symbols[active].name}</span>}</p>
      <div className="memory-tiles" role="group" aria-label="Recall symbols">
        {symbols.map(({ name, Icon }, index) => <button type="button" key={name} aria-label={name} className={`memory-tile memory-tile--${index} ${active === index ? "is-lit" : ""}`} disabled={phase !== "recall" || !running} onClick={() => choose(index)}><Icon size={35} strokeWidth={1.4} /><span>{name}</span></button>)}
      </div>
      <div className="memory-controls">
        {phase === "idle" || phase === "retry" ? <button type="button" className="session-light-button" onClick={begin} disabled={!running}>{phase === "retry" ? "Show me again" : "Show the sequence"}</button> : phase === "done" ? <button type="button" className="session-light-button" disabled={!running} onClick={() => { setRound(value => value + 1); begin(); }}>Another round</button> : <span className="memory-progress">{[0, 1, 2].map(index => <i key={index} className={phase === "recall" && index < position ? "is-complete" : ""} />)}</span>}
      </div>
      <span className="session-stage-note">A playful demonstration, not a cognitive assessment</span>
    </div>
  );
}
