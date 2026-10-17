// Wellness profile: questions, scoring, product picks and plan rules.
// Pure TypeScript, no React or browser APIs, so the logic can be checked on its own.
// Principle: age is never a proxy for ability. Skipped answers add nothing and never count against anyone.

import { type Product, products, rituals, type RitualId } from "../catalog";

export type ProfileId = "everyday" | "mindful" | "strength" | "social" | "gentle";
export type Answers = Record<string, string | string[] | number | undefined>;

type Weights = Partial<Record<ProfileId, number>>;

export type IconKey =
  | "walk" | "mindful" | "water" | "strength" | "social" | "discover"
  | "sleep" | "focus" | "games" | "move" | "summary" | "family" | "clothes" | "none";

export type Option = {
  value: string;
  label: string;
  /** Short phrase used in "Why this fits you" and product reasons. */
  reason?: string;
  icon?: IconKey;
  weights?: Weights;
  /** Product tag this answer looks for. */
  tag?: string;
};

export type Question = {
  id: string;
  chapter: string;
  title: string;
  note?: string;
  kind: "single" | "multi" | "slider";
  max?: number;
  options: Option[];
};

/* ---------- Core: 8 questions ---------- */
export const core: Question[] = [
  {
    id: "activity", chapter: "Your everyday", kind: "multi", max: 3,
    title: "What does movement look like in your life, or what would you love to try?",
    options: [
      { value: "walk", icon: "walk", label: "Walking, hiking or exploring outdoors", reason: "your time outdoors on foot", tag: "walk", weights: { everyday: 2, social: 1 } },
      { value: "mindful", icon: "mindful", label: "Yoga, Pilates or mindful movement", reason: "your yoga and Pilates", tag: "mindful", weights: { mindful: 3 } },
      { value: "water", icon: "water", label: "Swimming or water exercise", reason: "your time in the water", tag: "breathable", weights: { everyday: 1, strength: 1 } },
      { value: "strength", icon: "strength", label: "Strength training, cycling or other active pursuits", reason: "your strength and active pursuits", tag: "strength", weights: { strength: 3 } },
      { value: "social", icon: "social", label: "Dancing, gardening or movement with friends", reason: "moving with friends", tag: "social", weights: { social: 3 } },
      { value: "discover", icon: "discover", label: "I'm ready to discover what I enjoy", reason: "your wish to explore", tag: "everyday", weights: { social: 1, gentle: 1 } }
    ]
  },
  {
    id: "rhythm", chapter: "Your everyday", kind: "slider",
    title: "What feels like a natural rhythm for movement right now?",
    options: []
  },
  {
    id: "ambition", chapter: "Your ambitions", kind: "single",
    title: "What would you most love to feel more of in your everyday life?",
    options: [
      { value: "strength", label: "Strength and confidence in my movements", reason: "building strength and confidence", weights: { strength: 2, gentle: 1 } },
      { value: "flex", label: "Flexibility, balance and ease", reason: "more flexibility and ease", tag: "stretch", weights: { mindful: 2, gentle: 1 } },
      { value: "energy", label: "Energy and stamina for the things I enjoy", reason: "energy for what you love", weights: { everyday: 2, social: 1 } },
      { value: "freedom", label: "The freedom to return to an activity or try something new", reason: "returning to or trying something new", weights: { social: 2, gentle: 1 } }
    ]
  },
  {
    id: "pace", chapter: "Your pace", kind: "single",
    title: "How do you like to approach movement on your terms?",
    options: [
      { value: "wide", label: "I enjoy a wide range of activities comfortably", reason: "enjoying a wide range of activities", weights: { everyday: 1, strength: 1, social: 1 } },
      { value: "adapt", label: "I adapt some movements to feel my best", reason: "adapting movement to feel your best", weights: { mindful: 1, gentle: 1 } },
      { value: "gentle", label: "I prefer a gentler pace or extra support for certain activities", reason: "a gentler, supported pace", tag: "support", weights: { gentle: 2 } },
      { value: "rebuild", label: "I'm rebuilding my routine, strength or confidence", reason: "rebuilding your routine", weights: { gentle: 2 } },
      { value: "nosay", label: "I'd prefer not to say" }
    ]
  },
  {
    id: "comfort", chapter: "Comfort & care", kind: "multi", max: 3,
    title: "What makes clothing feel truly comfortable when you're on the move?",
    options: [
      { value: "soft", label: "Soft fabrics that feel good against my skin", reason: "soft fabrics", tag: "soft" },
      { value: "stretch", label: "Stretch that moves naturally with me", reason: "stretch that moves with you", tag: "stretch", weights: { mindful: 1 } },
      { value: "breathable", label: "Breathable materials that help me feel comfortable", reason: "breathable materials", tag: "breathable", weights: { everyday: 1 } },
      { value: "easyfit", label: "An easy fit around my waist, shoulders or joints", reason: "an easy fit", tag: "easy-fit", weights: { gentle: 1 } },
      { value: "easyon", label: "Easy-to-use fastenings and effortless dressing", reason: "effortless dressing", tag: "easy-on", weights: { gentle: 1 } },
      { value: "support", label: "Thoughtful support without restrictive compression", reason: "gentle support", tag: "support", weights: { strength: 1 } }
    ]
  },
  {
    id: "fit", chapter: "Your fit", kind: "single",
    title: "How do you like your activewear to fit and feel?",
    options: [
      { value: "relaxed", label: "Relaxed and easy, with room to move", reason: "a relaxed fit", tag: "relaxed", weights: { gentle: 1 } },
      { value: "tailored", label: "Tailored and polished, without feeling restrictive", reason: "a polished fit", tag: "tailored", weights: { social: 1 } },
      { value: "close", label: "Close-fitting and supportive", reason: "a close, supportive fit", tag: "close", weights: { strength: 1, mindful: 1 } },
      { value: "mixed", label: "Different fits for different activities" }
    ]
  },
  {
    id: "style", chapter: "Your style", kind: "single",
    title: "Which style feels most like the person you are today?",
    options: [
      { value: "timeless", label: "Timeless, understated and refined", reason: "a timeless style", tag: "timeless" },
      { value: "sporty", label: "Sporty, technical and performance-led", reason: "a sporty style", tag: "sporty", weights: { strength: 1 } },
      { value: "expressive", label: "Modern, expressive and full of color", reason: "an expressive style", tag: "expressive", weights: { social: 1 } },
      { value: "versatile", label: "Versatile, elegant and ready for anywhere", reason: "a versatile style", tag: "versatile", weights: { social: 1, everyday: 1 } }
    ]
  },
  {
    id: "tools", chapter: "Your everyday tools", kind: "single",
    title: "What kind of support would make your everyday wellness feel more personal?",
    options: [
      { value: "guidance", label: "Simple guidance and gentle reminders" },
      { value: "plan", label: "A personal plan and progress I can follow" },
      { value: "wearable", label: "Useful insights from wearable technology" },
      { value: "clothing", label: "Beautiful, comfortable clothing is enough for me" }
    ]
  },
  {
    id: "track", chapter: "Your smart wear", kind: "multi", max: 3,
    title: "Which moments would you like your activewear to track accurately?",
    note: "Choose up to 3. This tells us where precise tracking matters most to you, so we build those first.",
    options: [
      { value: "walk", icon: "walk", label: "Walks and everyday steps", reason: "tracking your walks" },
      { value: "mindful", icon: "mindful", label: "Yoga, Pilates and stretching", reason: "tracking your practice" },
      { value: "strength", icon: "strength", label: "Strength and gym sessions", reason: "tracking your sessions" },
      { value: "sleep", icon: "sleep", label: "Sleep and recovery", reason: "understanding your rest" },
      { value: "focus", icon: "focus", label: "Calm and focus moments, with the headband", reason: "calm and focus with the headband" },
      { value: "none", icon: "clothes", label: "None, I just want the clothes" }
    ]
  },
  {
    id: "setup", chapter: "Your smart wear", kind: "single",
    title: "How hands-on would you like the technology to be?",
    note: "Every pod clicks in and pairs with qPad on its own. Fine-tuning is always optional.",
    options: [
      { value: "plug", label: "Just let it work: clip in the pod and go" },
      { value: "simple", label: "Simple, with a few settings I can adjust" },
      { value: "custom", label: "I'd like to customise what's tracked and shared" },
      { value: "none", label: "I'd rather not use sensors" }
    ]
  },
  {
    id: "apps", chapter: "Your smart wear", kind: "multi", max: 3,
    title: "Which Duet experiences on qPad sound good to you?",
    note: "Duet pairs the Brainwear headband with our dedicated qPad tablet. Choose up to 3.",
    options: [
      { value: "relax", icon: "sleep", label: "Guided relaxation with the headband", reason: "guided relaxation" },
      { value: "games", icon: "games", label: "Focus and memory games", reason: "focus and memory games" },
      { value: "move", icon: "move", label: "Movement sessions with live feedback", reason: "movement with live feedback" },
      { value: "summary", icon: "summary", label: "A simple weekly wellbeing summary", reason: "a weekly summary" },
      { value: "family", icon: "family", label: "Video calls and shared sessions with family", reason: "sessions with family" },
      { value: "none", icon: "none", label: "None for now" }
    ]
  }
];

