import { ArrowRight, Eye, Users, Wind } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { products, won } from "../catalog";
import { DUET_PRICE } from "../sensors";
import ProductCard from "../components/site/ProductCard";
import AutoVideo from "../components/site/AutoVideo";
import { Reveal } from "../components/site/HomeMotion";
import AddDuet from "./AddDuet";
import DayStrip from "./DayStrip";
import DuoStage from "./DuoStage";

export const metadata: Metadata = {
  title: "Duet bundle | Persimmon Quest",
  description: "Sage Duo and qPad One, the qBand and tablet made to work as one, with 12 months of Quest View Access for founding members."
};

// Duet is the bundle, not a product: Sage Duo, the headband, and qPad One, the tablet, made to work as one.
// The bundle costs what the bag charges; the saving is what it takes off buying the two apart.
const duet = products.filter((p) => p.slug === "qband-sage-duo" || p.slug === "qpad-one");
const saving = duet.reduce((sum, p) => sum + p.price, 0) - DUET_PRICE;

// What the two do for you, in three words each
const WINS = [
  { icon: Eye, label: "See your focus" },
  { icon: Wind, label: "Find your calm" },
  { icon: Users, label: "Share the day" }
];


export default function DuetPage() {
  return (
    <main>
      {/* The landing: one big promise on the left, and on the right the two devices proving it. A light leaves the
          sensors inside Sage Duo and wakes qPad One's screen, which is the whole idea in one look. */}
      <section className="q-duo" aria-labelledby="duo-title">
        <div className="q-shell q-duo__grid">
          <div className="q-duo__head">
            <span className="q-mono q-mono--bronze">The Duet bundle</span>
            <h1 id="duo-title" className="q-display-xl">Brain sensing<br /><em>comes home</em></h1>
          </div>
          <DuoStage />
          <div className="q-duo__body">
            <p className="q-lead">Sage Duo listens for focus and calm at your forehead. qPad One answers with sessions you start with one key.</p>
            <ul className="q-duo__wins">
              {WINS.map(({ icon: Icon, label }) => <li key={label}><Icon size={20} aria-hidden="true" />{label}</li>)}
            </ul>
            <div className="q-duo__price">
              <p className="q-tabular"><b>{won(DUET_PRICE)}</b> one time <span className="q-duo__save">Save {won(saving)}</span></p>
              <p className="q-hint">Sage Duo, qPad One and 12 months of Quest View Access</p>
            </div>
            <div className="q-duo__actions">
              <AddDuet />
              <Link className="q-link q-duo__more" href="/quest-view">Explore Quest View <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Sage Duo film (scripts/studio/film.py, graded there, so no filter here): the camera circles from her face
          round to the back of her head and back again, so the whole band is seen. Wide on larger screens, square on
          phones so her head stays large. */}
      <section className="q-shell q-duetfilm" aria-labelledby="duetfilm-title">
        <Reveal className="q-duetfilm__frame">
          <AutoVideo className="q-duetfilm__video" src="/media/film/sage-duo-orbit.mp4" phone="/media/film/sage-duo-orbit-phone.mp4" phoneMedia="(max-width: 639px)" poster="/media/film/sage-duo-orbit.webp" label="A woman wearing Sage Duo, eyes closed, as the camera circles slowly from her face round to the back of her head and back" toggleClassName="q-media-toggle q-duetfilm__toggle" />
          <span className="q-grain" aria-hidden="true" />
        </Reveal>
        <h2 id="duetfilm-title" className="q-duetfilm__line">Put on Sage Duo<br /><em>qPad One takes it from there</em></h2>
      </section>

      {/* Every kind of day: one band through a whole day of different people and activities, the brain's signals
          and the body's movement landing together in Quest View */}
      <section className="q-roll-section" aria-labelledby="day-title">
        <div className="q-shell q-roll__head">
          <h2 id="day-title" className="q-display">One band<br /><em>for every kind of day</em></h2>
          <p className="q-lead">Brisk or slow, with friends or on your own. Sage Duo hears focus and calm, your clothes and shoes add how you move, and Quest View turns the whole day into your next quest.</p>
        </div>
        <DayStrip />
      </section>

      <section className="q-shell q-section" aria-labelledby="duet-why">
        <h2 id="duet-why" className="q-display" style={{ marginBottom: 56 }}>One listens<br /><em>one answers</em></h2>
        <div className="q-plans">
          {[
            ["01", "Sage Duo listens", "Dry sensors in two soft forehead pods read focus and calm. No gel, nothing to fit."],
            ["02", "qPad One answers", "Four big keys start a session that feels like play. No tiny icons, no menus."],
            ["03", "Paired once", "They find each other the first time. After that, one key starts every session."]
          ].map(([n, t, d]) => (
            <div key={n} className="q-feature">
              <span className="q-mono q-mono--bronze">{n}</span>
              <h3 className="q-h3">{t}</h3>
              <p className="q-body">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="q-section" style={{ background: "var(--c-stone)" }} aria-labelledby="duet-shop">
        <div className="q-shell">
          <h2 id="duet-shop" className="q-h2" style={{ marginBottom: 40 }}>Or buy them separately</h2>
          <div className="q-grid">{duet.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </section>
    </main>
  );
}
