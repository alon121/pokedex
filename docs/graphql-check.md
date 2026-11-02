# GraphQL API check (step 12)

Endpoint: `https://graphql.pokeapi.co/v1beta2` · `POST` with `Content-Type: application/json` · no API key.

Checked on 2026-11-02:

- `{ pokemon(limit: 20, order_by: {id: asc}) { id name } }` returned 20 Pokémon (bulbasaur … raticate).
- CORS preflight (`OPTIONS` with `Origin: http://localhost:5173`) returned `204` with `access-control-allow-origin: *` and `content-type` allowed, so the browser can call it.
- Field names were taken from schema introspection (`__type(name: "pokemon")`), not guessed.

Fields used by the app:

| Data | GraphQL field |
| --- | --- |
| Number, name | `id`, `name` |
| Types | `pokemontypes { slot type { name } }` |
| Abilities | `pokemonabilities { is_hidden ability { name } }` |
| Stats | `pokemonstats { base_stat stat { name } }` (hp, attack, defense, special-attack, special-defense, speed) |
| Image | `pokemonsprites { sprites(path: "other.official-artwork.front_default") }` returns the image URL |
| Height, weight | `height`, `weight` |

Example for Pikachu (`where: {id: {_eq: 25}}`): types `electric`, abilities `static`, `lightning-rod` (hidden), HP 35, Attack 55, Defense 40, Speed 90.
