# Personal Portfolio UI

React 19 + TypeScript + Vite, con Tailwind CSS v4, Vitest, Testing Library y Storybook.

## Scripts

| Comando                   | Qué hace                                  |
| ------------------------- | ----------------------------------------- |
| `npm run dev`             | Servidor de desarrollo                    |
| `npm run build`           | Type-check + build de producción          |
| `npm run preview`         | Sirve el build localmente                 |
| `npm test`                | Vitest en modo watch                      |
| `npm run test:run`        | Vitest una sola vez (CI)                  |
| `npm run storybook`       | Storybook en http://localhost:6006        |
| `npm run build-storybook` | Build estático de Storybook               |
| `npm run lint`            | ESLint                                    |
| `npm run format`          | Prettier (ordena también clases Tailwind) |
| `npm run typecheck`       | Solo type-check                           |

## Convenciones

- Alias `@/` → `src/` (ej. `import { Button } from '@/components/Button'`).
- Cada componente vive en su carpeta: `Component.tsx`, `Component.test.tsx`, `Component.stories.tsx`, `index.ts`.
- Husky + lint-staged ejecutan ESLint y Prettier sobre los archivos en stage antes de cada commit.

## Notas

- TypeScript está fijado en `~6.0` porque `typescript-eslint` aún no soporta TypeScript 7.
