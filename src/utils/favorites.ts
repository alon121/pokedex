const STORAGE_KEY = 'pokedex-favorites'

// Adds the id if it is missing, removes it if it is there. Never creates duplicates.
export function toggleFavorite(favoriteIds: number[], id: number): number[] {
  if (favoriteIds.includes(id)) {
    return favoriteIds.filter((favoriteId) => favoriteId !== id)
  }
  return [...favoriteIds, id]
}

// Reads saved ids. Bad or missing data gives an empty list.
export function loadFavorites(): number[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return []

  try {
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    const ids = parsed.filter((value): value is number => typeof value === 'number')
    return [...new Set(ids)]
  } catch (error) {
    console.warn('Saved favorites were not valid JSON and were ignored', error)
    return []
  }
}

export function saveFavorites(favoriteIds: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
}
