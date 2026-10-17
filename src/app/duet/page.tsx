import type { Metadata } from "next";
import Link from "next/link";
import { products, won } from "../catalog";
import ProductCard from "../components/site/ProductCard";
import { Reveal } from "../components/site/HomeMotion";
import AddDuet from "./AddDuet";

export const metadata: Metadata = { title: "Duet | Persimmon Quest" };

const duet = products.filter((p) => p.slug === "everyday-brainwear" || p.slug === "qpad-one");
const bundle = duet.reduce((sum, p) => sum + p.price, 0) - 89000;

export default function DuetPage() {
  return (
    <main>
      <section className="q-shell q-pagehead" style={{ paddingBottom: 72 }}>
        <div className="q-duet-hero">
          <div style={{ display: "grid", gap: 24 }}>
            <span className="q-mono q-mono--bronze">04 · Duet</span>
            <h1 className="q-display-xl">Duet.</h1>
            <p className="q-lead">A soft headband and a four-key tablet. Sessions that feel like play.</p>
            <p className="q-pdp__price">Bundle {won(bundle)} <span className="q-hint" style={{ display: "inline" }}>save {won(89000)}</span></p>
            <p className="q-hint">Includes one year of Quest View Premium.</p>
            <div className="q-hero__actions">
              <AddDuet />
              <Link className="q-link" href="/quest-view">What Quest View feels like</Link>
            </div>
          </div>
          <div className="q-stage" style={{ "--field": "var(--c-celadon)", aspectRatio: "4 / 3.2" } as React.CSSProperties}>
            <img className="q-stage__cut q-float" src="/media/site/cut/qpad.webp" alt="qPad One tablet with five tactile keys" style={{ inset: "14% 4% auto 30%", width: "66%", height: "auto" }} />
            <img className="q-stage__cut" src="/media/site/cut/brainwear.webp" alt="Everyday Brainwear headband" style={{ inset: "auto auto 4% 2%", width: "46%", height: "auto", animationDelay: "-2s" }} />
          </div>
        </div>
      </section>

      <section className="q-shell" aria-label="Duet in use">
        <div className="q-split">
          <Reveal><img src="/media/site/life/brainwear.webp" alt="Man smiling while using the tablet and headband at home" style={{ borderRadius: 20, width: "100%", aspectRatio: "4/5", objectFit: "cover" }} loading="lazy" /></Reveal>
          <Reveal delay={0.08}><img src="/media/site/life/qpad.webp" alt="Woman pressing a tactile key on the tablet" style={{ borderRadius: 20, width: "100%", aspectRatio: "4/5", objectFit: "cover" }} loading="lazy" /></Reveal>
        </div>
      </section>

      <section className="q-shell q-section" aria-labelledby="duet-why">
        <h2 id="duet-why" className="q-display" style={{ marginBottom: 56 }}>Made for <em>hands</em>,<br />not menus.</h2>
        <div className="q-plans">
          {[
            ["01", "Five keys", "Big tactile buttons. No tiny icons."],
            ["02", "Soft band", "Woven textile, washable cover."],
            ["03", "Family in the loop", "A weekly summary, only if you choose."]
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
