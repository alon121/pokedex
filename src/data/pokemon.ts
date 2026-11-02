import type { Pokemon } from '../types/pokemon'

// Temporary sample data for early development. Will be replaced by the API.
const imageUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const samplePokemon: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: imageUrl(1), types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', image: imageUrl(4), types: ['fire'] },
  { id: 7, name: 'squirtle', image: imageUrl(7), types: ['water'] },
  { id: 25, name: 'pikachu', image: imageUrl(25), types: ['electric'] },
  { id: 39, name: 'jigglypuff', image: imageUrl(39), types: ['normal', 'fairy'] },
]
