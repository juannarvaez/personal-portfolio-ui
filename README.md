# Personal Portfolio UI

React 19 + TypeScript + Vite, with Tailwind CSS v4, Vitest, Testing Library and Storybook.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm (bundled with Node)

## Running the project

```bash
# 1. Clone the repository
git clone <repo-url>
cd personal-portfolio-ui

# 2. Install dependencies (also sets up the Husky hooks)
npm install

# 3. Start the development server
npm run dev
```

The app is available at http://localhost:5173.

### Production build

```bash
npm run build     # outputs the dist/ folder
npm run preview   # serves dist/ at http://localhost:4173
```

### Tests and Storybook

```bash
npm run test:run  # runs the tests once
npm run storybook # opens Storybook at http://localhost:6006
```

## Scripts

| Command                   | What it does                           |
| ------------------------- | -------------------------------------- |
| `npm run dev`             | Development server                     |
| `npm run build`           | Type-check + production build          |
| `npm run preview`         | Serves the build locally               |
| `npm test`                | Vitest in watch mode                   |
| `npm run test:run`        | Vitest once (CI)                       |
| `npm run storybook`       | Storybook at http://localhost:6006     |
| `npm run build-storybook` | Static Storybook build                 |
| `npm run lint`            | ESLint                                 |
| `npm run format`          | Prettier (also sorts Tailwind classes) |
| `npm run typecheck`       | Type-check only                        |

## Conventions

- Alias `@/` → `src/` (e.g. `import { Button } from '@/components/Button'`).
- Each component lives in its own folder: `Component.tsx`, `Component.test.tsx`, `Component.stories.tsx`, `index.ts`.
- Husky + lint-staged run ESLint and Prettier on staged files before each commit.
- Documentation (comments, JSDoc, README) is written in English.

## Typography

Self-hosted variable fonts via Fontsource, loaded in `src/index.css`:

| Family          | Use                        | Class          |
| --------------- | -------------------------- | -------------- |
| Fraunces        | Headings, quotes, brand    | `font-display` |
| Instrument Sans | Reading and UI (default)   | `font-sans`    |
| JetBrains Mono  | Labels, metadata, controls | `font-mono`    |

The type scale (`text-h1` … `text-control`) is defined in `tailwind.config.js`. Each token is a
complete text style, family included, so one class is enough (`<p className="text-label">`).
Token names are classes, not HTML elements: `<label>` is still only for form fields.

## Color

The palette is defined in `theme.extend.colors` in `tailwind.config.js` (`bg-accent`,
`text-text-primary`, `bg-glass-plate`, ...). Token names mirror the Figma variables
(`text/primary` → `text-text-primary`). Always use the token, never the raw hex; in custom CSS
use `--theme(--color-accent)` or `@apply`.

| Group      | Tokens                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- |
| Brand / bg | `accent`, `accent-bright/soft/mist`, `brand-navy`, `surface-mist/paper/white`                |
| Text       | `text-primary`, `text-secondary`, `text-muted`, `text-on-accent`                             |
| Glass      | `glass-card` 18%, `glass-control` 22%, `glass-panel` 40%, `glass-plate` 66%, `glass-rim` 60% |
| Borders    | `border-control`, `border-hairline`                                                          |
| Status     | `status-success`, `status-warning`, `status-danger`                                          |

Usage rules are documented next to the tokens in `tailwind.config.js`.

## Notes

- TypeScript is pinned to `~6.0` because `typescript-eslint` does not support TypeScript 7 yet.

## Internationalization (EN / ES)

The site ships in English and Spanish with a small, dependency-free setup in `src/i18n/`:

- `locales/en.ts` is the source of truth; `locales/es.ts` is typed against it, so a missing or
  extra key fails the type-check (and a test compares both key sets).
- `LocaleProvider` (mounted in `App.tsx`) picks the initial locale from localStorage, then the
  browser language, then English. It persists changes and keeps `<html lang>` in sync.
- In components, read copy with `const { dictionary, locale, setLocale } = useI18n()` and
  render `dictionary.home.tagline`, etc. Never hard-code user-facing text in JSX.

To add copy, add the key to `en.ts`, then the TypeScript error in `es.ts` tells you where its
translation goes.
