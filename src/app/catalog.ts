// Storefront catalog. Prices are placeholders until pricing is confirmed.
// Films and material stills live in /media/site/film and /media/site/material, graded to the house look.

export type RitualId = "walk" | "flow" | "rest" | "duet";

export type Ritual = {
  id: RitualId;
  index: string;
  name: string;
  line: string;
  plan: string;
  reads: string[];
  field: string;
  dark?: boolean;
  hero: string;
  heroCut: string;
  pod: [number, number];
};

export const rituals: Ritual[] = [
  {
    id: "walk",
    index: "01",
    name: "Walk",
    line: "Steady steps, every morning.",
    plan: "Morning Walk program",
    reads: ["Stride rhythm", "Balance"],
    field: "var(--c-sand)",
    hero: "/media/site/life/walk-wide.webp",
    heroCut: "/media/site/cut/polo.webp",
    pod: [0.8, 0.4]
  },
  {
    id: "flow",
    index: "02",
    name: "Flow",
    line: "Breath first. Then everything else.",
    plan: "Flow program",
    reads: ["Breath pace", "Range of motion"],
    field: "var(--c-blush)",
    hero: "/media/site/life/flow-wide.webp",
    heroCut: "/media/site/cut/top.webp",
    pod: [0.5, 0.8]
  },
  {
    id: "rest",
    index: "03",
    name: "Rest",
    line: "Recovery is part of the training.",
    plan: "Deep Rest program",
    reads: ["Sleep rhythm", "Warmth"],
    field: "var(--c-graphite)",
    dark: true,
    hero: "/media/site/life/rest-wide.webp",
    heroCut: "/media/site/cut/hood-graphite.webp",
    pod: [0.5, 0.5]
  },
  {
    id: "duet",
    index: "04",
    name: "Duet",
    line: "A headband and a tablet that move with you.",
    plan: "Duet sessions",
    reads: ["Focus", "Session flow"],
    field: "var(--c-celadon)",
    hero: "/media/site/life/qpad-wide.webp",
    heroCut: "/media/site/cut/qpad.webp",
    pod: [0.45, 0.62]
  }
];

export type Gender = "women" | "men" | "unisex";

export const genders: { id: Gender; label: string }[] = [
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "unisex", label: "Unisex" }
];

export type Colorway = { name: string; hex: string; cut: string };

const SHADES = { Graphite: "#3a3633", Sage: "#8f9e85", Clay: "#c9a596", Mist: "#9fb0c2" } as const;
type Shade = keyof typeof SHADES;
/** Base colour first, then recoloured studio cutouts generated into /media/site/cut/colors. */
const cw = (file: string, base: [string, string], extra: Shade[] = []): Colorway[] => [
  { name: base[0], hex: base[1], cut: `/media/site/cut/${file}.webp` },
  ...extra.map((n) => ({ name: n, hex: SHADES[n], cut: `/media/site/cut/colors/${file}-${n.toLowerCase()}.webp` }))
];

export type Product = {
  slug: string;
  gender: Gender;
  /** Colour options; the first is the colour shown in the worn photo. */
  colorways: Colorway[];
  /** Attributes the wellness profile matches against (activity, comfort, fit, style). "device" marks hardware. */
  tags: string[];
  name: string;
  ritual: RitualId;
  category: "Tops" | "Bottoms" | "Outerwear" | "Sets" | "Shoes" | "Accessories" | "Duet";
  price: number;
  line: string;
  cut: string;
  alt: string;
  onBody: string;
  onBodyAlt: string;
  pod: [number, number];
  senses: string[];
  fabric: string;
  sizes: string[];
};

