import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { plans } from "../../catalog";

// The three plans, left to right: Quest View Access by the month, the founding member bundle, then Monarch OS for silver towns.
// On wide screens the cards share one subgrid, so names, prices, lists and buttons sit on the same lines across all three;
// only the bundle reaches above the row, to show what is in the box.
export default function PlanCards({ saving }: { saving?: string }) {
  return (
    <div className="q-tiers">
      {plans.map((plan) => (
        <article key={plan.id} id={plan.id} aria-labelledby={`${plan.id}-name`} className={`q-tier ${plan.ribbon ? "q-tier--featured" : ""} ${plan.tone === "dark" ? "q-tier--dark" : ""}`}>
          {plan.id === "duet" && (
            <div className="q-tier__stage">
              <img className="q-tier__qpad" src="/media/site/qband-sage-duo/qpad-off.webp" width="1196" height="1046" alt="qPad One with its screen off" />
              <img className="q-tier__band" src="/media/site/qband-sage-duo/band-three.webp" width="1400" height="861" alt="Sage Duo qBand" />
            </div>
          )}
          <header className="q-tier__head">
            <span className="q-tier__eyebrow">{plan.eyebrow}</span>
            {plan.ribbon && <span className="q-tier__ribbon">{plan.ribbon}</span>}
            <h2 id={`${plan.id}-name`} className="q-tier__name">{plan.name}</h2>
          </header>
          <p className="q-tier__price q-tabular">
            {plan.price}
            <span className="q-tier__unit">
              {plan.unit && <small>{plan.unit}</small>}
              {plan.id === "duet" && saving && <span className="q-tier__save">Save {saving}</span>}
            </span>
          </p>
          <p className="q-tier__line">{plan.line}</p>
          <div className="q-tier__list">
            {plan.builds && <p className="q-tier__builds">{plan.builds}</p>}
            <ul>{plan.includes.map((x) => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          </div>
          <div className="q-tier__foot">
            <Link className={`q-btn ${plan.ribbon ? "q-btn--primary" : plan.tone === "dark" ? "q-btn--light" : "q-btn--ghost"}`} href={plan.cta.href}>
              {plan.cta.label} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {plan.note && (plan.note.href
              ? <Link className="q-tier__note" href={plan.note.href}>{plan.note.text} <ArrowUpRight size={15} aria-hidden="true" /></Link>
              : <p className="q-tier__note">{plan.note.text}</p>)}
          </div>
        </article>
      ))}
    </div>
  );
}