/** The Duet apps question only appears for people who want sensors at all. */
export function isHidden(id: string, a: Answers) {
  if (id !== "apps") return false;
  const track = Array.isArray(a.track) ? a.track : [];
  return a.setup === "none" || (track.length === 1 && track[0] === "none");
}

/* ---------- Invitation round: 5 optional questions ---------- */
export const invitation: Question[] = [
  {
    id: "where", chapter: "Shape what's next", kind: "multi", max: 6,
    title: "Where would you feel most comfortable wearing technology?",
    options: [
      { value: "top", label: "An activewear top" },
      { value: "waist", label: "Shorts or a waistband" },
      { value: "shoes", label: "Shoes or insoles" },
      { value: "headband", label: "A headband" },
      { value: "wrist", label: "On my wrist" },
      { value: "none", label: "No sensors, thank you" }
    ]
  },
  {
    id: "headband", chapter: "Shape what's next", kind: "single",
    title: "Would you be curious to try a comfortable headband for interactive wellness experiences?",
    options: [
      { value: "interested", label: "Yes, I'd like to try it" },
      { value: "curious", label: "Curious, with more information" },
      { value: "benefits", label: "I'd need to understand the benefits" },
      { value: "no", label: "Not for me" }
    ]
  },
  {
    id: "access", chapter: "Shape what's next", kind: "single",
    title: "Who should be able to access your personal biometric information?",
    note: "Choosing a preference here doesn't allow us to collect or share anything. That would always need your separate, specific consent.",
    options: [
      { value: "me", label: "Only me" },
      { value: "partner", label: "A trusted care partner, if I choose" },
      { value: "pro", label: "A wellness professional, if I choose" },
      { value: "none", label: "I'd rather not collect biometric data" }
    ]
  },
  {
    id: "shape", chapter: "Shape what's next", kind: "single",
    title: "Would you like to help shape early Persimmon Quest products?",
    options: [
      { value: "clothing", label: "Yes, testing clothing" },
      { value: "tech", label: "Yes, testing wearable technology" },
      { value: "both", label: "Yes, both" },
      { value: "no", label: "Not at this time" }
    ]
  }
];

