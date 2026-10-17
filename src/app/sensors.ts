// Sensor ecosystem: where each garment carries sensors, how much room it has for more,
// and which wellness insights a whole setup unlocks. Pure data and logic, no React.
// Prices are placeholders until pricing is confirmed.
import { productBySlug, type Product } from "./catalog";

export type ModuleId = "core" | "heart" | "breath" | "muscle" | "pressure" | "grip" | "warmth";

export type SensorModule = { id: ModuleId; name: string; short: string; line: string; price: number };

export const modules: SensorModule[] = [
  { id: "heart", name: "Heart rhythm pod", short: "Heart", line: "Beat to beat rhythm, worn close to the chest or arm.", price: 49000 },
  { id: "breath", name: "Breath band", short: "Breath", line: "A soft stretch band that follows each breath.", price: 45000 },
  { id: "core", name: "Motion core", short: "Motion", line: "Posture, balance and the rhythm of each step.", price: 39000 },
  { id: "muscle", name: "Muscle panel", short: "Muscle", line: "Textile panel that notices which muscles are working.", price: 59000 },
  { id: "pressure", name: "Pressure zone", short: "Pressure", line: "Reads how weight moves through the foot.", price: 35000 },
  { id: "grip", name: "Grip pads", short: "Grip", line: "Measures grip, gently, through the palm.", price: 29000 },
  { id: "warmth", name: "Warmth sensor", short: "Warmth", line: "Skin warmth through the day and night.", price: 19000 }
];

export const moduleById = (id: ModuleId) => modules.find((m) => m.id === id)!;

export type Slot = {
  id: string;
  label: string;
  /** Position on the product image, as fractions of width and height. */
  x: number;
  y: number;
  /** Fitted as standard and included in the garment price. */
  fitted?: ModuleId;
  /** Modules this slot can take when it is open. */
  accepts?: ModuleId[];
};

/** Hardware that carries its own sensors and has no open slots. */
export const devices: Record<string, { role: string; builtIn: string[] }> = {
  "everyday-brainwear": { role: "Headband", builtIn: ["EEG sensors for focus and calm", "Head motion"] },
  "qpad-one": { role: "Hub", builtIn: ["Pairs every pod", "Runs Quest View"] },
  "brainwear-arc": { role: "Headband", builtIn: ["EEG sensors for focus and calm", "Head motion"] },
  "brainwear-sleep": { role: "Headband", builtIn: ["EEG sensors for sleep and calm"] },
  "qpad-grip": { role: "Hub", builtIn: ["Pairs every pod", "Runs Quest View"] }
};