const apparel = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  {
    slug: "everyday-polo", gender: "men", colorways: cw("polo", ["Heather", "#a9a6a1"], ["Graphite", "Sage", "Mist", "Clay"]), tags: ["walk", "everyday", "breathable", "tailored", "timeless", "versatile", "social"], name: "Everyday Polo", ritual: "walk", category: "Tops", price: 189000,
    line: "A polo that notices your stride.",
    cut: "/media/site/cut/polo.webp", alt: "Heather grey polo with a bronze sensor pod on the sleeve",
    onBody: "/media/site/life/polo.webp", onBodyAlt: "Man in his seventies wearing the Everyday Polo",
    pod: [0.8, 0.4], senses: ["Heart rhythm", "Posture", "Muscle activity"],
    fabric: "Piqué knit with silver yarn, sensor pod detaches for washing", sizes: apparel
  },
  {
    slug: "walking-shorts", gender: "men", colorways: cw("shorts", ["Oat", "#e6dccb"], ["Graphite", "Sage", "Mist"]), tags: ["walk", "everyday", "breathable", "relaxed", "easy-fit"], name: "Walking Shorts", ritual: "walk", category: "Bottoms", price: 159000,
    line: "Light shorts, steady steps.",
    cut: "/media/site/cut/shorts.webp", alt: "Oat walking shorts with a waistband pod",
    onBody: "/media/site/life/shorts.webp", onBodyAlt: "Man wearing the Walking Shorts with the Everyday Polo",
    pod: [0.72, 0.2], senses: ["Thigh motion", "Muscle activity", "Warmth"],
    fabric: "Brushed cotton blend with a fitted inner liner", sizes: apparel
  },
  {
    slug: "quest-stride", gender: "unisex", colorways: cw("shoe", ["Oat", "#e6dccb"], ["Graphite"]), tags: ["walk", "easy-on", "support", "sporty"], name: "Quest Stride", ritual: "walk", category: "Shoes", price: 269000,
    line: "Every step, considered.",
    cut: "/media/site/cut/shoe.webp", alt: "Pair of oat and graphite Quest Stride shoes with a wrap strap",
    onBody: "/media/site/detail/shoe.webp", onBodyAlt: "Close up of the feather knit upper and orange pull tab",
    pod: [0.62, 0.52], senses: ["Foot pressure", "Gait rhythm", "Balance"],
    fabric: "Feather knit upper, easy-grip strap, removable motion core", sizes: ["230", "240", "250", "260", "270", "280"]
  },
  {
    slug: "everyday-socks", gender: "unisex", colorways: cw("sock", ["Oat", "#e6dccb"], ["Graphite", "Sage", "Clay"]), tags: ["walk", "everyday", "soft"], name: "Everyday Socks", ritual: "walk", category: "Accessories", price: 49000,
    line: "Small pod, quiet comfort.",
    cut: "/media/site/cut/sock.webp", alt: "Pair of oat crew socks with an ankle pod",
    onBody: "/media/site/detail/sock.webp", onBodyAlt: "Close up of the ribbed cuff and bronze ankle pod",
    pod: [0.17, 0.3], senses: ["Foot pressure", "Warmth"],
    fabric: "Cushioned rib knit, sole sensing zones", sizes: ["S", "M", "L"]
  },
  {
    slug: "breather-top", gender: "women", colorways: cw("top", ["Oat", "#e6dccb"], ["Graphite", "Clay", "Sage", "Mist"]), tags: ["mindful", "stretch", "soft", "support", "close"], name: "Breather Top", ritual: "flow", category: "Tops", price: 139000,
    line: "Follows your breath, not your pace.",
    cut: "/media/site/cut/top.webp", alt: "Oat feather jacquard support top with an underband pod",
    onBody: "/media/site/life/top.webp", onBodyAlt: "Woman wearing the Breather Top",
    pod: [0.5, 0.8], senses: ["Breath pace", "Heart rhythm", "Motion"],
    fabric: "Feather jacquard knit with a soft underband", sizes: apparel
  },
  {
    slug: "movement-tank", gender: "women", colorways: cw("tank", ["Oat", "#e6dccb"], ["Graphite", "Clay", "Sage"]), tags: ["mindful", "strength", "stretch", "breathable", "close"], name: "Movement Tank", ritual: "flow", category: "Tops", price: 149000,
    line: "Made for reaching further.",
    cut: "/media/site/cut/tank.webp", alt: "Oat feather jacquard tank with a side seam pod",
    onBody: "/media/site/life/flow.webp", onBodyAlt: "Woman in a Pilates session with a resistance ring",
    pod: [0.86, 0.44], senses: ["Breath pace", "Heart rhythm", "Warmth"],
    fabric: "Feather jacquard with a perforated inner band", sizes: apparel
  },
  {
    slug: "movement-leggings", gender: "women", colorways: cw("leggings", ["Heather", "#a9a6a1"], ["Graphite", "Clay", "Sage", "Mist"]), tags: ["mindful", "strength", "stretch", "support", "close", "sporty"], name: "Movement Leggings", ritual: "flow", category: "Bottoms", price: 169000,
    line: "Sculpted support, hip to ankle.",
    cut: "/media/site/cut/leggings.webp", alt: "Heather grey leggings with textile sensing panels",
    onBody: "/media/site/detail/leggings.webp", onBodyAlt: "Close up of the textile panels along the leg",
    pod: [0.55, 0.45], senses: ["Muscle activity", "Range of motion"],
    fabric: "Compressive knit with textile sensing panels", sizes: apparel
  },
  {
    slug: "breather-vest", gender: "men", colorways: cw("vest", ["Ivory", "#ece6dc"], ["Graphite", "Sage", "Mist"]), tags: ["strength", "breathable", "tailored", "sporty"], name: "Breather Vest", ritual: "flow", category: "Tops", price: 159000,
    line: "Quiet engineering, everyday calm.",
    cut: "/media/site/cut/vest.webp", alt: "White sculpted vest with a removable chest pod",
    onBody: "/media/site/detail/vest.webp", onBodyAlt: "Close up of the vest's inner breathing band",
    pod: [0.72, 0.52], senses: ["Heart rhythm", "Breath pace"],
    fabric: "Double layer jersey with an inner breathing band", sizes: apparel
  },
  {
    slug: "everyday-gloves", gender: "unisex", colorways: cw("glove", ["Oat", "#e6dccb"], ["Graphite", "Clay"]), tags: ["walk", "strength", "soft", "easy-on"], name: "Everyday Gloves", ritual: "flow", category: "Accessories", price: 89000,
    line: "Grip, gently measured.",
    cut: "/media/site/cut/glove.webp", alt: "Pair of oat knit gloves with a wrist pod",
    onBody: "/media/site/life/glove.webp", onBodyAlt: "Hand wearing the Everyday Glove with its wrist pod",
    pod: [0.78, 0.64], senses: ["Grip", "Hand motion", "Warmth"],
    fabric: "Brushed knit, palm pads, wrist cuff pod", sizes: ["S", "M", "L"]
  },
  {
    slug: "movement-hood", gender: "unisex", colorways: cw("hood-white", ["Ivory", "#ece6dc"], ["Sage", "Clay", "Mist"]), tags: ["everyday", "social", "soft", "relaxed", "easy-fit", "timeless", "versatile"], name: "Movement Hood", ritual: "rest", category: "Outerwear", price: 239000,
    line: "For the studio. For the city.",
    cut: "/media/site/cut/hood-white.webp", alt: "Ivory hooded jacket with tonal feather jacquard",
    onBody: "/media/site/detail/hood-white.webp", onBodyAlt: "Close up of the silver feather jacquard",
    pod: [0.5, 0.55], senses: ["Warmth", "Breath pace"],
    fabric: "Merino lyocell double knit, sensor free by default", sizes: apparel
  },
  {
    slug: "quest-hood-graphite", gender: "unisex", colorways: cw("hood-graphite", ["Graphite", "#3a3633"]), tags: ["social", "soft", "tailored", "timeless", "versatile", "expressive"], name: "Quest Hood Graphite", ritual: "rest", category: "Outerwear", price: 289000,
    line: "Atelier knit, made to order.",
    cut: "/media/site/cut/hood-graphite.webp", alt: "Graphite hooded jacket with silver feather sleeves",
    onBody: "/media/site/detail/hood-graphite.webp", onBodyAlt: "Close up of the graphite knit and concealed zip",
    pod: [0.5, 0.5], senses: ["Warmth", "Posture"],
    fabric: "Cashmere merino knit, silk blend jacquard", sizes: apparel
  },
  {
    slug: "everyday-brainwear", gender: "unisex", colorways: cw("brainwear", ["Oat", "#d9cfc0"], ["Graphite"]), tags: ["device"], name: "Everyday Brainwear", ritual: "duet", category: "Duet", price: 329000,
    line: "A soft band for focus and calm.",
    cut: "/media/site/cut/brainwear.webp", alt: "Woven oat headband with a bronze pod",
    onBody: "/media/site/life/brainwear.webp", onBodyAlt: "Man wearing the headband while using the tablet",
    pod: [0.86, 0.5], senses: ["Focus", "Calm", "Head motion"],
    fabric: "Removable woven textile, washable cover", sizes: ["One size"]
  },
  {
    slug: "qpad-one", gender: "unisex", colorways: cw("qpad", ["Cream", "#ece6dc"]), tags: ["device"], name: "qPad One", ritual: "duet", category: "Duet", price: 459000,
    line: "Four keys. Every session.",
    cut: "/media/site/cut/qpad.webp", alt: "Cream tablet with four tactile keys and a fold out stand",
    onBody: "/media/site/life/qpad.webp", onBodyAlt: "Woman pressing the tactile keys of the tablet",
    pod: [0.45, 0.62], senses: ["Guided sessions", "Family check ins"],
    fabric: "Tactile keys, privacy shutter camera, fold out stand", sizes: ["Standard"]
  },
  {
    slug: "walk-set", gender: "men", colorways: cw("walk-set", ["Heather", "#a9a6a1"], ["Graphite", "Sage"]), tags: ["walk", "everyday", "breathable", "relaxed"], name: "Walk Set", ritual: "walk", category: "Sets", price: 319000,
    line: "Polo and shorts, ready for the morning walk.",
    cut: "/media/site/cut/walk-set.webp", alt: "Heather polo and oat walking shorts shown together",
    onBody: "/media/site/life/walk.webp", onBodyAlt: "Man in his seventies running in the polo and shorts",
    pod: [0.5, 0.5], senses: ["Heart rhythm", "Stride", "Muscle activity"],
    fabric: "Piqué polo and brushed cotton shorts, pods detach for washing", sizes: apparel
  },
  {
    slug: "flow-set", gender: "women", colorways: cw("flow-set", ["Oat", "#e6dccb"], ["Graphite", "Clay", "Sage"]), tags: ["mindful", "stretch", "support", "close"], name: "Flow Set", ritual: "flow", category: "Sets", price: 279000,
    line: "Support top and leggings for Pilates and stretch.",
    cut: "/media/site/cut/flow-set.webp", alt: "Oat support top and heather leggings shown together",
    onBody: "/media/site/life/flow-wide.webp", onBodyAlt: "Woman stretching with a Pilates ring in the top and leggings",
    pod: [0.5, 0.5], senses: ["Breath pace", "Muscle activity", "Range of motion"],
    fabric: "Feather jacquard top with compressive leggings", sizes: apparel
  },
  {
    slug: "brainwear-arc", gender: "unisex", colorways: cw("brainwear-rigid", ["Pearl", "#ece6dc"]), tags: ["device"], name: "Brainwear Arc", ritual: "duet", category: "Duet", price: 379000,
    line: "A light band that slips on in one move.",
    cut: "/media/site/cut/brainwear-rigid.webp", alt: "Pearl rigid headband with a soft inner pad",
    onBody: "/media/site/people/buri-headband.webp", onBodyAlt: "Older Korean woman settling the Arc headband on her forehead",
    pod: [0.85, 0.5], senses: ["Focus", "Calm", "Head motion"],
    fabric: "Soft touch shell, washable inner pad", sizes: ["One size"]
  },
  {
    slug: "brainwear-sleep", gender: "unisex", colorways: cw("brainwear-arc", ["Oat", "#d9cfc0"], ["Graphite"]), tags: ["device"], name: "Brainwear Sleep", ritual: "duet", category: "Duet", price: 299000,
    line: "A soft knit band to wear to bed.",
    cut: "/media/site/cut/brainwear-arc.webp", alt: "Oat knit headband with a flat pod",
    onBody: "/media/site/people/sleep-band.webp", onBodyAlt: "Woman asleep wearing the soft knit headband",
    pod: [0.8, 0.5], senses: ["Sleep rhythm", "Deep rest", "Calm"],
    fabric: "Soft knit with a flat pod, washable", sizes: ["S/M", "L/XL"]
  },
  {
    slug: "qpad-grip", gender: "unisex", colorways: cw("qpad-grip", ["Cream", "#ece6dc"]), tags: ["device"], name: "qPad Grip", ritual: "duet", category: "Duet", price: 499000,
    line: "qPad with easy hold handles and three big keys.",
    cut: "/media/site/cut/qpad-grip.webp", alt: "Cream tablet with rounded handles and three keys",
    onBody: "/media/site/cut/qpad-grip.webp", onBodyAlt: "",
    pod: [0.5, 0.5], senses: ["Guided sessions", "Family calls"],
    fabric: "Soft grip handles, fold out stand, three tactile keys", sizes: ["Standard"]
  }
];

