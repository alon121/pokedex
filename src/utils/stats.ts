import type { Pokemon } from '../types/pokemon'

export type TypeCount = {
  type: string
  count: number
}

// How many Pokémon have each type, most common first.
// A Pokémon with two types is counted once for each type.
export function countPokemonByType(pokemonList: Pokemon[]): TypeCount[] {
  const counts: Record<string, number> = {}
  pokemonList.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      counts[type] = (counts[type] ?? 0) + 1
    })
  })

  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type))
}

// The most common type, or null for an empty list. Ties go to the first name alphabetically.
export function getMostCommonType(pokemonList: Pokemon[]): TypeCount | null {
  return countPokemonByType(pokemonList)[0] ?? null
}

// How many favorite ids belong to Pokémon in the list
export function countFavorites(pokemonList: Pokemon[], favoriteIds: number[]): number {
  return pokemonList.filter((pokemon) => favoriteIds.includes(pokemon.id)).length
}