export const allQuestions = [...core, ...invitation];

/* ---------- Rhythm slider: days a week ---------- */
export const RHYTHM_MAX = 7;
export function rhythmLabel(days: number) {
  if (days <= 0) return "Finding my rhythm or returning after a break";
  if (days <= 2) return "Once or twice a week";
  if (days <= 4) return "A few times a week";
  return "Part of almost every day";
}
export function rhythmValueText(days: number) {
  if (days <= 0) return rhythmLabel(0);
  return `${days} ${days === 1 ? "day" : "days"} a week, ${rhythmLabel(days).toLowerCase()}`;
}
function rhythmReason(days: number) {
  if (days <= 0) return "finding your rhythm";
  if (days <= 2) return "moving once or twice a week";
  if (days <= 4) return "moving a few times a week";
  return "moving almost every day";
}
function rhythmWeights(days: number): Weights {
  if (days <= 0) return { gentle: 2 };
  if (days <= 2) return { gentle: 1, mindful: 1 };
  if (days <= 4) return { everyday: 1, mindful: 1 };
  return { everyday: 3 };
}

/* ---------- Profiles ---------- */
export type Profile = { id: ProfileId; name: string; line: string; image: string; ritual: RitualId };

export const profiles: Record<ProfileId, Profile> = {
  everyday: { id: "everyday", name: "The Everyday Mover", line: "Movement woven through your day, from morning walks to the long way home.", image: "/media/site/life/walk.webp", ritual: "walk" },
  mindful: { id: "mindful", name: "The Mindful Mover", line: "Breath, stretch and ease, practised with care and on your own terms.", image: "/media/site/life/flow.webp", ritual: "flow" },
  strength: { id: "strength", name: "The Strength Builder", line: "Stamina and strength, built steadily for the things you love.", image: "/media/site/hero/chrono-a.webp", ritual: "walk" },
  social: { id: "social", name: "The Social Explorer", line: "Moving with people, places and plans, and dressed for all of it.", image: "/media/site/life/polo.webp", ritual: "walk" },
  gentle: { id: "gentle", name: "The Gentle Return", line: "Rebuilding at your own pace, with clothes that make every start easier.", image: "/media/site/life/brainwear.webp", ritual: "flow" }
};

