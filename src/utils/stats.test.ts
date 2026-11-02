import { describe, expect, it } from 'vitest'
import { samplePokemon } from '../data/pokemon'
import type { Pokemon } from '../types/pokemon'
import { countFavorites, countPokemonByType, getMostCommonType } from './stats'

const extraFire: Pokemon[] = [
  ...samplePokemon,
  { id: 5, name: 'charmeleon', image: '', types: ['fire'] },
  { id: 6, name: 'charizard', image: '', types: ['fire', 'flying'] },
]

describe('countPokemonByType', () => {
  it('counts each type, most common first', () => {
    expect(countPokemonByType(extraFire)).toEqual([
      { type: 'fire', count: 3 },
      { type: 'electric', count: 1 },
      { type: 'fairy', count: 1 },
      { type: 'flying', count: 1 },
      { type: 'grass', count: 1 },
      { type: 'normal', count: 1 },
      { type: 'poison', count: 1 },
      { type: 'water', count: 1 },
    ])
  })

  it('returns an empty list for no Pokémon', () => {
    expect(countPokemonByType([])).toEqual([])
  })
})

describe('getMostCommonType', () => {
  it('returns the type with the highest count', () => {
    expect(getMostCommonType(extraFire)).toEqual({ type: 'fire', count: 3 })
  })

  it('returns null for an empty list', () => {
    expect(getMostCommonType([])).toBeNull()
  })
})

describe('countFavorites', () => {
  it('counts only favorite ids that are in the list', () => {
    expect(countFavorites(samplePokemon, [1, 25, 999])).toBe(2)
  })
})
