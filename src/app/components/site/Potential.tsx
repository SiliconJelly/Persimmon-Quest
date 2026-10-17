"use client";

import { Check, Lock, Plus, TabletSmartphone } from "lucide-react";
import { productBySlug, won } from "../../catalog";
import { type InsightState, type ModuleId, type Setup, moduleById, potential } from "../../sensors";

/** Ring meter: how much of the wellness picture a setup can see. */
export function PotentialRing({ setup, tone = "light", compact = false }: { setup: Setup; tone?: "light" | "dark"; compact?: boolean }) {
  const { on, total, pct } = potential(setup);
  const r = 26, c = 2 * Math.PI * r;
  return (
    <div className={`q-ring q-ring--${tone} ${compact ? "q-ring--compact" : ""}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} className="q-ring__track" />
        <circle cx="32" cy="32" r={r} className="q-ring__fill" strokeDasharray={c} strokeDashoffset={c * (1 - on / total)} />
      </svg>
      <div>
        <p className="q-ring__pct q-tabular">{pct}%</p>
        <p className="q-ring__sub">Wellness potential · {on} of {total} insights</p>
      </div>
    </div>
  );
}

/**
 * Every insight with its state. Missing ones say what to add; when an open slot in the setup
 * can take the sensor, a one tap button fits it.
 */
export function InsightList({ setup, onFix, onHub }: {
  setup: Setup;
  onFix?: (fix: { slug: string; slotId: string; module: ModuleId }) => void;
  onHub?: () => void;
}) {
  const { states } = potential(setup);
  const order = (s: InsightState) => (s.state === "on" ? 0 : s.state === "needs-hub" ? 1 : 2);
  const sorted = states.slice().sort((a, b) => order(a) - order(b));
  return (
    <ul className="q-insights">
      {sorted.map(({ insight, state, fix }) => {
        const product = fix ? productBySlug(fix.slug) : undefined;
        return (
          <li key={insight.id} className={`q-insight is-${state}`}>
            <span className="q-insight__icon" aria-hidden="true">
              {state === "on" ? <Check size={16} /> : state === "needs-hub" ? <TabletSmartphone size={16} /> : <Lock size={14} />}
            </span>
            <div className="q-insight__body">
              <p className="q-insight__label">{insight.label}<span className="q-sr">{state === "on" ? ", unlocked" : ", locked"}</span></p>
              <p className="q-insight__line">
                {state === "on" ? insight.line : state === "needs-hub" ? "Your sensors are ready. Add qPad One to see it." : insight.hint + "."}
              </p>
              {state === "needs-hub" && onHub && (
                <button type="button" className="q-insight__fix" onClick={onHub}><Plus size={15} aria-hidden="true" /> Add qPad One</button>
              )}
              {state === "off" && fix && product && onFix && (
                <button type="button" className="q-insight__fix" onClick={() => onFix({ slug: fix.slug, slotId: fix.slot.id, module: fix.module })}>
                  <Plus size={15} aria-hidden="true" /> {moduleById(fix.module).name} on {product.name}, {fix.slot.label.toLowerCase()} · {won(moduleById(fix.module).price)}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
