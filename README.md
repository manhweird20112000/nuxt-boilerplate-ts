# Nuxt 3 Base Project

This project is being organized around a feature-based architecture on top of Nuxt 3. The goal is to keep business logic close to the domain that owns it, while moving framework wiring and reusable building blocks into clear shared layers.

Today, the codebase already reflects that direction:

- `app` contains Nuxt entrypoints and route bindings.
- `features` contains domain-focused UI and use cases.
- `shared` contains reusable UI, composables, types, constants, and utilities.
- `core` contains technical adapters such as HTTP and storage services.

## Architecture Direction

The project follows this mental model:

```text
app -> features -> shared -> core
```

Responsibilities by layer:

- `app`: Nuxt-specific files such as `app.vue`, layouts, route files, and app-level assets.
- `features`: Product/domain features such as authentication, profile, checkout, dashboard, and so on.
- `shared`: Cross-feature building blocks that are safe to reuse anywhere.
- `core`: Technical infrastructure and low-level adapters for external concerns.

This separation helps the codebase scale by keeping:

- business code inside the feature that owns it,
- framework glue inside `app`,
- generic reusable code inside `shared`,
- transport and persistence details inside `core`.

## Current Source Structure

```text
nuxt-3-base-v2/
├── app/                  # Nuxt shell: routing, layouts, app-level assets
│   ├── app.vue           # Application root
│   ├── error.vue         # Global error page
│   ├── layouts/          # Layouts used by routes
│   ├── pages/            # Route entry files (thin bridges into features)
│   └── assets/           # Styles and assets scoped to the app layer
├── core/                 # Technical/infrastructure services (no business rules)
│   ├── api/
│   │   ├── module.ts     # Axios module: instance, interceptors, error handling
│   │   └── service.ts    # HTTP abstraction and exported HttpService
│   └── storage/
│       └── index.ts      # Cookie/local/session storage adapters
├── features/             # Business modules (one folder per feature)
│   └── auth/
│       ├── api/          # Auth-specific API calls and DTO mapping
│       ├── components/   # Auth-specific UI pieces
│       ├── composables/  # Auth-specific state and logic
│       └── pages/        # Auth screens owned by the auth feature
├── shared/               # Cross-feature reusable primitives
│   ├── composables/      # Generic composables (resize, translate, validate, etc.)
│   ├── constants/        # App-wide constants
│   ├── types/            # Shared types (e.g., TxKeyPath, Future)
│   ├── ui/               # Low-level UI primitives (button, dialog, field, etc.)
│   └── utils/            # Helpers (formatter, validators, toast, helper, etc.)
├── i18n/                 # Locales and i18n configuration
├── public/               # Static files (icons, metadata images, etc.)
├── server/               # Server routes/middleware if any
├── nuxt.config.ts        # Nuxt configuration (modules, auto-imports, etc.)
└── tsconfig.json         # TypeScript configuration
```

## Layer Responsibilities

### `app/`

`app` is the Nuxt shell. It should stay thin and mostly declarative.

Typical contents:

- route files under `app/pages`
- layouts under `app/layouts`
- application root under `app/app.vue`
- app-scoped styles and assets under `app/assets`

In the current codebase, `app/pages/login.vue` is a route entry that delegates rendering to `features/auth/pages/login.page.vue`. This is the intended pattern: keep Nuxt file-based routing in `app`, but move page implementation into the owning feature.

### `features/`

`features` is where business-facing modules live.

Each feature should own its:

- pages: end-user screens for this feature
- components: UI specific to this feature (forms, panels, widgets)
- composables: feature-specific state and logic
- API calls: HTTP calls, DTO mapping, and use cases related to this feature
- models/types: types and models that make sense only inside this feature

Example:

```text
features/
└── auth/
    ├── api/
    ├── components/
    ├── composables/
    └── pages/
```

This allows the `auth` feature to evolve with minimal coupling to other parts of the application.

### `shared/`

`shared` contains code that is not tied to a single business feature and can be reused safely across multiple features.

Current examples:

- `shared/ui`: UI primitives such as button, dialog, field, icon, image, and loading
- `shared/composables`: reusable hooks such as translation, validation, asset lookup, and resize handling
- `shared/utils`: generic helpers, formatters, validators, and toast helpers
- `shared/types`: common reusable types
- `shared/constants`: app-wide constants

Nuxt auto-import is already configured for parts of this layer in `nuxt.config.ts`, especially:

- `./shared/utils`
- `./shared/ui`

That makes shared primitives easy to consume without coupling features to legacy global folders.

### `core/`

