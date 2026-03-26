# Person B Guide — AI Pipeline Lead

You own the extraction brain.
Your job is to make sure the app returns stable structured data, not messy text.

## You own
- `lib/contracts.ts`
- `lib/prompts.ts`
- `lib/sampleInputs.ts`
- `app/api/analyze/route.ts`
- Zod validation
- warnings and fallback behavior

## What you must wait for

### Wait for Commit 1
You need the repo and packages first.

### After Commit 1, you start immediately
You do **not** need to wait for Person A's UI.
This is your advantage.

## What you do first

### Task B1
Create `lib/contracts.ts`.
This is the most important file for team coordination.

### Task B2
Create `lib/sampleInputs.ts`.
These help Person A and Person C keep moving even without the real AI.

### Task B3
Create `lib/prompts.ts`.
Keep prompts short, schema-first, and uncertainty-aware.

### Task B4
Build `app/api/analyze/route.ts` with a mock stable response first.

### Task B5
After integration works, swap mock logic for real AI extraction.

## What you can do in parallel after Commit 2
- improve schema
- improve prompt reliability
- support Ghana cedi formats
- add warnings for uncertain extraction
- build Zod validation

## What you must pause for

After Person A starts integration, pause major schema changes until the happy path is confirmed.
Do not rename fields casually.

## Do not do
- do not build a separate backend in Django
- do not add complex ML training
- do not return free-form text instead of structured JSON
- do not make the response shape unstable

## Definition of done for you
You are done when:
- `AnalysisResult` is stable
- the route always returns something renderable
- warnings are supported
- real AI output validates without crashing the UI

## Prompt for you
Use this with Cursor:

```text
Design a strict TypeScript type and Zod schema for a seller clarity app result. It must include records[], totals{}, topItems[], insights[] with max 3 items, and optional warnings[]. Then implement a Next.js Route Handler at /app/api/analyze/route.ts that accepts { text?: string, imageBase64?: string }, returns stable JSON, validates with Zod, and falls back gracefully on uncertain extraction. Handle GH¢, GHS, cedis, and messy WhatsApp-style shorthand.
```
