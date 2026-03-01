---
title: "fix: portfolio demo UI review issues (exclude signup)"
type: fix
date: 2026-03-01
---

# fix: portfolio demo UI review issues (exclude signup)

## Overview

Resolve the UI/UX issues found in the 2026-03-01 3-pass UI review for the portfolio demo flows (customer + admin), **excluding**:

- **DF-06 (Signup wizard broken)**: intentionally **out of scope** for the portfolio demo story.
- **DF-03 (Left space on desktop home)**: expected because the desktop mega-category surface lives there.

Primary goal: make the demo feel polished and reliable for a portfolio walkthrough across **375 / 768 / 1440** widths.

## Context (Existing Decisions)

From brainstorm `docs/brainstorms/2026-02-13-backend-to-portfolio-demo-brainstorm.md`:

- The demo should be **self-contained** and feel complete (mock mode is acceptable).
- Authentic “flows” matter more than backend realism.

From solution `docs/solutions/ui-bugs/portfolio-demo-demo-readiness-fixes-system-20260225.md`:

- **Signup is intentionally de-scoped** for the demo.
- Auth gates should preserve user intent via a sanitized `redirect` query.

## Scope

### In Scope (Fix)

- DF-01: overlays/badges blocking or obscuring CTAs.
- DF-02: mobile home top-of-fold lacks a clear hero/value prop + CTA.
- DF-04: search autocomplete dropdown persists after navigation.
- DF-05: preserve redirect intent through auth gates (middleware + 401 handler).
- DF-07: product detail mobile spacing issues (concatenated labels).
- DF-08: order summary scroll/layout issues; disabled checkout needs actionable guidance; “Continue Shopping” should navigate.
- DF-10: placeholder banners (lorem ipsum) + expired external image assets on purchase-critical surfaces.

### Out of Scope (Document / De-scope)

- DF-06: Signup wizard (multi-step form) is not needed for the portfolio demo. Keep the demo story as:
  **browse → search → product detail → add to cart → order summary/checkout entry → dashboards**.
  - Action: ensure the UI does not promote signup (links/CTAs) and `/signup` communicates “not part of demo” instead of a broken wizard.

### Expected / No Change

- DF-03: desktop home’s left column is reserved for categories navigation (expected).
- DF-09: validated — customer dashboard Orders tab content appears immediately (not a delayed-load issue).

## Evidence (Screenshots from 2026-03-01 review)

All screenshots live under:
`/Users/vladislavcaraseli/Documents/Ecas/tmp/ui-review-2026-03-01/`

Key examples:

- Overlay + mock badge interference: `product_detail_smartphone.png`, `product_detail_375.png`
- Mobile home top-of-fold: `home_375_top.png`
- Search dropdown persistence: `search_after_enter_1440.png`
- Customer dashboard orders tab blank: `dashboard_customer_orders_tab.png`
- Order summary blank-left-on-scroll + disabled checkout: `order_summary_scrolled.png`, `order_summary_disabled_checkout.png`
- Placeholder checkout banners: `order_summary_scrolled.png`

### Delay Validation (DF-09 + DF-10) — 2026-03-01

Captured under:
`/Users/vladislavcaraseli/Documents/Ecas/tmp/ui-review-2026-03-01/df09-df10-delay-check/`

- DF-09: Orders tab content is present immediately (and unchanged after waiting):
  - `df09_after_click_orders_0s.png`
  - `df09_after_click_orders_14s.png`
  - Deep-link post-login: `df09_after_login_2s.png`
- DF-10: Placeholder banner + broken promo image + blank-left-on-scroll remain after waiting (not a “content appears later” issue):
  - `df10_order_summary_top_16s.png`
  - `df10_order_summary_scrolled_16s.png`

## Plan

### 1) Remove/Contain CTA-Blocking Overlays (DF-01)

**Why:** A portfolio demo should not show perf/dev overlays, and CTAs must remain clickable/visible.

**Tasks**

- [ ] Identify the source of the bottom “ms” bubble overlay (likely Nuxt DevTools/perf overlay) and disable it in demo runs.
  - Candidate config: `nuxt.config.ts` (`devtools.enabled = false` in demo/mock mode).
- [ ] Ensure the “MOCK MODE” badge never overlaps content on mobile.
  - File: `layouts/default.vue`
  - Prefer: offset using safe-area insets + place below footer/above only when there’s whitespace, or move into the header as a small inline chip.

**Acceptance Criteria**

- [ ] No dev/perf overlays appear in the demo experience.
- [ ] “MOCK MODE” indicator never covers text/buttons at 375px on product/order/checkout surfaces.

### 2) Fix Search Autocomplete Dismiss + Navigation (DF-04)

**Root cause (current):** `components/layout/header/Search.vue` only hides results on `blur`; on Enter it route-pushes to `/search` while keeping results open.

**Tasks**

- [ ] Hide autocomplete immediately when submitting search (Enter/click search icon).
  - File: `components/layout/header/Search.vue`
  - Set `showSearchResults = false`, clear product list, and optionally blur the input.
- [ ] Hide autocomplete on route changes (watch `route.fullPath`).
- [ ] Hide autocomplete when a suggestion is clicked (close on link click).
- [ ] Verify click-outside behavior works (existing `plugins/click-outside.ts` can be reused).

**Acceptance Criteria**

