# AI Testers — testy Playwright

Podstawowa konfiguracja Playwright + TypeScript, ESLint, Prettier i Husky.
Użyj Node.js 22 w wersji co najmniej 22.17.0 oraz npm 10 lub nowszego.

## Instalacja

```sh
npm ci
npm run test:install -- chromium
```

Jeśli dodajesz testy aplikacji, skopiuj `.env.example` do `.env` i ustaw
`BASE_URL` na adres aplikacji. Domyślny adres to `http://localhost:3000`.
Git ignoruje plik `.env`, a zmienne środowiskowe mają pierwszeństwo przed jego zawartością.

## Uruchamianie

```sh
npm test
npm run test:ui
npm run test:headed
npm run test:debug
npm run test:report
```

Playwright uruchamia testy z `tests/` w projekcie `mockingTests` na Chromium.
Obecny zestaw obejmuje przykładowy test z lokalną zawartością HTML oraz testy
generatora danych produktów. Możesz go uruchomić bez serwera aplikacji.
W testach aplikacji używaj `page.goto('/')`, aby korzystać z `BASE_URL`.
Uruchom aplikację osobno przed wykonaniem takich testów.

## Kontrola jakości

```sh
npm run check
npm run lint:fix
npm run format
```

Husky instaluje hook podczas `npm ci` / `npm install` w repozytorium Git.
Hook przed commitem i workflow CI uruchamiają `npm run check`, które sprawdza
lint, formatowanie i typy całego projektu. W CI te kontrole odbywają się przed
instalacją Chromium i uruchomieniem testów.
Playwright używa jednego workera i wykonuje testy bez ponowień.
W CI opcja `--forbid-only` blokuje `test.only`. Raport HTML trafia do
`playwright-report/`, a artefakty nieudanych testów do `test-results/`.

W PowerShell z blokadą skryptów używaj `npm.cmd` zamiast `npm`.

Dokumentacja: [Playwright](https://playwright.dev/docs/test-configuration),
[Husky](https://typicode.github.io/husky/get-started.html).
