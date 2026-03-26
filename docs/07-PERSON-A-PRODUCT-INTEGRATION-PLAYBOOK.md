# Person A Playbook - Product, UI, and Integration Lead

## Your mission
You are the **owner of the product experience**.

Your job is not just to build screens. Your job is to make sure the app feels clear, useful, and demo-ready.

If the team gets confused, blocked, or starts overbuilding, you bring everyone back to the one winning flow:

**messy sales notes in -> clear seller insights out**

You are the final person responsible for:
- the user flow
- the mobile-first layout
- navigation between input and results
- wiring the UI to the analysis API
- merging work safely
- making sure the happy path always works in the demo

---

## What the product is
This is **not** a full management system.

This is a **mobile-first seller clarity assistant** for informal sellers in Ghana.

It helps a seller:
1. paste messy sales notes
2. tap Analyze
3. see structured records
4. see totals and charts
5. understand what the sales mean in plain language

---

## What you must understand before coding
### 1. The user
The demo user is a small social seller:
- TikTok seller
- WhatsApp vendor
- Instagram seller
- informal reseller

Typical products:
- bags
- dresses
- shoes
- phones
- accessories

### 2. The problem
These sellers often:
- track sales in notes or chats
- do not keep structured records
- do not analyze trends
- make decisions by guesswork

### 3. The product promise
Do **not** promise bookkeeping, accounting, inventory, or ERP.

Promise this instead:

> Paste your messy sales notes and instantly get clear totals, top items, and simple business guidance.

### 4. The build constraint
This is a hackathon MVP.

So you must protect the scope:
- no auth
- no database
- no inventory
- no multi-role dashboard
- no advanced settings
- no deep admin features

---

## What you need to know / research quickly
Research only what helps you make product and UI decisions.

### Know this:
- mobile-first means the layout must feel good on narrow screens first
- sellers need plain language, not technical business terms
- the app should feel lightweight and trustworthy
- too many sections reduce clarity

### Look at examples of:
- good mobile dashboards
- cards with short stats
- simple chart layout on phone screens
- clean textarea input experiences

### What you do **not** need to research deeply
- hardcore machine learning
- database architecture
- microservices
- authentication systems
- perfect PWA setup

---

## What AI should do for you
Let AI help you with:
- generating component structure
- improving layout hierarchy
- suggesting better labels and helper text
- cleaning Tailwind classes
- generating loading/empty/error states
- refactoring reusable UI pieces

### Good use of AI for you
- scaffold screens
- clean repetitive JSX
- generate card components
- improve copy
- suggest spacing and hierarchy improvements

### Bad use of AI for you
- asking it to redesign the whole app every hour
- letting it rewrite stable working code for no reason
- letting it expand scope into unnecessary features

---

## What **you** must decide yourself
You must personally decide:
- what stays in the MVP
- what gets cut
- what the user sees first
- where the primary action button is
- what the final happy-path demo is
- when the team should stop adding features

Do not delegate those decisions to AI.

---

## Your core files
You are mainly responsible for:
- `app/page.tsx`
- `app/results/page.tsx`
- shared navigation between pages
- final integration with `/api/analyze`
- any top-level layout cleanup

You may also touch:
- `components/home/*`
- `components/results/*` only when integrating

---

## What must exist before you go deep
You should wait for these before final integration work:
- `lib/contracts.ts`
- `lib/sampleInputs.ts`
- API response shape from Person B

You can still build the UI shell before that.

---

## Your workflow by phase
## Phase 1 - Understand and lock scope
Before coding, write down these 4 lines:
1. Who is the user?
2. What are they pasting?
3. What do they get back?
4. What is the one wow moment?

Suggested answers:
- user: informal online seller
- input: messy sales notes
- output: structured records + charts + insights
- wow moment: messy text becomes usable business clarity

### Your phase 1 prompt
```text
We are building a one-day hackathon MVP. Help me reduce this app to the smallest, clearest mobile-first flow. The app helps informal sellers paste messy sales notes and get structured records, totals, charts, and 2-3 plain-language insights. Give me only the essential screens, sections, and components. Cut anything unnecessary.
```

---

## Phase 2 - Build the Home screen
### Your goal
Create a clean input experience.

