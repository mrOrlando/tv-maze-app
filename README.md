# tv-maze-app

Vue 3 app built with Vite. Unit tests with Vitest, E2E with Cypress.

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` / `npm run serve` | Start dev server (http://localhost:8080) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run test:unit` | Run unit tests (Vitest) |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Run E2E tests (Cypress headless) |
| `npm run test:e2e:open` | Open Cypress UI |
| `npm run lint` | Lint and fix with ESLint |

## E2E tests

Start the app, then run Cypress:

```bash
npm run dev
# In another terminal:
npm run test:e2e
```

## Configuration

- **Vite**: `vite.config.js`
- **Cypress**: `cypress.config.js`
- **ESLint**: `.eslintrc.cjs`
