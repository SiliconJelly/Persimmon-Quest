# Persimmon Quest

Biosensing activewear, the qPad tablet and Quest View, a wellness companion for active ageing.
Live at [persimmon.quest](https://persimmon.quest).

## Run it

```bash
pnpm install
pnpm dev        # local preview at http://localhost:3000
pnpm lint       # route types and TypeScript check
pnpm test       # unit tests (Node test runner)
pnpm build      # static export into ./out
```

Pushing to `main` deploys automatically: `.github/workflows/deploy.yml` builds the static export and publishes it to GitHub Pages on the `persimmon.quest` domain.

## Stack

Next.js (App Router, `output: "export"`), React 18, TypeScript, framer-motion and lucide-react.
Styling is plain CSS. `src/app/pq.css` holds the current design system; `globals.css` and `redesign.css` serve the older pages.

## Where things live

| Path | What it holds |
|---|---|
| `src/app/catalog.ts` | Products, colourways, rituals and plans: names, prices, copy and images |
| `src/app/sensors.ts` | Sensor slots per garment, sensor modules, wellness insights, bag line pricing |
| `src/app/components/site/ResearchCases.tsx` | Research case studies, shared by the homepage carousel and `/research` |
| `src/app/components/site/QPad.tsx` | The coded qPad device and its screen faces |
| `src/app/plans/quiz.ts` | Wellness profile questions and scoring |
| `src/app/components/site/` | Components for the current site (nav, footer, cards, motion sections) |
| `src/app/components/connect/` | Bluetooth and simulated session for `/connect` |
| `src/app/pq.css` | Design tokens and all current styles |
| `docs/` | Planning notes, such as the localisation plan |
| `tests/` | Unit tests |

### Pages

`/` home · `/shop` and `/shop/[slug]` · `/bag` · `/duet` · `/quest-view` · `/plans` (wellness profile) · `/pricing` · `/research` · `/contact`.
Older pages kept online: `/team`, `/for-clinicians`, `/roadmap`, `/connect`, `/platform`, `/demo`.

### Media (`public/media`)

| Folder | Contents |
|---|---|
| `site/cut` | Transparent product cutouts; `site/cut/colors` holds recoloured colourways |
| `site/sketch` | White line sketches made from the cutouts |
| `site/life`, `site/detail`, `site/people` | Worn, close up and portrait photography |
| `site/film`, `site/material` | Films and material stills, graded to the house look |
| `site/hero` | Hero and chronophotography stills |
| `hero-homepage` | The brand film used on the homepage |
| `mockups`, `case-study`, `team`, `icons` | Source mockups, research imagery, team photos and icons |
| `brand` | Logo source artwork |

`public/media/_inspo` holds raw inspiration sources for local use and is not committed.

## House style

- Copy is plain and warm, written for older adults. No em dashes.
- Films and photos share one grade: muted colour, warm tint, lifted blacks and fine grain (`.q-grade` and `.q-grain` in `pq.css`).
- Prices in the catalog are placeholders until confirmed.
