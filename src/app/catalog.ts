// Storefront catalog. Prices are placeholders until pricing is confirmed.
// Every product image lives in /media/shop/<slug>/ and shares one studio sweep, so any two pictures sit well side by side:
//   <colour>.webp          worn, cropped to the piece (cards)
//   <colour>-full.webp     worn, head to toe (product page)
//   <colour>-still.webp    the piece alone on the same sweep
//   <colour>-cut.webp      transparent cutout (search, plan finder)
//   <colour>-back.webp     the piece from behind
//   <colour>-motion.webp   worn while moving
//   <colour>-context.webp  in use, out in the world
//   <colour>-<view>.webp   extra product views (headbands and tablets: inside, front, keys...)
//   /media/shop/scenes/    in-use photos shared by several headband and qPad pages
//   sketch.webp            white line drawing for sensor maps
// Unisex pieces carry a worn photo for each: <colour>-women.webp and <colour>-men.webp.

export type RitualId = "walk" | "flow" | "rest" | "duet";

/** The four routines Quest View Access builds programs around. */
export type Ritual = { id: RitualId; name: string; plan: string };

export const rituals: Ritual[] = [
  { id: "walk", name: "Run longer", plan: "Morning Walk program" },
  { id: "flow", name: "Stand stronger", plan: "Flow program" },
  { id: "rest", name: "Signature style", plan: "Deep Rest program" },
  { id: "duet", name: "Ecosystem", plan: "Duet sessions" }
];

export type Gender = "women" | "men" | "unisex";
export type Audience = Exclude<Gender, "unisex">;

export type Shot = { src: string; alt: string };
/** A moment the product is used in: a shared scene photo with a short title and line. */
export type Use = Shot & { title: string; line: string };
export type Look = Shot & { full: string };

export type Colorway = {
  name: string;
  hex: string;
  /** Worn in the studio, one per audience the piece is made for. */
  looks: Partial<Record<Audience, Look>>;
  still?: string;
  back?: string;
  cut?: string;
  motion?: Shot;
  context?: Shot;
  /** Extra labelled views for the product page (inside, front, keys...). */
  views?: (Shot & { label: string })[];
};

export type Product = {
  slug: string;
  gender: Gender;
  /** Colour options; the first is the default. */
  colorways: Colorway[];
  /** Attributes the wellness profile matches against (activity, comfort, fit, style). "device" marks hardware. */
  tags: string[];
  name: string;
  ritual: RitualId;
  category: "Tops" | "Bottoms" | "Outerwear" | "Shoes" | "Accessories" | "Duet";
  price: number;
  line: string;
  /** Transparent cutout of the default colour. */
  cut: string;
  sketch: string;
  senses: string[];
  fabric: string;
  sizes: string[];
  /** One sentence for the card: what people use it for. */
  usage?: string;
  /** In-use scenes for the product page. */
  uses?: Use[];
};

const dir = (slug: string) => `/media/shop/${slug}`;
const key = (name: string) => name.toLowerCase();

type Spec = {
  hex: string;
  /** Which worn photos exist: "look" for one audience, "both" for unisex pieces, "none" for still life only. */
  worn?: "look" | "both" | "none";
  still?: boolean;
  back?: boolean;
  motion?: string;
  context?: string;
  /** Extra views: file suffix to [label, alt]. */
  views?: Record<string, [string, string]>;
};

/** Builds a product's colourways from the files the studio pipeline writes. */
function colours(slug: string, name: string, audience: Gender, specs: Record<string, Spec>): Colorway[] {
  return Object.keys(specs).map((colour) => {
    const s = specs[colour];
    const base = `${dir(slug)}/${key(colour)}`;
    const looks: Colorway["looks"] = {};
    const worn = s.worn ?? "look";
    if (worn === "both") {
      looks.women = { src: `${base}-women.webp`, full: `${base}-women-full.webp`, alt: `Woman wearing the ${name} in ${colour}` };
      looks.men = { src: `${base}-men.webp`, full: `${base}-men-full.webp`, alt: `Man wearing the ${name} in ${colour}` };
    } else if (worn === "look") {
      const who = audience === "men" ? "Man" : audience === "women" ? "Woman" : "Wearing";
      const alt = who === "Wearing" ? `The ${name} in ${colour}, worn` : `${who} wearing the ${name} in ${colour}`;
      looks[audience === "men" ? "men" : "women"] = { src: `${base}.webp`, full: `${base}-full.webp`, alt };
    }
    return {
      name: colour,
      hex: s.hex,
      looks,
      still: s.still === false ? undefined : `${base}-still.webp`,
      back: s.back ? `${base}-back.webp` : undefined,
      cut: s.still === false ? undefined : `${base}-cut.webp`,
      motion: s.motion ? { src: `${base}-motion.webp`, alt: s.motion } : undefined,
      context: s.context ? { src: `${base}-context.webp`, alt: s.context } : undefined,
      views: s.views ? Object.keys(s.views).map((v) => ({ src: `${base}-${v}.webp`, label: s.views![v][0], alt: s.views![v][1] })) : undefined
    };
  });
}

