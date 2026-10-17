"use client";

import { BicepsFlexed, Footprints, Hand, HeartPulse, Move, Plus, Thermometer, Wind } from "lucide-react";
import type { Product } from "../../catalog";
import { type Addons, type ModuleId, moduleById, sketchFor, slotMaps } from "../../sensors";

export const moduleIcons: Record<ModuleId, typeof HeartPulse> = {
  heart: HeartPulse, breath: Wind, core: Move, muscle: BicepsFlexed, pressure: Footprints, grip: Hand, warmth: Thermometer
};

/**
 * A garment drawn as a white line sketch with every sensor slot marked:
 * fitted pods (included), sensors the visitor added, and open room for more.
 */
export default function SensorMap({
  product, addons = {}, active, onSlot, labels = true, size = "lg"
}: {
  product: Product;
  addons?: Addons;
  active?: string;
  onSlot?: (slotId: string) => void;
  labels?: boolean;
  size?: "sm" | "lg";
}) {
  const slots = slotMaps[product.slug] ?? [];
  return (
    <div className={`q-smap q-smap--${size}`}>
      <img className="q-smap__sketch" src={sketchFor(product)} alt={`Line drawing of the ${product.name}`} width={500} height={625} />
      {slots.map((s) => {
        const mod = s.fitted ?? addons[s.id];
        const state = s.fitted ? "fitted" : mod ? "added" : "open";
        const Icon = mod ? moduleIcons[mod] : Plus;
        const label = mod ? moduleById(mod).short : "Open";
        const style = { left: `${s.x * 100}%`, top: `${s.y * 100}%` } as React.CSSProperties;
        const flip = s.x > 0.62;
        const content = (
          <>
            <span className="q-smap__dot"><Icon size={size === "sm" ? 10 : 15} strokeWidth={2} aria-hidden="true" /></span>
            {labels && <span className={`q-smap__label ${flip ? "is-left" : ""}`}>{label}</span>}
          </>
        );
        const name = `${s.label}: ${state === "open" ? "open slot" : `${moduleById(mod!).name}${state === "fitted" ? ", included" : ", added"}`}`;
        return onSlot ? (
          <button key={s.id} type="button" className={`q-smap__pin is-${state} ${active === s.id ? "is-active" : ""}`} style={style} onClick={() => onSlot(s.id)} aria-label={name} aria-pressed={active === s.id}>
            {content}
          </button>
        ) : (
          <span key={s.id} className={`q-smap__pin is-${state}`} style={style} role="img" aria-label={name}>{content}</span>
        );
      })}
    </div>
  );
}
