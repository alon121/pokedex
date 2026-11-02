import { useEffect, useState } from 'react'
import PokemonList from '../components/PokemonList'
import SearchBar from '../components/SearchBar'
import { ALL_TYPES, filterPokemonByName, filterPokemonByType, getAllTypes } from '../utils/filters'
import { getPokemonList } from '../services/pokemonApi'
import type { Pokemon } from '../types/pokemon'

type PokemonListPageProps = {
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

function PokemonListPage({ favoriteIds, onToggleFavorite }: PokemonListPageProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [selectedType, setSelectedType] = useState(ALL_TYPES)

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

  function handleRetry() {
    setError(null)
    setIsLoading(true)
    setReloadCount((count) => count + 1)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <section>
        <p role="alert">Could not load Pokémon: {error}</p>
        <button type="button" onClick={handleRetry}>
          Try again
        </button>
      </section>
    )
  }

  // Search and filter run on the list we already have, no new request
  const visiblePokemon = filterPokemonByType(
    filterPokemonByName(pokemonList, searchText),
    selectedType,
  )

  return (
    <section>
      <h1>Pokémon</h1>
      <SearchBar
        searchText={searchText}
        selectedType={selectedType}
        types={getAllTypes(pokemonList)}
        onSearchChange={setSearchText}
        onTypeChange={setSelectedType}
      />
      {pokemonList.length === 0 && <p>No Pokémon to show.</p>}
      {pokemonList.length > 0 && visiblePokemon.length === 0 && (
        <p>No Pokémon found. Try another name or type.</p>
      )}
      <PokemonList
        pokemonList={visiblePokemon}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  )
}

export default PokemonListPage
