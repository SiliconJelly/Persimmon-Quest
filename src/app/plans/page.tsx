import type { Metadata } from "next";
import { Suspense } from "react";
import PlanCards from "../components/site/PlanCards";
import PlanFinder from "./PlanFinder";

export const metadata: Metadata = { title: "Your wellness profile | Persimmon Quest" };

export default function PlansPage() {
  return (
    <main className="q-shell" style={{ paddingBottom: 120 }}>
      <header className="q-pagehead">
        <h1 className="q-display">Let&apos;s find out <em>what you need.</em></h1>
      </header>
      <Suspense fallback={<div className="q-finder" style={{ minHeight: 480 }} />}>
        <PlanFinder />
      </Suspense>
      <section className="q-section" aria-labelledby="all-plans" style={{ paddingBottom: 0 }}>
        <h2 id="all-plans" className="q-h2" style={{ marginBottom: 40 }}>All plans</h2>
        <PlanCards />
      </section>
    </main>
  );
}
