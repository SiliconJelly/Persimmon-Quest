import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Monogram from "./Monogram";

const cols = [
  { title: "Shop", links: [["Women", "/shop?c=women"], ["Men", "/shop?c=men"], ["Footwear", "/shop?c=shoes"], ["qBand & qPad", "/shop?c=devices"]] },
  { title: "Quest View", links: [["Membership", "/quest-view"], ["Duet Bundle", "/duet"], ["Find your plan", "/plans"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["Team", "/team"], ["Care partners", "/care-partners"], ["Research", "/research"], ["Contact", "/contact"]] }
];

// Where to follow us, under the brand line
const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/persimmon-quest/", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/persimmon.quest/", Icon: Instagram }
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
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon size={18} aria-hidden="true" />{label}<span className="q-sr"> (opens in a new tab)</span>
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
