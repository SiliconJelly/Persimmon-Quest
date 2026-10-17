"use client";

import { type Product, won } from "../../catalog";
import { type Addons, type ModuleId, capacity, moduleById, modules, slotMaps } from "../../sensors";
import { moduleIcons } from "./SensorMap";

/** Lists every slot on one garment: fitted pods, and open slots with the sensors they can take. */
export default function SlotEditor({ product, addons, active, onActive, onChange }: {
  product: Product;
  addons: Addons;
  active?: string;
  onActive?: (id: string) => void;
  onChange: (slotId: string, module: ModuleId | null) => void;
}) {
  const cap = capacity(product.slug, addons);
  return (
    <div className="q-slots">
      <div className="q-capacity">
        <p><b className="q-tabular">{cap.used} of {cap.total}</b> sensor slots in use{cap.free > 0 ? ` · room for ${cap.free} more` : " · fully fitted"}</p>
        <div className="q-capacity__bar" aria-hidden="true">
          {(slotMaps[product.slug] ?? []).map((s) => (
            <span key={s.id} className={s.fitted ? "is-fitted" : addons[s.id] ? "is-added" : ""} />
          ))}
        </div>
      </div>
      <ul className="q-slots__list">
        {(slotMaps[product.slug] ?? []).map((s) => {
          const Icon = s.fitted ? moduleIcons[s.fitted] : null;
          return (
            <li key={s.id} id={`slot-${s.id}`} className={`q-slot-row ${active === s.id ? "is-active" : ""}`} onFocusCapture={() => onActive?.(s.id)} onMouseEnter={() => onActive?.(s.id)}>
              {s.fitted ? (
                <div className="q-slot-row__fitted">
                  <span className="q-slot-row__icon">{Icon && <Icon size={18} aria-hidden="true" />}</span>
                  <div><p className="q-slot-row__label">{s.label}</p><p className="q-hint">{moduleById(s.fitted).name} · included</p></div>
                </div>
              ) : (
                <fieldset>
                  <legend className="q-slot-row__label">{s.label} <span className="q-hint">Open slot</span></legend>
                  <div className="q-slot-row__opts">
                    <label className="q-optchip">
                      <input type="radio" name={`${product.slug}-${s.id}`} checked={!addons[s.id]} onChange={() => onChange(s.id, null)} />
                      <span>Leave open</span>
                    </label>
                    {(s.accepts ?? []).map((m) => {
                      const mod = moduleById(m);
                      const MIcon = moduleIcons[m];
                      return (
                        <label key={m} className="q-optchip">
                          <input type="radio" name={`${product.slug}-${s.id}`} checked={addons[s.id] === m} onChange={() => onChange(s.id, m)} />
                          <span><MIcon size={16} aria-hidden="true" />{mod.name} <em className="q-tabular">+{won(mod.price)}</em></span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              )}
            </li>
          );
        })}
      </ul>
      <details className="q-library">
        <summary>About the sensors</summary>
        <ul>
          {modules.map((m) => {
            const MIcon = moduleIcons[m.id];
            return <li key={m.id}><MIcon size={16} aria-hidden="true" /><span><b>{m.name}</b> {m.line}</span></li>;
          })}
        </ul>
      </details>
    </div>
  );
}
