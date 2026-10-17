import type { Metadata } from "next";
import BagView from "./BagView";

export const metadata: Metadata = { title: "Your bag | Persimmon Quest" };

export default function BagPage() {
  return (
    <main className="q-shell q-bag-page">
      <header className="q-pagehead" style={{ paddingBottom: 24 }}>
        <h1 className="q-display">Your <em>bag.</em></h1>
      </header>
      <BagView />
    </main>
  );
}
