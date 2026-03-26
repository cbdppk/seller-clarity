# Person B Playbook - AI Pipeline, Schema, and Reliability Lead

## Your mission
You are the **owner of the app's intelligence layer**.

Your job is not to build a complex AI system. Your job is to make one thing reliable:

**messy seller input -> stable AnalysisResult object**

If the UI depends on good data and your endpoint is unstable, the whole demo breaks.

You are responsible for:
- the shared schema
- structured output design
- the analysis endpoint
- prompt quality
- validation
- warnings and fallback behavior
- handling messy Ghana-style sales notes

---

## What the product is
This is **not** an ML research project.

This is a product-engineering problem.

You are not training models.
You are not building a full OCR system.
You are not inventing extraction.

You are building a **hackathon-safe analysis pipeline** that returns clean structured JSON.

---

## What you must understand before coding
### 1. The input will be messy
You should expect:
- shorthand notes
- missing quantities
- mixed currency notation
- incomplete dates
- line-by-line sales notes
- WhatsApp style input

### 2. The UI needs stability more than cleverness
A stable average result is better than an impressive but unpredictable result.

### 3. Warnings are part of the product
If the model is uncertain, it is okay to return a warning.
That is better than inventing facts.

### 4. Text-first wins
Only move to image input after the text flow works.

---

## What you need to know / research quickly
### Learn these basics
- Zod schema validation
- Next.js Route Handlers
- JSON structured outputs
- handling optional fields safely
- Ghana cedi formats like GH¢, GHS, cedis
- simple test-case thinking

### Understand the expected object shape
The team needs one shared contract like:
- `records[]`
- `totals{}`
- `topItems[]`
- `insights[]`
- `warnings[]?`

### Look for example messy inputs like
- `Black bag 120`
- `Red bag sold - 150`
- `Delivery 20`
- `2 phone cases 80`
- `GH¢ 120`

### What you do **not** need to research deeply
- custom model fine-tuning
- GPU training
- vector databases
- OCR pipelines
- autonomous agents

---

## What AI should do for you
Let AI help you with:
- drafting the schema
- generating route boilerplate
- improving prompt wording
- designing fallback behavior
- generating test inputs
- validating edge cases mentally

### Good use of AI for you
- write the strict JSON output instructions
- create robust prompt wording
- help with Zod schemas
- create mock payloads and fixtures

### Bad use of AI for you
- accepting hallucinated fields
- trusting output without validation
- asking for overly complex extraction logic
- returning whatever the model says without checks

---

## What **you** must decide yourself
You must personally decide:
- what fields are required
- what fields are optional
- when to return warnings
- what to omit when confidence is low
- how to keep the response useful even when input is bad

Do not let the model decide the contract.

---

## Your core files
You are mainly responsible for:
- `lib/contracts.ts`
- `lib/prompts.ts`
- `app/api/analyze/route.ts`
- maybe `lib/utils.ts`

You may also help with:
- `lib/sampleInputs.ts`
- test payloads

---

## What must exist before you go deep
You can start early, but before finalizing your API you should know:
- the UI sections Person A expects
- what charts Person C expects
- which fields are truly needed for MVP

Do not overdesign beyond what the UI actually needs.

---

## Your workflow by phase
## Phase 1 - Lock the contract
### Your goal
Define the single source of truth for the analysis result.

### Minimum schema thinking
You need:
- `records[]`
- `totals{ revenue, entries, averageSale? }`
- `topItems[]`
- `insights[]`
- `warnings[]?`

### Your phase 1 prompt
```text
Design a minimal but practical TypeScript type and matching Zod schema for an analysis result for a seller clarity app. The result should support messy seller notes and include records[], totals{}, topItems[], insights[] limited to 3 items, and optional warnings[]. Keep the schema small, stable, and easy for a mobile UI to render.
```

### Your phase 1 checklist
- [ ] only include fields the UI will use
- [ ] required vs optional is clear
- [ ] warnings are supported
- [ ] schema is stable enough for teammates to code against

---

## Phase 2 - Build mock output first
### Your goal
Before calling a real model, return a stable mock `AnalysisResult`.

This helps Person A and Person C move without waiting.

### Your phase 2 prompt
```text
Create a mock AnalysisResult object for a seller clarity app using a sample messy input like 'Sold black bag - 120, Red bag - 150, Delivery - 20'. Make the data realistic, compact, and easy for the UI to display. Include one warning only if needed.
```

