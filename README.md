## Team handoff files

Read these first:
- `docs/00-START-HERE.md`
- `docs/01-COMMIT-PLAN.md`
- `docs/02-PARALLEL-WORK-MAP.md`
- `docs/03-PERSON-A.md`
- `docs/04-PERSON-B.md`
- `docs/05-PERSON-C.md`

# Seller Clarity — Hackathon Starter

A mobile-first Next.js + TypeScript starter for an **AI sales assistant for informal sellers**.

## What this starter includes
- Home screen with messy-sales textarea
- Sample input chips
- Working **mock analyzer** so the app runs before you connect a real model
- Results screen with summary cards, charts, extracted records, and insights
- Shared contracts (`lib/contracts.ts`)
- Prompt templates
- Team workflow guide
- Git guide
- `.agents/skills` starter skills

## Recommended hackathon scope
Build only this:
1. Paste messy sales notes
2. Analyze
3. Show structured records
4. Show totals + 1-2 charts + 2-3 insights

Do **not** add auth, DB, roles, inventory, or payments for the hackathon MVP.

## Quick start
```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Recommended team split
- **Person A** — product, UI shell, integration, deploy
- **Person B** — AI endpoint, schema, prompt reliability
- **Person C** — charts, polish, empty/loading/error states, demo flow

Read:
- `TEAM_SETUP.md`
- `GIT_WORKFLOW.md`
- `prompts/`
- `.agents/skills/`

## To connect a real AI model later
Start with:
- `app/api/analyze/route.ts`
- `lib/prompts.ts`
- `lib/contracts.ts`

For hackathon safety, this repo already works with a mock analyzer in `lib/mockAnalyze.ts`.
