# AGENTS.md

## Project goal
Build a mobile-first AI sales assistant for informal sellers in Ghana.

## MVP only
The only required flow is:
1. user pastes messy sales notes
2. app analyzes into structured records
3. app shows totals, charts, and plain-language insights

## Constraints
- optimize for phone screens first
- keep code simple
- use shared contracts from `lib/contracts.ts`
- avoid adding auth/database/inventory/payments
- prioritize demo reliability over feature count

## Preferred coding style
- keep components small
- extract reusable helpers into `lib/`
- use TypeScript types everywhere
- avoid overengineering
