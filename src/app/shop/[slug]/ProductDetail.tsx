"use client";

import { AlertCircle, Check, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Product, ritualById, won } from "../../catalog";
import { useBag } from "../../components/site/BagContext";
import SensorMap from "../../components/site/SensorMap";
import { capacity, isWear } from "../../sensors";

export default function ProductDetail({ product }: { product: Product }) {
  const ritual = ritualById(product.ritual);
  const { add } = useBag();
  const hasPhoto = product.onBody !== product.cut;
  const [view, setView] = useState<"cut" | "body">(hasPhoto ? "body" : "cut");
  const [shade, setShade] = useState(0);
  const colour = product.colorways[shade];

  // ?colour=graphite from a product tile opens that colour.
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("colour");
    const i = want ? product.colorways.findIndex((c) => c.name.toLowerCase() === want) : -1;
    if (i > 0) { setShade(i); setView("cut"); }
  }, [product]);

  const pickShade = (i: number) => { setShade(i); setView(i === 0 && hasPhoto ? "body" : "cut"); };
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

  const style = {
    "--px": `${product.pod[0] * 100}%`,
    "--py": `${product.pod[1] * 100}%`,
    "--field": ritual.dark ? "var(--c-stone)" : ritual.field
  } as React.CSSProperties;

  return (
    <div className="q-pdp__grid">
      <div>
        <div className={`q-card q-card--pdp ${view === "cut" ? "is-cut" : ""}`} style={style}>
          <div className="q-pdp__stage">
            {hasPhoto && <img className="q-card__life" src={product.onBody} alt={view === "body" ? product.onBodyAlt : ""} aria-hidden={view !== "body"} width={960} height={1200} />}
            <img className="q-card__cut" src={colour.cut} alt={`${product.name} in ${colour.name}`} aria-hidden={view !== "cut"} width={1000} height={1250} />
          </div>
        </div>
        {hasPhoto && (
          <div className="q-pdp__thumbs" role="group" aria-label="Choose view" style={style}>
            <button type="button" className="q-pdp__thumb" aria-pressed={view === "body"} onClick={() => setView("body")} aria-label="Worn">
              <img src={product.onBody} alt="" />
            </button>
            <button type="button" className="q-pdp__thumb" aria-pressed={view === "cut"} onClick={() => setView("cut")} aria-label="Product only">
              <img className="is-cut" src={colour.cut} alt="" />
            </button>
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

        <button type="button" className="q-btn q-btn--primary" style={{ width: "100%" }} onClick={onAdd}>Add to bag</button>
        <p className="q-hint">Pairs with the {ritual.plan} in <Link className="q-link" href="/pricing#premium">Quest View Premium</Link></p>

        {isWear(product.slug) && (() => {
          const cap = capacity(product.slug);
          return (
            <div className="q-pdp__sensors">
              <SensorMap product={product} size="sm" />
              <div>
                <p className="q-line__name">Where the sensors go</p>
                <p className="q-hint">{cap.fitted ? `${cap.fitted} fitted as standard` : "Sensor free by default"} · room for {cap.free} more</p>
                <p className="q-hint">Add more sensors from your bag after adding.</p>
              </div>
            </div>
          );
        })()}

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
      </div>

      {toast && (
        <div className="q-toast" role="status">
          <Check size={18} aria-hidden="true" /> Added to bag · {product.name}, {size} · <Link href="/bag" style={{ color: "inherit" }}>View bag</Link>
        </div>
      )}
    </div>
  );
}
