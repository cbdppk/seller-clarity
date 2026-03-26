# 12 — Agent Done Checklist

Use this file as the final check against every section, phase, commit, and task.

## How to use this checklist

Before you accept any agent output, ask:

1. **What phase is this work for?**
2. **What commit or task does it belong to?**
3. **What files should have changed?**
4. **What dependencies had to be finished first?**
5. **What exact definition of done are you claiming?**
6. **Show me what is complete, what is partial, and what is not done.**
7. **Show me what still blocks the next person.**

---

## Global guardrails (ask every time)

- Does this still match the MVP: **messy sales notes in, structured seller clarity out**?
- Did you avoid adding out-of-scope features such as auth, database, inventory, roles, payment flows, or full ERP logic?
- Does the work still support the research direction: **mobile-first, text-first, image-second**?
- Did you keep the app for **informal sellers in Ghana**, not a generic accounting tool?
- Did you follow the shared contract in `lib/contracts.ts`?
- Did you keep changes limited to the files for your role?
- Did you avoid breaking another teammate’s area?
- Did you update docs/comments only when necessary?
- Did you test the happy path?
- Can this be demoed today?

---

## Universal "done" prompt to give any agent

```text
Before I accept this work, answer using this exact structure:

Phase:
Commit:
Owner:
Files changed:
Depends on:
What is fully done:
What is partially done:
What is not done:
What still blocks the next phase:
How you tested it:
What I should manually verify now:
Risks or edge cases left:
```

---

## Phase 0 — Environment and repo setup

### Goal
Everyone can run the same app locally and pull from the same repo.

### Ask the agent
- Did you set up the project from the starter without breaking it?
- Can a teammate clone the repo, run `npm install`, run `npm run dev`, and see the app?
- Did you keep the root structure intact?
- Are the `.agents/skills` folders in the correct location?
- Are the docs present and readable?
- Did you avoid changing product code before environment setup was stable?

### Must be true before Phase 1
- Repo exists on GitHub
- Everyone can clone it
- Everyone can run it locally
- Main branch is working
- Starter app opens in browser

### Manual checks
- `npm install` succeeds
- `npm run dev` succeeds
- app loads at `localhost:3000`
- no immediate console crash

### Not done if
- only one teammate can run it
- packages are missing
- app crashes on boot
- repo structure is inconsistent

---

## Phase 1 — Shared contract and core team files

### Goal
Lock the shared data shape so all teammates can work in parallel.

### Files
- `lib/contracts.ts`
- `lib/sampleInputs.ts`
- `lib/prompts.ts`

### Ask the agent
- Did you define `SaleRecord` and `AnalysisResult` clearly?
- Does every field serve the hackathon MVP only?
- Did you avoid overengineering the contract?
- Can the API return this shape reliably?
- Can the UI render this shape directly?
- Did you add at least 3 realistic sample inputs?
- Did you keep prompts schema-first and Ghana-seller aware?

### Must be true before Phase 2
- `lib/contracts.ts` is merged
- sample inputs exist
- team agrees not to change the contract casually
- Person A and Person C can now build against this shape

### Manual checks
- types compile
- sample input file exports cleanly
- prompt file exists
- no mismatch between type names and UI expectations

### Not done if
- contract is still changing every hour
- fields are unclear or redundant
- UI and API are assuming different shapes

### Universal contract verification prompt

```text
Check whether `lib/contracts.ts` is stable enough for the rest of the team.
Report:
1. the exact exported types,
2. whether they match the MVP,
3. whether the UI can safely consume them,
4. whether the API can safely return them,
5. what should be removed if anything is overbuilt.
Do not add new features. Just validate stability.
```

---

## Phase 2A — Home screen (Person A)

### Goal
Build the input screen for small-screen usage.

### Files
- `app/page.tsx`
- `components/home/*`

### Ask the agent
- Is the Home screen truly mobile-first?
- Does it show app name, one-line value prop, textarea, sample chips, analyze button, helper text, and privacy note?
- Is the layout readable on a small screen?
- Did you avoid adding extra screens or extra flows?
- Does the Analyze button have a loading-friendly setup?
- Is this using the shared contract and sample flow assumptions?

### Depends on
- Phase 1 merged

### Must be true before Phase 3
- user can type or paste sales notes
- sample chips populate example text
- layout feels app-like on mobile
- CTA is clear

### Manual checks
- open in narrow viewport
- textarea usable
- sample chip click works
- no overflow/layout breaks

### Not done if
- desktop-first layout
- confusing copy
- no clear CTA
- depends on unfinished API to render the page itself

### Ask-before-accept prompt

```text
Review the Home screen against this checklist:
- mobile-first layout
- clear app name and one-line value proposition
- textarea for messy seller notes
- sample chips
- primary Analyze CTA
- helper text and privacy note
- no out-of-scope features
Tell me exactly what is done, what is weak, and what still needs polish before integration.
```

