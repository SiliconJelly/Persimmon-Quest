"use client";

import { Building2, ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { productBySlug, won } from "../catalog";
import { useBag } from "../components/site/BagContext";
import { InsightList, PotentialRing } from "../components/site/Potential";
import SensorMap, { moduleIcons } from "../components/site/SensorMap";
import SlotEditor from "../components/site/SlotEditor";
import {
  type BagLine, DUET_PRICE, PREMIUM_MONTHLY, capacity, devices, isWear, linePrice, moduleById, setupFromLines, sketchFor, slotMaps
} from "../sensors";

export default function BagView() {
  const { lines, subtotal, remove, setQty, setAddons, add, ready } = useBag();
  const [open, setOpen] = useState<string>();
  const setup = setupFromLines(lines);
  const monthly = setup.premium && !lines.some((l) => l.kind === "duet");

  if (!ready) return <div className="q-bag" aria-busy="true" />;

  if (!lines.length) {
    return (
      <div className="q-bag-empty">
        <p className="q-lead">Your bag is empty.</p>
        <div className="q-hero__actions">
          <Link className="q-btn q-btn--primary" href="/duet">Start with Duet</Link>
          <Link className="q-link" href="/shop">Shop smart wear</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="q-bag">
      <ul className="q-bag__lines">
        {lines.map((l) => (
          <li key={l.id} className="q-line">
            <LineMedia line={l} />
            <div className="q-line__info">
              <LineText line={l} />
              {l.kind === "item" && isWear(l.slug) && (
                <>
                  <button type="button" className="q-line__toggle" aria-expanded={open === l.id} onClick={() => setOpen(open === l.id ? undefined : l.id)}>
                    Customise sensors <ChevronDown size={18} aria-hidden="true" />
                  </button>
                  {open === l.id && (
                    <div className="q-line__editor">
                      <SlotEditor
                        product={productBySlug(l.slug)!}
                        addons={l.addons}
                        onChange={(slotId, m) => {
                          const next = { ...l.addons };
                          if (m) next[slotId] = m; else delete next[slotId];
                          setAddons(l.id, next);
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              <div className="q-line__foot">
                {l.kind !== "premium" ? (
                  <div className="q-qty" role="group" aria-label="Quantity">
                    <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label="One fewer"><Minus size={16} aria-hidden="true" /></button>
                    <span className="q-tabular" aria-live="polite">{l.qty}</span>
                    <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="One more"><Plus size={16} aria-hidden="true" /></button>
                  </div>
                ) : <span />}
                <span className="q-line__price q-tabular">{l.kind === "premium" ? `${won(PREMIUM_MONTHLY)}/mo` : won(linePrice(l))}</span>
                <button type="button" className="q-iconbtn" onClick={() => remove(l.id)} aria-label="Remove from bag"><Trash2 size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="q-bag__side" aria-label="Order summary">
        <div className="q-bag__card">
          <PotentialRing setup={setup} />
          <p className="q-hint" style={{ margin: "12px 0 4px" }}>What your bag can see, and what one more sensor would add.</p>
          <InsightList
            setup={setup}
            onHub={() => add({ kind: "item", slug: "qpad-one", size: "Standard" })}
            onFix={({ slug, slotId, module }) => {
              const line = lines.find((l): l is Extract<BagLine, { kind: "item" }> => l.kind === "item" && l.slug === slug);
              if (line) setAddons(line.id, { ...line.addons, [slotId]: module });
            }}
          />
          {!setup.premium && (
            <button type="button" className="q-insight__fix" style={{ marginTop: 8 }} onClick={() => add({ kind: "premium" })}>
              <Plus size={15} aria-hidden="true" /> Quest View Access · {won(PREMIUM_MONTHLY)}/mo
            </button>
          )}
        </div>

        <div className="q-bag__card">
          <dl className="q-bag__sums">
            <div><dt>Subtotal</dt><dd className="q-tabular">{won(subtotal)}</dd></div>
            {monthly && <div><dt>Quest View Access</dt><dd className="q-tabular">{won(PREMIUM_MONTHLY)}/mo</dd></div>}
            <div><dt>Delivery and home set up</dt><dd>Included</dd></div>
          </dl>
          <Link className="q-btn q-btn--primary" style={{ width: "100%" }} href="/contact">Reserve your order</Link>
          <p className="q-hint">Checkout opens at launch. Reserve now and our team confirms sizes and sensors with you before anything is charged.</p>
        </div>

        <div className="q-monarch">
          <Building2 size={22} aria-hidden="true" />
          <div>
            <p className="q-monarch__title">Monarch OS for communities</p>
            <p>Whole silver towns start with a conversation and a pilot, so Monarch is never added to the bag.</p>
            <Link className="q-link" href="/contact">Talk to sales or the pilot team</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function LineMedia({ line }: { line: BagLine }) {
  if (line.kind === "duet" || line.kind === "premium") {
    const b = productBySlug("qband-sage-duo")!, q = productBySlug("qpad-one")!;
    return (
      <div className="q-line__media q-line__media--pair">
        {line.kind === "duet" && <img src={sketchFor(b)} alt="" />}
        <img src={sketchFor(q)} alt="" />
      </div>
    );
  }
  const p = productBySlug(line.slug)!;
  return (
    <div className="q-line__media">
      {isWear(p.slug) ? <SensorMap product={p} addons={line.addons} labels={false} size="sm" /> : <img src={sketchFor(p)} alt="" />}
    </div>
  );
}

function LineText({ line }: { line: BagLine }) {
  if (line.kind === "duet") {
    return (
      <>
        <p className="q-line__name">Duet bundle</p>
        <p className="q-hint">Sage Duo, qPad One and 12 months of Quest View · {won(DUET_PRICE)} each</p>
      </>
    );
  }
  if (line.kind === "premium") {
    return (
      <>
        <p className="q-line__name">Quest View Access</p>
        <p className="q-hint">Programs, calm sessions and a weekly family summary on qPad</p>
      </>
    );
  }
  const p = productBySlug(line.slug)!;
  if (!isWear(p.slug)) {
    return (
      <>
        <p className="q-line__name">{p.name}</p>
        <p className="q-hint">{devices[p.slug]?.builtIn.join(" · ")}</p>
      </>
    );
  }
  const cap = capacity(p.slug, line.addons);
  return (
    <>
      <p className="q-line__name"><Link href={`/shop/${p.slug}`}>{p.name}</Link></p>
      <p className="q-hint">Size {line.size}{line.color ? ` · ${line.color}` : ""} · {won(p.price)}</p>
      <ul className="q-sensorchips" aria-label="Sensors">
        {(slotMaps[p.slug] ?? []).map((s) => {
          const m = s.fitted ?? line.addons[s.id];
          if (!m) return null;
          const Icon = moduleIcons[m];
          return <li key={s.id} className={s.fitted ? "" : "is-added"}><Icon size={14} aria-hidden="true" />{moduleById(m).short} · {s.label.toLowerCase()}{s.fitted ? "" : ` +${won(moduleById(m).price)}`}</li>;
        })}
      </ul>
      <div className="q-capacity q-capacity--inline">
        <p>{cap.used} of {cap.total} slots in use{cap.free ? ` · room for ${cap.free} more` : " · fully fitted"}</p>
        <div className="q-capacity__bar" aria-hidden="true">
          {(slotMaps[p.slug] ?? []).map((s) => <span key={s.id} className={s.fitted ? "is-fitted" : line.addons[s.id] ? "is-added" : ""} />)}
        </div>
      </div>
    </>
  );
}
