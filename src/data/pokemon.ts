import type { Pokemon } from '../types/pokemon'

// Small sample list. It was used before the API was connected,
// and now it is only used as local test data (no network in tests).
const imageUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const samplePokemon: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: imageUrl(1), types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', image: imageUrl(4), types: ['fire'] },
  { id: 7, name: 'squirtle', image: imageUrl(7), types: ['water'] },
  { id: 25, name: 'pikachu', image: imageUrl(25), types: ['electric'] },
  { id: 39, name: 'jigglypuff', image: imageUrl(39), types: ['normal', 'fairy'] },
]
