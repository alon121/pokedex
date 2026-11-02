import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import { loadFavorites, saveFavorites, toggleFavorite } from './utils/favorites'

function App() {
  // Favorites live here because several pages need them
  const [favoriteIds, setFavoriteIds] = useState<number[]>(loadFavorites)

  useEffect(() => {
    saveFavorites(favoriteIds)
  }, [favoriteIds])

  function handleToggleFavorite(id: number) {
    setFavoriteIds((ids) => toggleFavorite(ids, id))
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PokemonListPage
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
