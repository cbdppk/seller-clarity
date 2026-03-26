# Commit Plan

This file tells you exactly:
- who owns each commit
- what must wait
- what can move in parallel
- what the success condition is before the next person continues

---

## Commit 1 — Bootstrap the app

**Owner:** Person A  
**Branch:** `feat/bootstrap`

### Do
- create the Next.js app
- confirm Tailwind works
- install `zod`, `recharts`, `lucide-react`
- push initial repo state

### Files touched
- base Next.js files
- `package.json`
- `README.md`

### Commit message
`Bootstrap Next.js mobile-first seller clarity app`

### Who must wait for this?
- Everyone

### Who can work after this?
- Nobody yet. Commit 2 must land first.

### Done when
- app runs locally
- everyone can clone and run `npm install` + `npm run dev`

---

## Commit 2 — Shared contract, sample inputs, prompt template

**Owner:** Person B  
**Branch:** `feat/contracts-samples`

### Do
- create `lib/contracts.ts`
- create `lib/sampleInputs.ts`
- create `lib/prompts.ts`
- define stable `AnalysisResult`

### Files touched
- `lib/contracts.ts`
- `lib/sampleInputs.ts`
- `lib/prompts.ts`

### Commit message
`Add shared contracts sample inputs and AI prompt template`

### Who must wait for this?
- Person A must wait before wiring the real form submission shape
- Person C must wait before building final chart props

### Who can work after this?
- Person A and Person C can now move in parallel
- Person B can continue to Commit 4 in parallel with them

### Done when
- all three teammates agree on the JSON shape
- sample inputs are realistic
- no one is confused about response fields

---

## Commit 3 — Home screen shell

**Owner:** Person A  
**Branch:** `feat/home-ui`

### Do
- build mobile-first home page
- add textarea
- add sample chips
- add analyze button
- add helper text and privacy note
- do not wait for real AI yet

### Files touched
- `app/page.tsx`
- `components/home/*`

### Commit message
`Build mobile-first home screen with input flow`

### Depends on
- Commit 2

### Who can work at the same time?
- Person B on Commit 4
- Person C on Commit 5

### Done when
- home page looks good on small screens
- sample chips can fill the textarea
- button and states exist even if backend is not final

---

## Commit 4 — Mock analysis route

**Owner:** Person B  
**Branch:** `feat/analyze-route`

### Do
- create POST route
- accept `{ text?: string, imageBase64?: string }`
- return mock `AnalysisResult`
- include warnings support

### Files touched
- `app/api/analyze/route.ts`

### Commit message
`Implement mock analysis route with stable AnalysisResult response`

### Depends on
- Commit 2

### Who can work at the same time?
- Person A on Commit 3
- Person C on Commit 5

### Done when
- API returns valid JSON matching `contracts.ts`
- frontend can safely consume it without guessing fields

---

## Commit 5 — Results screen, charts, edge states

**Owner:** Person C  
**Branch:** `feat/results-charts`

### Do
- build summary cards
- build records list
- build revenue chart
- build channel chart if data exists
- build empty/loading/error states

### Files touched
- `app/results/page.tsx`
- `components/results/*`

### Commit message
`Add results dashboard charts and edge states`

### Depends on
- Commit 2

### Who can work at the same time?
- Person A on Commit 3
- Person B on Commit 4

### Done when
- results render correctly from sample JSON
- no hard dependency on live AI exists

---

## Commit 6 — Integration

**Owner:** Person A  
**Branch:** `feat/integration`

### Do
- connect home form to `/api/analyze`
- store result or pass it to Results
- render warnings if present
- keep sample data path working

### Files touched
- `app/page.tsx`
- `app/results/page.tsx`
- maybe `lib/storage.ts`

### Commit message
`Wire home input to analysis route and results dashboard`

### Depends on
- Commit 3
- Commit 4
- Commit 5

### Who must wait for this?
- Everyone must stop major new work until this happy path is confirmed

### Done when
- live flow works end to end
- sample fallback also works
- demo path is reliable

---

## Commit 7 — Real AI route with validation

**Owner:** Person B  
**Branch:** `feat/real-ai`

### Do
- replace mock route logic with real LLM call
- validate with Zod
- return warnings on uncertainty
- keep best-effort fallback

### Depends on
- Commit 6

### Who can work at the same time?
- Person C can improve polish and pitch
- Person A can fix small integration bugs

### Done when
- structured output is stable
- bad data does not crash the app

---

## Commit 8 — Final polish and demo safety

**Owner:** Person C  
**Branch:** `feat/demo-polish`

### Do
- tighten mobile spacing
- improve labels and helper text
- confirm empty/loading/error states
- refine pitch script
- verify sample data path still works offline

### Depends on
- Commit 6

### Done when
- app looks demo-ready
- no confusing text remains
- team can rehearse the pitch smoothly

---

## Summary of dependencies

### Must be sequential
- Commit 1 → Commit 2
- Commit 3, 4, 5 → Commit 6
- Commit 6 → Commit 7

### Can happen in parallel
- Commit 3 + Commit 4 + Commit 5
- after Commit 6, Person B and Person C can work in parallel again
