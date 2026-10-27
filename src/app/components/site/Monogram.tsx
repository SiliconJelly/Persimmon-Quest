// The Persimmon Quest emblem: a four-petal persimmon calyx whose lower petal sweeps into the tail of a Q,
// with a persimmon star at its centre. Petals take currentColor so the mark works on light and dark grounds.
// Source artwork: docs/emblem-source.png
export const EMBLEM = {
  viewBox: "15 15 70 70",
  petals: [
    "M44.94 42.84C40.74 39.64 36.6 39 36.6 32.4C36.6 26.2 42.2 23.6 45.6 21C47.6 19.5 49 18.2 50 17C51 18.2 52.4 19.5 54.4 21C57.8 23.6 63.4 26.2 63.4 32.4C63.4 39 59.26 39.64 55.06 42.84Q51.5 38.7 50 32.5Q48.5 38.7 44.94 42.84Z",
    "M42.84 55.06C39.64 59.26 39 63.4 32.4 63.4C26.2 63.4 23.6 57.8 21 54.4C19.5 52.4 18.2 51 17 50C18.2 49 19.5 47.6 21 45.6C23.6 42.2 26.2 36.6 32.4 36.6C39 36.6 39.64 40.74 42.84 44.94Q38.7 48.5 32.5 50Q38.7 51.5 42.84 55.06Z",
    "M57.16 44.94C60.36 40.74 61 36.6 67.6 36.6C73.8 36.6 76.4 42.2 79 45.6C80.5 47.6 81.8 49 83 50C81.8 51 80.5 52.4 79 54.4C76.4 57.8 73.8 63.4 67.6 63.4C61 63.4 60.36 59.26 57.16 55.06Q61.3 51.5 67.5 50Q61.3 48.5 57.16 44.94Z",
    "M44.94 57.16C40.74 60.56 37.2 60.6 37.2 67.4C37.2 75.8 46.6 81.6 56 81.6C62 81.6 67.4 80.2 70.5 78.6C62.6 78.2 55.6 74 51.4 67C49.2 63.4 47.6 59.6 44.94 57.16Z",
    "M53.6 62.6C58.6 65.4 61.6 71.4 65.6 74.6C67.2 75.9 68.9 76.9 70.5 77.5C63.8 76.6 57.8 72.6 54.2 66.6C53.5 65.4 53.3 64 53.6 62.6Z"
  ],
  star: "M50 42.6Q50.9 49.1 57.4 50Q50.9 50.9 50 57.4Q49.1 50.9 42.6 50Q49.1 49.1 50 42.6Z"
};

export default function Monogram({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg className={className} viewBox={EMBLEM.viewBox} fill="currentColor" aria-hidden="true">
      {EMBLEM.petals.map((d, i) => (
        <path key={i} d={d} className={animated ? "petal" : undefined} style={animated ? { animationDelay: `${0.08 * i}s` } : undefined} />
      ))}
      <path d={EMBLEM.star} fill="var(--c-persimmon)" className={animated ? "star" : undefined} />
    </svg>
  );
}
