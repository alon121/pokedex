# PRD — Pokédex

## Who and why

A small web app for people who want to look up Pokémon and see information about them.
Front-end only. Data comes from the public PokéAPI GraphQL endpoint (no API key).

More docs: [docs/architecture.md](docs/architecture.md)

## Pages

### 1. Pokémon list — `/`
A grid of Pokémon cards with name and image, a search box and a type filter.

Acceptance:
- 60 Pokémon from the API are shown, each with name and image.
- Typing in the search box filters by name (case-insensitive).
- Choosing a type in the select shows only Pokémon of that type; `All` shows everyone.
- Search and type filter work together.
- While loading, `Loading...` is shown. On failure, an error message and a "Try again" button are shown.
- If nothing matches, a "No Pokémon found" message is shown.

### 2. Pokémon details — `/pokemon/:id`
Full info for one Pokémon.

Acceptance:
- Shows name, number, image, types, abilities and stats (HP, Attack, Defense, Speed...).
- Opening the URL directly in the browser shows the right Pokémon.
- An invalid or unknown id shows a clear "not found" message instead of crashing.

### 3. Favorites — `/favorites`
Pokémon the user marked as favorites.

Acceptance:
- Each card has a favorite button that adds or removes the Pokémon.
- The page shows only favorite Pokémon and lets the user remove them.
- Favorites stay after a page refresh (saved in `localStorage`).
- With no favorites, a message explains how to add some.

### 4. Statistics — `/stats`
Numbers calculated from the list loaded from the API.

Acceptance:
- Shows the total number of Pokémon loaded.
- Shows how many Pokémon there are of each type.
- Shows the most common type.
- Shows how many Pokémon are marked as favorites.
- All numbers are calculated from API data, not typed in by hand.

## User scenarios

1. When I open the app, I see a grid of Pokémon cards with names and images.
2. When I type "char" in the search box, I see only Pokémon whose name contains "char".
3. When I click a Pokémon card, I see its details page with types, abilities and stats.
4. When I click the favorite button on a card and open the Favorites page, I see that Pokémon there, also after refreshing.
5. When I open the Statistics page, I see how many Pokémon of each type are in the list and which type is the most common.

## Out of scope

Server, database, login, Redux, UI libraries.
