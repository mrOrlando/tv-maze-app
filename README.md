# tv-maze-app

Vue 3 app built with Vite. Unit tests with Vitest, E2E with Cypress.

## Live demo

The app is deployed on GitHub Pages: **[https://mrorlando.github.io/tv-maze-app/](https://mrorlando.github.io/tv-maze-app/)**

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` / `npm run serve` | Start dev server (http://localhost:8080) |
| `npm run dev:ci` | Dev server on `127.0.0.1:8080` with strict port (for CI / E2E) |
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

Or in one shot (same as CI):

```bash
npx start-server-and-test@2 dev:ci http://127.0.0.1:8080 test:e2e
```

## CI

GitHub Actions runs lint, unit tests, and Cypress E2E:

- **Pull requests** and pushes to branches other than `main` / `master`: `.github/workflows/ci.yml`
- **Deploy to GitHub Pages** (`main` / `master`): `.github/workflows/deploy-github-pages.yml` (includes the same checks before build)

## Configuration

- **Vite**: `vite.config.ts`
- **Cypress**: `cypress.config.ts`
- **ESLint**: `.eslintrc.cjs`
