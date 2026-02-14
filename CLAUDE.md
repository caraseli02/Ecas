# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ECAS is a Nuxt 3 e-commerce application (Vue 3 + TypeScript) for an industrial/commercial product marketplace. It uses Firebase for authentication, Stripe for payments, and a REST API backend.

## Commands

-   `npm run dev` — Start dev server on http://localhost:3000
-   `npm run build` — Production build
-   `npm run lint` — ESLint (flat config via `@nuxt/eslint`)
-   `npm run pretty` — Prettier formatting
-   No test framework is configured

## Architecture

### API Layer (Service Pattern)

All API calls go through a service class hierarchy:

1. **`plugins/api.ts`** — Creates a configured `$fetch` instance (base URL from `NUXT_PUBLIC_BASE_URL_API`) and registers all service classes as `$api` on the Nuxt app
2. **`composables/HttpFactory.ts`** — Base class with `call<T>(method, url, data, extras)` method
3. **`services/*.service.ts`** — Each service extends `HttpFactory` with a private `RESOURCE` path constant

Access services via `useNuxtApp().$api.product.someMethod()`.

### Server API (Mock Endpoints)

`server/api/` contains Nuxt server routes that serve as mock API endpoints (auth, products, general-settings). These use Nitro file-based routing (`[method].ts` suffix convention).

### State Management

Pinia stores in `store/` use setup function syntax with `pinia-plugin-persistedstate` for localStorage persistence. Key stores: `authStore`, `cartStore`, `productStore`, `categoriesStore`, `checkout`, `paymentStore`.

### Auth Flow

-   Firebase handles authentication (`plugins/firebase.client.ts`, `composables/useFirebaseAuth.ts`)
-   Token stored in cookie (`token`) and auth store
-   Route protection via `middleware/auth.ts` applied through `routeRules` in nuxt.config.ts
-   Protected routes: `/dashboard/**`, `/checkout/**`, `/order-summary/**`, `/product/categories`

### Layouts

-   `default` — Public storefront with header/footer
-   `dashboard` — Admin/user dashboard with sidebar
-   `empty` — Minimal layout (auth pages)

### UI Components

-   **Shadcn-vue** components in `components/ui/` with `Ui` prefix (e.g., `<UiButton>`)
-   Add new shadcn components: `npx shadcn-vue@latest add <component>`
-   `cn()` utility from `@/lib/utils` for conditional Tailwind classes
-   Custom color palette defined in `tailwind.config.js` (not using Tailwind defaults)
-   Fonts: Inter and Poppins

### Form Validation

VeeValidate + Zod schemas for form validation.

## Code Conventions

-   **Vue SFC:** Always use `<script setup lang="ts">`
-   **Imports:** Use `~/` alias for project imports
-   **Lodash:** Available globally via `nuxt-lodash` with `_` prefix (e.g., `_cloneDeep()`)
-   **Services:** PascalCase with `Service` suffix, extending `HttpFactory`
-   **Stores:** camelCase with `Store` suffix, setup function syntax
-   **Composables:** camelCase with `use` prefix
-   **ESLint:** Semicolons required (stylistic config)
-   **Prettier:** Single quotes, 4-space tabs, 140 char print width

## Git Branching

-   Feature branches: `ft_<description>` or `fx_<description>`
-   Branch from `main`

## Environment Variables

Prefix with `NUXT_PUBLIC_` for client-side access. Access via `useRuntimeConfig().public`. Key vars: Firebase config, Stripe key, `BASE_URL_API`.
