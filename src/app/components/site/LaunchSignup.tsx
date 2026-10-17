"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

const PUBLICATION = "https://siliconjelly.substack.com";

// Launch list, styled as part of the page. The email goes straight to the Substack newsletter
// (Substack's no-script subscribe endpoint), which opens in a new tab to confirm the subscription.
export default function LaunchSignup() {
  const [sent, setSent] = useState(false);

  return (
    <div className="q-launch">
      <div className="q-launch__copy">
        <h3 className="q-launch__title">Be first to hear when Quest View arrives on your phone.</h3>
        <p>One email at launch, then our weekly quest letter. Unsubscribe any time.</p>
      </div>
      {sent ? (
        <p className="q-launch__done" role="status"><Check size={20} aria-hidden="true" /> Almost there. Confirm in the Substack tab, then check your inbox.</p>
      ) : (
        <form className="q-launch__form" action={`${PUBLICATION}/api/v1/free?nojs=true`} method="post" target="_blank" onSubmit={() => setSent(true)}>
          <label className="q-sr" htmlFor="launch-email">Email address</label>
          <input id="launch-email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Your email address" />
          <button type="submit" className="q-launch__btn">Notify me<span className="q-sr"> (confirms in a new tab)</span></button>
        </form>
      )}
      <a className="q-launch__alt" href={PUBLICATION} target="_blank" rel="noopener noreferrer">
        Read the newsletter on Substack <ArrowUpRight size={16} aria-hidden="true" /><span className="q-sr"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
