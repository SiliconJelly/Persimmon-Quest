"use client";

import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBag } from "../components/site/BagContext";

// Adds the Duet bundle (Brainwear, qPad One and a year of Premium) to the bag.
export default function AddDuet() {
  const { add } = useBag();
  const [added, setAdded] = useState(false);
  if (added) return <Link className="q-btn q-btn--primary" href="/bag"><Check size={18} aria-hidden="true" /> In your bag. View bag</Link>;
  return (
    <button type="button" className="q-btn q-btn--primary" onClick={() => { add({ kind: "duet" }); setAdded(true); }}>
      <ShoppingBag size={18} aria-hidden="true" /> Add Duet to bag
    </button>
  );
}
