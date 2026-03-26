# Schema-First Analysis Skill

Use this skill when building the analysis endpoint and prompt pipeline.

## Purpose
Return stable structured JSON for seller analysis.

## Guardrails
- API output must match `/lib/contracts.ts`.
- Use schema validation (Zod).
- Use warnings for uncertainty.
- Never invent missing facts.
- Keep insights limited to what extracted data supports.

## Standards
- Input shape: `{ text?: string, imageBase64?: string }`.
- Output shape: `AnalysisResult`.
- Support Ghana cedi formats: GH¢, GHS, cedis, and plain numbers where context is clear.
- Handle messy WhatsApp-style text.
- If image path exists, keep it optional and fallback-safe.

## Deliverables
- Shared schema.
- Route Handler.
- Model prompt.
- Validation and fallback logic.
