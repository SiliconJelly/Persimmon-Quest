import Link from "next/link";
import Monogram from "./Monogram";

const cols = [
  { title: "Shop", links: [["Women", "/shop?gender=women"], ["Men", "/shop?gender=men"], ["Shoes", "/shop?category=Shoes"], ["Duet", "/duet"]] },
  { title: "Plans", links: [["Find your plan", "/plans"], ["Pricing", "/plans#all-plans"], ["Flow", "/plans#flow"], ["Deep Rest", "/plans#rest"]] },
  { title: "Company", links: [["About", "/team"], ["Research", "/research"], ["Care partners", "/for-clinicians"], ["Roadmap", "/roadmap"], ["Contact", "/contact"]] }
];

export default function SiteFooter() {
  return (
    <footer className="q-footer">
      <div className="q-shell">
        <div className="q-footer__grid">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Monogram className="q-wordmark__mono" />
            <p style={{ margin: 0, maxWidth: "30ch", color: "#d6cfc4" }}>For those who dare to live the future.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="q-mono">{c.title}</h2>
              <ul>{c.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="q-footer__giant" aria-hidden="true">Persimmon Quest</p>
        <div className="q-footer__base">
          <span className="q-mono">© 2026 Persimmon Quest</span>
          <span className="q-mono">Seoul · 37.5665°N 126.9780°E</span>
        </div>
      </div>
    </footer>
  );
}