`core` contains technical services and adapters that support the whole application but do not express product behavior.

Current examples:

- `core/api/module.ts`: Axios client factory and interceptors
- `core/api/service.ts`: HTTP adapter abstraction and concrete HTTP service
- `core/storage/index.ts`: cookie, local storage, and session storage adapters

`core` should stay focused on infrastructure concerns:

- HTTP
- storage
- authentication tokens
- analytics
- error reporting
- environment-aware services

## Dependency Rules

To keep the architecture clean, follow these dependency rules:

- `app` can depend on `features`, `shared`, and `core`.
- `features` can depend on `shared` and `core`.
- `shared` must not depend on `features`.
- `core` must not depend on `features`.

Practical guidance:

- Put route files in `app/pages`, but keep the screen implementation in `features/<feature>/pages`.
- Put reusable UI atoms and wrappers in `shared/ui`.
- Put business-specific components in `features/<feature>/components`.
- Put API transport details in `core/api`, and feature-specific API calls in `features/<feature>/api`.
- Put only truly cross-feature helpers in `shared/utils`.

## Route Composition Pattern

Because Nuxt relies on file-based routing, route files still belong in `app/pages`. To stay feature-oriented, each route should be a thin bridge.

Example:

```vue
<script setup lang="ts">
import LoginPage from '~~/features/auth/pages/login.page.vue'
</script>

<template>
  <login-page />
</template>
```

This pattern gives us both:

- Nuxt-native routing
- feature-owned page implementation

## Feature Module Guidelines

When adding a new feature, prefer the following structure and rules.

### Recommended structure

```text
features/
└── feature-name/
    ├── api/
    │   └── feature-name.api.ts
    ├── components/                # Feature-specific UI
    │   └── feature-name-form.vue
    ├── composables/               # Hooks for state and logic
    │   └── use-feature-name.ts
    ├── models/                    # Optional domain models
    │   └── feature-name.model.ts
    ├── pages/                     # Screens for this feature
    │   └── feature-name.page.vue
    └── types/                     # Feature-local types (if needed)
        └── feature-name.type.ts
```

### Recommended workflow:

1. Add the Nuxt route entry in `app/pages`.
2. Implement the page in `features/<feature>/pages`.
3. Keep feature-specific API logic inside `features/<feature>/api`.
4. Reuse primitives from `shared` instead of duplicating them.
5. Use `core` only for technical adapters, not feature rules.

### What features should and should not do

**Features should:**

- own their screens, UI flow, and business logic,
- call `core` services (e.g., `HttpService`, storage) through their own `api` layer,
- reuse `shared` UI and composables instead of duplicating primitives,
- expose clear, small public APIs (e.g., composables, components).

**Features must not:**

- import from other features directly (avoid cross-feature coupling),
- place generic UI or helpers inside `features` (put them under `shared` instead),
- talk directly to low-level libraries like `axios` or `js-cookie` (go through `core`),
- define global configuration (that belongs in `app` or `nuxt.config.ts`).

If a piece of code feels like it could be reused by another feature tomorrow, move it to `shared`. If it is purely about infrastructure or third-party integration, it belongs in `core`.

## Naming Conventions

To keep the source tree predictable:

- use `kebab-case` for directories and file names,
- use `<feature>.page.vue` for feature-owned pages,
- use `use-*.ts` for composables,
- use one responsibility per file whenever possible.

Suggested examples:

- `features/auth/pages/login.page.vue`
- `features/auth/api/auth.api.ts`
- `shared/composables/use-translate.ts`
- `shared/ui/button.vue`

## Development

### Prerequisites

- Node.js 18 or later
- Yarn 1.x

### Install Dependencies

```bash
yarn install
```

### Run in Development

```bash
yarn dev
```

### Build for Production

```bash
yarn build
```

### Preview the Production Build

```bash
yarn preview
```

### Lint the Project

```bash
yarn lint
```

## Important Technical Notes

- The project uses `@pinia/nuxt`, `@nuxtjs/i18n`, `@nuxt/image`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `@element-plus/nuxt`, and `@sentry/nuxt/module`.
- `nuxt.config.ts` configures auto-imports for shared reusable code.
- Icons in `public/icons` are collected into `generated/icons.json` during Nuxt ready hooks.
- The current source tree is in transition from older folders into the new `core`, `shared`, and `features` structure.

## Summary

This codebase is moving toward a feature-based Nuxt architecture where:

- Nuxt concerns stay in `app`
- domain modules live in `features`
- reusable primitives live in `shared`
- infrastructure lives in `core`

That direction should remain the default for all new code.
