# 11 — Master Phase Prompt Sheet

This file is the single prompt sheet for the whole team.
Use it together with:
- `docs/10-PHASE-COMMIT-OWNER-MAP.md`
- `docs/06-COORDINATOR-PLAYBOOK.md`
- each person's playbook

---

## Where to put the skills

Put the skills inside the repo at:

```text
seller-clarity/
  .agents/
    skills/
      nextjs-mobile-flow/
        SKILL.md
      schema-first-analysis/
        SKILL.md
      recharts-demo-polish/
        SKILL.md
      git-pr-coordination/
        SKILL.md
```

That means:
- `.agents` is at the **repo root**
- `skills` is inside `.agents`
- each skill has its own folder
- each folder contains a file named exactly `SKILL.md`

For this project, the skills already belong here:
- `.agents/skills/nextjs-mobile-flow/SKILL.md`
- `.agents/skills/schema-first-analysis/SKILL.md`
- `.agents/skills/recharts-demo-polish/SKILL.md`
- `.agents/skills/git-pr-coordination/SKILL.md`

If you use Cursor/Codex/another coding agent, open the repo root and explicitly tell it to read the skill file(s) before making changes.

---

## Team rule before any prompt

Every prompt should start by telling the agent which skill files to use.

Use this opening pattern:

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/<skill-1>/SKILL.md
- .agents/skills/<skill-2>/SKILL.md
Also follow the current phase and commit ownership from docs/10-PHASE-COMMIT-OWNER-MAP.md.
Do not work outside the assigned files for this phase.
```

---

# Phase map

## Phase 0 — Environment and repo bootstrap
- Commit: 1
- Owner: Person A
- Others: wait, install tools, clone repo after push

## Phase 1 — Shared contract and sample inputs
- Commit: 2
- Owner: Person B
- Others: can read docs and sketch only, but final implementation waits for this commit

## Phase 2A — Home screen
- Commit: 3
- Owner: Person A
- Can run in parallel with: Phase 2B and Phase 2C

## Phase 2B — Analysis route mock
- Commit: 4
- Owner: Person B
- Can run in parallel with: Phase 2A and Phase 2C

## Phase 2C — Results UI and charts
- Commit: 5
- Owner: Person C
- Can run in parallel with: Phase 2A and Phase 2B

## Phase 3 — Integration
- Commit: 6
- Owner: Person A
- Others: no major rewrites; only fix bugs in their owned areas

## Phase 4A — Real AI reliability
- Commit: 7+
- Owner: Person B
- Starts after: Phase 3 works end-to-end

## Phase 4B — Polish and demo support
- Commit: 7+
- Owner: Person C
- Starts after: Phase 3 works end-to-end

## Phase 5 — Final stabilization and deploy
- Final commit(s)
- Owner: Person A leads, B and C support

---

# Person A — Product + Integration prompt flow

## Person A knowledge base
Before coding, Person A must understand:
- app is mobile-first
- flow is text-first, image-second
- app is **not** a full management system
- Person A owns user flow and final integration
- Person A should not redesign the data contract alone

Read first:
- `.agents/skills/nextjs-mobile-flow/SKILL.md`
- `.agents/skills/git-pr-coordination/SKILL.md`
- `docs/10-PHASE-COMMIT-OWNER-MAP.md`

## What Person A should let AI do
- scaffold page sections
- build card layouts
- build loading states
- wire form submission
- refactor UI structure

## What Person A must decide personally
- what stays in MVP
- final user flow
- file ownership boundaries
- merge timing
- when to cut features

---

## Person A — Phase 0 / Commit 1 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 0, Commit 1, owned by Person A.
Only do the bootstrap and repo-safe setup for this phase.

Task:
Prepare the Next.js App Router + TypeScript mobile-first seller clarity app for hackathon work.
Set up the project so the team can run it locally without confusion.

Requirements:
- Keep the app mobile-first.
- Keep the architecture simple.
- Do not add auth, database, roles, or inventory.
- Keep the main flow as Home -> Analyze -> Results.
- Use shared files under /lib and UI under /app and /components.
- Make no assumptions about the final AI contract beyond placeholder-safe structure.

Deliverables for this phase:
- project runs locally
- clean base layout
- simple README setup steps
- no broken imports
- no extra features

Output:
1. explain what files you will create or edit
2. then produce the code changes
3. then list the exact npm commands to run
```

