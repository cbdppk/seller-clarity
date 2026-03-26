# Team Setup

## Shared mission
We are building only one flow:

**messy sales notes in -> structured seller clarity out**

## Roles

### Person A — Lead builder
Owns:
- app setup
- page layout
- home screen
- results wiring
- final integration
- Vercel deploy

### Person B — AI + reliability
Owns:
- `lib/contracts.ts`
- `app/api/analyze/route.ts`
- `lib/prompts.ts`
- handling messy Ghana cedi text
- fallback warnings
- schema validation

### Person C — Demo + polish
Owns:
- charts
- mobile spacing
- empty/loading/error states
- sample data UX
- pitch script
- testing on phone width

## Rules
- No new features outside MVP without team agreement
- No one edits `contracts.ts` casually
- Merge early, not only at the end
- Keep the happy path working at all times
