# AI Testers — testy Playwright

Podstawowa konfiguracja Playwright + TypeScript, ESLint, Prettier i Husky.
Wymagany Node.js 22.17+ oraz npm.

## Instalacja

```sh
npm ci
npm run test:install
```

Plik `.env` jest ignorowany przez Git. Po sklonowaniu repozytorium skopiuj
`.env.example` do `.env` i ustaw `BASE_URL` na adres testowanej aplikacji.
Zmienne środowiskowe systemu mają pierwszeństwo przed `.env`.

## Uruchamianie

```sh
npm test
npm run test:ui
npm run test:headed
npm run test:debug
npm run test:report
```

Testy znajdują się w `tests/` i uruchamiają się w Chromium, Firefox oraz WebKit.
Przykładowy test korzysta z lokalnej zawartości HTML i nie wymaga serwera.
W testach aplikacji używaj `page.goto('/')`, aby korzystać z `BASE_URL`.
Uruchom aplikację osobno przed wykonaniem takich testów.

## Kontrola jakości

```sh
npm run check
npm run lint:fix
npm run format
```

Husky instaluje hook podczas `npm ci` / `npm install` w repozytorium Git.
Przed commitem sprawdzane są lint, formatowanie i typy całego projektu.
W CI Playwright blokuje `test.only`, ponawia nieudane testy dwukrotnie
i używa jednego workera. Raport HTML trafia do `playwright-report/`,
a artefakty nieudanych testów do `test-results/`.

W PowerShell z blokadą skryptów używaj `npm.cmd` zamiast `npm`.

Dokumentacja: [Playwright](https://playwright.dev/docs/test-configuration),
[Husky](https://typicode.github.io/husky/get-started.html).
