"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products, RENAMED } from "../../catalog";
import { type Addons, type BagLine, linePrice } from "../../sensors";

// The bag holds real lines: garments with their size and added sensors, devices, the Duet bundle and Quest View Access.
// Monarch OS is never sold through the bag; it starts with the pilot team.
type NewLine =
  | { kind: "item"; slug: string; size?: string; color?: string; addons?: Addons; qty?: number }
  | { kind: "duet"; qty?: number }
  | { kind: "premium" };

type Bag = {
  lines: BagLine[];
  count: number;
  subtotal: number;
  add: (line: NewLine) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setAddons: (id: string, addons: Addons) => void;
  ready: boolean;
};

const BagCtx = createContext<Bag>({ lines: [], count: 0, subtotal: 0, add: () => {}, remove: () => {}, setQty: () => {}, setAddons: () => {}, ready: false });
const KEY = "pq-bag-v2";

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
const sameAddons = (a: Addons, b: Addons) => {
  const ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
  return ka.length === kb.length && ka.every((k, i) => k === kb[i] && a[k] === b[k]);
};

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // Saved bags can hold pieces that were renamed or retired: move them to today's slug, or drop them.
      if (raw) setLines((JSON.parse(raw) as BagLine[])
        .map((l) => (l.kind === "item" && RENAMED[l.slug] ? { ...l, slug: RENAMED[l.slug], color: undefined, addons: {} } : l))
        .filter((l) => l.kind !== "item" || products.some((p) => p.slug === l.slug)));
      localStorage.removeItem("pq-bag-count"); // retire the old count-only bag
    } catch { /* storage unavailable */ }
    setReady(true);
  }, []);

  const commit = useCallback((fn: (current: BagLine[]) => BagLine[]) => {
    setLines((current) => {
      const next = fn(current);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  const add = useCallback((line: NewLine) => commit((current) => {
    if (line.kind === "premium") return current.some((l) => l.kind === "premium") ? current : [...current, { id: uid(), kind: "premium", qty: 1 }];
    if (line.kind === "duet") {
      const found = current.find((l) => l.kind === "duet");
      return found ? current.map((l) => (l === found ? { ...l, qty: l.qty + (line.qty ?? 1) } : l)) : [...current, { id: uid(), kind: "duet", qty: line.qty ?? 1 }];
    }
    const addons = line.addons ?? {};
    const found = current.find((l) => l.kind === "item" && l.slug === line.slug && l.size === line.size && l.color === line.color && sameAddons(l.addons, addons));
    if (found) return current.map((l) => (l === found ? { ...l, qty: l.qty + (line.qty ?? 1) } : l));
    return [...current, { id: uid(), kind: "item", slug: line.slug, size: line.size, color: line.color, addons, qty: line.qty ?? 1 }];
  }), [commit]);

  const remove = useCallback((id: string) => commit((c) => c.filter((l) => l.id !== id)), [commit]);
  const setQty = useCallback((id: string, qty: number) => commit((c) => (qty < 1 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l)))), [commit]);
  const setAddons = useCallback((id: string, addons: Addons) => commit((c) => c.map((l) => (l.id === id && l.kind === "item" ? { ...l, addons } : l))), [commit]);

  const value = useMemo(() => ({
    lines,
    count: lines.reduce((t, l) => t + l.qty, 0),
    subtotal: lines.reduce((t, l) => t + linePrice(l), 0),
    add, remove, setQty, setAddons, ready
  }), [lines, add, remove, setQty, setAddons, ready]);

  return <BagCtx.Provider value={value}>{children}</BagCtx.Provider>;
}

export const useBag = () => useContext(BagCtx);
