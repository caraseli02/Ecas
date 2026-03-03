---
status: completed
priority: p1
issue_id: '031'
tags: [frontend, ui, product, images, vue, portfolio-demo]
dependencies: []
---

# Fix product media fallback + action icon overlap (portfolio demo)

Source plan:
`docs/plans/2026-03-03-fix-product-media-fallback-action-icons-plan.md`

## Tasks

- [x] Replace plain `<img>` in `components/product/Details.vue` with `ImageWithFallback` and safe optional chaining.
- [x] Refactor `components/product/Gallery.vue` so action icons never overlap the main product image.
- [x] Manual QA screenshots (375/768/1440) for `/product/prod-19` (or any product page).
- [x] Update plan checklist items to completed.
