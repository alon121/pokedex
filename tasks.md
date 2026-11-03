# Tasks

Status: `[ ]` not started · `[~]` in progress · `[x]` done

1. [x] **Project setup** (steps 1–5)
   Repo from the course template, prompt log hook, Vite + React + TS, PRD, tasks, folders.
   Done when: `npm run dev` opens the app, `npm run build` passes, and `PROMPTS.md` gets a new entry for each prompt.
   Note: the Kiro prompt-log hook was added mid-session and logs automatically since 11:13 (see the note at the top of `PROMPTS.md`). The hook files are kept locally and are not in the repo.

2. [x] **Local data** (steps 6–7)
   5 sample Pokémon in `src/data/pokemon.ts` and a `Pokemon` type.
   Done when: the file compiles with the `Pokemon` type and there is no `any`.

3. [x] **Components** (step 8, 11)
   `PokemonList`, `PokemonCard`, `PokemonTypes`, `Navbar`, each with typed props.
   Done when: the list page shows 5 cards with name and image using `map` and `key={id}`.

4. [x] **Routing** (steps 9–11)
   React Router with `/`, `/pokemon/:id`, `/favorites`, `/stats` and a navbar.
   Done when: clicking navbar links and cards changes the URL and page without a full reload.

5. [x] **GraphQL** (steps 12–15)
   `getPokemonList` in `src/services/pokemonApi.ts` with `fetch` POST.
   Done when: the list shows 60 real Pokémon, with `Loading...`, error + retry, and empty states.

6. [x] **Details** (steps 16–17)
   `getPokemonById`, details page with types, abilities and `PokemonStats`.
   Done when: opening `/pokemon/25` directly shows Pikachu with its types, abilities and stats.

7. [x] **Search and filter** (steps 18–19)
   `filterPokemonByName` and `filterPokemonByType` in utils.
   Done when: typing "char" and choosing "fire" together show only Charmander, Charmeleon and Charizard.

8. [x] **Favorites** (steps 20–21)
   `toggleFavorite`, ids saved in `localStorage`, Favorites page.
   Done when: a favorite added on the list appears on `/favorites` and is still there after refresh.

9. [x] **Statistics** (steps 22–23)
   Stats calculated in utils, Stats page, 404 page.
   Done when: `/stats` shows total, count per type, most common type and favorites count; `/nothing` shows a 404 page.

10. [x] **Tests** (steps 26–27)
    Vitest + `@vitest/ui`, at least 5 unit tests.
    Done when: `npm test` passes and exits, and `npm run test:ui` shows the tests in the browser.

11. [x] **Styling** (steps 24–25)
    Own CSS with Grid, Flexbox and media queries.
    Done when: the app looks tidy at 1280px and at 375px width, images have `alt` and inputs have `label`.

12. [x] **Submission** (steps 28–30)
    README, full check, `docs/architecture.md`, push.
    Done when: the public repo opens without login and all checks in step 29 pass.
