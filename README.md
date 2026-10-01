# ORYA Global Website

> The public marketing website for **ORYA**: digital growth, web products, AI automation, and operational intelligence for ambitious businesses across Africa and globally.

## What this repository contains

This is the source code for the ORYA website at `orya.global`. It is a motion-led, responsive React site with five public routes:

| Route | Purpose |
| --- | --- |
| `/` | Homepage and ORYA positioning |
| `/capabilities` | Four connected service pillars |
| `/work` | Partnership concept / work story |
| `/about` | ORYA story and interactive global signal stage |
| `/contact` | Discovery form, email-draft handoff, and Cal.com booking modal |

**Read these before making a change:**

- [`docs/COFOUNDER_GUIDE.md`](docs/COFOUNDER_GUIDE.md) — non-technical orientation, ownership, and publishing workflow.
- [`docs/CODEBASE_MAP.md`](docs/CODEBASE_MAP.md) — where copy, pages, styles, motion, assets, and contact behavior live.
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — branches, quality checks, pull requests, and review rules.

## Technology

- **React 19** + **TypeScript**
- **Vite 7** for local development and production builds
- **Wouter** for client-side routing
- **Tailwind CSS 4** plus the ORYA custom CSS system
- **Framer Motion** for transform-only motion and scroll interactions
- **Radix UI** primitives for accessible dialogs and mobile navigation
- **Cal.com** embedded booking handoff on the contact page

## Quick start

```bash
pnpm install
pnpm dev
```

The development server starts locally and supports hot reload.

### Required checks before a pull request

```bash
pnpm check
pnpm build
pnpm exec vitest run
```

## Current conversion flow

1. A visitor completes the discovery form at `/contact`.
2. The browser opens a draft email addressed to `contact@orya.global` with the visitor's details.
3. The in-site Cal.com booking modal opens with the visitor's name and email prefilled.
4. The visitor can select a time, open Cal.com in a new tab, return to ORYA, or press Escape to close the booking modal.

> The form currently uses a **mailto** handoff. It does not store enquiries in a database. Do not describe it as a CRM or lead-capture system unless that feature is deliberately added.

## GitHub collaboration

- **Repository:** `SamuelFwelo/orya-global` (private)
- **Stable branch:** `main`
- **Recommended workflow:** create a feature branch → open a pull request → review → merge to `main` → final QA and production publishing in Manus.
- The local remote named `user_github` points to this GitHub repository. The default `origin` remote is the managed WebDev deployment repository and should not be changed.

See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) for the full workflow.

## Deployment and publishing

The production website and its domains are managed through Manus/WebDev. GitHub is the collaboration and version-control system. A GitHub merge does **not** automatically publish to `orya.global`.

For now, use GitHub pull requests for review and Manus for final desktop/mobile QA and production publishing.

## Design guardrails

ORYA uses the **Orbital Noir** system:

- Deep void-black base with signal-white, graphite, lunar, and cool-signal accents
- Future-ready, editorial, precise, and confident—not generic corporate or neon cyberpunk
- Use transform and opacity for motion; honor `prefers-reduced-motion`
- Keep primary CTAs clear, mobile-friendly, and accessible by keyboard
- Do not add em dashes to user-facing copy

See [`docs/CODEBASE_MAP.md`](docs/CODEBASE_MAP.md) before changing shared styles or interactions.
