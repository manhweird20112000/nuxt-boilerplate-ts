# Nuxt 3 Base Project

A modern, feature-rich Nuxt 3 base project with TypeScript support, internationalization, Element Plus UI components, and TailwindCSS integration.

## Features

- **Nuxt 3**: Modern Vue.js framework with improved performance and developer experience
- **TypeScript**: Full TypeScript support for enhanced type safety and developer experience
- **Element Plus**: Integrated UI component library
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Internationalization**: Multi-language support with @nuxtjs/i18n
- **SEO Optimized**: Includes sitemap and robots.txt modules
- **Pinia**: State management with Pinia store
- **GSAP**: Animation library for creating engaging user experiences
- **Axios**: HTTP client for API requests
- **ESLint & Prettier**: Code quality and formatting tools

## Project Structure

```
nuxt-3-base-v2/
├── .nuxt/               # Nuxt build directory
├── .output/             # Nuxt output directory
├── assets/              # Static assets like images, fonts, and styles
│   ├── styles/
│   ├──── element/
│   ├───────── index.scss # Custom theme Element Plus
│   ├──── tailwind.css   # Define & Customize tailwindcss
├── components/          # Vue components
│   ├── common/          # Reusable common components
│   ├── layouts/         # Layout-specific components
│   ├── pages/           # Page-specific components
│   └── partials/        # Partial components
├── composables/         # Vue composables for reusable logic
├── generated/           # Auto-generated files
├── i18n/                # Internationalization files
├── infra/               # Infrastructure configuration
├── layouts/             # Nuxt layout templates
├── pages/               # Application pages
├── public/              # Static files served at root level
├── server/              # Server-side code
├── shared/              # Shared utilities and common code
│   ├── common/          # Common shared code
│   └── utils/           # Utility functions
├── stores/              # Pinia state management stores
│   ├── index.ts         # Exports all stores for easier imports
│   ├── user.ts          # User authentication and profile state
│   └── ui.ts            # UI state (theme, sidebar, loading, etc.)
├── types/               # TypeScript type definitions
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── app-loading.html     # This file runs when SSR is set to false and is executed on the first page load.
├── app.vue              # Main application entry
├── nuxt.config.ts       # Nuxt configuration
└── tsconfig.json        # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js (v18.x or later)
- Yarn or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nuxt-3-base-v2
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Update the environment variables as needed.

## Development

Start the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at http://localhost:3000.

## Building for Production

```bash
yarn build
# or
npm run build
```

## Deployment

Preview the production build:

```bash
yarn preview
# or
npm run preview
```

For deployment with PM2:

```bash
pm2 start ecosystem.config.js
```

## Customization

- Update the application name and metadata in `nuxt.config.ts`
- Modify styles in `assets/styles/`
- Configure API endpoints in `shared/utils/api.ts`
- Add custom icons to `public/icons/`

## State Management with Pinia

The project uses Pinia for state management. Here's how to use the stores:

### Available Stores

- **UserStore**: Handles user authentication and profile data
- **UiStore**: Manages UI state like theme, sidebar collapse, and loading indicators

### Using Stores in Components

```typescript
<script setup lang="ts">
import { useUserStore, useUiStore } from '~/stores';

// Access user store
const userStore = useUserStore();

// Access UI store
const uiStore = useUiStore();

// Login example
const handleLogin = async () => {
  const success = await userStore.login({
    email: 'user@example.com',
    password: 'password'
  });

  if (success) {
    // Redirect or show success message
  }
};

// Toggle dark mode example
const toggleTheme = () => {
  uiStore.toggleDarkMode();
};
</script>
```

### Creating New Stores

To add a new store:

1. Create a new file in the `stores` directory (e.g., `stores/cart.ts`)
2. Define your store using `defineStore`
3. Export the store from `stores/index.ts`

## Internationalization

The project supports multiple languages. Add or modify language files in the `i18n/` directory.

## License

[MIT License](LICENSE)
