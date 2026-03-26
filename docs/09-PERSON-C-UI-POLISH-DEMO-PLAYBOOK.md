# Person C Playbook - UI Polish, Charts, QA, and Demo Lead

## Your mission
You are the **owner of clarity, confidence, and demo quality**.

Your job is not secondary. Many hackathon projects lose because the demo feels confusing, ugly, or unfinished even when the code works.

You are responsible for:
- charts and visual clarity
- empty/loading/error states
- sample data experience
- mobile polish
- seller-friendly wording
- QA on the full flow
- the pitch narrative and demo smoothness

---

## What the product is
This app is for sellers who do not want to deal with spreadsheets or complex accounting tools.

So the UI must feel:
- simple
- friendly
- direct
- easy to scan
- mobile-first

The product is not trying to impress with complexity.
It is trying to build trust quickly.

---

## What you must understand before coding
### 1. The user is not technical
They should not feel like they are using a finance dashboard for accountants.

### 2. Charts are helpers, not the product
Charts support the story. They must not overwhelm the page.

### 3. Demo flow matters
If the flow looks smooth, the whole app feels stronger.

### 4. Sample data is part of the product
A good sample-data path can save the demo if the API or input behaves badly.

---

## What you need to know / research quickly
### Learn these basics
- Recharts basics
- card layout and spacing
- empty/loading/error state design
- mobile readability
- short helper text and button labels
- simple QA mindset

### Look for examples of
- mobile dashboard cards
- simple bar chart on phone screen
- friendly empty states
- readable sections with strong spacing

### What you do **not** need to research deeply
- complex data visualization theory
- advanced animation systems
- full design systems
- desktop-heavy admin dashboards

---

## What AI should do for you
Let AI help you with:
- chart component boilerplate
- empty/loading/error state copy
- spacing suggestions
- rewriting labels and helper text
- generating sample data sets
- polishing section structure

### Good use of AI for you
- create chart components
- suggest better UX microcopy
- improve mobile card spacing
- create clean fallback states

### Bad use of AI for you
- letting it overdesign the UI
- adding too many colors or sections
- using complicated charts that confuse the story
- rewriting stable components too late

---

## What **you** must decide yourself
You must personally decide:
- which chart is actually helpful
- what should appear above the fold
- what text is too much
- whether a section feels confusing
- whether the demo feels smooth or noisy

Do not let AI overcomplicate the interface.

---

## Your core files
You are mainly responsible for:
- `components/results/*`
- `components/charts/*` if present
- `lib/sampleInputs.ts`
- empty/loading/error state components
- helper text and seller-facing microcopy

You may also help with:
- `app/results/page.tsx`
- visual polish on `app/page.tsx`

---

## What must exist before you go deep
You can start with sample data and layout ideas, but before finalizing charts you should know:
- the exact `AnalysisResult` shape from Person B
- which sections Person A wants on the Results page

Do not assume field names before `contracts.ts` is stable.

---

## Your workflow by phase
## Phase 1 - Understand the story
### Your goal
Make sure the UI tells one simple story:

**You pasted messy notes. Now you understand your business better.**

### Your phase 1 prompt
```text
Help me define the clearest mobile-first results story for a seller clarity app. The user pastes messy seller notes and gets structured records, totals, charts, and 2-3 insights. Tell me the best section order for a phone screen and what each section should communicate.
```

### Your phase 1 checklist
- [ ] I know what the first thing on Results should be
- [ ] I know which sections are essential
- [ ] I know what can be hidden or cut

---

## Phase 2 - Sample data and fallback states
### Your goal
Make sure the UI can work and be demonstrated even before the real model is ready.

### What you should prepare
- 3 strong sample inputs
- matching sample result themes
- empty state
- loading state
- error state

### Your phase 2 prompt
```text
Create 3 realistic sample seller inputs for a Ghana-focused seller clarity app: one bag seller, one phone accessory seller, and one dress seller. Each should be messy but understandable, suitable for a demo, and produce believable totals and top items.
```

### Your phase 2 checklist
- [ ] samples are realistic
- [ ] samples are easy to demo
- [ ] empty state is friendly
- [ ] loading state is clear
- [ ] error state helps the user recover