export const slotMaps: Record<string, Slot[]> = {
  "everyday-polo": [
    { id: "sleeve", label: "Right sleeve", x: 0.8, y: 0.33, fitted: "heart" },
    { id: "placket", label: "Chest placket", x: 0.47, y: 0.32, fitted: "core" },
    { id: "side", label: "Side panel", x: 0.66, y: 0.6, fitted: "muscle" },
    { id: "left-sleeve", label: "Left sleeve", x: 0.18, y: 0.36, accepts: ["heart", "warmth"] },
    { id: "hem", label: "Front hem", x: 0.32, y: 0.74, accepts: ["breath", "warmth"] }
  ],
  "walking-shorts": [
    { id: "waist", label: "Waistband", x: 0.71, y: 0.21, fitted: "core" },
    { id: "thigh-l", label: "Left thigh", x: 0.25, y: 0.64, fitted: "muscle" },
    { id: "thigh-r", label: "Right thigh", x: 0.6, y: 0.6, accepts: ["muscle", "warmth"] },
    { id: "pocket", label: "Side pocket", x: 0.74, y: 0.4, accepts: ["warmth"] }
  ],
  "quest-stride": [
    { id: "core", label: "Side cage", x: 0.47, y: 0.6, fitted: "core" },
    { id: "insole", label: "Insole", x: 0.62, y: 0.7, accepts: ["pressure"] },
    { id: "collar", label: "Heel collar", x: 0.24, y: 0.5, accepts: ["warmth"] }
  ],
  "everyday-socks": [
    { id: "ankle", label: "Ankle cuff", x: 0.22, y: 0.24, fitted: "warmth" },
    { id: "sole", label: "Sole zone", x: 0.8, y: 0.5, fitted: "pressure" },
    { id: "heel", label: "Heel", x: 0.62, y: 0.7, accepts: ["pressure", "core"] }
  ],
  "breather-top": [
    { id: "underband", label: "Underband", x: 0.3, y: 0.73, fitted: "breath" },
    { id: "side", label: "Left side", x: 0.88, y: 0.58, accepts: ["heart", "warmth"] },
    { id: "strap", label: "Back strap", x: 0.78, y: 0.24, accepts: ["core"] }
  ],
  "movement-tank": [
    { id: "side", label: "Side seam", x: 0.75, y: 0.55, fitted: "heart" },
    { id: "band", label: "Inner band", x: 0.5, y: 0.76, fitted: "breath" },
    { id: "chest", label: "Chest", x: 0.32, y: 0.44, accepts: ["muscle", "warmth"] },
    { id: "strap", label: "Shoulder strap", x: 0.69, y: 0.16, accepts: ["core"] }
  ],
  "movement-leggings": [
    { id: "thigh", label: "Right thigh", x: 0.45, y: 0.4, fitted: "muscle" },
    { id: "knee", label: "Right knee", x: 0.62, y: 0.72, fitted: "core" },
    { id: "thigh-l", label: "Left thigh", x: 0.3, y: 0.46, accepts: ["muscle"] },
    { id: "waist", label: "Waistband", x: 0.68, y: 0.12, accepts: ["breath", "warmth"] }
  ],
  "breather-vest": [
    { id: "chest", label: "Chest pod", x: 0.8, y: 0.53, fitted: "heart" },
    { id: "band", label: "Breathing band", x: 0.4, y: 0.53, fitted: "breath" },
    { id: "shoulder", label: "Upper back", x: 0.3, y: 0.24, accepts: ["core"] },
    { id: "hem", label: "Hem", x: 0.5, y: 0.82, accepts: ["warmth", "muscle"] }
  ],
  "everyday-gloves": [
    { id: "palm", label: "Palm pads", x: 0.3, y: 0.52, fitted: "grip" },
    { id: "wrist", label: "Wrist pod", x: 0.75, y: 0.62, fitted: "core" },
    { id: "cuff", label: "Left cuff", x: 0.2, y: 0.66, accepts: ["warmth", "heart"] }
  ],
  "movement-hood": [
    { id: "chest", label: "Chest", x: 0.36, y: 0.4, accepts: ["heart", "breath"] },
    { id: "cuff", label: "Left cuff", x: 0.12, y: 0.77, accepts: ["warmth", "core"] },
    { id: "pocket", label: "Pocket seam", x: 0.6, y: 0.6, accepts: ["core", "warmth"] }
  ],
  "quest-hood-graphite": [
    { id: "front", label: "Inner front", x: 0.5, y: 0.5, fitted: "warmth" },
    { id: "chest", label: "Left chest", x: 0.32, y: 0.4, accepts: ["heart", "breath"] },
    { id: "cuff", label: "Right cuff", x: 0.86, y: 0.82, accepts: ["core", "warmth"] }
  ]
};

export const isWear = (slug: string) => !!slotMaps[slug];

/** White line sketch for a product, generated from its studio cutout. */
export const sketchFor = (p: Product) => p.cut.replace("/cut/", "/sketch/");

export type Addons = Record<string, ModuleId>;

export function capacity(slug: string, addons: Addons = {}) {
  const slots = slotMaps[slug] ?? [];
  const fitted = slots.filter((s) => s.fitted).length;
  const added = slots.filter((s) => !s.fitted && addons[s.id]).length;
  return { total: slots.length, fitted, added, used: fitted + added, free: slots.length - fitted - added };
}

export function modulesOn(slug: string, addons: Addons = {}): ModuleId[] {
  return (slotMaps[slug] ?? []).map((s) => s.fitted ?? addons[s.id]).filter((m): m is ModuleId => !!m);
}

export const addonPrice = (addons: Addons) => Object.keys(addons).reduce((t, k) => t + moduleById(addons[k]).price, 0);

/* ---------- Bag lines ---------- */

export const DUET_PRICE = 699000;
export const PREMIUM_MONTHLY = 24000;

export type BagLine =
  | { id: string; kind: "item"; slug: string; size?: string; color?: string; addons: Addons; qty: number }
  | { id: string; kind: "duet"; qty: number }
  | { id: string; kind: "premium"; qty: number };

export function linePrice(l: BagLine) {
  if (l.kind === "duet") return DUET_PRICE * l.qty;
  if (l.kind === "premium") return 0; // billed monthly, shown separately
  const p = productBySlug(l.slug);
  return p ? (p.price + addonPrice(l.addons)) * l.qty : 0;
}

/* ---------- Wellness potential ---------- */

export type Setup = { hub: boolean; headband: boolean; premium: boolean; wear: { slug: string; addons: Addons }[] };

const lower = ["walking-shorts", "movement-leggings", "quest-stride", "everyday-socks"];
const restWear = ["movement-hood", "quest-hood-graphite"];
const tops = Object.keys(slotMaps).filter((k) => lower.indexOf(k) < 0);

export type Insight = {
  id: string;
  label: string;
  line: string;
  /** Returns true when the setup has the sensors for it (the hub is checked separately). */
  has: (s: Setup) => boolean;
  /** What to add when it is missing. */
  hint: string;
  /** A garment and module that would unlock it, used for one tap suggestions. */
  fix?: { module: ModuleId; /** Only these garments can unlock it. */ prefer?: string[] };
  needsHub?: boolean;
};

