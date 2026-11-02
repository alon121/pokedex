import { describe, expect, it } from 'vitest'
import { samplePokemon } from '../data/pokemon'
import { ALL_TYPES, filterPokemonByName, filterPokemonByType, getAllTypes } from './filters'

const names = (list: { name: string }[]) => list.map((p) => p.name)

describe('filterPokemonByName', () => {
  it('returns the matching Pokémon, ignoring upper and lower case', () => {
    expect(names(filterPokemonByName(samplePokemon, 'SQUIR'))).toEqual(['squirtle'])
    expect(names(filterPokemonByName(samplePokemon, 'Chu'))).toEqual(['pikachu'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterPokemonByName(samplePokemon, 'mewtwo')).toEqual([])
  })

  it('returns the whole list for empty or blank text', () => {
    expect(filterPokemonByName(samplePokemon, '   ')).toHaveLength(5)
  })
})

describe('filterPokemonByType', () => {
  it('returns only Pokémon of the chosen type', () => {
    expect(names(filterPokemonByType(samplePokemon, 'fire'))).toEqual(['charmander'])
    // a Pokémon with two types matches each of them
    expect(names(filterPokemonByType(samplePokemon, 'poison'))).toEqual(['bulbasaur'])
  })

  it('returns everyone for "all"', () => {
    expect(filterPokemonByType(samplePokemon, ALL_TYPES)).toHaveLength(5)
  })
})

describe('search and type filter together', () => {
  it('returns only Pokémon that match both', () => {
    const byName = filterPokemonByName(samplePokemon, 'a') // bulbasaur, charmander, pikachu
    expect(names(filterPokemonByType(byName, 'fire'))).toEqual(['charmander'])
    expect(filterPokemonByType(byName, 'water')).toEqual([]) // squirtle has no "a"
  })
})

describe('getAllTypes', () => {
  it('lists each type once, sorted', () => {
    expect(getAllTypes(samplePokemon)).toEqual([
      'electric',
      'fairy',
      'fire',
      'grass',
      'normal',
      'poison',
      'water',
    ])
  })
})
