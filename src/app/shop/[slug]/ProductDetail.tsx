"use client";

import { AlertCircle, Check, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Audience, type Product, audienceFor, gallery, ritualById, won } from "../../catalog";
import { useBag } from "../../components/site/BagContext";
import SensorMap from "../../components/site/SensorMap";
import StrideDetails from "./StrideDetails";
import { DeviceDetails } from "./DeviceStory";
import { capacity, isWear, moduleById, slotMaps } from "../../sensors";

export default function ProductDetail({ product }: { product: Product }) {
  const ritual = ritualById(product.ritual);
  const { add } = useBag();
  // Our first main product carries the full story of its sensors and research
  const stride = product.slug === "quest-stride";
  const unisex = product.gender === "unisex" && product.colorways.some((c) => c.looks.women && c.looks.men);
  const [who, setWho] = useState<Audience>(audienceFor(product));
  const [shade, setShade] = useState(0);
  const [view, setView] = useState(0);
  const colour = product.colorways[shade];
  const views = gallery(product, colour, who);
  const shown = views[Math.min(view, views.length - 1)];

  // ?colour=sage and ?on=men from a product tile open that colour, worn by that person.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const want = q.get("colour");
    const i = want ? product.colorways.findIndex((c) => c.name.toLowerCase() === want) : -1;
    if (i > 0) setShade(i);
    const on = q.get("on");
    if (unisex && (on === "women" || on === "men")) setWho(on);
  }, [product, unisex]);

  const pickShade = (i: number) => { setShade(i); setView(0); };
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const onAdd = () => {
    if (!size) { setError(true); document.getElementById("size-group")?.querySelector("input")?.focus(); return; }
    add({ kind: "item", slug: product.slug, size, color: product.colorways.length > 1 ? colour.name : undefined });
    setToast(true);
  };

  return (
    <div className="q-pdp__grid">
      <div className="q-pdp__gallery">
        <div className="q-pdp__stage">
          <img key={shown.src} src={shown.src} alt={shown.alt} width={1200} height={1500} />
        </div>
        {views.length > 1 && (
          <div className="q-pdp__thumbs" role="group" aria-label="Choose a view">
            {views.map((v, i) => (
              <button key={v.src} type="button" className="q-pdp__thumb" aria-pressed={v.src === shown.src} onClick={() => setView(i)} aria-label={v.label}>
                <img src={v.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="q-pdp__info">
        <h1 className="q-display" style={{ fontSize: "clamp(48px, 5vw, 80px)" }}>{product.name}</h1>
        <p className="q-lead">{product.line}</p>
        <p className="q-pdp__price">{won(product.price)}</p>

        {product.colorways.length > 1 && (
          <fieldset className="q-pdp__colours">
            <legend><span style={{ fontWeight: 600 }}>Colour</span> <span className="q-hint">{colour.name}</span></legend>
            <div className="q-shades">
              {product.colorways.map((c, i) => (
                <label key={c.name} className="q-shade q-shade--lg" style={{ "--swatch": c.hex } as React.CSSProperties} title={c.name}>
                  <input type="radio" name="colour" className="q-sr" checked={shade === i} onChange={() => pickShade(i)} />
                  <span className="q-sr">{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {unisex && (
          <div className="q-pdp__on">
            <span style={{ fontWeight: 600 }}>Shown on</span>
            <div className="q-tabs" role="group" aria-label="Show this piece worn by">
              {(["women", "men"] as const).map((a) => (
                <button key={a} type="button" aria-pressed={who === a} onClick={() => { setWho(a); setView(0); }}>{a === "women" ? "Women" : "Men"}</button>
              ))}
            </div>
          </div>
        )}

        <fieldset className="q-sizes" id="size-group" aria-describedby={error ? "size-error" : "size-hint"}>
          <legend><span style={{ fontWeight: 600 }}>Size</span><span className="q-hint">Size guide below</span></legend>
          {product.sizes.map((s) => (
            <label key={s} className="q-size">
              <input type="radio" name="size" value={s} checked={size === s} onChange={() => { setSize(s); setError(false); }} />
              <span>{s}</span>
            </label>
          ))}
        </fieldset>
        {error
          ? <p id="size-error" className="q-error" role="alert"><AlertCircle size={18} aria-hidden="true" />Choose a size to continue.</p>
          : <p id="size-hint" className="q-hint">Free exchanges for 60 days.</p>}

        <button type="button" className="q-btn q-btn--primary" style={{ width: "100%" }} onClick={onAdd}>Pre-order</button>
        {product.ritual !== "rest" && <p className="q-hint">Pairs with the {ritual.plan} in <Link className="q-link" href="/pricing#premium">Quest View Premium</Link></p>}

        {isWear(product.slug) && !stride && (() => {
          const cap = capacity(product.slug);
          return (
            <div className="q-pdp__sensors">
              <SensorMap product={product} size="sm" labels={false} numbered />
              <div>
                <p className="q-line__name">Where the sensors go</p>
                <ol className="q-pdp__slots">
                  {(slotMaps[product.slug] ?? []).map((s, i) => (
                    <li key={s.id} className={s.fitted ? "is-fitted" : "is-open"}>
                      <span className="q-pdp__slotnum" aria-hidden="true">{i + 1}</span>
                      <span><b>{s.fitted ? moduleById(s.fitted).name : "Free slot"}</b> <small>{s.label}{s.fitted ? ", included" : ""}</small></span>
                    </li>
                  ))}
                </ol>
                <p className="q-hint">{cap.free ? `Add up to ${cap.free} more from your bag.` : "Every slot comes fitted."}</p>
              </div>
            </div>
          );
        })()}

        {stride ? <StrideDetails free={capacity(product.slug).free} fabric={product.fabric} /> : product.category === "Duet" ? <DeviceDetails product={product} /> : (
          <div className="q-acc">
            <details open>
              <summary>What it notices <Plus size={20} aria-hidden="true" /></summary>
              <div className="q-acc__body">
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                  {product.senses.map((s) => (
                    <li key={s} style={{ display: "flex", gap: 10, alignItems: "center" }}><Check size={18} color="var(--c-jade)" aria-hidden="true" />{s}</li>
                  ))}
                </ul>
              </div>
            </details>
            <details>
              <summary>Fabric and care <Plus size={20} aria-hidden="true" /></summary>
              <div className="q-acc__body"><p style={{ margin: 0 }}>{product.fabric}. Pod clicks out before washing.</p></div>
            </details>
            <details>
              <summary>Size guide <Plus size={20} aria-hidden="true" /></summary>
              <div className="q-acc__body"><p style={{ margin: 0 }}>Relaxed fit. Between sizes, choose the larger one for easier dressing.</p></div>
            </details>
          </div>
        )}
      </div>

      {toast && (
        <div className="q-toast" role="status">
          <Check size={18} aria-hidden="true" /> Pre-order added · {product.name}, {size} · <Link href="/bag" style={{ color: "inherit" }}>View bag</Link>
        </div>
      )}
    </div>
  );
}
