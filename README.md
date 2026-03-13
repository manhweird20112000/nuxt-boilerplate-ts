# Nuxt 3 Base Project

A modern, feature-rich Nuxt 3 base project with TypeScript support, internationalization, Element Plus UI components, and TailwindCSS integration.

## Features

- **Nuxt 3**: Modern Vue.js framework with improved performance and developer experience
- **TypeScript**: Full TypeScript support for enhanced type safety and developer experience
- **Element Plus**: Integrated UI component library with custom theme support
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Internationalization**: Multi-language support with @nuxtjs/i18n
- **SEO Optimized**: Includes sitemap and robots.txt modules
- **Comprehensive Metadata**: Full set of metadata for SEO and social sharing
- **Pinia**: State management with Pinia store
- **GSAP**: Animation library for creating engaging user experiences
- **Axios**: HTTP client for API requests
- **ESLint & Prettier**: Code quality and formatting tools
- **Husky & Commitlint**: Git hooks and commit message linting
- **Day.js**: Lightweight date library
- **Vue Router**: Client-side routing
- **Vue3 Virtual Scroll List**: Efficient virtual scrolling for large lists

## Project Structure

```
nuxt-3-base-v2/
├── .nuxt/               # Nuxt build directory
├── .output/             # Nuxt output directory
├── assets/              # Static assets like images, fonts, and styles
│   ├── styles/
│   ├──── element/
│   │     ├──── index.scss # Custom theme Element Plus
│   ├──── tailwind.css   # Define & Customize tailwindcss
├── components/          # Vue components
│   ├── common/          # Reusable common components
│   ├── layouts/         # Layout-specific components
│   ├── pages/           # Page-specific components
│   └── partials/        # Partial components
├── composables/         # Vue composables for reusable logic
├── generated/           # Auto-generated files
├── i18n/                # Internationalization files
├── api/                 # API integration and services
├── infra/               # Infrastructure configuration
├── layouts/             # Nuxt layout templates
├── pages/               # Application pages
├── plugins/             # Nuxt plugins
├── public/              # Static files served at root level
│   ├── images/          # Image assets for metadata
│   └── site.webmanifest # Web app manifest file
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
├── app-loading.html     # Loading template for client-side rendering
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

## Code Quality

The project uses ESLint and Prettier for code quality and formatting. Run linting:

```bash
yarn lint
# or
npm run lint
```

## Git Hooks

The project uses Husky and Commitlint for Git hooks and commit message linting. Commit messages must follow the conventional commit format:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

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

### Creating New Stores

To add a new store:

1. Create a new file in the `stores` directory (e.g., `stores/cart.ts`)
2. Define your store using `defineStore`
3. Export the store from `stores/index.ts`

## Internationalization

The project supports multiple languages. Add or modify language files in the `i18n/` directory.

## License

[MIT License](LICENSE)
