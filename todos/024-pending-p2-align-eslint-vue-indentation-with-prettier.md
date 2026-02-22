---
status: pending
priority: p2
issue_id: "024"
tags: [code-review, tooling, eslint, prettier, developer-experience]
dependencies: []
---

# Align ESLint Vue indentation rules with Prettier

## Problem Statement

`npm run lint` currently fails with massive indentation and formatting errors (example: `vue/html-indent` expects 2 spaces). The project’s documented Prettier standard is **4 spaces**, making it hard to use linting as a quality gate.

## Findings

- Running `npm run lint` produces a very large number of issues (repo-wide), dominated by indentation rules.
- Example error observed after recent changes: `app.vue` `vue/html-indent` expects 2 spaces but files are 4 spaces.
- AGENTS.md states Prettier uses 4 spaces.

## Proposed Solutions

### Option 1: Configure ESLint Vue indentation to 4 spaces

**Approach:** Update `vue/html-indent` and `@stylistic/indent` (and related rules) to match 4-space indentation.

**Pros:**
- Consistent with documented style
- Makes `npm run lint` actionable again

**Cons:**
- Requires updating eslint config carefully to avoid regressions

**Effort:** Medium

**Risk:** Medium

---

### Option 2: Make Prettier authoritative and disable conflicting ESLint formatting rules

**Approach:** Use Prettier for formatting and disable/relax indentation rules in ESLint.

**Pros:**
- Minimizes lint noise
- Common setup for Vue/Nuxt repos

**Cons:**
- Might reduce enforcement of certain stylistic rules

**Effort:** Small/Medium

**Risk:** Low/Medium

## Recommended Action

To be filled during triage.

## Technical Details

**Likely files:**
- `eslint.config.mjs`
- Prettier config (if present)

## Acceptance Criteria

- [ ] `npm run lint` output is actionable (no repo-wide indentation explosion)
- [ ] Prettier and ESLint agree on indentation
- [ ] A small set of representative `.vue` files lint clean after formatting

## Work Log

### 2026-02-22 - Initial Discovery

**By:** Codex

**Actions:**
- Ran `npm run lint` and observed massive indentation mismatches against 4-space formatting

**Learnings:**
- Tooling mismatch is currently a major DX blocker

### 2026-02-22 - Deferred

**By:** Codex

**Actions:**
- User requested deferring lint alignment to a separate refactor pass
