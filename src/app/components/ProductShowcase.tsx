"use client";

import { ArrowUpRight, Check, CircleDot, MoveRight, Wind } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { products } from "../data";
import Reveal from "./Reveal";

const bandViews = [
  { label: "Catalyst", feature: "Waterproof", src: "/media/5afad371-aea0-4d9a-9b78-9d9ed1e256b4.png", alt: "qBand Air in ivory with a smooth sculpted finish" },
  { label: "Checkered", feature: "Versatile", src: "/media/eba98a24-0e1b-4ef2-9fd6-6c469a75357f.png", alt: "qBand Air in ivory with a checkered textile finish" },
  { label: "Cushion", feature: "Breathable", src: "/media/exec-44424b2a-9e10-4d5c-b951-cf42ab484f44.png", alt: "qBand Air in ivory with a soft cushioned band" }
];
const padViews = [
  { label: "Magnificent", feature: "Intuitive", src: "/media/8fa8621f-3f14-4152-a110-af6e79388582.png", alt: "Ivory qPad One tablet with five large tactile buttons" },
  { label: "Muscle", feature: "Supportive", src: "/media/5e3dc914-6ba6-4247-8c10-f89525dff27c.png", alt: "Ivory qPad One tablet with soft protective handles and simple controls" }
];

export default function ProductShowcase() {
  const [band, setBand] = useState(0);
  const [pad, setPad] = useState(0);
  return (
    <section id="showcase" className="pq-shell pq-showcase" aria-labelledby="showcase-title">
      <Reveal>
        <div className="pq-section-heading">
          <div><p className="pq-eyebrow">The ecosystem / 01</p><h2 id="showcase-title">Two devices<br />One shared rhythm</h2></div>
          <p>Designed for everyday connection</p>
        </div>
      </Reveal>
      <div className="pq-device-grid">
        <article className="pq-device pq-device--band">
          <div className="pq-device-heading"><span className="pq-eyebrow">01 / Sense</span><span className="pq-model-symbol" role="img" aria-label="Air model"><Wind size={22} strokeWidth={1.5} aria-hidden="true" /></span></div>
          <h3>{products[0].name}</h3>
          <p className="pq-device-description">A gentle fit, a closer connection</p>
          <div className="pq-band-stage">
            {bandViews.map((view, index) => <img key={view.src} src={view.src} width="1536" height="1024" loading="lazy" alt={index === band ? view.alt : ""} aria-hidden={index !== band} className={index === band ? "is-active" : ""} />)}
          </div>
          <div className="pq-device-caption" aria-live="polite" aria-atomic="true"><span>{bandViews[band].label} / ivory</span><span>{bandViews[band].feature}</span></div>
          <div className="pq-variants" role="group" aria-label="qBand Air styles">
            {bandViews.map((view, index) => <button type="button" key={view.label} className={index === band ? "is-selected" : ""} aria-pressed={index === band} onClick={() => setBand(index)}><img src={view.src} width="72" height="48" loading="lazy" alt="" /><span>{view.label}</span><Check className="pq-variant-check" size={13} aria-hidden="true" /></button>)}
          </div>
          <p className="pq-device-copy">A lightweight headband for brain signals in everyday life</p>
          <details className="pq-product-details"><summary>Explore qBand Air <span aria-hidden="true">+</span></summary><div>{products[0].more.map(text => <p key={text}>{text}</p>)}</div></details>
        </article>
        <article className="pq-device pq-device--pad">
          <div className="pq-device-heading"><span className="pq-eyebrow">02 / Engage</span><span className="pq-model-symbol" role="img" aria-label="One model"><CircleDot size={22} strokeWidth={1.5} aria-hidden="true" /></span></div>
          <h3>{products[1].name}</h3>
          <p className="pq-device-description">A familiar place to play and connect</p>
          <div className="pq-pad-stage">
            {padViews.map((view, index) => <img key={view.src} src={view.src} width="1536" height="1024" loading="lazy" alt={index === pad ? view.alt : ""} aria-hidden={index !== pad} className={index === pad ? "is-active" : ""} />)}
          </div>
          <div className="pq-device-caption" aria-live="polite" aria-atomic="true"><span>{padViews[pad].label} / ivory</span><span>{padViews[pad].feature}</span></div>
          <div className="pq-variants" role="group" aria-label="qPad One styles">{padViews.map((view,index) => <button type="button" key={view.label} aria-pressed={index === pad} onClick={() => setPad(index)} className={index === pad ? "is-selected" : ""}><img src={view.src} width="72" height="48" loading="lazy" alt="" /><span>{view.label}</span><Check className="pq-variant-check" size={13} aria-hidden="true" /></button>)}</div>
          <p className="pq-device-copy">A tactile tablet for guided play and everyday connection</p>
          <details className="pq-product-details"><summary>Explore qPad One <span aria-hidden="true">+</span></summary><div>{products[1].more.map(text => <p key={text}>{text}</p>)}</div></details>
        </article>
      </div>
      <div className="pq-connection-strip">
          <div className="pq-connection-flow" aria-label="Sense, play, connect">
            <span>Sense</span><MoveRight size={16} /><span>Play</span><MoveRight size={16} /><span>Connect</span>
          </div>
          <Link href="/for-clinicians" className="pq-text-link">Explore care & research <ArrowUpRight size={17} /></Link>
      </div>
      <p className="pq-showcase-foot">Product concepts for guided engagement and consent-based research</p>
    </section>
  );
}
