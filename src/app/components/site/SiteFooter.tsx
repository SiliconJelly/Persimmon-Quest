import Link from "next/link";
import Monogram from "./Monogram";

const cols = [
  { title: "Shop", links: [["Women", "/shop?c=women"], ["Men", "/shop?c=men"], ["Footwear", "/shop?c=shoes"], ["qBand & qPad", "/shop?c=devices"]] },
  { title: "Quest View", links: [["Membership", "/quest-view"], ["Duet Bundle", "/duet"], ["Find your plan", "/plans"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["Team", "/team"], ["Care partners", "/care-partners"], ["Research", "/research"], ["Contact", "/contact"]] }
];

// Where to follow us, under the brand line: each network's own mark, in the footer's colour
const SOCIAL = [
  {
    label: "LinkedIn", href: "https://www.linkedin.com/company/persimmon-quest/",
    mark: <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  },
  {
    label: "Instagram", href: "https://www.instagram.com/persimmon.quest/",
    mark: <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5.6" /><circle cx="12" cy="12" r="4.6" /><circle cx="17.7" cy="6.3" r="1.25" fill="currentColor" stroke="none" /></g>
  }
];

export default function SiteFooter() {
  return (
    <footer className="q-footer">
      <div className="q-shell">
        <div className="q-footer__grid">
          <div className="q-footer__brand">
            <Monogram className="q-footer__mono" />
            <p>For those who dare to live the future.</p>
            <ul className="q-footer__social" aria-label="Follow Persimmon Quest">
              {SOCIAL.map(({ label, href, mark }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Persimmon Quest on ${label} (opens in a new tab)`} title={label}>
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">{mark}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="q-mono">{c.title}</h2>
              <ul>{c.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>

        {/* The wordmark fills the footer's full width at every screen size */}
        <div className="q-footer__mark" aria-hidden="true">
          <p>Persimmon Quest</p>
        </div>

        <div className="q-footer__base">
          <p className="q-footer__legal">© 2026 Persimmon Quest Inc. All rights reserved.</p>
          <p className="q-footer__statement">A Delaware-registered company and research initiative.</p>
        </div>
      </div>
    </footer>
  );
}
