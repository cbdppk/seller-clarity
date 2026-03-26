# Skill: Schema-First AI

## Goal
Make AI outputs reliable enough for a demo.

## Use this skill when
- defining JSON result shapes
- improving prompt reliability
- validating outputs
- handling extraction uncertainty

## Workflow
1. Write TypeScript types
2. Mirror them in Zod
3. Prompt the model to return only schema-shaped JSON
4. Validate on the server
5. Convert failures into warnings + fallback

## Rules
- never invent fields
- warnings are better than fake precision
- keep insights short and evidence-based
