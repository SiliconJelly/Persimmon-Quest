# Persimmon Quest

Active wellness for better ageing: Sage Duo, our qBand EEG headband, and qPad One work as one, with Quest View and biosensing activewear that turns everyday movement into small daily quests.
Live at [persimmon.quest](https://persimmon.quest) · [LinkedIn](https://www.linkedin.com/company/persimmon-quest/) · [Instagram](https://www.instagram.com/persimmon.quest/)

> **News:** Persimmon Quest has just been selected for the **eWEAR Health Prize @ Stanford U.**

## Run it

```bash
pnpm install
pnpm dev        # local preview at http://localhost:3000
pnpm lint       # route types and TypeScript check
pnpm test       # catalog and media integrity tests (Node test runner)
pnpm build      # static export into ./out
```

Pushing to `main` deploys automatically: `.github/workflows/deploy.yml` builds the static export and publishes it to GitHub Pages on `persimmon.quest`.

## Stack

Next.js (App Router, `output: "export"`), React 18, TypeScript, framer-motion and lucide-react. Styling is plain CSS: `src/app/pq.css` holds the design system, and `globals.css` and `redesign.css` keep the few base styles the contact page still uses.

## Repository

```
.github/workflows/      build and publish to GitHub Pages
docs/                   localization plan, Tally contact form kit
public/
  pinterest-87cf3.html  Pinterest domain verification (must stay at the site root)
  media/                every picture and film the site shows (see below)
scripts/studio/         the photo and film pipeline that builds public/media (see its README)
src/app/                pages, data and styles
  components/site/      components for the site: nav, footer, cards, stories, video
tests/                  integrity tests for the catalog and media
```

### Pages

`/` home · `/duet` (Sage Duo and qPad One) · `/quest-view` · `/shop` and `/shop/[slug]` · `/bag` · `/plans` (wellness profile) · `/pricing` · `/research` · `/team` · `/care-partners` (silver towns and care facilities) · `/contact`. `/platform` redirects to `/care-partners`, and older product slugs (such as the Brainwear names) still open their product.

### Data

| File | What it holds |
|---|---|
| `src/app/catalog.ts` | Products, colourways, edits and plans: names, prices, copy and every product picture |
| `src/app/sensors.ts` | Sensor slots per garment, modules, wellness insights and bag pricing |
| `src/app/data.ts` | Team and frequently asked questions |
| `src/app/components/site/ResearchCases.tsx` | Research directions and the published studies they build on |
| `src/app/plans/quiz.ts` | Wellness profile questions and scoring |

### Media (`public/media`)

| Folder | Contents |
|---|---|
| `shop/<product>` | Every picture of a product on one studio sweep. The headbands live in `qband-sage-duo`, `qband-everyday` and `qband-arc` |
| `shop/edits`, `shop/scenes` | Outdoor stories and in-use scenes |
| `film` | Every film as H.264 MP4, with a `.webp` poster and a `-phone.mp4` cut where phones show it large |
| `site/qband-sage-duo` | The homepage story: Sage Duo from three angles, the brain, qPad with its screen off, and its screen photos |
| `site/closing`, `site/day`, `site/material` | Homepage ending, the Duet page day strip, material stills |
| `site/hero`, `site/people`, `site/partners`, `site/research` | Chronophotography, portraits for qPad screens, partner marks, research imagery |
| `team`, `brand` | Team portraits and logo source artwork |

Raw photos and film originals stay outside the repo; `scripts/studio` reads them from `~/Downloads/down`.

## Marketing

- **Pinterest:** the domain is claimed by `public/pinterest-87cf3.html` and the matching `p:domain_verify` meta tag in `src/app/layout.tsx`. Keep both so Pinterest ads and analytics stay verified.
- **Social:** LinkedIn and Instagram are linked in the footer.

## Coming next: localization

The site will greet visitors in their own language, with prices in their currency and the products and wording that suit their culture, chosen by where they are. See `docs/localization-plan.md`. Placeholder folders for each language sit in `locales/`, which stays gitignored until that work starts.

## House style

- Copy is plain and warm, written for older adults. No em dashes, and no punctuation in titles.
- qBand is the word for our headbands; Sage Duo is the model in the Duet bundle.
- Films and photos share one grade: muted colour, warm tint, lifted blacks and fine grain (`.q-grade` and `.q-grain` in `pq.css`).
- Prices in the catalog are placeholders until confirmed.
