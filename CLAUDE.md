# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # ESLint
npx playwright test                        # Run all E2E tests (builds first)
npx playwright test tests/dayOnePage.spec.ts  # Run a single test file
npx playwright test --ui                   # Open Playwright UI
```

Pre-commit hooks run Prettier on all staged files via husky + lint-staged.

## Architecture

**Stack:** Next.js 14 (App Router), React 18, TypeScript, CSS Modules, D3, Serwist (PWA/service worker).

**Local-first:** All user data is stored in IndexedDB — no backend, no user accounts. The app works offline as a PWA. Two IndexedDB object stores live in `armstrong_pullup_program_db` (v4):
- `workoutsStore` — completed workout records (`TDayComplete`), keyed by `id` (UUID string)
- `weeksStore` — week progress records (`TWeek`), keyed by `number`

All IDB logic is in `src/app/lib/data/indexedDB/`. Components that use IndexedDB must be client components with `ssr: false` via `next/dynamic`.

**Route groups:**
- `src/app/(app)/program/` — the workout program pages (days 1–5) and review modal
- `src/app/(marketing)/` — landing page
- `src/app/(privacy)/privacy/` — privacy policy

**Parallel routes:** The program layout (`(app)/program/layout.tsx`) uses a `@modal` slot for the review modal, implemented as a Next.js intercepting route at `(.)review/[getData]/[index]`.

**Day types** (`TDayAbbreviation`):
- `5MES` — Five Max Effort Sets (Day 1 / Day 5 option)
- `PYRA` — Pyramid (Day 2 / Day 5 option)
- `3S3G` — Three Training Sets, Three Grips (Day 3 / Day 5 option)
- `MXTS` — Max Training Sets (Day 4 / Day 5 option)
- `SKPD` — Skipped day

Each day type has its own component subdirectory under `src/components/program/` (e.g., `fiveMaxEffortSets/`, `pyramid/`, `threeTrainingSetsThreeGrips/`, `maxTrainingSets/`).

**Program flow:** `Program.tsx` reads from IndexedDB to determine the current week and last completed day, then renders the appropriate day component. On completion, it writes a `TDayComplete` record to `workoutsStore` and updates `weeksStore`. `PastWorkouts.tsx` renders D3-based data visualizations of prior workouts.

**Path aliases:** `@/` maps to `src/app/lib/` (see tsconfig). E.g., `@/definitions` → `src/app/lib/definitions.ts`, `@/indexedDBConstants` → `src/app/lib/data/indexedDB/constants.ts`.

**Tests:** Playwright E2E tests in `tests/`, running against Desktop Firefox and Mobile Chrome (Pixel 5). Tests require a production build (`npm run build && npm run start`).
