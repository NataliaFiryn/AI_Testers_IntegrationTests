# Repository guide

## Project overview

This is the AI Testers Playwright integration test suite. It uses TypeScript, Chromium, and
`@faker-js/faker` for test data generation. The current spec signs in to the application and
verifies that the catalog renders eight products from a mocked search response.

Use Node.js 22.17.0 or later and npm 10 or newer. CI uses Node.js 22. In PowerShell, use
`npm.cmd` in place of `npm` if script execution policy blocks `npm.ps1`.

## Commands

| Command                                       | Purpose                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| `npm ci`                                      | Install dependencies from the lockfile and set up Husky in a Git checkout. |
| `npm run test:install -- chromium`            | Install the browser used by the suite.                                     |
| `npm test`                                    | Run the full Playwright suite.                                             |
| `npm test -- tests/productSearchMock.spec.ts` | Run the catalog mock spec.                                                 |
| `npm run test:ui`                             | Open Playwright UI mode.                                                   |
| `npm run test:headed`                         | Run with a visible browser.                                                |
| `npm run test:debug`                          | Run with Playwright Inspector.                                             |
| `npm run test:report`                         | Open the generated HTML report.                                            |
| `npm run check`                               | Run ESLint, Prettier validation, and TypeScript type checking.             |
| `npm run lint:fix`                            | Apply ESLint fixes across the repository.                                  |
| `npm run format`                              | Apply Prettier formatting across the repository.                           |

The individual checks are `npm run lint`, `npm run format:check`, and `npm run typecheck`.
Run `npm run check` and the affected specs after changing test code. Husky runs the quality
checks before commits. GitHub Actions runs the checks before installing Chromium and running
`npm test -- --forbid-only`.

## Project structure and path aliases

| Path              | Alias           | Contents                                                          |
| ----------------- | --------------- | ----------------------------------------------------------------- |
| `tests/`          | `@tests/*`      | Playwright specs, including `productSearchMock.spec.ts`.          |
| `src/helpers/`    | `@helpers/*`    | Reusable helpers and test data generators.                        |
| `src/types/`      | `@typing/*`     | Shared types such as the backend-shaped `Product`.                |
| `src/enums/`      | `@enums/*`      | Shared enums such as `ProductCategory`.                           |
| `src/fixtures/`   | `@fixtures/*`   | Shared Playwright fixtures and deterministic response data.       |
| `src/pages/`      | `@pages/*`      | Page objects for shared controls, login, dashboard, and products. |
| `src/components/` | `@components/*` | Configured location for reusable UI component objects.            |

Alias mappings live in `tsconfig.json`. Use them for cross-directory project imports, for example
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
- Set `BASE_URL` to a reachable application instance. Use `.env.example` as the local template.
  Existing environment values take precedence over `.env`. Use relative navigation and keep
  credentials in the ignored `.env` or the runtime environment.
- For login fixtures, import `test` and `expect` from `@fixtures/login`. Other specs can use
  `@playwright/test`. Use Playwright's awaited UI assertions.
- In page objects and tests, prefer `getByTestId()` when the element has a `data-testid` attribute.
  When no test ID is available, use an accessible locator such as `getByRole()` or `getByLabel()`.
- Reuse `generateProduct(overrides)` for backend-shaped product data and
  `generateProducts(count)` for batches with distinct sequential IDs. Override fields that an
  assertion relies on. For randomized fields, assert their shape or allowed values.

## Login fixture and page objects

- `@fixtures/login` exposes the test-scoped `signInAsDemoClient` callback. Call it once the
  browser reaches the login page, either via `LoginPage.goto()` or a redirect from a protected page.
  It waits for the login heading and delegates to `LoginPage.signInAsDemoClient()`, which reads
  `DEMO_USER_CLIENT_USERNAME` and `DEMO_USER_CLIENT_PASSWORD`. Wait for the destination URL or
  an expected authenticated element after calling it.
- `BasePage` provides shared locators for currency, shop API transport, cart, and navigation.
  `LoginPage` owns the login form and also supports explicit credentials through `signIn()`.
  `DashboardPage` represents the home screen and its navigation controls.
- `ProductPage` owns catalog navigation, filters, product cards, and search interception.
  Use `productCard(name)` to scope assertions to a specific product. Keep scenario assertions
  and the choice of mock data in the spec.

## Catalog mocking strategy

1. For a new mock, use Playwright MCP to inspect the browser's network requests and response
   shape. Visiting `/products` loads the page. The default catalog data comes from
   `GET /api/v1/products/search?page=0&size=12`.
2. Prepare deterministic response data in `src/fixtures/`. Keep `content`, pagination totals,
   and facets consistent. `productSearchResponse.ts` contains eight records with a `[Mock]`
   prefix in their names so UI assertions can identify the intercepted data.
3. Register `ProductPage.mockProductSearch(baseURL, response)` before any navigation that can
   trigger the request. It matches the application origin, search path, pagination, and HTTP
   method. The catalog spec then opens `/products` and calls the login fixture after the redirect.
4. Verify the destination, result count, and expected fields on each card. The existing spec
   checks the name, description, USD price, and category. Authentication and other requests
   still use the configured application.

When a task requests browser inspection without running the spec, verify the UI through MCP
and use `npm run check` for static checks.
