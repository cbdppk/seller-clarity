# Person A Guide — Product and Integration Lead

You own the app flow.
You are the person who makes sure the demo works from start to finish.

## You own
- repo setup
- Home screen
- integration of Home → API → Results
- merge decisions
- final deployment
- final bug triage

## Your files
- `app/page.tsx`
- `app/results/page.tsx`
- `components/home/*`
- some integration touches in `lib/storage.ts`

## What you must wait for

### Wait for Commit 1
You cannot start before the repo exists.

### Wait for Commit 2 before doing final integration
You need the fixed contract from:
- `lib/contracts.ts`
- `lib/sampleInputs.ts`

You **can** start layout sketches before Commit 2 is merged, but do not lock the form submission shape yet.

## What you can do in parallel after Commit 2
- build Home screen
- build mobile layout
- add sample chips
- add textarea and button
- add loading state shell
- prepare navigation to Results

## Your sequence

### Task A1
Build the Home screen shell.

### Task A2
Add textarea state and sample chip fill behavior.

### Task A3
Add Analyze button and loading UI.

### Task A4
Once Person B and Person C are ready, wire Home → API → Results.

### Task A5
Take merge control and keep the happy path stable.

## Do not do
- do not rewrite `lib/contracts.ts` without team agreement
- do not add auth
- do not add a database
- do not add extra pages
- do not wait for perfect backend before building UI

## Definition of done for you
You are done when:
- the Home screen looks good on mobile
- Analyze triggers the flow
- Results receive data and render
- the demo path works twice in a row without confusion

## Prompt for you
Use this with Cursor:

```text
Create a mobile-first Next.js App Router + TypeScript hackathon MVP for a seller clarity app. Build the Home screen and Results shell using Tailwind. Optimize for small screens. Home must include app name, one-line value proposition, textarea for messy sales notes, sample chips, Analyze button, helper text, and privacy note. Keep the code modular and easy for teammates to integrate with a shared AnalysisResult contract.
```
