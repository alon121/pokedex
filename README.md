# Pokédex

A small web app for looking up Pokémon. You can browse a list, search and filter it, open a details page for each Pokémon, keep a list of favorites and see statistics about the list.

Front-end only: no server, no database, no login.

## Pages

| Page | URL | What you can do |
| --- | --- | --- |
| List | `/` | See 60 Pokémon with name, image and types. Search by name, filter by type, add or remove favorites. |
| Details | `/pokemon/:id` | See number, image, types, abilities, height, weight and stats (HP, Attack, Defense, Speed...). |
| Favorites | `/favorites` | See only your favorite Pokémon and remove them. Favorites are saved in `localStorage`, so they stay after a refresh. |
| Statistics | `/stats` | See how many Pokémon were loaded, how many of each type, the most common type and how many favorites you have. |

Unknown URLs show a 404 page. Invalid or unknown Pokémon ids show a "not found" message.

## Tech

- React + TypeScript, built with Vite
- React Router for the pages and URLs
- Vitest and Vitest UI for unit tests
- Plain CSS (Grid, Flexbox, media queries), no UI library

## API

Data comes from the [PokéAPI GraphQL API](https://pokeapi.co/docs/graphql) at `https://graphql.pokeapi.co/v1beta2`. It is free and needs no API key.

The app sends `POST` requests with `fetch` (no GraphQL library). The queries are in `src/services/pokemonApi.ts`. The results of the first API check are in [docs/graphql-check.md](docs/graphql-check.md).

The list is loaded once when the app starts and shared by the list, favorites and statistics pages. The public endpoint is rate-limited (about 100 requests per hour per IP), so if it fails the app shows an error with a "Try again" button.

## Run the project

You need Node.js 22.12 or newer (required by Vitest).

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Tests

```bash
npm test          # runs all tests once in the terminal
npm run test:ui   # opens Vitest UI in the browser
```

The tests check the app's own logic in `src/utils`: search by name, filter by type, both together, statistics per type, and adding/removing favorites. They use small local data and make no network calls.

## Production build

```bash
npm run build     # type-check and build into dist/
npm run preview   # serve the built app locally
```

## Project docs

- [PRD.md](PRD.md): what the app does and the acceptance criteria
- [tasks.md](tasks.md): the work plan
- [docs/architecture.md](docs/architecture.md): components, data flow and state
- [PROMPTS.md](PROMPTS.md): log of the prompts sent to the AI agent
