# Agent Guidelines for ECAS Project

## Project Overview

Nuxt 3 + TypeScript e-commerce application with Vue 3 Composition API, Pinia for state management, Tailwind CSS for styling, Firebase for backend, and Stripe for payments.

## Build / Lint / Format Commands

-   `npm run dev` - Start development server (http://localhost:3000)
-   `npm run build` - Build for production
-   `npm run generate` - Generate static site
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint on .ts, .js, .vue files
-   `npm run pretty` - Format code with Prettier
-   `npm run postinstall` - Prepare Nuxt (runs automatically after install)

**Testing:** No test framework configured. To add tests, install Vitest: `npm install -D @nuxt/test-utils vitest`

## Code Style Guidelines

### Imports

Order: Vue/Nuxt built-ins → third-party → local aliases → types

```typescript
// Vue/Nuxt
import { ref, computed } from 'vue';
import { useNuxtApp, useRoute } from '#app';

// Third-party
import { defineStore } from 'pinia';
import moment from 'moment';

// Local (always use ~/ alias)
import { useAuthStore } from '~/store/authStore';
import HttpFactory from '~/composables/HttpFactory';

// Types
import type { UserInterface } from '~/types/auth/user-interface';
```

### Naming Conventions

-   **Components:** PascalCase (e.g., `HomeHero.vue`, `ProductCard.vue`)
-   **Composables:** camelCase with `use` prefix (e.g., `useUser`, `usePaymentCards`)
-   **Services:** PascalCase with `Service` suffix (e.g., `AuthService`, `ProductService`)
-   **Stores:** camelCase with `Store` suffix (e.g., `authStore`, `cartStore`)
-   **Interfaces:** PascalCase descriptive names (e.g., `UserInterface`, `ShippingAddressInterface`)
-   **Constants:** UPPER_SNAKE_CASE for class constants (e.g., `private RESOURCE = '/auth'`)
-   **Files:** Services use `.service.ts`, composables use `.ts` with `use` prefix

### TypeScript

-   Always use `<script setup lang="ts">` in Vue components
-   Explicitly type function parameters and return values
-   Use interfaces for API responses and complex objects
-   Use generics for reusable functions: `async call<T>(method: string, url: string): Promise<T>`
-   Type assertions when needed: `as unknown as { status: string }`

### Vue Components

```vue
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];
    class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
});
</script>
```

### State Management (Pinia)

Use setup function syntax with persistence:

```typescript
export const useAuthStore = defineStore(
    'auth-store',
    () => {
        const token = ref<string>('');
        const getToken = () => token.value;
        return { token, getToken };
    },
    { persist: { storage: piniaPluginPersistedstate.localStorage() } }
);
```

### API Services Pattern

Extend `HttpFactory` with private RESOURCE constant:

```typescript
class AuthService extends HttpFactory {
    private RESOURCE = '/auth';

    async login(payload: LoginRequest) {
        try {
            return await this.call('POST', `${this.RESOURCE}/login`, payload);
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}
```

### Lodash (nuxt-lodash)

Uses `_` prefix: `_.cloneDeep()`, `_.map()`. Skip prefix for string methods.

### Prettier Configuration

-   Single quotes: `'string'`
-   Tab width: 4 spaces
-   Print width: 140 characters

### File Organization

-   `/components/ui/` - Shadcn UI components (use `Ui` prefix)
-   `/composables/` - Reusable composition functions
-   `/services/` - API service classes extending HttpFactory
-   `/store/` - Pinia stores
-   `/types/` - TypeScript interfaces and types
-   `/pages/` - Nuxt auto-routing pages
-   `/layouts/` - Nuxt layout components

### Styling

-   Tailwind CSS utility classes
-   Breakpoints: `xs:390, sm:640, md:768, lg:1024, xl:1280, 2xl:1536`
-   Use `cn()` utility from `@/lib/utils` for conditional classes

### Route Middleware

Protected routes (require auth):

-   `/dashboard/**`
-   `/checkout/**`
-   `/order-summary/**`
-   `/product/categories`

Apply in `nuxt.config.ts` via `routeRules`.

### Environment Variables

Prefix with `NUXT_PUBLIC_` for client-side access. Access via `useRuntimeConfig().public`.

### Git Workflow

-   Feature branches: `ft_<description>` or `fx_<description>`
-   Always branch from `main`
-   CI/CD creates draft PRs automatically

### API Response Pattern

Standard format: `{ status: string, data: T }`. Check `response.status === 'success'`.

### Key Integrations

-   Firebase (auth/storage)
-   Stripe (payments)
-   VeeValidate + Zod (forms)
-   Radix Vue (headless UI)
-   ApexCharts (charts)
