# Architecture

## Pages and components

```
main.tsx
└── App.tsx                 state: pokemonList, isLoading, error, favoriteIds + routes
    ├── Navbar              links to the 4 pages, shows favorites count
    └── <Routes>
        ├── /               PokemonListPage   state: searchText, selectedType
        │                   ├── SearchBar     text input + type select
        │                   └── PokemonList → PokemonCard → PokemonTypes
        ├── /pokemon/:id    PokemonDetailsPage  state: result of getPokemonById
        │                   ├── PokemonTypes
        │                   └── PokemonStats
        ├── /favorites      FavoritesPage → PokemonList → PokemonCard
        ├── /stats          StatsPage
        └── *               NotFoundPage
```

`LoadStatus` shows "Loading..." or the error + "Try again" on the list, favorites and stats pages.

| Folder | What is inside |
| --- | --- |
| `src/pages` | One file per route |
| `src/components` | Reusable UI pieces, each with a typed `Props` type |
| `src/services/pokemonApi.ts` | The only place that talks to the API |
| `src/utils` | Pure logic: filters, stats, favorites + their tests |
| `src/types/pokemon.ts` | App types and GraphQL response types |
| `src/data/pokemon.ts` | 5 sample Pokémon, now used as test data |

## Data from GraphQL

1. `App` runs `getPokemonList()` inside `useEffect` once on start (and again when "Try again" is pressed, by changing `reloadCount`).
2. `getPokemonList` sends `fetch(API_URL, { method: 'POST', body: JSON.stringify({ query }) })`.
3. `sendQuery` throws if the HTTP status is not OK or if the response has `errors`.
4. `toPokemon` turns the API shape (`pokemontypes`, `pokemonsprites`) into the simple `Pokemon` type.
5. The details page calls `getPokemonById(id)` with a GraphQL variable `$id`.

## Where state lives

- `App`: the Pokémon list, loading/error, and `favoriteIds`. They are here because three pages use them (lifting state up).
- `PokemonListPage`: `searchText` and `selectedType`. Only this page uses them.
- `PokemonDetailsPage`: the loaded details. Only this page uses them.

## Props

Data goes down, events go up:
`App → PokemonListPage (pokemonList, favoriteIds, onToggleFavorite) → PokemonList → PokemonCard (pokemon, isFavorite, onToggleFavorite)`.
When the button in a card is clicked, the card calls `onToggleFavorite(id)`, which is `handleToggleFavorite` in `App`.

## Clicking a Pokémon

1. The card is a `<Link to="/pokemon/25">`. React Router changes the URL without reloading the page.
2. The route `/pokemon/:id` renders `PokemonDetailsPage`.
3. `useParams()` returns `{ id: '25' }`, converted with `Number(id)`.
4. Invalid ids (`abc`, `-1`) show a message without a request.
5. `useEffect` calls `getPokemonById(25)`; while waiting the page shows "Loading...", then the details, an error, or "not found".

## Routing

`BrowserRouter` wraps the app in `App.tsx`. `Routes` picks the `Route` whose `path` matches the URL. `path="*"` catches everything else (404). `NavLink` adds the `active` class to the current page link.

## Search and filter

`visiblePokemon = filterPokemonByType(filterPokemonByName(pokemonList, searchText), selectedType)`. It runs on every render on the list that was already loaded, so typing sends no requests. Search uses `toLowerCase()` on both sides.

## Favorites and localStorage

- `toggleFavorite(ids, id)` returns a new array: removes the id if it is there, otherwise adds it, so no duplicates.
- `App` starts with `useState(loadFavorites)`, which reads the key `pokedex-favorites` from `localStorage`.
- A `useEffect` on `[favoriteIds]` saves the ids with `saveFavorites`. Only ids are saved, not Pokémon data.

## Tests (Vitest)

All in `src/utils/*.test.ts`, using local sample data and no network:

- `filters.test.ts`: search match, case-insensitive, no match, blank text, type filter, `all`, search + type together, unique sorted types.
- `stats.test.ts`: count per type, empty list, most common type, favorites count.
- `favorites.test.ts`: add, remove, no duplicates after many toggles, original array not changed.