/* ---------- Helpers ---------- */
const asList = (v: Answers[string]) => (Array.isArray(v) ? v : typeof v === "string" ? [v] : []);
const optionsChosen = (q: Question, a: Answers) => asList(a[q.id]).map((v) => q.options.find((o) => o.value === v)).filter(Boolean) as Option[];

/** Someone into challenging pursuits who is "returning" is a Strength Builder, not a Gentle Return. */
const isChallenging = (a: Answers) => asList(a.activity).some((v) => v === "strength" || v === "water");

/* ---------- Scoring ---------- */
export function scoreProfiles(a: Answers) {
  const score: Record<ProfileId, number> = { everyday: 0, mindful: 0, strength: 0, social: 0, gentle: 0 };
  const reasons: Record<ProfileId, { text: string; w: number }[]> = { everyday: [], mindful: [], strength: [], social: [], gentle: [] };
  const challenging = isChallenging(a);

  const add = (w: Weights, reason?: string) => {
    for (const [id, n] of Object.entries(w) as [ProfileId, number][]) {
      // Returning signals lean to Gentle Return only when activities aren't challenging; otherwise they mean Strength Builder.
      const target: ProfileId = id === "gentle" && challenging ? "strength" : id;
      score[target] += n;
      if (reason) reasons[target].push({ text: reason, w: n });
    }
  };

  for (const q of core) {
    if (q.kind === "slider") {
      if (typeof a.rhythm === "number") add(rhythmWeights(a.rhythm), rhythmReason(a.rhythm));
      continue;
    }
    for (const o of optionsChosen(q, a)) if (o.weights) add(o.weights, o.reason);
  }

  const ranked = (Object.keys(score) as ProfileId[]).sort((x, y) => score[y] - score[x]);
  const top = score[ranked[0]];
  // Nothing answered: a warm, neutral default rather than a judgement.
  const primary = top > 0 ? ranked[0] : "everyday";
  const secondary = top > 0 && score[ranked[1]] > 0 && score[ranked[1]] >= top * 0.8 ? ranked[1] : undefined;
  const why = reasons[primary].sort((x, y) => y.w - x.w).map((r) => r.text).filter((t, i, all) => all.indexOf(t) === i).slice(0, 3);
  return { primary: profiles[primary], secondary: secondary ? profiles[secondary] : undefined, why, score };
}