### Your phase 2 checklist
- [ ] mock payload matches contract exactly
- [ ] mock payload is realistic
- [ ] mock payload supports charts
- [ ] mock payload supports insights card

---

## Phase 3 - Build the analysis route
### Your goal
Create `/api/analyze`.

The endpoint should:
- accept text input first
- optionally accept image input later
- return stable JSON
- never crash the UI

### Your phase 3 prompt
```text
Implement a Next.js Route Handler at /app/api/analyze/route.ts for a seller clarity app. Accept POST JSON with { text?: string, imageBase64?: string }. Return a valid AnalysisResult object. First support text input only. Add graceful errors and warnings. Keep the code simple and easy to test.
```

### Your phase 3 checklist
- [ ] accepts POST
- [ ] validates body shape
- [ ] returns mock output first
- [ ] safe response even on bad input
- [ ] no unstable extra fields

---

## Phase 4 - Add real LLM structured output
### Your goal
Replace the mock response with a real model call, but keep the same response contract.

### Your rules
- request strict JSON
- validate the response
- sanitize or fallback if invalid
- never send raw, unvalidated model output to the UI

### Your phase 4 prompt
```text
Build a schema-first LLM extraction flow for a seller clarity app. The input is messy seller sales notes. The output must be valid JSON matching the AnalysisResult schema. Use a strict prompt that extracts only confident records, computes totals, identifies top items, and returns 2-3 short insights plus optional warnings. If the model output is malformed or low-confidence, return a validated fallback object instead of failing.
```

### Your phase 4 checklist
- [ ] prompt asks for JSON only
- [ ] model is not asked to invent profit or margin
- [ ] response is validated with Zod
- [ ] invalid output does not break UI
- [ ] warnings appear for uncertainty

---

## Phase 5 - Improve reliability for Ghana seller inputs
### Your goal
Make the extraction robust for the actual demo persona.

### Cases to support
- GH¢ 120
- GHS 120
- 120 cedis
- `Delivery - 20`
- repeated item names
- mixed channels if present
- quantity sometimes missing

### Your phase 5 prompt
```text
Improve this extraction prompt and parsing logic for Ghanaian seller notes. Handle GH¢, GHS, and 'cedis', repeated item names, delivery lines, shorthand WhatsApp-style notes, and missing quantities. Extract only what is reliable. Add warnings when the currency or item meaning is unclear.
```

### Your phase 5 checklist
- [ ] cedi formats are handled
- [ ] delivery can be represented safely
- [ ] topItems do not duplicate badly
- [ ] insights are based only on extracted facts

---

## Phase 6 - Optional image support
Only do this if the text flow is already working.

### Your goal
Allow image input as a bonus, not a dependency.

### Rule
If image extraction is weak:
- return transcription
- let the user edit
- warn that extraction may be incomplete

### Your phase 6 prompt
```text
Add an optional image-input path for the seller clarity app using a multimodal model. Do not build a separate OCR system. If image extraction is weak or incomplete, return a warning and a best-effort structured result. Keep the existing text-first pipeline untouched.
```

---

## What to ask Person A for
You should ask Person A:
- Which fields must show on the Home and Results screens?
- Which warnings will be surfaced in the UI?
- What loading/error behavior is expected?
- Do they need sample payloads while the real model is not ready?

---

## What to ask Person C for
You should ask Person C:
- Which chart data shape is easiest to render?
- Do they need pre-aggregated topItems or can they compute from records?
- Which fields are used in cards, charts, and insights?

---

## Your personal knowledge base
Keep this in mind the whole time:
- stable schema beats clever extraction
- warnings are healthy, hallucinations are dangerous
- the UI should never have to guess field names
- hackathon success comes from reliability, not sophistication
- text-first is the safer route

---

## Your danger list
Stop immediately if you find yourself doing any of these:
- designing a huge schema
- adding fields the UI never uses
- building OCR infrastructure
- chasing perfect extraction instead of stable output
- returning raw model text to the UI
- changing the contract without warning the team

---

## Definition of done for you
You are done when:
- the contract is stable
- the route returns valid data every time
- the UI can render the object without guesswork
- warnings work
- messy sample seller inputs return believable results
- bad input does not crash the app

---

## The one sentence you should repeat to yourself
> My job is to make the data layer boring, stable, and trustworthy.
