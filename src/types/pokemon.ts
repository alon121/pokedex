// A Pokémon as shown in the list
export type Pokemon = {
  id: number
  name: string
  image: string
  types: string[]
}

export type PokemonStat = {
  name: string
  value: number
}

// A Pokémon with everything the details page needs
export type PokemonDetails = Pokemon & {
  height: number | null
  weight: number | null
  abilities: string[]
  stats: PokemonStat[]
}

// Shapes of the GraphQL response (only the fields we ask for)
export type ApiPokemon = {
  id: number
  name: string
  pokemontypes: { type: { name: string } | null }[]
  pokemonsprites: { sprites: string | null }[]
}

export type ApiPokemonDetails = ApiPokemon & {
  height: number | null
  weight: number | null
  pokemonabilities: { ability: { name: string } | null }[]
  pokemonstats: { base_stat: number; stat: { name: string } | null }[]
}

export type GraphQLResponse<T> = {
  data?: T
  errors?: { message: string }[]
}
