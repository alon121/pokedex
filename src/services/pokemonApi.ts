import type { ApiPokemon, GraphQLResponse, Pokemon } from '../types/pokemon'

const API_URL = 'https://graphql.pokeapi.co/v1beta2'

const LIST_QUERY = `
  query PokemonList {
    pokemon(limit: 60, order_by: { id: asc }) {
      id
      name
      pokemontypes(order_by: { slot: asc }) { type { name } }
      pokemonsprites { sprites(path: "other.official-artwork.front_default") }
    }
  }
`

// Sends one GraphQL request and returns `data`, or throws a clear error
async function sendQuery<T>(query: string, variables: Record<string, number> = {}): Promise<T> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const result: GraphQLResponse<T> = await response.json()

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message)
  }
  if (!result.data) {
    throw new Error('The API returned no data')
  }
  return result.data
}

function toPokemon(apiPokemon: ApiPokemon): Pokemon {
  return {
    id: apiPokemon.id,
    name: apiPokemon.name,
    image: apiPokemon.pokemonsprites[0]?.sprites ?? '',
    types: apiPokemon.pokemontypes.map((t) => t.type?.name ?? 'unknown'),
  }
}

export async function getPokemonList(): Promise<Pokemon[]> {
  const data = await sendQuery<{ pokemon: ApiPokemon[] }>(LIST_QUERY)
  return data.pokemon.map(toPokemon)
}
