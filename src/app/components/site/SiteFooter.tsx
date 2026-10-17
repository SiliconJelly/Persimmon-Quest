import Link from "next/link";
import Monogram from "./Monogram";

const cols = [
  { title: "Shop", links: [["Women", "/shop?c=women"], ["Men", "/shop?c=men"], ["Footwear", "/shop?c=shoes"], ["Headband & qPad", "/shop?c=devices"], ["Duet", "/duet"]] },
  { title: "Quest View", links: [["Quest View", "/quest-view"], ["Find your plan", "/plans"], ["Pricing", "/pricing"], ["Research", "/research"]] },
  { title: "Company", links: [["About", "/team"], ["Care partners", "/for-clinicians"], ["Roadmap", "/roadmap"], ["Contact", "/contact"]] }
];

export default function SiteFooter() {
  return (
    <footer className="q-footer">
      <div className="q-shell">
        <div className="q-footer__grid">
          <div className="q-footer__brand">
            <Monogram className="q-footer__mono" />
            <p>For those who dare to live the future.</p>
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
