# 10-PHASE-COMMIT-OWNER-MAP.md

This file maps the whole project by **phase -> commit -> owner -> dependency -> skill -> output**.

## Phase 0 — Team setup
- **Commit:** `chore/bootstrap-repo`
- **Owner:** Person A (Coordinator / Product / Integration)
- **Can others work yet?** No. Everyone waits.
- **Skills to use:** `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** repo runs locally for all 3 people.

## Phase 1 — Shared contract and sample data
- **Commit:** `feat/contracts-and-samples`
- **Owner:** Person B (AI Pipeline)
- **Can others work yet?** Light UI sketching only. Final implementation waits.
- **Skills to use:** `.agents/skills/schema-first-analysis/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** `/lib/contracts.ts`, `/lib/sampleInputs.ts`, `/lib/prompts.ts`
- **Why this phase matters:** this is the contract that unblocks the rest of the team.

## Phase 2A — Home screen
- **Commit:** `feat/home-screen`
- **Owner:** Person A
- **Can run in parallel with:** Phase 2B and 2C
- **Depends on:** Phase 1
- **Skills to use:** `.agents/skills/nextjs-mobile-flow/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** mobile-first Home screen with textarea, chips, CTA, helper text.

## Phase 2B — Analysis route (mock first)
- **Commit:** `feat/analyze-route-mock`
- **Owner:** Person B
- **Can run in parallel with:** Phase 2A and 2C
- **Depends on:** Phase 1
- **Skills to use:** `.agents/skills/schema-first-analysis/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** `/app/api/analyze/route.ts` returning stable `AnalysisResult` mock JSON.

## Phase 2C — Results UI and charts
- **Commit:** `feat/results-ui-and-charts`
- **Owner:** Person C
- **Can run in parallel with:** Phase 2A and 2B
- **Depends on:** Phase 1
- **Skills to use:** `.agents/skills/recharts-demo-polish/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** summary cards, records section, charts, edge states.

## Phase 3 — Integration
- **Commit:** `feat/home-to-results-integration`
- **Owner:** Person A
- **Can others work yet?** Only small bug fixes. No major rewrites.
- **Depends on:** Phase 2A, 2B, 2C
- **Skills to use:** `.agents/skills/nextjs-mobile-flow/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** Home posts to `/api/analyze`, app navigates to Results, warnings render, sample path works.

## Phase 4A — Real structured output
- **Commit:** `feat/real-llm-structured-output`
- **Owner:** Person B
- **Can run in parallel with:** Phase 4B
- **Depends on:** Phase 3
- **Skills to use:** `.agents/skills/schema-first-analysis/SKILL.md`
- **Output:** real model call, schema validation, warnings, fallback.

## Phase 4B — Demo polish
- **Commit:** `feat/demo-polish`
- **Owner:** Person C
- **Can run in parallel with:** Phase 4A
- **Depends on:** Phase 3
- **Skills to use:** `.agents/skills/recharts-demo-polish/SKILL.md`
- **Output:** polished mobile UI, better states, helper text, 45-second pitch.

## Phase 5 — Final stabilization and deploy
- **Commit:** `chore/final-stabilization-and-deploy`
- **Owner:** Person A
- **Can others work yet?** Only tiny targeted fixes.
- **Depends on:** Phase 4A and 4B
- **Skills to use:** `.agents/skills/nextjs-mobile-flow/SKILL.md`, `.agents/skills/git-pr-coordination/SKILL.md`
- **Output:** deployed demo, tested happy path, ready pitch.
