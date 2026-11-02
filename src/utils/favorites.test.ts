import { describe, expect, it } from 'vitest'
import { toggleFavorite } from './favorites'

describe('toggleFavorite', () => {
  it('adds an id that is not a favorite yet', () => {
    expect(toggleFavorite([1, 4], 25)).toEqual([1, 4, 25])
  })

  it('removes an id that is already a favorite', () => {
    expect(toggleFavorite([1, 4, 25], 4)).toEqual([1, 25])
  })

  it('never creates duplicates when toggled many times', () => {
    let ids: number[] = []
    ids = toggleFavorite(ids, 7) // add
    ids = toggleFavorite(ids, 7) // remove
    ids = toggleFavorite(ids, 7) // add again
    expect(ids).toEqual([7])
  })

  it('does not change the original array', () => {
    const original = [1, 4]
    toggleFavorite(original, 25)
    expect(original).toEqual([1, 4])
  })
})