## Person A — Phase 2A / Commit 3 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 2A, Commit 3, owned by Person A.
This phase starts only after Commit 2 is merged.
Do not change /lib/contracts.ts.

Task:
Build the Home screen for the seller clarity app.

Home screen must include:
- app name
- one-line value proposition for small sellers in Ghana
- textarea for messy sales notes
- optional image upload placeholder only
- sample chips to load sample inputs
- primary Analyze button
- short helper text
- short privacy note
- clean mobile-first spacing

Rules:
- use the shared contract assumptions from /lib/contracts.ts but do not edit it
- optimize for phone screens first
- do not wire the final API yet unless already stable
- do not add extra pages

Output:
1. explain component breakdown
2. generate the page and components
3. mention any dependency on Person B or Person C
```

## Person A — Phase 3 / Commit 6 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 3, Commit 6, owned by Person A.
Only integrate. Do not redesign the architecture.

Task:
Wire the Home screen to POST to /api/analyze, then render or navigate to the Results view using the returned AnalysisResult data.

Requirements:
- show loading state
- show understandable error state
- preserve a happy path that always works with sample data if the API fails
- render warnings if they exist
- use localStorage only if it simplifies results persistence
- do not change the response shape from /lib/contracts.ts

Output:
1. explain integration approach
2. implement the wiring
3. list what Person B and Person C must verify after merge
```

## Person A — Phase 5 / Final stabilization prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
- .agents/skills/recharts-demo-polish/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 5, final stabilization, led by Person A.
Do not add new features.

Task:
Polish the end-to-end app for demo readiness.
Focus on:
- happy path stability
- mobile spacing
- navigation clarity
- removing weak or broken UI
- making the wow moment obvious in under 10 seconds

Output:
1. identify weak points
2. make only high-impact demo-safe improvements
3. provide a short test checklist for the coordinator
```

---

# Person B — AI Pipeline prompt flow

## Person B knowledge base
Before coding, Person B must understand:
- API output must be stable and predictable
- all output must match `/lib/contracts.ts`
- warnings are better than fake certainty
- this is schema-first, not freestyle text generation
- image support is optional and secondary

Read first:
- `.agents/skills/schema-first-analysis/SKILL.md`
- `.agents/skills/git-pr-coordination/SKILL.md`
- `docs/10-PHASE-COMMIT-OWNER-MAP.md`

## What Person B should let AI do
- draft Zod schema
- draft route handler boilerplate
- generate structured prompt templates
- propose parsing helpers
- generate test cases from messy notes

## What Person B must decide personally
- final contract compliance
- what counts as uncertainty
- what becomes a warning
- whether a field should be omitted or included
- how strict validation should be

---

## Person B — Phase 1 / Commit 2 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/schema-first-analysis/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 1, Commit 2, owned by Person B.
This phase unblocks the whole team.

Task:
Create the shared team contract files:
- /lib/contracts.ts
- /lib/sampleInputs.ts
- /lib/prompts.ts

Requirements:
- define a minimal SaleRecord type
- define a minimal AnalysisResult type
- keep the shape simple for UI and charts
- sample inputs should reflect realistic Ghanaian small seller notes
- prompts must be uncertainty-aware and schema-first
- do not over-design the schema

Output:
1. explain the shared contract in plain English
2. generate the three files
3. list what Person A and Person C can safely build after this is merged
```

## Person B — Phase 2B / Commit 4 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/schema-first-analysis/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 2B, Commit 4, owned by Person B.
This phase can run in parallel with Commit 3 and Commit 5.
Do not change the shared contract unless the coordinator approves.

Task:
Implement /app/api/analyze/route.ts as a stable mock-first analysis endpoint.

Requirements:
- input shape: { text?: string, imageBase64?: string }
- output shape: AnalysisResult
- return mock-safe structured data first
- support warnings
- handle empty input safely
- keep code simple and explainable

