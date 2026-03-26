# 09-PERSON-C-UI-POLISH-DEMO-PLAYBOOK-v2.md

## Your role
You are **Person C: UI Polish + Demo Lead**.

You own:
- results cards
- charts
- empty/loading/error states
- sample path user experience
- microcopy
- demo clarity
- 45-second pitch
 
Your job is to make the app feel understandable and impressive on a phone screen.

## The skills you must use
1. `.agents/skills/recharts-demo-polish/SKILL.md`
2. `.agents/skills/git-pr-coordination/SKILL.md`

Read both before coding.

## Your phase and commit map
- **Phase 2C** -> `feat/results-ui-and-charts` -> you own it
- **Phase 4B** -> `feat/demo-polish` -> you own it

## What must exist before you go deep
You should wait for **Phase 1** because `/lib/contracts.ts` tells you the exact prop shape for cards and charts.
Once that exists, you can build almost everything from sample JSON in parallel while Person A and Person B work.

## What you should know before prompting AI
- The main result page must be readable on a phone.
- Summary cards matter more than fancy charts.
- If data is missing, the UI must degrade gracefully.
- The demo path must always work, even with sample data.
- Your role is critical because hackathons are often won or lost on clarity.

## What you should research quickly
- Recharts mobile patterns
- simple card hierarchy on small screens
- good empty/loading/error states
- short friendly helper text
- how to explain a product in 45 seconds

## What AI should do for you
Let AI help you with:
- chart components
- card components
- empty/loading/error states
- microcopy
- pitch drafting
- spacing and hierarchy refinements

## What AI should NOT decide for you
- the contract shape
- adding new features
- putting too many charts on the screen
- making the UI clever but confusing

## Your workflow by phase

### Phase 2C — results UI and charts
Wait until Phase 1 is merged.

**Prompt 2C-1 — results UI using skills**
```text
Use these skills before coding:
- .agents/skills/recharts-demo-polish/SKILL.md
- .agents/skills/git-pr-coordination/SKILL.md

Use /lib/contracts.ts as the source of truth.
Build the Results UI for a seller clarity app.
Requirements:
- summary cards for revenue, entries, and average sale if present
- warnings card if warnings exist
- extracted records section that works on mobile
- insights section for 2–3 short lines
- small-screen layout with clean spacing
Do not hardcode a different data shape.
Return the components you create.
```

**Prompt 2C-2 — chart components using skills**
```text
Use .agents/skills/recharts-demo-polish/SKILL.md.
Using the AnalysisResult contract, build two mobile-friendly charts:
- bar chart for top item revenue
- pie/donut chart for revenue share by channel if channel data exists
Rules:
- fit small screens
- readable labels
- hide gracefully if data is missing
- keep the code simple for a hackathon
Return the chart component files.
```

**Prompt 2C-3 — edge states**
```text
Use .agents/skills/recharts-demo-polish/SKILL.md.
Add empty, loading, and error states for the Home and Results experience.
Write short, friendly microcopy for non-technical sellers.
Also add a 'Try sample data' flow that always works even if the API fails.
Keep the copy plain and reassuring.
```

### Phase 4B — demo polish
Wait until Phase 3 integration works.

**Prompt 4B-1 — polish pass using skills**
```text
Use these skills before coding:
- .agents/skills/recharts-demo-polish/SKILL.md

Polish the seller clarity app for a hackathon demo.
Focus on:
- clearer spacing
- stronger visual hierarchy
- cleaner summary cards
- easier-to-read charts
- better warnings styling
- more confidence on small screens
Do not add features. Only improve clarity and perceived quality.
```

**Prompt 4B-2 — microcopy pass**
```text
Use .agents/skills/recharts-demo-polish/SKILL.md.
Rewrite the UI text for a non-technical Ghanaian small-seller audience.
Improve:
- helper text
- error messages
- loading messages
- empty-state copy
- warning labels
Keep everything short and plain.
```

**Prompt 4B-3 — demo script**
```text
Use .agents/skills/recharts-demo-polish/SKILL.md.
Write a 45-second hackathon demo script for this app.
Structure:
- problem
- user
- what happens in the wow moment
- why it is useful in Ghana
Keep it plain English, short, and memorable.
```

## What to ask your teammates
Ask Person A:
- What is the exact Results page layout order?
- Where should summary cards live?
- How does navigation return to Home?

Ask Person B:
- Which fields may be missing often?
- Can warnings appear without records?
- Is channel data reliable enough for the pie chart?

## Your danger list
- over-designing the page
- using too many charts
- assuming fields always exist
- making the demo depend only on live API output

## Definition of done
You are done when:
- the Results page is easy to understand on a phone
- charts look good or hide safely
- states are friendly
- sample data path works
- the demo script is ready