/* ---------- Product picks ---------- */
export type Pick = { product: Product; reason: string };

export function pickProducts(a: Answers, limit = 3): Pick[] {
  const wanted: { tag: string; reason: string; w: number }[] = [];
  const take = (id: string, w: number) => {
    const q = core.find((x) => x.id === id)!;
    for (const o of optionsChosen(q, a)) if (o.tag && o.reason) wanted.push({ tag: o.tag, reason: o.reason, w });
  };
  take("activity", 3); take("comfort", 2); take("ambition", 1); take("pace", 1); take("fit", 1); take("style", 1);
  if (!wanted.length) return [];

  return products
    .filter((p) => !p.tags.includes("device"))
    .map((p) => {
      const hits = wanted.filter((w) => p.tags.includes(w.tag)).sort((x, y) => y.w - x.w);
      return { product: p, score: hits.reduce((s, h) => s + h.w, 0), hits };
    })
    .filter((x) => x.score >= 3) // never pad the list with weak matches
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map(({ product, hits }) => {
      const parts = hits.map((h) => h.reason).filter((t, i, all) => all.indexOf(t) === i).slice(0, 2);
      return { product, reason: `Chosen for ${parts.join(", with ")}.` };
    });
}

/* ---------- Plan ---------- */
export type PlanResult =
  | { kind: "premium"; program: string }
  | { kind: "duet"; program: string }
  | { kind: "clothing" };

export function recommendPlan(a: Answers, profile: Profile): { plan: PlanResult; brainwearPreview: boolean } {
  const program = rituals.find((r) => r.id === profile.ritual)!.plan;
  const tools = a.tools;
  const track = asList(a.track);
  const apps = asList(a.apps).filter((v) => v !== "none");
  const where = asList(a.where);
  const noSensors = tools === "clothing" || a.setup === "none" || where.includes("none") || (track.length === 1 && track[0] === "none");
  const headbandCurious = a.headband === "interested" || a.headband === "curious";

  // Duet needs real intent for its apps or headband use, not curiosity alone.
  const duetIntent = apps.length >= 2 || (apps.length >= 1 && (track.includes("focus") || where.includes("headband")));
  if (!noSensors && duetIntent && tools !== "clothing") return { plan: { kind: "duet", program }, brainwearPreview: false };
  if (tools === "clothing") return { plan: { kind: "clothing" }, brainwearPreview: false };
  return { plan: { kind: "premium", program }, brainwearPreview: !noSensors && (headbandCurious || track.includes("focus") || apps.length > 0) };
}

/** A short plug-and-play summary of what their pods would track, for the result screen. */
export function trackingSummary(a: Answers) {
  const track = asList(a.track).filter((v) => v !== "none");
  if (!track.length || a.setup === "none") return null;
  const q = core.find((x) => x.id === "track")!;
  const labels = track.map((v) => q.options.find((o) => o.value === v)!.label.toLowerCase().replace(", with the headband", ""));
  const setup = a.setup === "custom" ? "Customise what's tracked and shared any time." : a.setup === "simple" ? "A few simple settings, ready when you are." : "Clip in the pod and go. Fine-tune it later, or never.";
  return { labels, setup };
}

/** Map an old `?start=` ritual link onto the ambition question. */
export function ambitionFromStart(start: string | null) {
  return ({ walk: "energy", flow: "flex", rest: "flex", duet: "freedom" } as Record<string, string>)[start ?? ""];
}