---

## Phase 2B — API route and schema reliability (Person B)

### Goal
Return a stable `AnalysisResult` object first with mock data, then later with real LLM output.

### Files
- `app/api/analyze/route.ts`
- `lib/contracts.ts`
- `lib/prompts.ts`
- optionally `lib/utils.ts`

### Ask the agent
- Does the route accept the correct input shape?
- Does it return a valid `AnalysisResult`?
- Did you start with mock output before real model logic?
- Are warnings handled?
- Are Ghana cedi formats handled?
- Is the prompt schema-first?
- Is the response safe even when extraction is uncertain?
- Did you avoid building a full OCR/backend system?

### Depends on
- Phase 1 merged

### Must be true before Phase 3
- POST route works
- route returns stable shape
- no UI-breaking response format changes
- warnings can be rendered safely

### Manual checks
- POST request returns JSON
- shape matches contract
- missing text handled gracefully
- fake response works even before real model

### Not done if
- response shape changes constantly
- invalid JSON possible
- UI would crash on warnings/missing fields
- route is tied to one sample only

### Ask-before-accept prompt

```text
Validate `/app/api/analyze/route.ts` against `lib/contracts.ts`.
Check:
1. accepted input shape,
2. exact response shape,
3. fallback behavior,
4. warning behavior,
5. whether the output is stable enough for Person A and Person C to integrate against.
Give me fully done / partially done / not done.
```

---

## Phase 2C — Results UI and charts (Person C)

### Goal
Render the returned result cleanly and clearly on mobile.

### Files
- `app/results/page.tsx`
- `components/results/*`
- `components/charts/*` if used

### Ask the agent
- Does the Results screen show summary cards, warnings, records, charts, and insights?
- Is the layout readable on phone width?
- Do charts gracefully hide when data is missing?
- Are empty/loading/error states included?
- Did you use sample JSON to avoid blocking on the API?
- Is the copy understandable by non-technical sellers?

### Depends on
- Phase 1 merged
- ideally mock shape from Phase 2B known

### Must be true before Phase 3
- results screen renders sample result end-to-end
- charts work with contract shape
- empty/loading/error states exist

### Manual checks
- cards render on narrow screen
- charts do not overflow
- insights are readable
- warnings section works if present

### Not done if
- charts break on small screen
- cards are desktop-sized
- assumes fields not in contract
- no fallback or error state

### Ask-before-accept prompt

```text
Review the Results screen against the shared contract.
Check summary cards, warnings, records rendering, charts, insights, and mobile readability.
Report what is complete, what still depends on integration, and what would break on small screens.
```

---

## Phase 3 — Integration (Person A)

### Goal
Wire Home → API → Results and make the happy path work.

### Files
- `app/page.tsx`
- `app/results/page.tsx`
- integration helpers/state files

### Ask the agent
- Does the Analyze button POST to `/api/analyze`?
- Is there a loading state?
- Is the result passed safely to the Results screen?
- Is localStorage or another simple mechanism used correctly if needed?
- Are warnings shown?
- Does sample flow always work?
- Did you avoid rewriting the API or charts during integration?

### Depends on
- Phase 2A done
- Phase 2B stable
- Phase 2C stable enough to render result shape

### Must be true before Phase 4
- user can paste text and get to a result
- UI no longer depends on manual JSON insertion
- sample flow still works
- warnings and errors do not crash the app

### Manual checks
- paste sample text
- click Analyze
- loading appears
- results page shows data
- refresh behavior acceptable

### Not done if
- happy path breaks
- only sample mode works
- API works but UI never navigates
- warnings cause layout or type errors

### Ask-before-accept prompt

```text
Audit the integration path from Home to API to Results.
Tell me:
- whether the happy path works,
- what exact user actions were tested,
- whether sample data still works,
- whether warnings and errors are handled,
- what still blocks demo readiness.
```

---

## Phase 4A — Real AI output, validation, reliability (Person B)

### Goal
Upgrade from mock results to real structured extraction without breaking the contract.

### Files
- `app/api/analyze/route.ts`
- `lib/prompts.ts`
- validation/helpers

### Ask the agent
- Are you still returning the exact `AnalysisResult` shape?
- Are you using schema-first prompting?
- Are you validating output before returning it?
- Are you limiting insights to the MVP?
- Are you avoiding invented profit/margin claims?
- Do you handle uncertain extraction with warnings?
- Is the route still fast enough for demo usage?

### Depends on
- Phase 3 working first

### Must be true before Phase 5
- real model output is stable enough for demo
- malformed output does not break UI
- warnings appear instead of crashes

