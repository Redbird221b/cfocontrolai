# CFO Control AI

Production-ready React + TypeScript + Tailwind project for the CFO Control AI landing page and interactive sales deck.

## Routes

- `/` — landing page
- `/deck` — interactive 16:9 presentation
- `/deck?print=1` — print/PDF presentation mode
- `/privacy` — privacy placeholder

## Setup

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Environment

Copy `.env.example` to `.env` and adjust:

- `VITE_CONTACT_EMAIL`
- `VITE_CONTACT_PHONE`
- `VITE_TELEGRAM_PHONE`
- `VITE_TELEGRAM_USERNAME`
- `VITE_TELEGRAM_URL`
- `VITE_BOOKING_URL`
- `VITE_PUBLIC_SITE_URL`

The current Release 0 site is frontend-only and does not submit lead forms. Commercial CTAs open Telegram. By default they point to `https://t.me/redbird221b`; override `VITE_TELEGRAM_USERNAME` or `VITE_TELEGRAM_URL` if needed.

## Deck Export

The deck has a working browser print mode through `/deck?print=1` and the `Экспорт PDF` button.

If Playwright is installed with a browser available, run:

```bash
npm run export:deck
```

The script writes `dist/cfo-control-deck.pdf`.

## GitHub Pages

This repo is configured for GitHub Pages through `.github/workflows/deploy-pages.yml`.

Expected public URL for repository `Redbird221b/cfocontrolai`:

```text
https://redbird221b.github.io/cfocontrolai/
```

Push to `main`; the workflow builds `dist`, uploads it to Pages, and adds `404.html` as an SPA fallback so `/deck` and `/privacy` work when opened directly.

## Content

Editable sales content lives in:

- `src/content/landing.ts`
- `src/content/deck.ts`
- `src/content/faq.ts`
- `src/content/sources.ts`
- `src/config/brand.ts`
- `src/config/contact.ts`

ROI formulas live in `src/lib/roi.ts` and are covered by `src/tests/roi.test.ts`.
