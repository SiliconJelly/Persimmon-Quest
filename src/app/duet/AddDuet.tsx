"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBag } from "../components/site/BagContext";

// Adds the Duet bundle (Sage Duo, qPad One and 12 months of Quest View Access) to the bag, as a founding member.
export default function AddDuet() {
  const { add } = useBag();
  const [added, setAdded] = useState(false);
  if (added) return <Link className="q-btn q-btn--primary" href="/bag"><Check size={18} aria-hidden="true" /> In your bag. View bag</Link>;
  return (
    <button type="button" className="q-btn q-btn--primary" onClick={() => { add({ kind: "duet" }); setAdded(true); }}>
      Become a founding member
    </button>
  );
}