type Def = Omit<Product, "colorways" | "cut" | "sketch"> & { specs: Record<string, Spec> };

function product(d: Def): Product {
  const { specs, ...rest } = d;
  const colorways = colours(d.slug, d.name, d.gender, specs);
  const firstCut = colorways.find((c) => c.cut)?.cut ?? `${dir(d.slug)}/sketch.webp`;
  return { ...rest, colorways, cut: firstCut, sketch: `${dir(d.slug)}/sketch.webp` };
}

const use = (scene: string, title: string, line: string, alt: string): Use => ({ src: `/media/shop/scenes/${scene}.webp`, alt, title, line });

const apparel = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  /* ---------- Women ---------- */
  product({
    slug: "breather-top", gender: "women", name: "Breather Top", ritual: "flow", category: "Tops", price: 139000,
    tags: ["mindful", "stretch", "soft", "support", "close"],
    line: "Follows your breath, not your pace.",
    senses: ["Breath pace", "Heart rhythm", "Motion"],
    fabric: "Feather jacquard knit with a soft underband", sizes: apparel,
    specs: {
      Pearl: { hex: "#e4ddd3", back: true, motion: "Woman curling light dumbbells in the Pearl Breather Top" },
      Black: { hex: "#252526", back: true, motion: "Woman striding across the studio in the Black Breather Top" },
      Cornflower: { hex: "#668ac1", motion: "Woman working with a resistance band in the Cornflower Breather Top" },
      Rose: { hex: "#cd9896", back: true, motion: "Woman in a side stretch wearing the Rose Breather Top" },
      Sage: { hex: "#919785", back: true, motion: "Woman seated cross legged on a mat in the Sage Breather Top" }
    }
  }),
  product({
    slug: "movement-tank", gender: "women", name: "Movement Tank", ritual: "flow", category: "Tops", price: 149000,
    tags: ["mindful", "strength", "stretch", "breathable", "close"],
    line: "Made for reaching further, soft enough to sleep in.",
    senses: ["Breath pace", "Heart rhythm", "Warmth", "Calm breathing and warmth through the night"],
    fabric: "Botanical jacquard wrap with a perforated breathing band, flat seams and no tags, so it is comfortable to sleep in", sizes: apparel,
    specs: {
      Black: { hex: "#29282b", back: true, motion: "Woman lifting light dumbbells in the Black Movement Tank" },
      Pearl: { hex: "#e2dbd3", back: true, motion: "Woman opening her arms wide in the Pearl Movement Tank" },
      Cornflower: { hex: "#5d89cf", back: true, motion: "Woman stretching a resistance band in the Cornflower Movement Tank" },
      Rose: { hex: "#cc9796", back: true, motion: "Woman walking briskly in the Rose Movement Tank" },
      Sage: { hex: "#88917f", back: true, motion: "Woman smiling in a seated yoga pose in the Sage Movement Tank" }
    }
  }),
  product({
    slug: "movement-leggings", gender: "women", name: "Movement Leggings", ritual: "flow", category: "Bottoms", price: 169000,
    tags: ["mindful", "strength", "stretch", "support", "close", "sporty"],
    line: "Sculpted support, hip to ankle.",
    senses: ["Muscle activity", "Range of motion"],
    fabric: "Compressive knit with textile sensing panels", sizes: apparel,
    specs: {
      Navy: { hex: "#303247", still: false },
      Black: { hex: "#252224", still: false },
      Heather: { hex: "#b5b0ad", still: false },
      Charcoal: { hex: "#4b4346", still: false },
      Olive: { hex: "#49493f", still: false }
    }
  }),

  /* ---------- Men ---------- */
  product({
    slug: "everyday-polo", gender: "men", name: "Everyday Polo", ritual: "walk", category: "Tops", price: 189000,
    tags: ["walk", "everyday", "breathable", "tailored", "timeless", "versatile", "social"],
    line: "A polo that notices your stride.",
    senses: ["Heart rhythm", "Posture", "Muscle activity"],
    fabric: "Piqué knit with silver yarn, sensor pod detaches for washing", sizes: apparel,
    specs: {
      Heather: { hex: "#a3a2a6" },
      Black: { hex: "#282828" },
      Sage: { hex: "#768375" },
      Mist: { hex: "#6383aa" },
      Rose: { hex: "#c07a83" }
    }
  }),
  product({
    slug: "walking-shorts", gender: "men", name: "Walking Shorts", ritual: "walk", category: "Bottoms", price: 159000,
    tags: ["walk", "everyday", "breathable", "relaxed", "easy-fit"],
    line: "Light shorts, steady steps.",
    senses: ["Thigh motion", "Muscle activity", "Warmth"],
    fabric: "Brushed cotton blend with a fitted inner liner", sizes: apparel,
    specs: {
      Mist: { hex: "#6a84a5" },
      Stone: { hex: "#939295" },
      Black: { hex: "#2f2d2f" },
      Sage: { hex: "#8a947f" },
      Rose: { hex: "#d3999a" }
    }
  }),
  product({
    slug: "breather-vest", gender: "men", name: "Breather Vest", ritual: "flow", category: "Tops", price: 159000,
    tags: ["strength", "breathable", "tailored", "sporty"],
    line: "Quiet engineering, everyday calm.",
    senses: ["Heart rhythm", "Breath pace"],
    fabric: "Double layer jersey with an inner breathing band", sizes: apparel,
    specs: {
      Black: { hex: "#2b2b2b" },
      White: { hex: "#ebeae8" },
      Mist: { hex: "#6788af" }
    }
  }),

  /* ---------- Outerwear, cut for both ---------- */
  product({
    slug: "quest-hood", gender: "unisex", name: "Quest Hood", ritual: "rest", category: "Outerwear", price: 289000,
    tags: ["social", "soft", "tailored", "timeless", "versatile", "expressive"],
    line: "Peacock jacquard, made to be noticed.",
    senses: ["Warmth", "Posture"],
    fabric: "Double knit body with peacock feather jacquard sleeves and a two way zip", sizes: apparel,
    specs: {
      Pine: { hex: "#2d3d36", worn: "both", back: true },
      Burgundy: { hex: "#55222e", worn: "both", back: true },
      Midnight: { hex: "#29334b", worn: "both", back: true },
      Charcoal: { hex: "#3f3e42", worn: "both" }
    }
  }),
  product({
    slug: "movement-hood", gender: "unisex", name: "Movement Hood", ritual: "rest", category: "Outerwear", price: 239000,
    tags: ["everyday", "social", "soft", "relaxed", "easy-fit", "timeless", "versatile"],
    line: "For the studio. For the city.",
    senses: ["Warmth", "Breath pace"],
    fabric: "Soft double knit with a crossover zip and tonal feather jacquard", sizes: apparel,
    specs: {
      Pearl: { hex: "#e6e1da", worn: "both" },
      Mist: { hex: "#95acc4", worn: "both", back: true },
      Sage: { hex: "#87927f", worn: "both", back: true }
    }
  }),

  /* ---------- Footwear and accessories ---------- */
  product({
    slug: "quest-stride", gender: "unisex", name: "Quest Stride", ritual: "walk", category: "Shoes", price: 269000,
    tags: ["walk", "easy-on", "support", "sporty"],
    line: "Every step, considered.",
    senses: ["Foot pressure", "Gait rhythm", "Balance"],
    fabric: "Feather knit upper, easy grip strap, removable motion core", sizes: ["230", "240", "250", "260", "270", "280"],
    specs: {
      Ivory: { hex: "#e3ddd5", back: true },
      Black: { hex: "#3f3e40", back: true },
      Mist: { hex: "#8b99ab", back: true }
    }
  }),
  product({
    slug: "everyday-socks", gender: "unisex", name: "Everyday Socks", ritual: "walk", category: "Accessories", price: 49000,
    tags: ["walk", "everyday", "soft"],
    line: "Small pod, quiet comfort.",
    senses: ["Foot pressure", "Warmth"],
    fabric: "Cushioned rib knit, sole sensing zones", sizes: ["S", "M", "L"],
    specs: {
      White: { hex: "#efeeed" },
      Silver: { hex: "#c0b9b7" }
    }
  }),
  product({
    slug: "grip-gloves", gender: "unisex", name: "Grip Gloves", ritual: "flow", category: "Accessories", price: 79000,
    tags: ["strength", "sporty", "easy-on"],
    line: "Open fingers, a steady hold.",
    senses: ["Grip", "Hand motion"],
    fabric: "Fingerless knit with padded palms and a wrist cuff pod", sizes: ["S", "M", "L"],
    specs: {
      Slate: { hex: "#667996", worn: "none", context: "Hand in the Slate Grip Glove lifting a hex dumbbell" },
      Pearl: { hex: "#c4bbb8", worn: "none", context: "Hand in the Pearl Grip Glove closed around a dumbbell" },
      Black: { hex: "#2f2f2f", worn: "none", context: "Hand in the Black Grip Glove on a motorbike handlebar" }
    }
  }),
  product({
    slug: "everyday-gloves", gender: "unisex", name: "Everyday Gloves", ritual: "walk", category: "Accessories", price: 89000,
    tags: ["walk", "strength", "soft", "easy-on"],
    line: "Grip, gently measured.",
    senses: ["Grip", "Hand motion", "Warmth"],
    fabric: "Brushed knit, palm pads, wrist cuff pod", sizes: ["S", "M", "L"],
    specs: {
      Pearl: { hex: "#c0b8b5", worn: "none", context: "Hand in the Everyday Glove on a bicycle grip in the park" }
    }
  }),

  /* ---------- Headband and qPad ---------- */
  product({
    slug: "qband-sage-duo", gender: "unisex", name: "Sage Duo", ritual: "duet", category: "Duet", price: 369000,
    tags: ["device"],
    line: "Our everyday EEG headband, made to pair with qPad.",
    usage: "For yoga, tai chi, reading and calm minutes with qPad.",
    senses: ["Calm", "Focus", "Head motion"],
    fabric: "Woven sage band, two soft forehead pods, dry sensors and an adjustable strap", sizes: ["One size"],
    uses: [
      use("water-rhythm", "Water Rhythm", "A gentle pool session, guided from qPad on the deck.", "Woman in a pool wearing Sage Duo, following Water Rhythm on qPad at the edge"),
      use("seated-stretch", "Daily Movement", "Seated stretches, with qPad keeping the pace.", "Woman in a side stretch on a mat, wearing Sage Duo, with Daily Movement on qPad"),
      use("calm-reading", "Reading Rhythm", "A calm read, with your qBand following how settled you feel.", "Man reading The quiet garden on qPad while wearing Sage Duo"),
      use("tai-chi", "Tai chi", "Slow forms outdoors. The band stays put as you turn.", "Woman practising tai chi in a courtyard, wearing a headband"),
      use("word-quest", "Word Quest", "Picture word games that keep language and memory busy.", "Woman wearing Sage Duo, tapping a Word Quest card on qPad"),
      use("shared-rhythm", "Together", "Look back on the day's rhythm with someone you walk with.", "Couple on a bench, both wearing Sage Duo, looking at Today's Rhythm on qPad")
    ],
    specs: {
      Sage: {
        hex: "#9ba68f", worn: "none", back: true, context: "Man in a sage polo wearing Sage Duo and holding qPad",
        views: {
          front: ["Front", "Sage Duo from the front: two soft pods on a woven sage band"],
          side: ["Side", "Sage Duo from the side, with its adjustable strap"],
          liner: ["Forehead sensors", "The inside of the forehead pods, where the dry sensors sit"],
          contacts: ["Side contacts", "Close up of a woven side pod with four rounded contacts"],
          pod: ["Contact pod", "A four finger contact pod that reaches through hair"]
        }
      }
    }
  }),
  product({
    slug: "qband-everyday", gender: "unisex", name: "qBand Everyday", ritual: "duet", category: "Duet", price: 329000,
    tags: ["device"],
    line: "A soft woven band for focus and calm.",
    usage: "For cycling, strength work, music practice and the garden.",
    senses: ["Focus", "Calm", "Head motion"],
    fabric: "Woven textile band with inner sensor pods and a side pod, adjustable strap", sizes: ["One size"],
    uses: [
      use("cycling", "Indoor cycling", "Easy rides, with focus and calm noted after.", "Man on an exercise bike at home, wearing a blue headband"),
      use("strength-band", "Strength", "Band work at home, with qPad counting along.", "Man in a blue polo stretching a resistance band, wearing a blue headband, with qPad on a side table"),
      use("melody", "Music practice", "Learning a melody, one calm minute at a time.", "Woman playing a keyboard at home, wearing a headband, with qPad on the music stand"),
      use("herbs", "Gardening", "Time outdoors counts too.", "Man tending potted herbs on a terrace, wearing a headband")
    ],
    specs: {
      Oat: { hex: "#cfc3b2", worn: "none", views: { inside: ["Inside", "Inside the Oat band: soft sensor pods along the forehead"] } },
      Graphite: { hex: "#3b3a3c", worn: "none", views: { inside: ["Inside", "Inside the Graphite band: sensor pods and comb contacts"] } },
      Rose: { hex: "#cfa49c", worn: "none", views: { inside: ["Inside", "Inside the Rose band: sensor pods and comb contacts"] } },
      Blue: {
        hex: "#2f4a87", worn: "none", context: "Man in a cobalt polo wearing the Blue band and holding qPad",
        views: { inside: ["Inside", "Inside the Blue band: sensor pods and comb contacts"] }
      }
    }
  }),
  product({
    slug: "qband-arc", gender: "unisex", name: "qBand Arc", ritual: "duet", category: "Duet", price: 299000,
    tags: ["device"],
    line: "Smooth shell pads on a woven strap, for longer sessions.",
    usage: "For seated sessions, reading and breathing practice.",
    senses: ["Focus", "Calm", "Head motion", "How long you stay settled in a session"],
    fabric: "Soft touch shell with three forehead pads, comb contacts that reach through hair, and a woven strap that adjusts at the back", sizes: ["One size"],
    specs: {
      Pearl: { hex: "#e4ddd3", worn: "none", views: { inside: ["Inside", "Inside the Pearl Arc: forehead sensor pads and comb contacts along the strap"], combs: ["Comb contacts", "Close up of the Pearl Arc's comb contacts, which reach through hair, above the woven strap"] } },
      Sage: { hex: "#9ea291", worn: "none", views: { inside: ["Inside", "Inside the Sage Arc: forehead sensor pads and comb contacts along the strap"], combs: ["Comb contacts", "Close up of the Sage Arc's comb contacts, which reach through hair, above the woven strap"] } },
      Graphite: { hex: "#45454a", worn: "none", views: { inside: ["Inside", "Inside the Graphite Arc: forehead sensor pads and comb contacts along the strap"], combs: ["Comb contacts", "Close up of the Graphite Arc's comb contacts, which reach through hair, above the woven strap"] } }
    }
  }),
  product({
    slug: "qpad-one", gender: "unisex", name: "qPad One", ritual: "duet", category: "Duet", price: 459000,
    tags: ["device"],
    line: "Four keys. Every session.",
    usage: "For reading, word games, movement sessions and family calls.",
    senses: ["Guided sessions", "qBand sessions", "Family check ins"],
    fabric: "Four tactile keys, privacy shutter camera, stand and charging dock", sizes: ["Standard"],
    uses: [
      use("word-quest", "Word Quest", "Tap a picture, say the word. Language games that grow with you.", "Woman wearing Sage Duo, tapping a Word Quest card on qPad"),
      use("calm-reading", "Reading Rhythm", "Large, calm pages that turn at your pace.", "Man reading The quiet garden on qPad while wearing Sage Duo"),
      use("seated-stretch", "Daily Movement", "Yoga, Water Moves and Pilates, one key away.", "Woman in a side stretch on a mat, wearing Sage Duo, with Daily Movement on qPad"),
      use("core-ball", "Follow along", "A coach on screen, at a pace that suits you.", "Man doing a seated core exercise with a ball, following a coach on qPad"),
      use("shared-rhythm", "Together", "Look back on the day's rhythm with someone you walk with.", "Couple on a bench, both wearing Sage Duo, looking at Today's Rhythm on qPad"),
      use("melody", "Music practice", "Melody Quest shows the notes as you play.", "Woman playing a keyboard at home, wearing a headband, with qPad on the music stand")
    ],
    specs: {
      Ivory: {
        hex: "#efe7da", worn: "none", back: true, context: "Woman wearing Sage Duo, tapping a Word Quest card on qPad",
        views: {
          screen: ["Word Quest", "qPad One showing Word Quest, a picture word game"],
          keys: ["Four keys", "The four keys: Move, Calm, Rest and Your quest"]
        }
      },
      Graphite: { hex: "#4a4846", worn: "none", back: true }
    }
  }),
  product({
    slug: "qpad-grip", gender: "unisex", name: "qPad Grip", ritual: "duet", category: "Duet", price: 499000,
    tags: ["device"],
    line: "qPad in a soft grip frame, with a hand strap and four keys at your thumb.",
    usage: "For the garden, the kitchen or the sofa, held in one hand.",
    senses: ["Guided sessions", "qBand sessions", "Family calls"],
    fabric: "Soft grip frame, woven hand strap, fold out stand, four tactile keys on the side", sizes: ["Standard"],
    uses: [
      use("strength-band", "Strength", "Stand it on the table and follow along with a band.", "Man in a blue polo stretching a resistance band, with qPad Grip on a side table")
    ],
    specs: {
      Ivory: {
        hex: "#efe7da", worn: "none", back: true,
        views: {
          pair: ["Front and back", "qPad Grip from the front and the back, with its hand strap"],
          rail: ["Side keys", "The four keys along the side of qPad Grip, under your thumb"]
        }
      },
      Sage: { hex: "#a8b59c", worn: "none", back: true }
    }
  })
];

