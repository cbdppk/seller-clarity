# 08-PERSON-B-AI-PIPELINE-PLAYBOOK-v2.md

## Your role
You are **Person B: AI Pipeline Lead**.

You own:
- `/lib/contracts.ts`
- `/lib/prompts.ts`
- `/lib/sampleInputs.ts` baseline data contract support
- `/app/api/analyze/route.ts`
- Zod schema
- structured output reliability
- warnings and fallback logic

Your job is to make sure the app always produces a stable `AnalysisResult` for the UI.

## The skills you must use
1. `.agents/skills/schema-first-analysis/SKILL.md`
2. `.agents/skills/git-pr-coordination/SKILL.md`

Read both before coding.

## Your phase and commit map
- **Phase 1** -> `feat/contracts-and-samples` -> you own it
- **Phase 2B** -> `feat/analyze-route-mock` -> you own it
- **Phase 4A** -> `feat/real-llm-structured-output` -> you own it

## What must happen before others can really move
Your **Phase 1** is the unblocker.
Until you define `/lib/contracts.ts`, everyone else is partly guessing.
That means your first job is not the LLM call — it is the contract.

## What you should know before prompting AI
- The main risk is not model intelligence; it is unstable output.
- The app should be text-first first.
- Warnings are allowed and useful.
- Do not invent records or insights.
- Results must stay within the schema every time.

## What you should research quickly
- Zod object validation
- Next.js Route Handlers
- structured JSON output patterns
- Ghana cedi format normalization
- WhatsApp-style note patterns

## What AI should do for you
Let AI help you with:
- schema drafting
- Zod validator generation
- route handler scaffolding
- prompt iteration
- fallback parsing helpers
- unit-like test cases for messy input

## What AI should NOT decide for you
- the product scope
- adding unsupported fields to the contract
- inventing business logic beyond extracted records
- changing the API shape without team approval

## Your workflow by phase

### Phase 1 — contracts and samples
This phase comes right after repo bootstrap.

**Prompt 1A — contract creation using skills**
```text
Use these skills before coding:
- .agents/skills/schema-first-analysis/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Create the shared contract for a seller clarity app.
Files to create or update:
- /lib/contracts.ts
- /lib/sampleInputs.ts
- /lib/prompts.ts

Requirements:
- Define SaleRecord and AnalysisResult in TypeScript
- Keep AnalysisResult small and hackathon-safe
- Include warnings[] optional
- Add 3 realistic sample messy inputs for sellers in Ghana
- Add a base analysis prompt template that is explicit about uncertainty
Keep the contract stable and easy for UI teammates to consume.
Return the full file contents.
```

**Prompt 1B — review the contract**
```text
Use .agents/skills/schema-first-analysis/SKILL.md.
Review this proposed AnalysisResult contract for a 1-day hackathon MVP.
Check for:
- fields that are unnecessary
- fields that will break the UI if often missing
- fields that should be optional
- whether the insights and warnings strategy is realistic
Keep the contract as small and stable as possible.
```

### Phase 2B — mock route first
Wait until Phase 1 is merged.

**Prompt 2B-1 — route handler mock**
```text
Use these skills before coding:
- .agents/skills/schema-first-analysis/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Implement /app/api/analyze/route.ts as a POST Route Handler.
Input shape:
{ text?: string, imageBase64?: string }
Output shape:
AnalysisResult from /lib/contracts.ts

For this phase, do NOT call a real model yet.
Return mock but realistic AnalysisResult data based on the input text.
If text is empty, return a warnings-based response that is still schema-valid.
Keep the route simple and reliable so Person A and Person C can continue.
Return the full file code.
```

**Prompt 2B-2 — validation layer**
```text
Use .agents/skills/schema-first-analysis/SKILL.md.
Add runtime validation for AnalysisResult using Zod.
The validator should:
- mirror /lib/contracts.ts
- be easy to reuse when a real model is added later
- fail safely
- allow warnings[] as optional
Return the validator file or route updates needed.
```

### Phase 4A — real structured output
Wait until Phase 3 integration is working.

**Prompt 4A-1 — real model call using skills**
```text
Use these skills before coding:
- .agents/skills/schema-first-analysis/SKILL.md

Upgrade /app/api/analyze/route.ts from mock output to a real LLM call.
Requirements:
- request structured JSON matching AnalysisResult
- validate with Zod
- if validation fails, return warnings and best-effort fallback
- support messy WhatsApp-style text
- support Ghana cedi formats like GH¢, GHS, cedis, and plain numbers when context is clear
- never invent uncertain records
Keep the route small and hackathon-safe.
```

**Prompt 4A-2 — prompt iteration for messy seller text**
```text
Use .agents/skills/schema-first-analysis/SKILL.md.
Improve the analysis prompt so it handles:
- shorthand item names
- repeated lines
- delivery fee lines
- mixed currency uncertainty
- missing quantities
- social seller note style
The prompt must force:
1. extract only confident facts
2. move uncertainty into warnings
3. return only schema-valid JSON
Return the revised prompt text.
```

**Prompt 4A-3 — image support only if time remains**
```text
Use .agents/skills/schema-first-analysis/SKILL.md.
We already have a working text-first flow.
Add optional image input support in the safest possible way.
Constraints:
- image is secondary, not primary
- no full OCR pipeline
- if extraction is weak, return a warning and let the UI stay stable
- do not break the text flow
Suggest the minimum code changes needed.
```

## What to ask your teammates
Ask Person A:
- What exact data shape is the Results page consuming now?
- Which fields are actually shown?
- Do warnings render yet?

Ask Person C:
- Which chart fields are required?
- What should happen if channel data is missing?
- What summary cards already exist?

## Your danger list
- building the real model call too early
- changing the schema after others already built against it
- returning pretty text instead of strict JSON
- inventing insights not supported by extracted data

## Definition of done
You are done when:
- contracts are stable
- route returns valid AnalysisResult
- warnings are used correctly
- mock path works
- real model path is schema-safe
