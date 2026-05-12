# AGENTS.md

This document describes the project architecture, conventions, and key decisions for AI agents working on this codebase.

## Project Overview

**TeamPulse** is an internal analytics dashboard that visualises team metrics, revenue trends, and activity. It uses mock data (no backend/database required) and is deployed on Netlify via TanStack Start.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR, file-based routing) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Charts | Chart.js 4 + react-chartjs-2 |
| Icons | Lucide React |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
public/                   Static assets (favicon, logos)
src/
  routes/
    __root.tsx            Root HTML shell, <head> metadata, global styles import
    index.tsx             Main dashboard page (all charts & widgets live here)
  styles.css              Tailwind 4 import + base body/code fonts
  router.tsx              TanStack Router setup (scroll restoration)
netlify.toml              Build command, publish dir, dev server config
vite.config.ts            Vite plugins: TanStack Start, Tailwind, Netlify
tsconfig.json             TypeScript with @/* alias for src/*
```

## Key Architecture Decisions

### Single-page dashboard
All chart data, stat cards, activity feed, and performer leaderboard live in `src/routes/index.tsx`. This keeps the implementation simple while the data is mock. If real data is needed, extract each section into a component and fetch via a TanStack Start loader or server function.

### Chart registration
All Chart.js components (including `RadialLinearScale` for the Radar chart) are registered at module level in `index.tsx` before any chart is rendered. Adding a new chart type requires registering the relevant scale/element here.

### Hydration guard
Charts are rendered only after the component mounts (`useState(false)` + `useEffect`) to avoid SSR/client mismatch from Chart.js's canvas dependency.

### Mock data
All data arrays are defined as constants at the top of `index.tsx`. To swap in real data, replace these constants with values returned from a loader or server function — the chart dataset shape is unchanged.

## Chart Types in Use

| Chart | Purpose |
|-------|---------|
| Bar (grouped) | Monthly revenue — this year vs. last year |
| Line (multi-series, filled) | Weekly active users + new signups |
| Doughnut | Traffic by acquisition channel |
| Radar | Team performance across 6 dimensions |
| Bar (horizontal) | Task completion vs. sprint target by team |

## Routing Conventions

- File-based routing via TanStack Router
- `__root.tsx` — wraps every page; set page `<title>` here
- `index.tsx` — `/` route
- `api.*.ts` files become Netlify Functions (e.g. `api.metrics.ts` → `/api/metrics`)

## Styling Conventions

- Tailwind CSS utility classes throughout
- Rounded-2xl cards with `shadow-sm border border-slate-100` is the established card style
- Color palette: indigo (primary), emerald (success/up), amber (warning), rose/pink (danger/accent/down), sky (info), violet/purple (secondary)
- Gradient icons: `bg-gradient-to-br` on small colored containers

## Adding Features

1. **New chart** — import the Chart.js type, register it, add dataset constant, render in JSX
2. **New page** — create `src/routes/my-page.tsx` with `createFileRoute('/my-page')({...})`
3. **API endpoint** — create `src/routes/api.my-endpoint.ts` (see `.agents/skills/tanstack-start-api-routes/SKILL.md`)
4. **Persistent data** — use Netlify Database via `@netlify/database` + Drizzle ORM (see `netlify-database` skill)

## Application Name

The app is named **TeamPulse**. It appears in:
- `src/routes/__root.tsx` — `<title>` tag
- `src/routes/index.tsx` — header bar brand name

Search for `TeamPulse` in `src/` to update it everywhere.
