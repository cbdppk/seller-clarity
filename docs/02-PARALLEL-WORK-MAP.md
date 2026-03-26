# Parallel Work Map

This file answers one question clearly:

**Who can continue now, and who must wait?**

---

## Stage 1 — Repo exists

### Status needed
- Commit 1 merged

### Who can continue?
- Person B can start `lib/contracts.ts`, `lib/sampleInputs.ts`, `lib/prompts.ts`

### Who must wait?
- Person A should not build final form wiring yet
- Person C should not build final charts yet

### Why?
Because the contract shape is not fixed yet.

---

## Stage 2 — Contract is fixed

### Status needed
- Commit 2 merged

### Who can continue in parallel?
- Person A → Home screen shell
- Person B → Mock analysis route
- Person C → Results screen and charts from sample JSON

### Who must wait?
- Nobody. This is your first big parallel phase.

### Why?
The shared contract now protects everyone from building against different assumptions.

---

## Stage 3 — Parallel build block

### Person A can continue if
- `lib/contracts.ts` exists
- sample input shape is stable

### Person B can continue if
- `lib/contracts.ts` exists
- prompt template exists

### Person C can continue if
- `lib/contracts.ts` exists
- sample JSON example exists

### Important note
During this stage:
- Person A does **not** wait for the real AI route
- Person C does **not** wait for live API data
- Person B does **not** wait for final UI polish

This is the biggest time-saving part of the whole project.

---

## Stage 4 — Integration checkpoint

### Status needed
- Commit 3 ready enough to submit
- Commit 4 returns stable JSON
- Commit 5 renders stable JSON

### Who can continue?
- Person A takes over integration

### Who must wait?
- Person B should pause major route rewrites until Person A confirms the happy path
- Person C should pause major layout rewrites until Person A confirms the happy path

### Why?
Once the three parallel pieces meet, too many simultaneous changes can create chaos.

---

## Stage 5 — Happy path confirmed

### Status needed
- Commit 6 merged
- text input → API → results flow works

### Who can continue in parallel?
- Person B → real AI extraction, Zod validation, warnings
- Person C → polish, edge states, microcopy, demo script
- Person A → merge owner, bug fixes, deployment

### Who must wait?
- Nobody, but large refactors are banned now

---

## Stage 6 — Final hour rules

### Allowed
- copy changes
- spacing changes
- bug fixes
- prompt improvements
- demo script improvements
- backup sample path checks

### Not allowed
- new pages
- auth
- database
- major route rewrite
- major contract rewrite
- full image pipeline

---

## Quick table

| Stage | Person A | Person B | Person C |
|---|---|---|---|
| After Commit 1 | Wait for contract | Start contract files | Wait for contract |
| After Commit 2 | Start Home UI | Start route | Start charts/results |
| During Commits 3/4/5 | Keep building | Keep building | Keep building |
| Before Commit 6 | Prepare integration | Pause big rewrites | Pause big rewrites |
| After Commit 6 | Integrate, deploy, fix | Real AI + validation | Polish + demo |

---

## Red flags

Stop and sync immediately if:
- someone changes `AnalysisResult` without telling the team
- charts stop matching the API shape
- route returns different field names from `contracts.ts`
- two people edit the same major file at the same time
- a teammate starts building a new feature not in the MVP