Output:
1. explain route behavior
2. generate the route code
3. list test cases the team should run manually
```

## Person B — Phase 4A / Real AI reliability prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/schema-first-analysis/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 4A, owned by Person B.
Only start after Phase 3 works end-to-end.
Do not break the mock fallback path.

Task:
Upgrade the analysis endpoint from mock-only to real LLM-backed structured analysis.

Requirements:
- keep the same AnalysisResult output shape
- use schema validation, e.g. Zod
- use uncertainty warnings for missing or unclear fields
- handle Ghana cedi formats like GH¢, GHS, cedis, and plain numbers where context is clear
- handle messy WhatsApp-style seller notes
- output only structured JSON-compatible data
- preserve a fallback path if the model response is invalid

Output:
1. explain the reliability strategy
2. generate the updated route logic and prompt template
3. list the exact risks the coordinator should test before merge
```

---

# Person C — UI Polish + Demo prompt flow

## Person C knowledge base
Before coding, Person C must understand:
- charts support the story; they are not the story
- mobile readability matters more than fancy visuals
- sample data path must always work
- empty/loading/error states are part of the product
- the pitch and wow moment are part of this role

Read first:
- `.agents/skills/recharts-demo-polish/SKILL.md`
- `.agents/skills/git-pr-coordination/SKILL.md`
- `docs/10-PHASE-COMMIT-OWNER-MAP.md`

## What Person C should let AI do
- generate chart components
- generate summary cards
- write helper text
- suggest empty/loading/error states
- draft demo script

## What Person C must decide personally
- which chart to hide if data is weak
- what copy is too long on mobile
- what layout feels clean on phone
- what the demo should emphasize first

---

## Person C — Phase 2C / Commit 5 prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/recharts-demo-polish/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 2C, Commit 5, owned by Person C.
This phase can run in parallel with Commit 3 and Commit 4.
Do not invent new API fields beyond /lib/contracts.ts.

Task:
Build the Results UI and demo polish layer for the seller clarity app.

Requirements:
- summary cards for key totals
- warnings card if warnings exist
- record list or cards that work on small screens
- bar chart for revenue by item
- pie or donut chart for channel share only if channel data exists
- empty, loading, and error states
- short seller-friendly microcopy
- support sample data flow

Output:
1. explain the UI sections in order of importance
2. generate the components
3. list any assumptions being made about AnalysisResult
```

## Person C — Phase 4B / Demo support prompt

```text
Before making changes, read and follow these repo-local skills:
- .agents/skills/recharts-demo-polish/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md
Also follow docs/10-PHASE-COMMIT-OWNER-MAP.md.
You are working on Phase 4B, owned by Person C.
Only start after Phase 3 works end-to-end.
Do not change data contracts.

Task:
Polish the seller-facing results experience and prepare the demo narrative.

Requirements:
- improve spacing and readability on mobile
- shorten any copy that feels too technical
- make empty/loading/error states helpful
- ensure charts hide gracefully when data is missing
- create a 45-second demo script
- create a sample walkthrough that always works

Output:
1. identify top UX improvements
2. apply only demo-safe changes
3. write the final 45-second pitch script
```

---

# Coordinator note on dependencies

## What must wait
- Nobody starts final UI assumptions before Commit 2 is merged.
- Person A cannot complete Phase 3 until Person B and Person C have merged Phases 2B and 2C.
- Person B Phase 4A and Person C Phase 4B start only after Phase 3 is stable.

## What can run in parallel
After Commit 2 is merged:
- Person A can do Commit 3
- Person B can do Commit 4
- Person C can do Commit 5

---

# Quick message to send the team

```text
Use the repo-local skills before any major prompt:
- Person A: .agents/skills/nextjs-mobile-flow/SKILL.md + .agents/skills/git-pr-coordination/SKILL.md
- Person B: .agents/skills/schema-first-analysis/SKILL.md + .agents/skills/git-pr-coordination/SKILL.md
- Person C: .agents/skills/recharts-demo-polish/SKILL.md + .agents/skills/git-pr-coordination/SKILL.md

Work by phases, not random tasks.
Check docs/10-PHASE-COMMIT-OWNER-MAP.md before starting.
Do not change /lib/contracts.ts without approval.
```

