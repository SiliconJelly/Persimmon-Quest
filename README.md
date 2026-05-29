# Persimmon Quest

White industrial 3D-themed website for Persimmon Quest, a pro-aging neurotech operating system concept for Japanese nursing homes.

## Stack

- Next.js 16 static export
- React 18
- Tailwind CSS
- lucide-react icons
- pnpm

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```bash
pnpm lint
pnpm build
```

`pnpm build` exports the static site to `out/`.

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`. Push to `main`, then enable GitHub Pages with GitHub Actions as the source.

## Assets

Current site assets live in `public/media/`. Large render assets can be added there later when final 3D files are ready.
