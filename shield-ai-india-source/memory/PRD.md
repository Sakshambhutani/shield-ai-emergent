# Shield AI India — 18-Month Operating Plan (PRD)

## Original problem statement
Build a polished, deployable, interactive web application "Shield AI India — 18-Month Operating Plan": an interactive strategic case presentation (not a dashboard, not slides) answering "How should Shield AI build and run its India business over the next 18 months?" Nine screens (Home → 01 Money → 02 Buyers → 03 Convergence → 04 Roadmap → 05 Operating Model → 06 Cadence → 07 KPIs → 08 MD Dashboard), each with contextual Sources & Assumptions; four evidence classes (Official / Shield AI / Industry / Modelled); Story vs Explore mode; Present mode; assumption calculator; keyboard navigation; React + TypeScript + Vite + Tailwind + React Flow + Recharts; fully static, Vercel-deployable, no backend.

## User choices
- Convert frontend to Vite + TypeScript (done; CRA removed).
- Agent does its own web research for sources.
- Internal Shield data shown as "Not publicly disclosed" (no fabricated KPI currents / RAG).

## Architecture
- `/app/frontend` — Vite 8 + React 19 + TS + Tailwind 3. `yarn start` = `vite` (port 3000), `yarn build` = `tsc --noEmit && vite build` → `dist/`.
- No backend used (FastAPI template left untouched, not required).
- Data layer (`src/data/`): `sources.ts` (≈40 sources), `claims.ts` (≈50 claims with class, confidence, interpretation, assumption, formula), `sections.ts`, `opportunities.ts`, `accounts.ts` (+ decision chains), `precedents.ts`, `budget.ts` (budget & mission trees), `roadmap.ts`, `ops.ts` (actors, decision rights, cadences, KPIs, dashboard).
- `store.tsx` — global mode / present / evidence drawer / account drawer / weights / assumptions / keyboard (←/→, Esc, P).
- Components: `Evidence.tsx` (badges, SourceButton, EvidenceDrawer), `ui.tsx`, `Shell.tsx` (nav/topbar/footer), `AccountDrawer.tsx` (+ PrecedentTag), `AssumptionCalc.tsx`.
- Sections: `src/sections/*.tsx` (9 screens).

## Core requirements (static)
- Visual-first density; evidence behind click; modelled ≠ official visually.
- Force-rank base case: 1 SCALE Army, 2 EMBED Hivemind/OEMs, 3 EXPAND Navy.
- Every figure traceable to a source or explicitly modelled with formula.

## Implemented (2026-06)
- All 9 screens, evidence drawer with per-element filtering, Story/Explore/Present modes, weight sliders + assumption calculator with Reset to Base Case, React Flow budget tree (budget/mission views, UAS explainer), decision chains, account drawers, precedents, roadmap gates, decision-rights matrix, cadence loops, KPI cards with status labels, MD dashboard.
- Iteration 3: MD Dashboard rebuilt as executive command view — 3 bet cards (status/gates/blocker, EMBED funnel, EXPAND stage track) + bet drawer; 4 North-Star outcomes with state tracks and data-class badges (Verified public / Internal baseline required / Management target / Illustrative); 4 decisions with 3-level progressive disclosure (conclusion → why/recommendation/delay → evidence); 3 active risks with leading indicators; collapsible exceptions (6) and 30/60/90; Explore-only attention-allocation simulator, capacity view, account signals; drill-down links into Roadmap/Accounts/Scorecard/Operating Model. Data in `src/data/md.ts`.
- Iteration 2 (visual-first pass): conclusion-style headlines, subheads only in Explore; sidebar renamed Thesis/Market/Accounts/Priorities/Roadmap/Operating Model/Cadence/Scorecard/MD Dashboard with question under active item; Home bets stripped to labels (detail on click); Money callouts explore-only, node panel on demand; Priorities shows top-3 only in Story (show-all toggle); Operating Model = accountability map (SVG) + column-faded D/O/C matrix; Cadence = loops + escalation/cascade arrows, inputs/attendees behind toggle; Scorecard = North Star → 5 outcomes → 8 driver KPIs tree; MD Dashboard = one gate per bet by default, scorecard strip explore-only.

## Backlog
- P1: Mobile stacked variants for bubble chart / roadmap; India mini-map for geography.
- P2: Export/print view; deep-link to a selected node via URL query.
- P2: Verify exact publication dates for a few industry sources (marked with year only).

## Deployment
- Vercel: framework Vite, root `frontend`, build `yarn build`, output `dist`. Add a SPA rewrite (`vercel.json` included).
