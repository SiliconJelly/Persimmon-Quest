import { productBySlug } from "../../catalog";
import QPad, { LocalAIFace, RestFace } from "./QPad";
import SensorMap from "./SensorMap";

// Our research case studies. Shared by the homepage carousel (short line) and the /research page (full story).
// Visuals are real footage, an archival lab photo, and our own coded qPad screens and sketches.

export type CaseStudy = {
  id: string;
  eyebrow: string;
  status: string;
  title: string;
  line: string;
  question: string;
  exploring: string;
  meaning: string;
  cta: string;
  /** Full-bleed photo for the carousel; otherwise the visual is staged on the dark field. */
  photo?: { src: string; alt: string };
  visual?: "lab" | "touch" | "home" | "sleep" | "footwear" | "day";
};

export const CASES: CaseStudy[] = [
  {
    id: "lab-to-home", eyebrow: "Why we research", status: "Where we started",
    title: "From the lab to the living room.",
    line: "Reading the brain once meant a lab, a cap full of wires and an expert at your side. We are making it soft enough to wear at home, together with the people who will wear it.",
    question: "Can brain sensing feel as ordinary as putting on a headband?",
    exploring: "We design every piece with older adults in the room: how it feels to put on, how long it can be worn, and what makes the results easy to understand.",
    meaning: "Wellness tools that fit your life, instead of asking you to fit theirs.",
    cta: "Explore our research",
    photo: { src: "/media/case-study/before.avif", alt: "Black and white photo of a person in a brain sensing cap facing an old monitor in a lab" },
    visual: "lab"
  },
  {
    id: "touch-free", eyebrow: "Case study · Touch free", status: "Research direction",
    title: "Help without lifting a hand.",
    line: "Some people we design for can't easily press a button or hold a phone. We are teaching qPad to notice a quiet moment of focus through the headband, so a reply or a call stays within reach.",
    question: "How can someone use qPad if their hands, voice or sight are limited?",
    exploring: "Simple choices on screen that can be picked with a moment of focus, a voice, a key or a touch. Whatever works best for that person, on that day.",
    meaning: "Staying in touch with family and in charge of your own day, whatever your mobility.",
    cta: "Read the case study", visual: "touch"
  },
  {
    id: "at-home", eyebrow: "Case study · Learning at home", status: "Being built",
    title: "It learns you, at home.",
    line: "Instead of sending your day to faraway computers, qPad is being built to think things through right on the table beside you. Your habits stay in your home.",
    question: "Can a tablet learn your rhythm without your life leaving the house?",
    exploring: "Running the thinking part of Quest View on qPad itself, so suggestions arrive even when the internet is slow, and nothing personal has to travel.",
    meaning: "Privacy you don't have to think about, and help that doesn't wait for a signal.",
    cta: "Read the case study", visual: "home"
  },
  {
    id: "sleep", eyebrow: "Case study · Sleep", status: "Exploring now",
    title: "Sleep, understood gently.",
    line: "A soft knit band, worn to bed, can read a night's rest. We are learning how to turn it into one kind sentence by morning, instead of a chart.",
    question: "What is the most useful thing to hear about last night?",
    exploring: "How Brainwear Sleep can notice deep rest and waking without disturbing you, and how to say it simply.",
    meaning: "Waking up knowing how you slept, without reading a single graph.",
    cta: "Read the case study", visual: "sleep"
  },
  {
    id: "footwear", eyebrow: "Case study · Footwear", status: "Being built",
    title: "Every step, measured gently.",
    line: "Our footwear research follows how weight moves through each step, so small changes in balance can be noticed early and met with the right exercises.",
    question: "Can shoes notice a change in balance before you do?",
    exploring: "Pressure and motion sensing in the sole, paired with walks on qPad that adapt to how steady you feel.",
    meaning: "More confidence on every walk, with gentle support when it helps.",
    cta: "Read the case study", visual: "footwear"
  },
  {
    id: "brain-every-day", eyebrow: "The bigger picture", status: "Open to join",
    title: "Brain activity, part of every day.",
    line: "One soft headband, clothes that sense and a qPad that listens. Together they show how walking, breathing and sleep shape your brain over the years, and you can be part of it from day one.",
    question: "How do everyday habits shape a healthy brain over a lifetime?",
    exploring: "Gentle brain sensing, with nothing placed under the skin, across walks, breathing, calm and sleep. Gathered only with your permission into a long view of healthy ageing.",
    meaning: "Your daily routine becomes part of something bigger, and you see what it does for you along the way.",
    cta: "Join from day one", visual: "day"
  }
];

const DAY = [
  { time: "Morning", label: "Walk", note: "Steady stride", sketch: "shoe" },
  { time: "Midday", label: "Flow", note: "Easy style", sketch: "hood-graphite" },
  { time: "Afternoon", label: "Calm", note: "Settled mind", sketch: "brainwear" },
  { time: "Night", label: "Sleep", note: "Deep rest", sketch: "top" }
];

/** One day, one headband: a single brain signal running through walks, breathing, calm and sleep. */
export function BrainDay() {
  // Busier waves while moving, smoother when calm, slow and deep at night.
  const wave = "M0 60 C10 30 20 90 30 60 S50 30 60 60 S80 90 90 60 S110 40 120 60 S140 70 150 60 S170 50 180 60 S200 66 210 60 S240 40 270 60 S320 90 360 60 S420 30 480 60";
  return (
    <div className="q-day" role="img" aria-label="A single brain signal across a day: busy during the morning walk, easy during Flow, settled during calm, slow and deep during sleep.">
      <svg className="q-day__wave" viewBox="0 0 480 120" preserveAspectRatio="none" aria-hidden="true">
        <path d={wave} />
      </svg>
      <ol className="q-day__stops">
        {DAY.map((d) => (
          <li key={d.label}>
            <span className="q-day__tile"><img src={`/media/site/sketch/${d.sketch}.webp`} alt="" /></span>
            <b>{d.label}</b>
            <small>{d.time} · {d.note}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

const stride = productBySlug("quest-stride")!;

/** The visual for a case study, used on the dark carousel stage and on the research page. */
export function CaseVisual({ kind }: { kind: NonNullable<CaseStudy["visual"]> }) {
  if (kind === "lab") {
    return (
      <figure className="q-casephoto">
        <img src="/media/case-study/before.avif" alt="Black and white photo of a person in a brain sensing cap facing an old monitor in a lab" />
        <figcaption>Brain research, the old way: one room, many wires.</figcaption>
      </figure>
    );
  }
  if (kind === "touch") {
    return (
      <div className="q-casevid">
        <video src="/media/case-study/8e04c71fd9e9ca3efeab1f4cb1d0a9c5648f8165.webm" muted loop playsInline preload="metadata" aria-label="A wheelchair user replying to family messages without using her hands" />
      </div>
    );
  }
  if (kind === "home") {
    return <QPad active="quest" className="q-case-pad" label="qPad working out today's plan on the device: a shorter walk today, then six minutes of calm."><LocalAIFace ready /></QPad>;
  }
  if (kind === "sleep") {
    return <QPad active="rest" className="q-case-pad" label="qPad morning note: slept well, woke once, 7 hours 20 minutes asleep."><RestFace /></QPad>;
  }
  if (kind === "footwear") {
    return (
      <div className="q-case-shoe">
        <SensorMap product={stride} addons={{ insole: "pressure" }} />
      </div>
    );
  }
  return <BrainDay />;
}
