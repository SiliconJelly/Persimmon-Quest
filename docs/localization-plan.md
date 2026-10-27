# Persimmon Quest: Localization Plan

Last updated: 2026-10-27

The site launches in English. Next, it should greet each visitor in their own language, with prices in their currency and the products, photos and wording that suit their culture, chosen from where they are.

| Locale | Language | Shown to visitors in | URL (proposed) | Currency |
|---|---|---|---|---|
| `en` | English (default) | everyone else | `/` | KRW for now |
| `ko` | Korean | South Korea | `/ko` | KRW |
| `ja` | Japanese | Japan | `/ja` | JPY |
| `fr` | French | France | `/fr` | EUR |
| `bn` | Bangla | Bangladesh | `/bn` | BDT |

## Where things stand

- Next.js, `output: "export"` (fully static), deployed to GitHub Pages on `persimmon.quest` by `.github/workflows/deploy.yml` on every push to `main`.
- All copy is English and written inline in components; `<html lang="en">` is fixed.
- Prices live in `src/app/catalog.ts` and `src/app/sensors.ts`, in Korean won, formatted by `won()`.
- Empty placeholder folders for each language sit in `locales/` (gitignored until the work starts).

## What changes per country

1. **Language:** every page's copy, image alt text, metadata and the FAQ.
2. **Currency and price:** one price list per market, not a conversion, so each price can be set by hand (`₩699,000`, `¥…`, `€…`).
3. **Products and culture:** which products show first, which photos and models appear, and wording that fits each culture (for example care partners and silver towns lead in Korea and Japan). Products that do not ship to a country are hidden there.
4. **Typography:** Pretendard covers Korean; Japanese needs Noto Sans JP and Bangla needs Noto Sans Bengali, loaded only on those routes.

## Architecture

```
src/
  locales/
    config.ts      locales, default "en", country to locale map, which locales are ready, currency per locale
    en/            common.ts, home.ts, shop.ts, catalog.ts ... (source of truth)
    ko/ ja/ fr/ bn/  same files and keys, translated and adapted
  app/
    (English pages stay where they are, served at /)
    [locale]/      thin routes that render the same page components with that locale's dictionary
```

- Page components take `dict` and `locale` props, so one component serves every language.
- `generateStaticParams` returns the ready locales, which keeps the site fully static.
- TypeScript uses `typeof en` as the shape, so a missing translation fails the build.
- The catalog splits into shared facts (ids, sensors, images) and per-locale text, prices and visibility.
- One `formatPrice(locale, amount)` helper replaces the hard-coded `won()` formatting.
- The empty folders in `locales/` move into `src/locales/` when work starts.

## Geolocation

GitHub Pages is static, so there is no server to read a visitor's country from their IP. Two options:

| | A. In the browser (works on GitHub Pages) | B. At the edge (needs a host change) |
|---|---|---|
| How | On the first visit, a small script reads the time zone and browser language, then redirects once | Host on Cloudflare or Vercel and read the country header in middleware |
| Accuracy | Good; misses travellers and VPN users | Country-level |
| Cost | None, no third-party calls | Free tier usually enough |

Rules for either option:
- Redirect only on the first visit to `/`, never on deep links, and never for search crawlers.
- A language and currency switcher in the nav and footer; the visitor's choice is saved and always wins.
- `hreflang` alternates on every page, with `x-default` pointing at English.
- Locales stay hidden until marked ready in `config.ts`; until then everyone sees English.

## Rollout

1. Build the architecture with English only, and the switcher hidden.
2. Korean first (the copy already speaks to Korea's silver towns), then Japanese, French and Bangla.
3. Turn on geolocation once one non-English locale is ready.

## Decisions needed

1. Stay on GitHub Pages (option A) or move to Cloudflare or Vercel (option B)?
2. Prices per market for the Duet bundle, Quest View Access and clothing.
3. Which products and stories lead in each country.
