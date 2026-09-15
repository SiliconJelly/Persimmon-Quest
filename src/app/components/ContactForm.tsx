"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// Public, published form. Keep a working default in static deployments.
const PUBLISHED_FORM_ID = "Npa6PW";

export default function ContactForm({ formId }: { formId?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [stalled, setStalled] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const candidate = formId?.trim();
  const id = candidate && /^[a-zA-Z0-9]+$/.test(candidate) ? candidate : PUBLISHED_FORM_ID;
  const embedUrl = `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  useEffect(() => {
    if (loaded) return;
    const timeout = window.setTimeout(() => setStalled(true), 12000);
    return () => window.clearTimeout(timeout);
  }, [loaded, attempt, id]);

  function retry() {
    setLoaded(false);
    setStalled(false);
    setAttempt((value) => value + 1);
  }

  return (
    <div className="contact-form-shell">
      {!loaded && !stalled && <p className="contact-form-loading" role="status">Loading the contact form…</p>}
      {stalled && (
        <div className="contact-form-recovery" role="status">
          <p className="section-label">Start a conversation</p>
          <h2>A little trouble loading the form</h2>
          <p>You can still send your inquiry by opening the form directly.</p>
          <div className="contact-form-recovery-actions">
            <a className="primary-key" href={`https://tally.so/r/${id}`} target="_blank" rel="noopener noreferrer">Open contact form ↗</a>
            <button className="secondary-key" type="button" onClick={retry}>Try again</button>
          </div>
        </div>
      )}
      <iframe
        key={`${id}-${attempt}`}
        id="tally-contact-form"
        src={embedUrl}
        data-tally-src={embedUrl}
        title="Contact Persimmon Quest"
        loading="eager"
        width="100%"
        height="920"
        className={`contact-tally-iframe${stalled ? " contact-tally-iframe--stalled" : ""}`}
        tabIndex={stalled ? -1 : undefined}
        aria-hidden={stalled || undefined}
        onLoad={() => { setLoaded(true); setStalled(false); }}
        onError={() => setStalled(true)}
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onReady={() => (window as Window & { Tally?: { loadEmbeds: () => void } }).Tally?.loadEmbeds()}
      />
      {!stalled && <p className="contact-tally-fallback">
        <a href={`https://tally.so/r/${id}`} target="_blank" rel="noopener noreferrer">Open form in a new tab ↗</a>
        <span> · Or email <a href="mailto:nirjhor.builds@proton.me">nirjhor.builds@proton.me</a>.</span>
      </p>}
    </div>
  );
}
