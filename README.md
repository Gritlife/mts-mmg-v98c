# TeamPulse — Internal Dashboard

An internal analytics and team metrics dashboard built with TanStack Start and deployed on Netlify.

## Features

- **Revenue tracking** — year-over-year monthly revenue bar chart
- **User activity** — weekly active users and new signup trends
- **Traffic channels** — doughnut chart of acquisition sources
- **Team performance radar** — multi-dimensional scores across Engineering, Design, and Product
- **Task completion** — horizontal bar chart comparing completion vs. sprint targets per team
- **Activity feed** — real-time log of recent team actions and milestones
- **Top performers** — leaderboard with score bars and role badges
- **KPI stat cards** — six headline metrics with trend indicators

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR) |
| Routing | TanStack Router v1 (file-based) |
| Frontend | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Charts | Chart.js 4 + react-chartjs-2 |
| Icons | Lucide React |
| Language | TypeScript 5.7 (strict) |
| Deployment | Netlify |

## Getting Started

```bash
npm install
npm run dev        # Start dev server on port 3000
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Build

```bash
npm run build      # Production build
```

Netlify handles deployment automatically via `netlify.toml`.