/** Pieces that moved or merged, so older links and saved bags still land somewhere. */
export const RENAMED: Record<string, string> = {
  "quest-hood-graphite": "quest-hood", "walk-set": "everyday-polo", "flow-set": "breather-top",
  // The headbands used to be called Brainwear; links to their old slugs still land on the right product
  "brainwear-sleep": "qband-everyday", "brainwear-duo": "qband-sage-duo", "everyday-brainwear": "qband-everyday", "brainwear-arc": "qband-arc"
};

/* ---------- Pictures for a card or a product page ---------- */

/** Which audience a piece is shown on by default: its own, or for unisex pieces the one given. */
export const audienceFor = (p: Product, prefer?: Audience): Audience =>
  p.gender === "unisex" ? prefer ?? (p.slug === "quest-hood" ? "men" : "women") : p.gender;

/** The worn photo for a colour, falling back to any audience that has one. */
export function lookFor(c: Colorway, who: Audience): Look | undefined {
  return c.looks[who] ?? c.looks.women ?? c.looks.men;
}

/** A card's two pictures: worn first where there is a worn photo, the piece alone on hover. */
export function cardShots(p: Product, c: Colorway, who: Audience): { main: Shot; alt?: Shot } {
  const look = lookFor(c, who);
  const still: Shot | undefined = c.still ? { src: c.still, alt: `${p.name} in ${c.name}` } : undefined;
  if (look) {
    const second = still ?? { src: look.full, alt: look.alt };
    return { main: look, alt: second };
  }
  const back: Shot | undefined = c.back ? { src: c.back, alt: `${p.name} in ${c.name}, from behind` } : undefined;
  return { main: still ?? { src: p.sketch, alt: p.name }, alt: c.context ?? c.views?.[0] ?? back };
}

