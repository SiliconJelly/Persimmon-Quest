import type { CSSProperties, ReactNode } from "react";

// Where the people behind Persimmon Quest have studied, researched and worked.
// Each mark is a flat silhouette from scripts/studio/logos.py, tinted by CSS so they all share one grey.
// ratio (width over height) and density (how much of its box is ink) are printed by that script;
// together they size each mark so a long wordmark and a square seal carry the same visual weight.
const MARKS = [
  { slug: "uw", name: "University of Washington", ratio: 7.44, density: 0.21 },
  { slug: "uc-davis", name: "UC Davis", ratio: 6.06, density: 0.55 },
  { slug: "sanofi", name: "Sanofi", ratio: 1.26, density: 0.22 },
  { slug: "wyoming", name: "University of Wyoming", ratio: 0.75, density: 0.21 },
  { slug: "concordia", name: "Concordia University", ratio: 4.13, density: 0.17 },
  { slug: "ritsumeikan", name: "Ritsumeikan", ratio: 3.97, density: 0.21 },
  { slug: "oita", name: "Oita University", ratio: 4.48, density: 0.21 },
  { slug: "blpn", name: "BLPN", ratio: 1, density: 0.83 }
];

// Close to equal area for every mark (long wordmarks get a little extra width so their small type stays legible),
// eased for density: heavy marks shrink a little, airy ones grow a little.
function measure(ratio: number, density: number) {
  const k = Math.pow(0.25 / density, 0.2);
  return { "--w": (Math.pow(ratio, 0.58) * k).toFixed(3), "--h": (k / Math.pow(ratio, 0.42)).toFixed(3) };
}

function Marks({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="q-partners__list" aria-hidden={hidden || undefined}>
      {MARKS.map((m) => (
        <li key={m.slug}>
          <span
            className="q-partners__mark"
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : m.name}
            style={{ ...measure(m.ratio, m.density), "--src": `url(/media/site/partners/${m.slug}.png)` } as CSSProperties}
          />
        </li>
      ))}
    </ul>
  );
}

// The marks drift from right to left in one endless row: the set is drawn twice and the row slides by exactly one set.
// Anyone who prefers reduced motion sees them standing still.
/** "night" sits the strip on the dark band that runs from the qBand hero into the app section. Children sit centred under the marks. */
export default function Partners({ tone = "light", children }: { tone?: "light" | "night"; children?: ReactNode }) {
  return (
    <section className={`q-partners ${tone === "night" ? "q-partners--night" : ""}`} aria-labelledby="partners-title">
      <h2 id="partners-title" className="q-partners__title">Built by industry leaders from</h2>
      <div className="q-partners__marquee">
        <div className="q-partners__track">
          <Marks />
          <Marks hidden />
        </div>
      </div>
      {children && <div className="q-partners__foot">{children}</div>}
    </section>
  );
}