The Home screen should include:
- app name
- one-line value proposition
- textarea
- sample chips
- Analyze button
- short helper text
- privacy note

### What good looks like
The user should understand the page in under 5 seconds.

### What to watch out for
- too much text
- too many cards before input
- tiny button sizes on mobile
- awkward spacing
- confusing placeholder text

### Your phase 2 prompt
```text
Build a mobile-first Home screen for a seller clarity app in Next.js App Router and TypeScript. Use Tailwind. Include: app name, one-line value proposition, textarea for messy sales notes, sample chips, Analyze button, helper text, and a privacy note. Keep the layout clean, card-based, and optimized for small screens. Prioritize strong hierarchy and clarity over decoration.
```

### Your phase 2 checklist
- [ ] title is short and strong
- [ ] value proposition is one sentence
- [ ] textarea feels large enough on mobile
- [ ] sample chips are tappable
- [ ] primary button is obvious
- [ ] helper text is friendly
- [ ] no clutter above the fold

---

## Phase 3 - Build the Results shell
### Your goal
Create the page that receives and displays the analysis clearly.

Required sections:
- summary cards
- warnings card if needed
- extracted records section
- charts section
- insights section
- back button

### What matters most
The layout must be easy to scan.

### Your phase 3 prompt
```text
Build a mobile-first Results page for a seller clarity app. The page should display summary cards, optional warnings, extracted sales records, chart containers, and 2-3 plain-language insights. Use clean stacked sections optimized for phone screens. Keep the hierarchy obvious and avoid overcrowding.
```

### Your phase 3 checklist
- [ ] totals appear first
- [ ] warnings are visible but not scary
- [ ] records are readable on mobile
- [ ] charts do not dominate the page
- [ ] insights are easy to find
- [ ] back action is clear

---

## Phase 4 - Integration
### Your goal
Connect Home -> API -> Results.

You own the full user flow.

### What you do
- send input to `/api/analyze`
- show loading state
- handle success state
- handle fallback/sample path
- route or render results
- make sure bad API responses do not break the app

### Your phase 4 prompt
```text
Wire the Home screen to POST to /api/analyze. Show a loading state while waiting. On success, navigate to the Results page and render the returned JSON. If warnings are present, show them in a small warning card. If the API fails, let the user try sample data or return to edit the input. Keep the code simple and robust.
```

### Your phase 4 checklist
- [ ] loading state shows
- [ ] API errors do not crash UI
- [ ] user can retry
- [ ] results render from returned JSON
- [ ] sample data path always works

---

## Phase 5 - Demo hardening
### Your goal
Turn a working prototype into a trustworthy demo.

### You should do this
- remove any weak section
- cut features that feel broken
- shorten labels
- improve button text
- test the full happy path 3 times
- test on narrow browser width

### Your phase 5 prompt
```text
Polish this hackathon MVP for a live demo. Improve spacing, card hierarchy, CTA clarity, labels, and mobile readability. Do not add new features. Remove visual noise and make the happy path feel smooth and trustworthy.
```

---

## What to ask Person B for
You should ask Person B:
- What is the exact response shape?
- Which fields are always present?
- Which fields are optional?
- What warnings can appear?
- What mock payload can I use during UI development?

If Person B changes the response shape, you must know immediately.

---

## What to ask Person C for
You should ask Person C:
- Which chart container sizes work best on mobile?
- Which empty/loading/error states are ready?
- What sample inputs should appear on Home?
- Is the results page readable on smaller screens?

---

## Your personal knowledge base
Keep this in mind the whole time:
- the app is for low-friction clarity, not full bookkeeping
- mobile-first is the main UX rule
- simple language beats fancy language
- demo clarity beats feature count
- one strong flow beats many half-finished flows

---

## Your danger list
Stop immediately if you find yourself doing any of these:
- adding sign-in
- adding dashboard sidebars and admin shells
- creating too many pages
- building settings pages
- redesigning everything too late
- refactoring stable code near demo time

---

## Definition of done for you
You are done when:
- the Home screen feels clear on mobile
- the Results page feels clear on mobile
- the app can send input and receive output cleanly
- the happy path works end to end
- the demo can be explained in under 45 seconds

---

## The one sentence you should repeat to yourself
> My job is to make the app feel obvious, reliable, and demo-ready.
