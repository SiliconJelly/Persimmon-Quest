# Persimmon Quest: English Launch and Localization Plan

Last updated: 2026-10-17

Goal: ship the English site first, built so that Bangla, French, Korean and Japanese can be added later without rewriting pages.

| Locale | Language | Shown automatically to visitors in | URL (proposed) |
|---|---|---|---|
| `en` | English (main site, default) | everyone else | `/` |
| `bn` | Bangla | Bangladesh | `/bn` |
| `fr` | French | France | `/fr` |
| `ja` | Japanese | Japan | `/ja` |
| `ko` | Korean | South Korea | `/ko` |

---

## 1. Where things stand today

### Site (English)
- Next.js 16 app, `output: "export"` (fully static), deployed to **GitHub Pages** by `.github/workflows/deploy.yml` on every push to `main`.
- Typecheck passes (`tsc --noEmit`).
- The redesigned storefront is the live experience: `layout.tsx` uses `components/site/*` (Nav, SiteFooter, BagContext), with data in `catalog.ts` and `sensors.ts`.
- New routes in progress: `/shop`, `/shop/[slug]`, `/duet`, `/plans`, `/configure`, `/bag`.
- **About 40 files of work are uncommitted on `main`**, including new routes, new media folders and deleted old media. Nothing is pushed, so production still runs the old site.

### Locale folders
- `bn/`, `en/`, `fr/`, `jp/`, `kr/` exist at the **repo root** and are **empty**.
- At the root they are outside `src/`, so Next.js does not see them. They need to move (see section 3).
- `jp` and `kr` are country codes. Language codes are `ja` and `ko`, which browsers, `hreflang` and `Intl` all expect. Recommend renaming.

### Problems found while auditing
1. **Broken images on older pages.** About 20 files were deleted from `public/media/` but are still referenced by `data.ts`, `for-clinicians/page.tsx`, `connect/ConnectExperience.tsx` and three unused components. `/for-clinicians`, `/team`, `/roadmap` and `/contact` are linked from the footer and still use the old design system (`components/ui.tsx`, `components/Reveal.tsx`, `data.ts`).
2. **Inspiration placeholders will break in production.** `page.tsx` and `HomeMotion.tsx` load 5 files from `/media/_inspo/`. That folder is gitignored, so the GitHub Pages build will not contain them (and they are third-party clips that must not ship anyway).
3. **README.md was emptied** (102 lines removed, uncommitted). Looks accidental; on macOS `Readme.md` and `README.md` are the same file.
4. **Dead code:** `components/SiteNav.tsx`, `Footer.tsx`, `HeroDevice.tsx`, `ProductShowcase.tsx` are imported nowhere. `/demo` and `/platform` are redirect stubs; `/connect` is not linked from the new nav.
5. **Placeholder content:** prices in `catalog.ts` are marked as placeholders; the campaign film slide is a slot.
6. **Not i18n-ready yet:** all copy is hardcoded in components, `<html lang="en">` is fixed, metadata is English only, and fonts cover Latin and Korean (Pretendard) but not Japanese or Bangla.

---

## 2. Phase 1: Finalize the English site (now)

Order matters: commit a checkpoint first so nothing is lost.

1. **Checkpoint commit** on a branch (`english-launch`), restore README.md.
2. **Fix or retire the legacy pages.** For each of `/for-clinicians`, `/team`, `/roadmap`, `/contact`, `/connect`: rebuild on the new `components/site` system with media from `public/media/site`, `team`, `case-study`, or drop it from nav/footer. Then delete `data.ts`, `ui.tsx`, `Reveal.tsx` and the four unused components.
3. **Replace every `_inspo` asset** with owned media (or a still image fallback) so production has no gaps.
4. **Content freeze:** confirm prices, product names and campaign slots.
5. **Launch basics:** per-page `metadata`, Open Graph image, `sitemap.xml`, `robots.txt`, 404 page, accessibility pass.
6. **Ship:** merge to `main`, GitHub Pages deploys.

Cheap groundwork to do during Phase 1 so Phase 2 is easy:
- Write all **new** copy in a typed English dictionary (`src/locales/en/*.ts`) instead of inline JSX, starting with Nav and Footer.
- Format prices and dates with one helper (`formatPrice(locale, amount)`) rather than hardcoded `"en-US"`.
- Keep image `alt` text in the dictionary too.

---

## 3. Phase 2: Localization architecture (after English ships)

### Folder layout
Move the empty root folders into `src/` and use language codes:

```
src/
  locales/
    config.ts          locales list, default "en", country to locale map
    en/                common.ts, home.ts, shop.ts, catalog.ts ...  (source of truth)
    bn/  fr/  ja/  ko/ same files, same keys, translated
  app/
    (en pages stay where they are, served at /)
    [locale]/          bn, fr, ja, ko: thin route files that render the same
                       page components with that locale's dictionary
```

- Page components take a `dict` (and `locale`) prop, so one component serves all five languages.
- `generateStaticParams` returns `bn, fr, ja, ko`, which keeps the site fully static.
- TypeScript enforces that every locale has every key (`typeof en` as the shape), so a missing translation fails the build.
- Product data in `catalog.ts` splits into shared facts (ids, sensors, images) and per-locale text (names, descriptions, alt).

### Geo detection
GitHub Pages is static, so there is no server to read the visitor's IP. Two options:

| | A. In-browser detection (recommended now) | B. Edge detection (later, if needed) |
|---|---|---|
| How | Small script on first visit reads time zone (`Asia/Tokyo`, `Asia/Seoul`, `Europe/Paris`, `Asia/Dhaka`) and browser language, then redirects once | Host on Vercel or Cloudflare; read country header (`x-vercel-ip-country` / `CF-IPCountry`) in middleware |
| Hosting change | None | Move off GitHub Pages |
| Accuracy | Good; misses travellers and VPN users | Country-level IP accuracy |
| Privacy / cost | No third-party calls, free | Free tier usually fine |

Rules for either option:
- Redirect **only on the first visit to `/`**, never on deep links.
- A **language switcher** in Nav and Footer; the visitor's choice is saved and always wins over detection.
- Never redirect search crawlers; add `hreflang` alternates and `x-default` = English on every page.
- Locales that are not finished yet stay hidden: detection falls back to English until a locale is marked `ready` in `config.ts`.

### Per-locale details
- `<html lang>` set per locale; localized `metadata` titles and descriptions.
- Fonts: Pretendard (Korean, already loaded), add Noto Sans JP for Japanese and Noto Sans Bengali (or Hind Siliguri) for Bangla, loaded only on those routes.
- Currency: decide per market (KRW for `ko`, JPY, EUR, BDT, or KRW everywhere until checkout exists).
- Translation workflow: English dictionary is the source; translators edit the matching `bn/fr/ja/ko` files; native-speaker review before a locale is marked `ready`.

### Rollout order (suggested)
1. Wire the architecture with English only, plus the switcher (hidden).
2. Korean first (the copy already targets Korea's silver towns), then Japanese, French, Bangla.
3. Turn on geo detection once at least one non-English locale is `ready`.

---

## 4. Decisions needed
1. Keep hosting on GitHub Pages (option A detection) or move to Vercel/Cloudflare (option B)?
2. Rename `jp` and `kr` to `ja` and `ko`, and move the folders into `src/locales/`?
3. Which legacy pages stay for launch: For Clinicians, Team, Roadmap, Contact, Connect?
4. Pricing and currency per locale.
