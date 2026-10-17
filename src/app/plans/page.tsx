import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
      <p className="q-plans-link"><Link className="q-link" href="/pricing">Compare all plans and pricing <ArrowRight size={18} aria-hidden="true" /></Link></p>
    </main>
  );
}