/** A small square picture of a piece for search results and lists. */
export function thumbFor(p: Product): string {
  const c = p.colorways[0];
  return c.still ?? lookFor(c, audienceFor(p))?.src ?? p.sketch;
}

/** Every view of a colour for the product page gallery, in display order. */
export function gallery(p: Product, c: Colorway, who: Audience): (Shot & { label: string })[] {
  const look = lookFor(c, who);
  const views: (Shot & { label: string })[] = [];
  if (look) views.push({ src: look.full, alt: look.alt, label: "Worn" });
  if (c.still) views.push({ src: c.still, alt: `${p.name} in ${c.name}`, label: "Product" });
  if (c.back) views.push({ src: c.back, alt: `${p.name} in ${c.name}, from behind`, label: "Back" });
  if (c.views) views.push(...c.views);
  if (look && !c.still) views.push({ src: look.src, alt: look.alt, label: "Close up" });
  if (c.motion) views.push({ ...c.motion, label: "In motion" });
  if (c.context) views.push({ ...c.context, label: "In use" });
  return views;
}

/* ---------- Edits: the homepage's outdoor stories, each a hand picked set ---------- */

export type Edit = { id: string; label: string; image: string; alt: string; slugs: string[] };

export const edits: Edit[] = [
  {
    id: "run-longer", label: "Run longer", image: "/media/shop/edits/run-longer.webp",
    alt: "Man in his seventies walking briskly along a park path in the Pearl Movement Hood",
    slugs: ["everyday-polo", "walking-shorts", "quest-stride", "everyday-socks", "movement-hood"]
  },
  {
    id: "stand-stronger", label: "Stand stronger", image: "/media/shop/edits/stand-stronger.webp",
    alt: "Man practising tai chi in a garden, wearing the Pine Quest Hood",
    slugs: ["movement-tank", "movement-leggings", "breather-vest", "grip-gloves", "quest-hood"]
  },
  {
    id: "breathe-better", label: "Breathe better", image: "/media/shop/edits/breathe-better.webp",
    alt: "Woman reaching into a side stretch in a garden, wearing the Sage Movement Hood",
    slugs: ["breather-top", "breather-vest", "movement-hood", "qband-arc", "qband-everyday"]
  },
  {
    id: "signature-style", label: "Signature style", image: "/media/shop/edits/signature-style.webp",
    alt: "Woman with her bicycle by the river, wearing the Burgundy Quest Hood",
    slugs: ["quest-hood", "movement-hood", "quest-stride", "everyday-gloves"]
  }
];

