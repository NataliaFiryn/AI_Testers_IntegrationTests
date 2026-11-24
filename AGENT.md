# Repository guide

## Project overview

This is the AI Testers Playwright integration test suite. It uses TypeScript, Chromium, and
`@faker-js/faker` for test data. The current specs cover a local HTML smoke test and product data
generation. Both run without an application server.

Use Node.js 22.17.0 or later and npm 10 or newer. CI uses Node.js 22. In PowerShell, use
`npm.cmd` in place of `npm` if script execution policy blocks `npm.ps1`.

## Commands

| Command                                      | Purpose                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `npm ci`                                     | Install dependencies from the lockfile and set up Husky in a Git checkout. |
| `npm run test:install -- chromium`           | Install the browser used by the suite.                                     |
| `npm test`                                   | Run the full Playwright suite.                                             |
| `npm test -- tests/productGenerator.spec.ts` | Run a single spec.                                                         |
| `npm run test:ui`                            | Open Playwright UI mode.                                                   |
| `npm run test:headed`                        | Run with a visible browser.                                                |
| `npm run test:debug`                         | Run with Playwright Inspector.                                             |
| `npm run test:report`                        | Open the generated HTML report.                                            |
| `npm run check`                              | Run ESLint, Prettier validation, and TypeScript type checking.             |
| `npm run lint:fix`                           | Apply ESLint fixes across the repository.                                  |
| `npm run format`                             | Apply Prettier formatting across the repository.                           |

The individual checks are `npm run lint`, `npm run format:check`, and `npm run typecheck`.
Run `npm run check` and the affected specs after changing test code. Husky runs the quality
checks before commits. GitHub Actions runs the checks before installing Chromium and running
`npm test -- --forbid-only`.

## Project structure and path aliases

| Path              | Alias           | Contents                                                                      |
| ----------------- | --------------- | ----------------------------------------------------------------------------- |
| `tests/`          | `@tests/*`      | Playwright specs, including `example.spec.ts` and `productGenerator.spec.ts`. |
| `src/helpers/`    | `@helpers/*`    | Reusable helpers and test data generators.                                    |
| `src/types/`      | `@typing/*`     | Shared types such as the backend-shaped `Product`.                            |
| `src/enums/`      | `@enums/*`      | Shared enums such as `ProductCategory`.                                       |
| `src/fixtures/`   | `@fixtures/*`   | Configured location for shared Playwright fixtures.                           |
| `src/pages/`      | `@pages/*`      | Configured location for page objects.                                         |
| `src/components/` | `@components/*` | Configured location for reusable UI component objects.                        |

The fixtures, pages, and components aliases are available for future modules. Alias mappings live
in `tsconfig.json`. Use them for cross-directory project imports, for example
`import type { Product } from '@typing/product';`.

`playwright.config.ts` defines the runner, browser, and environment loading.
`.github/workflows/playwright.yml` defines CI and uploads reports and test artifacts.
`.env.example` lists local environment variables, including placeholders for demo client and
admin credentials.

## Naming and TypeScript conventions

- Use lower camel case for module filenames and spec basenames, such as `productGenerator.ts`
  and `productGenerator.spec.ts`. Use descriptive test titles that state the expected behavior.
- Use lower camel case for functions, variables, and object fields. Use PascalCase for model
  types, enums, and enum members. Keep serialized enum values aligned with the application
  contract, including spaces and punctuation.
- TypeScript uses strict checking, ES2022, NodeNext module resolution, and no emit. Use
  `import type` for type-only imports and named exports for shared helpers and models.
- Keep explicit parameter and return types on exported helpers. Preserve distinctions between
  nullable, optional, and required fields when modeling backend responses.
- Follow Prettier for formatting. The settings use two-space indentation, single quotes,
  semicolons, trailing commas, a 100-character print width, and LF line endings.

## Working with tests

- Playwright discovers tests under `tests/` and runs them in the `mockingTests` Chromium project
  with one worker and zero retries. HTML reports go to `playwright-report/` and test artifacts
  go to `test-results/`.
- For tests against the application, start it separately, copy `.env.example` to `.env`, and set
  `BASE_URL`. Existing process environment values take precedence over `.env`, and the fallback
  URL is `http://localhost:3000`. Use relative navigation such as `page.goto('/')`. Keep real
  credentials in the ignored `.env` or the runtime environment.
- Import `test` and `expect` from `@playwright/test`. For UI assertions, follow the smoke test's
  pattern of role-based locators and Playwright's awaited assertions.
- Reuse `generateProduct(overrides)` for backend-shaped product data and
  `generateProducts(count)` for batches with distinct sequential IDs. Override fields that an
  assertion relies on. For randomized fields, assert their shape or allowed values.
