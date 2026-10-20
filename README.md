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
| `src/app/catalog.ts` | Products, colourways, homepage edits and plans: names, prices, copy and every product picture |
| `src/app/sensors.ts` | Sensor slots per garment, sensor modules, wellness insights, bag line pricing |
| `src/app/components/site/ResearchCases.tsx` | Research case studies, shared by the homepage carousel and `/research` |
| `src/app/components/site/QPad.tsx` | The coded qPad device and its screen faces |
| `src/app/plans/quiz.ts` | Wellness profile questions and scoring |
| `src/app/components/site/` | Components for the current site (nav, footer, cards, lookbook, motion sections) |
| `scripts/studio/` | The photo pipeline that builds `public/media/shop` (see its README) |
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
| `shop/<product>` | Every picture of a product on one studio sweep: worn crops, head to toe, still life, back, in motion, cutout and line drawing |
| `shop/edits` | The four outdoor stories on the homepage |
| `site/people` | Portraits and family photos used on Quest View and qPad screens |
| `site/film`, `site/material` | Films and material stills, graded to the house look |
| `site/hero` | Chronophotography stills |
| `hero-homepage` | The doll dance film used on the homepage |
| `mockups`, `case-study`, `team`, `icons` | Device mockups for `/connect`, research imagery, team photos and icons |
| `brand` | Logo source artwork |

`public/media/_inspo` holds raw inspiration sources for local use and is not committed.

## House style

- Copy is plain and warm, written for older adults. No em dashes.
- Films and photos share one grade: muted colour, warm tint, lifted blacks and fine grain (`.q-grade` and `.q-grain` in `pq.css`).
- Product pictures share one studio sweep (`--c-studio`, #d9d1c7), so any two sit well side by side. Outdoor pictures share one morning light.
- Prices in the catalog are placeholders until confirmed.
