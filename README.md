# Persimmon Quest

Persimmon Quest is a Japan-first neurotechnology research and product initiative exploring how familiar play, supervised neurofeedback, and privacy-conscious computing can support better aging-brain research.

The project is currently pre-revenue and developing an MVP. Persimmon Quest is not a gambling product, diagnostic system, medical treatment, or clinically validated therapy. The website distinguishes current concepts from planned research and capabilities that would require future evidence, partnerships, and regulatory clearance.

## Manifesto

Japan's aging society needs technology that treats older adults as participants in the future, not passive recipients of care. Persimmon Quest starts with a simple premise: an engaging daily experience can also become a respectful research interface when consent, dignity, useful feedback, and good governance are designed into the system from the beginning.

We are developing three connected product concepts:

- **qBand Controller**: a resident-facing brain-signal input concept for supervised sessions.
- **qPad Oasis**: a calm room-level interface for residents, care teams, and families.
- **qCore Pillar**: an edge-first processing concept intended to give facilities more control over sensitive research signals.

The initial audience is Japanese nursing homes and elderly-care facilities, alongside caregivers, neuroscience researchers, product collaborators, and aligned investors. The long-term ambition is to build useful neuroadaptive infrastructure from repeated, ethically governed real-world engagement.

### Focused Research Organization

In this project, a **Focused Research Organization (FRO)** is a milestone-driven organization built to solve a defined research and translation problem that is too applied for a traditional academic lab and too uncertain for a conventional product company.

The Persimmon Quest FRO model connects:

1. Purpose-built product prototypes.
2. Carefully scoped care-facility pilots.
3. Consent-first longitudinal research signals.
4. Reproducible neuroadaptive models and infrastructure.
5. Translation into validated products only when evidence supports it.

The FRO is not a shortcut around clinical evidence, privacy obligations, or regulation. It is the structure for pursuing those requirements deliberately while keeping research and product development aligned.

## Website Design Standard

The Persimmon Quest website should feel like a calm, precise operating surface for a serious research initiative.

- **White industrial 3D**: use restrained chassis surfaces, physical controls, purposeful depth, and orange accents.
- **Dignity-first language**: describe aging, care, and residents without fear-based or infantilizing framing.
- **Honest claims**: label prototypes, proposals, research goals, and future validation clearly. Do not imply diagnostic, therapeutic, regulatory, privacy, or performance capabilities that have not been demonstrated.
- **Accessible interaction**: preserve semantic structure, keyboard access, readable contrast, responsive layouts, visible content without JavaScript, and reduced-motion behavior.
- **Restrained motion**: animation should clarify state or reward exploration without blocking access to information.
- **Privacy-conscious messaging**: communicate consent, supervision, governance, and edge-first research direction without overstating compliance.
- **Purposeful assets**: every committed asset must be referenced, appropriately named, optimized, and necessary to the experience.
- **Operational consistency**: subpages should share navigation, footer, typography, controls, spacing, and interaction patterns.

## Current Site

The repository contains a statically exported Next.js website with these routes:

- `/` - product ecosystem overview
- `/for-clinicians` - facility value, research context, pilot workflow, and pilot inquiry form
- `/team` - founding team and newsletter embed
- `/roadmap` - FRO milestones and research translation path
- `/contact` - general inquiry form and project FAQ
- `/platform` - compatibility redirect to `/for-clinicians`

Both inquiry forms use `mailto:` because the site is hosted as a static GitHub Pages export. Submission therefore depends on the visitor having an email application configured, and each form provides the direct contact address as a fallback.

## Architecture

- Next.js 16 App Router with static export
- React 18 and TypeScript
- Tailwind CSS utilities with a shared global visual system
- Lucide icons
- pnpm
- GitHub Pages deployment through GitHub Actions

Site content and product data live in `src/app/`. Referenced visual assets live in `public/media/`. Generated directories such as `.next/`, `out/`, and `node_modules/` are intentionally ignored.

## Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Run the required checks before committing:

```bash
pnpm lint
pnpm build
git diff --check
```

`pnpm lint` generates current Next.js route types before running TypeScript. `pnpm build` exports the static site to `out/`.

## Contribution Standard

Changes should preserve the manifesto and website design standard above. Before opening a pull request or pushing to `main`:

- Verify every route at desktop and mobile widths.
- Confirm there is no horizontal overflow or content hidden behind motion behavior.
- Test navigation, forms, media, embeds, and reduced-motion behavior.
- Remove unused code and assets rather than leaving speculative files in the repository.
- Optimize new raster assets and use lowercase kebab-case filenames.
- Keep current capabilities, proposed research, target outcomes, and regulated claims clearly separated.

## Deployment

The workflow at `.github/workflows/deploy.yml` installs locked dependencies, builds the static export, and deploys `out/` to GitHub Pages after a push to `main`.
