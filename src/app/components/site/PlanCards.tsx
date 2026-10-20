import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { plans } from "../../catalog";

// The three plans, top to bottom: Quest View Premium, the Duet bundle offer, then Monarch OS for silver towns.
export default function PlanCards() {
  return (
    <div className="q-plans">
      {plans.map((plan) => (
        <article key={plan.id} id={plan.id} className={`q-plan ${plan.ribbon ? "q-plan--featured" : ""} ${plan.tone === "dark" ? "q-plan--dark" : ""}`}>
          {plan.ribbon && <span className="q-plan__ribbon q-mono">{plan.ribbon}</span>}
          <span className="q-mono q-mono--bronze">{plan.eyebrow}</span>
          <h3 className="q-h3">{plan.name}</h3>
          {plan.id === "duet" && (
            <div className="q-plan__kit" aria-hidden="true">
              <img src="/media/shop/brainwear-duo/sage-cut.webp" alt="" loading="lazy" />
              <span>+</span>
              <img src="/media/shop/qpad-one/ivory-cut.webp" alt="" loading="lazy" />
            </div>
          )}
          <p className="q-body">{plan.line}</p>
          <p className="q-plan__price q-tabular">{plan.price}{plan.unit && <small>{plan.unit}</small>}</p>
          <ul>{plan.includes.map((x) => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          <Link className={`q-btn ${plan.ribbon ? "q-btn--primary" : plan.tone === "dark" ? "q-btn--light" : "q-btn--ghost"} q-plan__cta`} href={plan.cta.href}>
            {plan.cta.label} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
