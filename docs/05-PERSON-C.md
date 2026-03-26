# Person C Guide — UI Polish and Demo Lead

You own how the app feels.
Your work is not secondary. A clean, understandable demo can beat a more technical but messy app.

## You own
- results cards
- charts
- empty/loading/error states
- helper text and labels
- sample data path
- pitch script and demo clarity

## Your files
- `app/results/page.tsx`
- `components/results/*`
- some text in `app/page.tsx`
- `prompts/pitch-script.md`

## What you must wait for

### Wait for Commit 1
You need the repo first.

### Wait for Commit 2 before final chart work
You need:
- `lib/contracts.ts`
- sample JSON shape

After that, you can move fast without waiting for the live API.

## What you can do in parallel after Commit 2
- build summary cards from sample JSON
- build bar chart
- build optional channel chart
- add empty/loading/error states
- improve microcopy for non-technical sellers
- refine demo script

## Your sequence

### Task C1
Build the summary cards and warnings card.

### Task C2
Build the records list.

### Task C3
Build charts from sample JSON.

### Task C4
Add empty/loading/error states.

### Task C5
Prepare the 45-second pitch and backup sample-data demo path.

## What you must pause for

Before final polish on the integrated flow, wait for Person A to confirm that the happy path is connected.
Do not keep changing layout structure during integration hour.

## Do not do
- do not depend on live API data for everything
- do not build huge desktop-only charts
- do not add too much copy
- do not introduce new features outside demo polish

## Definition of done for you
You are done when:
- results page looks good on small screens
- charts fit mobile screens
- empty/loading/error states are friendly
- the sample demo path always works
- the team can explain the app in 45 seconds

## Prompt for you
Use this with Cursor:

```text
Build mobile-friendly chart and polish components for a seller clarity app using Recharts and Tailwind. Create a revenue-by-item bar chart and a revenue-share pie chart that hides gracefully if data is missing. Add empty, loading, and error states, short seller-friendly helper text, and a Try sample data flow that always works. Optimize everything for small screens.
```
