"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const PUBLICATION = "https://siliconjelly.substack.com";

// Official Substack embed: the subscription, consent and confirmation email are all handled by Substack.
export default function SubstackSignup() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="q-substack">
      <iframe
        src={`${PUBLICATION}/embed`}
        title="Subscribe to the Persimmon Quest newsletter on Substack"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? "is-loaded" : ""}
      />
      <a className="q-link" href={PUBLICATION} target="_blank" rel="noopener noreferrer">
        Or read it on Substack <ArrowUpRight size={16} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
