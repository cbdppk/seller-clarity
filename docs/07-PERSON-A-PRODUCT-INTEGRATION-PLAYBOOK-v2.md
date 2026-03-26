# 07-PERSON-A-PRODUCT-INTEGRATION-PLAYBOOK-v2.md

## Your role
You are **Person A: Product + Integration Lead**.

You own:
- repo coordination
- mobile-first screen flow
- Home screen
- Results page shell
- final wiring
- merge decisions
- deployment

Your research-backed mission is to make the **one clean wow moment** work: seller pastes messy notes -> app returns structure -> app shows charts and insights.

## The skills you must use
1. `.agents/skills/nextjs-mobile-flow/SKILL.md`
2. `.agents/skills/git-pr-coordination/SKILL.md`

Read both before coding.

## Your phase and commit map
- **Phase 0** -> `chore/bootstrap-repo` -> you own it
- **Phase 2A** -> `feat/home-screen` -> you own it
- **Phase 3** -> `feat/home-to-results-integration` -> you own it
- **Phase 5** -> `chore/final-stabilization-and-deploy` -> you own it

## What must exist before you go deep
You can bootstrap the repo before anything else.
But before you lock your final UI logic, **Phase 1 must be merged** because `/lib/contracts.ts` tells you the exact data shape the Results screen will consume.

## What you should know before prompting AI
- This is a one-day MVP, not a full management system.
- Do not add auth, inventory, roles, or DB.
- The app is mobile-first.
- The main input path is text-first.
- The Results screen must consume `AnalysisResult` exactly.

## What you should research quickly
- small-screen layout patterns
- simple card-based result pages
- how to POST from Home to `/api/analyze`
- how to store analysis response temporarily in localStorage or client state

## What AI should do for you
Let AI help you with:
- page scaffolding
- form UI
- loading state UI
- localStorage wiring
- page layout refactors
- deployment checklist

## What AI should NOT decide for you
- the product scope
- the shared contract shape
- whether to add new features
- merging architecture changes from others without your review

## Your workflow by phase

### Phase 0 — bootstrap repo
Goal: everyone can clone, install, and run.

**Prompt 0A — repo scaffold using skills**
```text
Use these skills before coding:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Task:
Set up a mobile-first Next.js App Router + TypeScript hackathon repo for a seller clarity app.
Keep it text-first, image-second, and do not add auth, DB, roles, or inventory.
Use a simple page flow: Home -> Results.
Prepare clean folders for app, components, and lib.
Keep the code simple for a 3-person team working in parallel.
Return the exact files you create and explain why.
```

**Your done condition for Phase 0**
- project runs with `npm run dev`
- repo pushed to GitHub
- teammates can clone and run it

### Phase 2A — Home screen
Wait until **Phase 1** is merged.

**Prompt 2A-1 — home shell using skills**
```text
Use these skills before coding:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Use /lib/contracts.ts and /lib/sampleInputs.ts as the source of truth.
Build the Home screen mobile-first for the seller clarity app.
Requirements:
- App name and one-line value proposition
- Textarea for messy sales notes
- Sample chips loaded from /lib/sampleInputs.ts
- Analyze button
- Optional image upload placeholder only if it does not complicate the flow
- Friendly helper text
- Privacy note
- Clean small-screen spacing
Keep this screen focused on the one wow path.
Return the full file code for app/page.tsx and any new components.
```

**Prompt 2A-2 — form and loading refinement**
```text
Use .agents/skills/nextjs-mobile-flow/SKILL.md.
Improve the Home screen for a non-technical seller audience.
Add:
- disabled state for Analyze button
- loading state
- helper copy that explains what kind of text the seller can paste
- better mobile spacing
Do not change the contract shape. Do not add new pages.
```

### Phase 3 — integration
Wait until **Phase 2A, 2B, and 2C** are merged or at least stable in PR preview.

**Prompt 3A — wire Home to API**
```text
Use these skills before coding:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Use /lib/contracts.ts as the source of truth.
Wire the Home screen to POST to /api/analyze.
When the API returns an AnalysisResult, persist it safely for the Results screen.
Show a loading state on submit.
If warnings exist, ensure the Results screen can display them.
Keep the happy path reliable and simple.
Do not introduce new architecture.
Return the exact integration changes.
```

**Prompt 3B — results page shell alignment**
```text
Use .agents/skills/nextjs-mobile-flow/SKILL.md.
Align app/results/page.tsx with the current AnalysisResult contract.
Assume charts and cards are handled by Person C components.
Your job is to:
- read persisted result data
- render the layout sections in order
- place summary, records, charts, and insights clearly
- handle missing result data by showing a clean fallback with a back button
Do not redesign the data shape.
```

### Phase 5 — final stabilization and deploy
Wait until **Phase 4A and 4B** are merged.

**Prompt 5A — final quality pass**
```text
Use these skills before coding:
- .agents/skills/nextjs-mobile-flow/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Do a final quality pass for a hackathon demo.
Audit the app for:
- broken happy path
- missing loading states
- inconsistent spacing
- confusing copy
- weak back navigation
- fragile assumptions about missing analysis data
Keep the app minimal and robust.
Suggest only low-risk changes.
```

**Prompt 5B — deploy checklist**
```text
Use .agents/skills/nextjs-mobile-flow/SKILL.md.
Prepare this Next.js seller clarity app for Vercel deployment.
Give me:
- environment variables needed
- deployment checklist
- smoke tests to run after deploy
- the exact happy path to verify on mobile width
Keep the checklist short and practical.
```

## What to ask your teammates
Ask Person B:
- Is contracts.ts final for this phase?
- What warnings can the API return?
- Are any fields optional or unstable?

Ask Person C:
- Which chart components are ready?
- What props do they expect?
- What states still need copy or layout support?

## Your danger list
- adding features not in MVP
- hardcoding a result shape different from contracts.ts
- integrating before others stabilize their output
- leaving deployment to the very end

## Definition of done
You are done when:
- Home -> Analyze -> Results works
- the result shape is consumed correctly
- warnings show safely
- sample path works
- demo works on phone width