### Manual checks
- test with 2–3 messy seller inputs
- verify output shape remains stable
- verify warnings appear when ambiguous
- verify totals and top items are plausible

### Not done if
- model output breaks contract
- route returns prose instead of JSON
- UI crashes with real data

### Ask-before-accept prompt

```text
Validate the real AI extraction path.
Check:
1. strict contract adherence,
2. fallback behavior when extraction is uncertain,
3. whether the model invents unsupported fields,
4. whether warnings are used correctly,
5. whether the route is demo-safe.
Return fully done / partially done / not done.
```

---

## Phase 4B — UI polish, demo support, microcopy (Person C)

### Goal
Make the app understandable, believable, and easy to demo.

### Files
- result components
- chart components
- helper text / labels
- sample flow helpers

### Ask the agent
- Is the app visually clear in under 10 seconds?
- Are the labels plain and seller-friendly?
- Are charts readable on mobile?
- Are empty/loading/error states friendly?
- Does the sample flow make the demo bulletproof?
- Is the copy free of technical/accounting jargon?

### Depends on
- Phase 3 working

### Must be true before Phase 5
- app feels coherent
- demo path is smooth
- UI helps the story rather than confusing it

### Manual checks
- hand phone-sized preview to another person
- ask if they understand what the app does in 10 seconds
- confirm charts are readable
- confirm no dead-end buttons

### Not done if
- UI still looks like a scaffold
- copy is too technical
- demo requires explanation at every step

### Ask-before-accept prompt

```text
Review the polished UI as if you were a hackathon judge seeing it for the first time on a phone.
Tell me:
- what is immediately clear,
- what is confusing,
- what still feels unfinished,
- whether the demo path is strong,
- what 3 polish fixes would improve judge perception most.
```

---

## Phase 5 — Demo readiness and freeze

### Goal
Stop feature creep and make the demo reliable.

### Ask the agent
- Does the current build support the exact demo story?
- Which buttons or sections should be removed or hidden before demo?
- What sample input is safest to use live?
- What is the fastest backup flow if the API is slow or fails?
- What known bugs remain and are they acceptable?
- Is anything still out of scope and should be cut now?

### Must be true before final submission/demo
- one clean happy path works every time
- sample path works every time
- no major crashes
- strongest sample seller case chosen
- speaker knows the script

### Manual checks
- rehearse full flow twice
- test on mobile width
- test with sample input
- test with one real messy input
- confirm fallback path

### Not done if
- team is still adding features
- no backup demo path
- known crashes still present in main flow

### Ask-before-accept prompt

```text
Act as a final hackathon QA reviewer.
Check whether this build is demo-ready.
Return:
- green items,
- yellow risks,
- red blockers,
- what to cut immediately,
- the safest demo path,
- the backup path if the AI call fails.
```

---

## Commit-level acceptance checklist

Use these for every PR.

### Commit 1 — Bootstrap
- app runs locally
- no broken starter
- dependencies installed
- repo clean

### Commit 2 — Contract and samples
- `lib/contracts.ts` stable
- `lib/sampleInputs.ts` usable
- `lib/prompts.ts` exists
- no overbuilt schema

### Commit 3 — Home UI
- mobile-first
- textarea works
- sample chips work
- CTA clear

### Commit 4 — Analyze API
- POST route exists
- stable output shape
- mock response works
- warnings possible

### Commit 5 — Results UI
- cards work
- charts work
- states exist
- renders sample JSON

### Commit 6 — Integration
- Home → API → Results works
- loading works
- sample flow works
- warnings visible

### Commit 7+ — Real AI + polish
- real model stable
- schema validated
- UI polished
- demo path safe

---

## Dependency questions to ask the agent every time

- What had to be merged before this could be built?
- What teammate are you unblocking with this work?
- If I merge this now, what can the next person start immediately?
- If I do not merge this now, who remains blocked?
- Did you change any shared file another person depends on?

---

## Scope-control questions to ask every agent

- Is this still inside the hackathon MVP?
- What did you deliberately not build?
- Did you remove complexity or add complexity?
- Could this be demoed in 30–60 seconds?
- If we are short on time, what can be cut with no damage to the main story?

---

## Final master review prompt

```text
Review this work against our hackathon plan for the AI seller clarity app.
Use this structure:

1. Phase and commit this belongs to
2. Files that should have changed
3. Whether it follows the MVP (mobile-first, text-first, image-second)
4. Whether it follows the shared contract in `lib/contracts.ts`
5. What is fully done
6. What is partially done
7. What is not done
8. What blocks the next person
9. What I should manually test right now
10. Whether this should be merged now, fixed first, or cut

Be strict. Do not say "done" unless it is truly ready for the next phase.
```

---

## One-line rule

If the work does not clearly improve **messy sales notes in → clear seller insight out**, question it.
