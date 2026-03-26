# Start Here

This folder tells the team exactly how to begin, in what order, and who can work in parallel.

## The project goal

Build a **mobile-first seller clarity app** for the hackathon:
- seller pastes messy sales notes
- app returns structured records
- app shows charts and 2–3 simple insights

## The rule for this hackathon

Do **not** build a full management system.
Do **not** add auth, database, inventory, or payments.
Do **not** start with image OCR.

Build:
1. text input
2. analysis route
3. result cards
4. charts
5. insights
6. optional image input only if the text path already works

## Read these files in this order

1. `docs/01-COMMIT-PLAN.md`
2. `docs/02-PARALLEL-WORK-MAP.md`
3. `docs/03-PERSON-A.md`
4. `docs/04-PERSON-B.md`
5. `docs/05-PERSON-C.md`
6. `TEAM_SETUP.md`
7. `GIT_WORKFLOW.md`
8. `prompts/README.md`

## Non-negotiables

- One repo
- One `main`
- One short-lived feature branch per person
- Merge early
- No major work outside the agreed MVP
- `lib/contracts.ts` is the shared contract; do not change it casually

## Fastest safe order

### Must happen first
- Commit 1: bootstrap app
- Commit 2: shared contract + sample inputs + base prompt template

### After Commit 2, work can split
- Person A: home flow and integration shell
- Person B: mock analysis route, then real AI route
- Person C: result cards, charts, empty/loading/error states using sample JSON

## What counts as done

The app is done when this works smoothly on a phone-sized screen:
1. paste messy sales notes
2. tap Analyze
3. see structured records
4. see revenue summary
5. see charts
6. see 2–3 insights
7. fallback sample data still works
