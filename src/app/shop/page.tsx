import type { Metadata } from "next";
import { Suspense } from "react";
import ShopGrid from "./ShopGrid";

export const metadata: Metadata = { title: "Shop | Persimmon Quest" };

export default function ShopPage() {
  return (
    <main className="q-shell" style={{ paddingBottom: 120 }}>
      <header className="q-pagehead q-shophead">
        <h1 className="q-display">Shop all</h1>
      </header>
      <Suspense fallback={<div style={{ minHeight: 600 }} />}>
        <ShopGrid />
      </Suspense>
    </main>
  );
}