const anyModule = (s: Setup, m: ModuleId, only?: string[]) =>
  s.wear.some((w) => (!only || only.indexOf(w.slug) > -1) && modulesOn(w.slug, w.addons).indexOf(m) > -1);

export const insights: Insight[] = [
  { id: "heart", label: "Heart rhythm", line: "How your heart responds to each session.", has: (s) => anyModule(s, "heart"), hint: "Add a Heart rhythm pod", fix: { module: "heart" }, needsHub: true },
  { id: "breath", label: "Breath pace", line: "Calmer breathing, shown as it happens.", has: (s) => anyModule(s, "breath"), hint: "Add a Breath band", fix: { module: "breath" }, needsHub: true },
  { id: "posture", label: "Posture", line: "Gentle cues to sit and stand taller.", has: (s) => s.wear.some((w) => lower.indexOf(w.slug) < 0 && modulesOn(w.slug, w.addons).indexOf("core") > -1), hint: "Add a Motion core to a top", fix: { module: "core", prefer: tops }, needsHub: true },
  { id: "gait", label: "Gait and balance", line: "Stride rhythm and steadiness on your feet.", has: (s) => anyModule(s, "core", lower), hint: "Add shoes, shorts or leggings with a Motion core", fix: { module: "core", prefer: lower }, needsHub: true },
  { id: "muscle", label: "Muscle activity", line: "Which muscles are doing the work.", has: (s) => anyModule(s, "muscle"), hint: "Add a Muscle panel", fix: { module: "muscle" }, needsHub: true },
  { id: "pressure", label: "Foot pressure", line: "How weight moves through each step.", has: (s) => anyModule(s, "pressure"), hint: "Add Quest Stride or Everyday Socks", fix: { module: "pressure" }, needsHub: true },
  { id: "grip", label: "Grip strength", line: "A quiet measure of everyday strength.", has: (s) => anyModule(s, "grip"), hint: "Add Everyday Gloves", needsHub: true },
  { id: "warmth", label: "Warmth", line: "Skin warmth through the day and night.", has: (s) => anyModule(s, "warmth"), hint: "Add a Warmth sensor", fix: { module: "warmth" }, needsHub: true },
  { id: "sleep", label: "Sleep rhythm", line: "Rest and recovery, from a hood worn to bed.", has: (s) => anyModule(s, "heart", restWear) || anyModule(s, "core", restWear), hint: "Add a Heart rhythm pod to a Rest hood", fix: { module: "heart", prefer: restWear }, needsHub: true },
  { id: "focus", label: "Focus and calm", line: "EEG guided sessions with Everyday Brainwear.", has: (s) => s.headband, hint: "Add Everyday Brainwear", needsHub: true },
  { id: "programs", label: "Guided programs", line: "Walk, Flow and Rest programs shaped around you.", has: (s) => s.premium, hint: "Add Quest View Premium", needsHub: true },
  { id: "family", label: "Family summary", line: "A weekly note you can share with family.", has: (s) => s.premium, hint: "Add Quest View Premium" }
];

export type InsightState = { insight: Insight; state: "on" | "needs-hub" | "off"; fix?: { slug: string; slot: Slot; module: ModuleId } };

/** Finds an open slot in the setup that accepts a module, limited to certain garments when given. */
export function openSlotFor(s: Setup, module: ModuleId, only?: string[]) {
  const pool = only ? s.wear.filter((w) => only.indexOf(w.slug) > -1) : s.wear;
  for (const w of pool) {
    const slot = (slotMaps[w.slug] ?? []).find((sl) => !sl.fitted && !w.addons[sl.id] && (sl.accepts ?? []).indexOf(module) > -1);
    if (slot) return { slug: w.slug, slot, module };
  }
  return undefined;
}

export function potential(s: Setup) {
  const states: InsightState[] = insights.map((i) => {
    if (!i.has(s)) return { insight: i, state: "off", fix: i.fix ? openSlotFor(s, i.fix.module, i.fix.prefer) : undefined };
    if (i.needsHub && !s.hub) return { insight: i, state: "needs-hub" };
    return { insight: i, state: "on" };
  });
  const on = states.filter((x) => x.state === "on").length;
  return { states, on, total: insights.length, pct: Math.round((on / insights.length) * 100) };
}

/** Builds the setup a set of bag lines adds up to. */
export function setupFromLines(lines: BagLine[]): Setup {
  const has = (...slugs: string[]) => lines.some((l) => l.kind === "item" && slugs.indexOf(l.slug) > -1);
  const duet = lines.some((l) => l.kind === "duet");
  return {
    hub: duet || has("qpad-one", "qpad-grip"),
    headband: duet || has("everyday-brainwear", "brainwear-arc", "brainwear-sleep"),
    premium: duet || lines.some((l) => l.kind === "premium"),
    wear: lines.filter((l): l is Extract<BagLine, { kind: "item" }> => l.kind === "item" && isWear(l.slug)).map((l) => ({ slug: l.slug, addons: l.addons }))
  };
}
