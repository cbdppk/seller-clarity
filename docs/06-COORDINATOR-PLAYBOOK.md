# Coordinator Playbook

This file is the operating guide for the team coordinator.

Use it to keep the project moving, prevent blocking, and make sure the team builds the right thing in the right order.

---

## 1. Project goal

We are building **one clean flow only**:

**Messy sales notes in → structured seller insights out**

The app is a **mobile-first AI sales assistant for informal sellers in Ghana**.

### MVP promise
A seller pastes messy sales notes and instantly gets:
- structured records
- totals
- simple charts
- 2–3 plain-language insights

### Not in scope
Do **not** add:
- authentication
- database
- inventory
- multi-user roles
- payments
- debtor tracking
- full management system features

If a feature does not improve the demo, cut it.

---

## 2. Team roles

### Person A — Coordinator / Product / Integration Lead
Owns:
- repo setup
- merge control
- Home page
- Results page shell
- wiring UI to API
- deployment
- final demo flow

### Person B — AI Pipeline Lead
Owns:
- `lib/contracts.ts`
- `lib/prompts.ts`
- `app/api/analyze/route.ts`
- structured output validation
- warnings/fallback logic
- messy Ghana cedi parsing

### Person C — UI Polish / Demo Lead
Owns:
- charts
- results cards/table
- empty/loading/error states
- sample input flow
- helper text and microcopy
- pitch script
- QA on mobile screens

---

## 3. Coordinator rules

You are responsible for keeping the team inside scope.

### Your job is to:
- keep the MVP small
- stop random feature expansion
- make sure everyone knows what they own
- make sure work happens in the correct order
- merge early
- protect the shared contract
- protect the demo path

### Hard rules
- no one changes `lib/contracts.ts` casually
- no one rebuilds the project structure near the deadline
- no one adds big features without approval
- no one waits silently when blocked
- no one leaves integration for the end

---

## 4. Build order

This is the exact order to coordinate.

### Phase 1 — Base setup
**Owner:** Person A

Goal:
- starter opens locally
- repo exists on GitHub
- everyone can run the app

Tasks:
1. unzip starter
2. run `npm install`
3. run `npm run dev`
4. create GitHub repo
5. push starter to `main`
6. invite teammates

Nobody starts coding until everyone can run the app locally.

---

### Phase 2 — Shared contract
**Owner:** Person B

Goal:
- define the data shape everyone will build against

Files:
- `lib/contracts.ts`
- `lib/sampleInputs.ts`
- `lib/prompts.ts`

This is the main unblocker.

#### What must wait for this phase
- final results rendering assumptions
- final chart data assumptions
- final API integration

#### What can start lightly before this phase ends
- layout ideas
- visual skeletons
- placeholder cards/charts

---

### Phase 3 — Parallel build
After the shared contract is merged, all 3 people can work in parallel.

#### Person A
Build:
- `app/page.tsx`
- Home screen
- textarea input
- sample chips
- analyze button
- helper text

#### Person B
Build:
- `app/api/analyze/route.ts`
- mock API response first
- stable `AnalysisResult` shape
- warnings support

#### Person C
Build:
- `app/results/page.tsx`
- summary cards
- warnings card
- records list/cards
- charts
- empty/loading/error states

---

### Phase 4 — Integration
**Owner:** Person A

Goal:
- connect Home → API → Results

Tasks:
- submit textarea input to `/api/analyze`
- show loading state
- store result in localStorage or pass in app state
- render results page from returned JSON
- make sure sample path works even if API fails

#### During this phase
- Person B only fixes API bugs
- Person C only fixes display bugs
- nobody does major refactors

---

### Phase 5 — Final polish
After the happy path works, split again.

#### Person A
- tighten flow
- remove weak sections
- fix navigation
- deploy

#### Person B
- connect real model if time allows
- improve prompt quality
- add validation and fallback warnings

#### Person C
- improve charts
- improve spacing
- improve empty/loading/error states
- prepare pitch script
- test mobile demo path

---

## 5. Exact dependency map

### Everyone must wait for:
- starter repo to be on GitHub
- app to run locally for all teammates

### Person A should wait for:
- Person B to merge `lib/contracts.ts` before final integration

### Person C should wait for:
- Person B to merge `lib/contracts.ts` before final chart shaping

### Person B can start as soon as:
- starter runs locally

### Parallel sections:
- Home UI, API route, and Results UI can run in parallel **after** the contract is merged

### Freeze point:
- when Person A starts full integration, others stop major rewrites

---

## 6. Git workflow

### Branch names
Use short, clear branches:
- `feat/home-ui`
- `feat/analyze-route`
- `feat/results-charts`
- `fix/loading-state`
- `fix/schema-warning`

### Everyone uses this flow

```bash
git checkout main
git pull origin main
git checkout -b feat/your-branch-name
# do work
git add .
git commit -m "Short clear message"
git push origin feat/your-branch-name
```

Then open a PR.

### Merge rules
- merge early
- merge small changes
- avoid long-lived branches
- Person A controls merges unless explicitly delegated

---

## 7. Coordinator check-ins

### At kickoff
Ask each person:
- what are you owning?
- what files are you touching?
- what do you need first?
- what can block you?

### Every 45–60 minutes
Ask:
- what is done?
- what is broken?
- do we need a merge now?
- did anyone change the contract?
- do we still fit the MVP?

### Midway through the build
Do a merge checkpoint.

Make sure:
- Home page exists
- API returns valid shape
- Results page can render mock data

### Near the end
Feature freeze.

Only allow:
- bug fixes
- copy polish
- state polish
- demo safety improvements

---

## 8. File ownership map

### Person A
- `app/page.tsx`
- `app/results/page.tsx`
- integration logic
- final navigation

### Person B
- `app/api/analyze/route.ts`
- `lib/contracts.ts`
- `lib/prompts.ts`
- parsing and validation helpers

### Person C
- `components/results/*`
- `components/charts/*` if added
- `lib/sampleInputs.ts`
- polish states and helper text

If two people need the same file, decide the owner first.

---

## 9. Testing checklist

Run this after every merge.

### Home page
- loads well on mobile width
- textarea works
- sample chips work
- analyze button works
- loading state appears

### API
- returns valid `AnalysisResult`
- does not crash on messy input
- warnings are safe to render

### Results page
- totals show correctly
- records render correctly
- charts render or hide gracefully
- insights are short and readable
- back flow works

### Fallback path
- sample data works even if the API fails
- user sees a helpful message when analysis fails

---

## 10. Demo checklist

Before demo time, confirm all of this:
- app runs on phone-sized screen
- one sample seller input is guaranteed to work
- sample flow is faster than typing live
- charts render
- insights read clearly
- one person talks
- one person drives the screen
- one person answers questions

### 45-second demo structure
1. problem
2. solution
3. quick input → output demo
4. why it matters

---

## 11. Emergency decision rules

If time is running out:

### Cut first
- image upload
- extra charts
- extra tabs
- extra seller types
- advanced parsing

### Keep at all costs
- textarea input
- working analyze button
- structured records
- totals
- one chart
- 2–3 insights
- mobile polish on the happy path

---

## 12. Success definition

The project is successful if this flow works cleanly:
1. seller pastes messy notes
2. app analyzes
3. app shows structured records
4. app shows totals and charts
5. app gives 2–3 simple insights
6. demo feels smooth on mobile

That is enough.

---

## 13. The one line you keep repeating

> We are not building a full management system.
> We are building one clean seller clarity flow.
> If it does not improve the demo, we cut it.