export type PlanId = "premium" | "duet" | "enterprise";

export type Plan = {
  id: PlanId;
  eyebrow: string;
  name: string;
  line: string;
  /** Price shown large on the card; text so it can read "Custom" for enterprise. */
  price: string;
  unit?: string;
  includes: string[];
  cta: { label: string; href: string };
  ribbon?: string;
  tone?: "dark";
};

/**
 * Founding Member cohort. Fill these in only with confirmed details; anything left undefined is simply not shown,
 * so no capacity, date or benefit can appear on the site before it is real.
 */
export const FOUNDING_COHORT: { capacity?: number; eligibility?: string; benefits?: string[]; dates?: string } = {};

// Prices are placeholders until pricing is confirmed. The bundle price matches the Duet page (both devices, less ₩89,000).
// Ordered top to bottom: personal subscription, the bundle offer, then enterprise.
export const plans: Plan[] = [
  {
    id: "premium", eyebrow: "For you", name: "Quest View Premium",
    line: "Your qPad, personalised. Programs, games and check ins shaped around how you move.",
    price: "₩24,000", unit: "/ month",
    includes: ["Personal Walk, Flow and Rest programs", "Large type apps made for qPad", "Weekly summary to share with family", "New sessions every month"],
    cta: { label: "Get Premium", href: "/contact" }
  },
  {
    id: "duet", eyebrow: "Duet bundle", name: "One year of Premium, included",
    line: "Buy the Duet bundle, Brainwear headband with the qPad tablet, and Quest View Premium is yours free for a year.",
    price: "₩699,000", unit: "bundle",
    includes: ["Everyday Brainwear and qPad One", "12 months of Quest View Premium", "Set up at home with our team", "Free exchanges for 60 days"],
    cta: { label: "Buy your bundle", href: "/duet" }, ribbon: "Best value"
  },
  {
    id: "enterprise", eyebrow: "For silver towns", name: "Monarch OS",
    line: "The operating system for whole communities. Run Quest View across every resident, room and team.",
    price: "Custom", unit: "pricing",
    includes: ["Fleet management for every qPad", "Group programs and resident schedules", "Staff dashboard with family updates", "Data kept on your own site"],
    cta: { label: "Talk to us", href: "/contact" }, tone: "dark"
  }
];

export const won = (n: number) => `₩${n.toLocaleString("en-US")}`;

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const ritualById = (id: RitualId) => rituals.find((r) => r.id === id)!;