/** Older ?ritual= links open the matching edit. */
export const EDIT_FOR_RITUAL: Record<string, string> = { walk: "run-longer", flow: "stand-stronger", rest: "signature-style" };

export type PlanId = "access" | "duet" | "enterprise";

export type Plan = {
  id: PlanId;
  eyebrow: string;
  name: string;
  line: string;
  /** Price shown large on the card; text so it can read "Custom" for enterprise. */
  price: string;
  unit?: string;
  /** The plan this one builds on, so each list only shows what it adds. */
  builds?: string;
  includes: string[];
  cta: { label: string; href: string };
  /** One quiet line under the button, optionally a link. */
  note?: { text: string; href?: string };
  ribbon?: string;
  tone?: "dark";
};

/**
 * Founding Member cohort. Fill these in only with confirmed details; anything left undefined is simply not shown,
 * so no capacity, date or benefit can appear on the site before it is real.
 */
export const FOUNDING_COHORT: { capacity?: number; eligibility?: string; benefits?: string[]; dates?: string } = {};

// Prices are placeholders until pricing is confirmed. The bundle price is DUET_PRICE in sensors.ts.
// Ordered left to right: the monthly plan, the founding member bundle, then enterprise.
export const plans: Plan[] = [
  {
    id: "access", eyebrow: "Monthly", name: "Quest View Access",
    line: "Your qPad, personalised. Programs, games and check ins shaped around how you move.",
    price: "₩24,000", unit: "/ month",
    includes: ["Personal Walk, Flow and Rest programs", "Large type apps made for qPad", "Weekly summary to share with family", "New sessions every month"],
    cta: { label: "Get Access", href: "/contact" }, note: { text: "Runs on qPad One" }
  },
  {
    id: "duet", eyebrow: "Duet bundle", name: "Founding member bundle",
    line: "Sage Duo and qPad One with your first year of Access, all bundled for our founding members.",
    price: "₩699,000", unit: "one time",
    builds: "Everything in Access for 12 months, and",
    includes: ["Sage Duo qBand", "qPad One tablet", "Set up at home with our team", "Free exchanges for 60 days"],
    cta: { label: "Become a founding member", href: "/duet" }, note: { text: "We plan to ship by April 2027" }, ribbon: "Best value"
  },
  {
    id: "enterprise", eyebrow: "For silver towns", name: "Monarch OS",
    line: "The operating system for whole communities. Run Quest View across every resident, room and team.",
    price: "Custom", unit: "pricing",
    builds: "Everything in Access, and",
    includes: ["Fleet management for every qPad", "Group programs and resident schedules", "Staff dashboard with family updates", "Data kept on your own site"],
    cta: { label: "Talk to us", href: "/contact" }, note: { text: "How a pilot works", href: "/care-partners" }, tone: "dark"
  }
];

export const won = (n: number) => `₩${n.toLocaleString("en-US")}`;

export const productBySlug = (slug: string) => products.find((p) => p.slug === (RENAMED[slug] ?? slug));
export const ritualById = (id: RitualId) => rituals.find((r) => r.id === id)!;
export const editById = (id: string) => edits.find((e) => e.id === id);
