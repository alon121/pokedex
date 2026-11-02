import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import NotFoundPage from './pages/NotFoundPage'
import { getPokemonList } from './services/pokemonApi'
import type { Pokemon } from './types/pokemon'
import { loadFavorites, saveFavorites, toggleFavorite } from './utils/favorites'

function App() {
  // The list and the favorites live here because the list, favorites and stats pages all need them
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)
  const [favoriteIds, setFavoriteIds] = useState<number[]>(loadFavorites)

  useEffect(() => {
    let ignore = false // skip results from an old request

    getPokemonList()
      .then((list) => {
        if (!ignore) setPokemonList(list)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [reloadCount])

  useEffect(() => {
    saveFavorites(favoriteIds)
  }, [favoriteIds])

  function handleRetry() {
    setError(null)
    setIsLoading(true)
    setReloadCount((count) => count + 1)
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((ids) => toggleFavorite(ids, id))
  }

  const loadState = { isLoading, error, onRetry: handleRetry }

  return (
    <BrowserRouter>
      <Navbar favoritesCount={favoriteIds.length} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PokemonListPage
                pokemonList={pokemonList}
                loadState={loadState}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                pokemonList={pokemonList}
                loadState={loadState}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/stats"
            element={
              <StatsPage
                pokemonList={pokemonList}
                loadState={loadState}
                favoriteIds={favoriteIds}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
