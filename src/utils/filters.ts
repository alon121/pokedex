import type { Pokemon } from '../types/pokemon'

export const ALL_TYPES = 'all'

// Case-insensitive search by name. Empty text returns the whole list.
export function filterPokemonByName(pokemonList: Pokemon[], searchText: string): Pokemon[] {
  const text = searchText.trim().toLowerCase()
  if (text === '') return pokemonList
  return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(text))
}

// Keeps only Pokémon that have the given type. 'all' returns the whole list.
export function filterPokemonByType(pokemonList: Pokemon[], type: string): Pokemon[] {
  if (type === ALL_TYPES) return pokemonList
  return pokemonList.filter((pokemon) => pokemon.types.includes(type))
}

// All different types in the list, sorted by name
export function getAllTypes(pokemonList: Pokemon[]): string[] {
  const types = new Set<string>()
  pokemonList.forEach((pokemon) => pokemon.types.forEach((type) => types.add(type)))
  return [...types].sort()
}
