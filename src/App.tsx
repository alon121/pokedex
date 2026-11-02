import { BrowserRouter, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
