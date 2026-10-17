import { ArrowRight, Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "../catalog";
import PlanCards from "../components/site/PlanCards";

export const metadata: Metadata = {
  title: "Plans and pricing | Persimmon Quest",
  description: "Quest View Premium, the Duet bundle with a year of Premium included, and Monarch OS for whole communities."
};

type Cell = string | boolean;
const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Who it is for", cells: ["One person", "One person", "Whole communities"] },
  { label: "Walk, Flow and Rest programs", cells: [true, true, true] },
  { label: "Large type apps on qPad", cells: [true, true, true] },
  { label: "Weekly note for family", cells: [true, true, "Staff dashboard"] },
  { label: "New sessions every month", cells: [true, true, true] },
  { label: "Everyday Brainwear headband", cells: [false, "Included", "Arranged per site"] },
  { label: "qPad One tablet", cells: ["Needs a qPad", "Included", "Fleet of qPads"] },
  { label: "Set up with our team", cells: [false, "At home", "On site"] },
  { label: "Quest View Premium", cells: ["Monthly", "12 months included", "Included"] }
];

function Value({ v }: { v: Cell }) {
  if (v === true) return <><Check size={20} aria-hidden="true" /><span className="q-sr">Included</span></>;
  if (v === false) return <><Minus size={20} aria-hidden="true" className="q-compare__no" /><span className="q-sr">Not included</span></>;
  return <>{v}</>;
}

export default function PricingPage() {
  return (
    <main className="q-shell q-pricing" style={{ paddingBottom: 120 }}>
      <header className="q-pagehead">
        <h1 className="q-display">Plans and <em>pricing.</em></h1>
        <p className="q-lead">Three ways to use Persimmon Quest, each with one clear price.</p>
      </header>

      <PlanCards />

      <section className="q-section" aria-labelledby="compare-title" style={{ paddingBottom: 0 }}>
        <h2 id="compare-title" className="q-h2" style={{ marginBottom: 32 }}>Compare plans</h2>
        <div className="q-compare" role="region" aria-labelledby="compare-title" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="q-sr">Feature</span></th>
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    <span className="q-compare__name">{p.id === "duet" ? "Duet bundle" : p.name}</span>
                    <span className="q-compare__price q-tabular">{p.price}{p.unit && <small> {p.unit}</small>}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.cells.map((c, i) => <td key={i}><Value v={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="q-pricing__note">Prices are shown in Korean won. Quest View supports general wellness and is not medical advice.</p>
      </section>

      <section className="q-pricing__help" aria-labelledby="help-title">
        <h2 id="help-title" className="q-h3">Not sure which suits you?</h2>
        <p>Answer a few gentle questions and we will suggest a plan.</p>
        <Link className="q-btn q-btn--primary" href="/plans">Find your plan <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