---

## Phase 3 - Build charts
### Your goal
Add charts that support the story without crowding the screen.

### Recommended charts
- bar chart for revenue by item
- pie chart only if the data supports it clearly

### Rules
- if data is weak, hide the chart gracefully
- charts should be readable on small screens
- labels should not feel cramped

### Your phase 3 prompt
```text
Build mobile-friendly chart components for a seller clarity app using Recharts. Create a simple bar chart for revenue by item and a pie chart for revenue share only if the data supports it clearly. Optimize for small screens, legibility, and clean spacing. Hide charts gracefully when data is missing.
```

### Your phase 3 checklist
- [ ] chart labels are readable on mobile
- [ ] chart containers have enough spacing
- [ ] the charts do not dominate the page
- [ ] charts hide gracefully when no data exists

---

## Phase 4 - Polish cards and sections
### Your goal
Make the page feel finished and trustworthy.

### What to improve
- spacing between cards
- section titles
- icon usage if any
- short labels
- value hierarchy
- warnings visibility
- insight readability

### Your phase 4 prompt
```text
Polish the results UI for a mobile-first seller clarity app. Improve spacing, section hierarchy, card labels, warnings presentation, and readability of the insights. Keep the tone friendly and simple for non-technical sellers. Remove visual clutter.
```

### Your phase 4 checklist
- [ ] the page breathes
- [ ] short labels are consistent
- [ ] warnings are visible but not alarming
- [ ] insights read like advice, not technical logs

---

## Phase 5 - Full-flow QA
### Your goal
You are the first real tester of the whole app.

### Test as if you are a seller
- Can I understand the app quickly?
- Can I paste notes and recover if input is bad?
- Does the Results page feel useful?
- Is anything visually broken on mobile?
- Do I trust what I see?

### Your phase 5 prompt
```text
Act as a QA reviewer for this mobile-first seller clarity app. Review the Home and Results screens from the perspective of a non-technical seller. Identify confusing sections, weak labels, spacing problems, chart readability issues, and places where the user might get stuck. Focus on phone-sized screens.
```

### Your phase 5 checklist
- [ ] no broken layout on narrow width
- [ ] no confusing labels
- [ ] no dead-end error state
- [ ] sample path works
- [ ] charts are readable
- [ ] demo feels smooth

---

## Phase 6 - Pitch and demo prep
### Your goal
Help the team tell the story clearly.

### Your pitch structure
1. Problem
2. Our solution
3. Demo flow
4. Why it matters

### Example story
- Many informal sellers track sales in messy notes or chats.
- Our app turns that messy input into clear records and business guidance.
- Here is a bag seller example.
- In seconds, they see totals, top items, and useful insights.

### Your phase 6 prompt
```text
Write a short, simple hackathon pitch for a seller clarity app for informal sellers in Ghana. Structure it as: problem, solution, live demo flow, and why it matters. Keep it understandable, practical, and strong for a 45-60 second explanation.
```

---

## What to ask Person A for
You should ask Person A:
- What is the final section order?
- What should appear above the fold?
- Which screens are definitely in scope?
- What copy needs tightening before demo?

---

## What to ask Person B for
You should ask Person B:
- What fields are guaranteed?
- What fields are optional?
- When should I show warnings?
- Which chart data is safe to render?
- What sample result can I use while waiting?

---

## Your personal knowledge base
Keep this in mind the whole time:
- clarity beats decoration
- one good chart beats three confusing charts
- sample data is strategic, not fake
- mobile spacing is not optional
- demo polish is product work

---

## Your danger list
Stop immediately if you find yourself doing any of these:
- adding too many charts
- using tiny labels on mobile
- creating dense dashboard screens
- writing long paragraphs in the UI
- adding visual effects that reduce clarity
- polishing before the section order is decided

---

## Definition of done for you
You are done when:
- the results page feels easy to scan on mobile
- charts are readable and helpful
- loading/empty/error states are clean
- sample data path is reliable
- the app looks demo-ready
- the team has a clear pitch and flow

---

## The one sentence you should repeat to yourself
> My job is to make the product feel clear, trustworthy, and easy to demo.
