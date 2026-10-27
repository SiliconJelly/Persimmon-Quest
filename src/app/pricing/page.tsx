import { ArrowRight, ArrowUpRight, Check, Info, Minus, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { plans, products, won } from "../catalog";
import { faqs } from "../data";
import { DUET_PRICE } from "../sensors";
import Partners from "../components/site/Partners";
import PlanCards from "../components/site/PlanCards";

export const metadata: Metadata = {
  title: "Plans and pricing | Persimmon Quest",
  description: "Quest View Access by the month, the founding member bundle with Sage Duo, qPad One and a year of Access, and Monarch OS for whole communities."
};

// What the bundle saves against buying both devices on their own, the same figure the homepage and Duet page show
const saving = products.filter((p) => p.slug === "qband-sage-duo" || p.slug === "qpad-one").reduce((sum, p) => sum + p.price, 0) - DUET_PRICE;

type Cell = string | boolean;
const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Who it is for", cells: ["One person", "One person", "Whole communities"] },
  { label: "Walk, Flow and Rest programs", cells: [true, true, true] },
  { label: "Large type apps on qPad", cells: [true, true, true] },
  { label: "Weekly note for family", cells: [true, true, "Staff dashboard"] },
  { label: "New sessions every month", cells: [true, true, true] },
  { label: "Sage Duo qBand", cells: [false, "Included", "Arranged per site"] },
  { label: "qPad One tablet", cells: ["Needs a qPad", "Included", "Fleet of qPads"] },
  { label: "Set up with our team", cells: [false, "At home", "On site"] },
  { label: "Quest View Access", cells: ["Monthly", "12 months included", "Included"] }
];

// The questions people ask right before they choose, answered in the same words as the contact page
const ASKED = ["Can I buy clothes before the Duet Bundle?", "Why does every member start with qPad One?", "Can I try the experience?"];
const FAQS = faqs.filter(([q]) => ASKED.includes(q));

function Value({ v }: { v: Cell }) {
  if (v === true) return <><Check size={20} aria-hidden="true" /><span className="q-sr">Included</span></>;
  if (v === false) return <><Minus size={20} aria-hidden="true" className="q-compare__no" /><span className="q-sr">Not included</span></>;
  return <>{v}</>;
}

export default function PricingPage() {
  return (
    <main className="q-pricing">
      <header className="q-shell q-pricing__head">
        <h1 className="q-display">Plans and <em>pricing</em></h1>
        <p className="q-lead">Start with Access each month, or join as a founding member with Sage Duo, qPad One and a year of Access.</p>
        <p className="q-pricing__sales">Running a silver town? <Link className="q-link" href="/care-partners">See Monarch OS for care partners <ArrowUpRight size={15} aria-hidden="true" /></Link></p>
      </header>

      <section className="q-shell" aria-label="Plans">
        <PlanCards saving={won(saving)} />
      </section>

      <Partners>
        <p className="q-founding-note">
          <Info size={18} aria-hidden="true" />
          <span><b>How founding members help</b> Your pre-order helps us make Sage Duo and qPad One, and you wear them first.</span>
        </p>
      </Partners>

      <section className="q-shell q-pricing__compare" aria-labelledby="compare-title">
        <h2 id="compare-title" className="q-h2">Compare plans</h2>
        <div className="q-compare" role="region" aria-labelledby="compare-title" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="q-sr">Feature</span></th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={p.ribbon ? "q-compare__pick" : undefined}>
                    <span className="q-compare__name">{p.name}</span>
                    <span className="q-compare__price q-tabular">{p.price}{p.unit && <small> {p.unit}</small>}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((c, i) => <td key={i} className={plans[i].ribbon ? "q-compare__pick" : undefined}><Value v={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="q-pricing__note">Prices are shown in Korean won. Quest View supports general wellness and is not medical advice.</p>
      </section>

      <section className="q-shell q-pricing__faq" aria-labelledby="pricing-faq-title">
        <h2 id="pricing-faq-title" className="q-h2">Before you choose</h2>
        <div className="q-acc">
          {FAQS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q} <Plus size={20} aria-hidden="true" /></summary>
              <div className="q-acc__body"><p>{a}</p></div>
            </details>
          ))}
        </div>
      </section>

      <section className="q-shell q-pricing__help" aria-labelledby="help-title">
        <h2 id="help-title" className="q-display">Not sure which <em>suits you</em></h2>
        <p className="q-lead">Answer a few gentle questions and we will suggest a plan.</p>
        <Link className="q-btn q-btn--ink" href="/plans">Find your plan <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