- [ ] After navigating to `/search?keyword=...`, dropdown is closed and does not cover results.
- [ ] Dropdown closes on Escape/click-outside and on route change.

### 3) Preserve Redirect Intent Through Auth Gates (DF-05)

Even if `/cart` intentionally redirects to `/order-summary` for the demo, protected routes should preserve where the user intended to go.

**Tasks**

- [ ] Update middleware redirects to include `redirect`:
  - Files: `middleware/auth.ts`, `middleware/router.global.ts`
  - Behavior: `navigateTo('/?signin=true&redirect=' + encodeURIComponent(to.fullPath))`
- [ ] Update 401 handler redirect to include current route:
  - File: `composables/HttpFactory.ts`
- [ ] Confirm sign-in modal uses the `redirect` query (already sanitized in `components/layout/account-modal/Form.vue`) and closes cleanly.

**Acceptance Criteria**

- [ ] Deep-linking to a protected route (e.g., `/order-summary`, `/dashboard/orders`) shows sign-in gate and returns to the original path after successful sign-in.
- [ ] Redirect is sanitized (only in-app absolute paths; no `//` or protocols).

### 4) Restore Mobile Home “Hero Surface” (DF-02)

**Root cause (current):** the desktop category + banner surface is inside `components/layout/header/main-menu/DektopPopoverContainer.vue` and is hidden on mobile. At 375px, the first content is a features row + newsletter/footer, with no primary hero/CTA.

**Tasks**

- [ ] Add a mobile-friendly hero surface that preserves the demo story:
  - Option A: render a simplified categories + `BannerNew` section on mobile (accordion list + CTA).
  - Option B: promote `BannerNew` into the home page for mobile only.
- [ ] Ensure the first viewport at 375px contains:
  - a clear value prop headline
  - a primary CTA (Explore Products / Start Shopping)
  - a discoverable categories entry point

**Acceptance Criteria**

- [ ] At 375px, home top-of-fold shows a hero/value prop + CTA (not newsletter/footer).
- [ ] At 768px, the page does not feel visually empty.

### 5) Fix Order Summary Layout + Checkout Guidance (DF-08 + DF-10)

**Root causes (current):**

- Two-column layout can produce a large blank left area during scroll (promo widgets only on the right).
- “Secure Checkout” can be disabled with no actionable guidance.
- Checkout promos use placeholder text and expired external assets.

**Tasks**

- [ ] Rework the order summary layout so “blank-left” does not occur on typical scroll positions:
  - File: `pages/order-summary/index.vue`
  - Approach: move promo cards below the main table, or make the right column sticky while the left keeps meaningful content, or collapse into one column after the table.
- [ ] Add explicit disabled-state guidance for checkout:
  - File: `components/order-summary/CheckoutButtons.vue`
  - Show which requirement is missing (shipping preferences / payment method) with links/buttons that scroll to the relevant section.
- [ ] Make “Continue Shopping” navigate (e.g., to `/search` or last non-checkout route).
  - File: `components/order-summary/CheckoutButtons.vue`
- [ ] Replace placeholder copy and remove expired external images:
  - Files: `components/order-summary/BannerCard.vue`, `components/order-summary/BannerImageCard.vue`, `components/home/FeaturedProducts.vue`
  - Use local assets under `assets/` and demo-appropriate copy.

**Acceptance Criteria**

- [ ] Order summary never shows a “broken/empty” main column while the sidebar continues alone.
- [ ] Disabled checkout clearly explains what’s missing and how to fix it.
- [ ] Checkout/order summary contains no lorem ipsum and no external-image links that can expire.

### 6) Fix Product Detail Mobile Spacing (DF-07)

**Root cause (current):** `components/product/Quantity.vue` renders the “Price for / Multiple / Minimum order” trio inline on mobile with no gap/wrap, creating concatenated labels.

**Tasks**

- [ ] Add spacing/wrapping so the trio reads cleanly at 375px.
  - File: `components/product/Quantity.vue`
  - Approach: `gap-*` + `flex-wrap` or a 2-row grid for small screens.

**Acceptance Criteria**

- [ ] At 375px, the trio does not concatenate and remains readable without overlap.

## Quality Gates (Manual QA)

Use the existing UI review harness (agent-browser screenshots are acceptable) on:

- `/` (home)
- `/search?keyword=phone`
- `/product/prod-1`
- `/order-summary`
- `/dashboard/client?tab=orders`
- `/dashboard/orders`

At each: test **375 / 768 / 1440**, and verify:

- [ ] No CTA-blocking overlays.
- [ ] Search dropdown closes correctly.
- [ ] Auth redirect intent preserved.
- [ ] Home has mobile hero/CTA.
- [ ] Customer dashboard tabs render correctly.
- [ ] Order summary checkout guidance is actionable and layout feels intentional.

## References

- Brainstorm: `docs/brainstorms/2026-02-13-backend-to-portfolio-demo-brainstorm.md`
- Prior plan: `docs/plans/2026-02-25-fix-portfolio-demo-ui-flow-blockers-plan.md`
- Solution (demo readiness fixes): `docs/solutions/ui-bugs/portfolio-demo-demo-readiness-fixes-system-20260225.md`
- UI review screenshots: `/Users/vladislavcaraseli/Documents/Ecas/tmp/ui-review-2026-03-01/`
