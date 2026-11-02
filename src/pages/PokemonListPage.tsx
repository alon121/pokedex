import { useState } from 'react'
import LoadStatus from '../components/LoadStatus'
import PokemonList from '../components/PokemonList'
import SearchBar from '../components/SearchBar'
import type { LoadState, Pokemon } from '../types/pokemon'
import { ALL_TYPES, filterPokemonByName, filterPokemonByType, getAllTypes } from '../utils/filters'

type PokemonListPageProps = {
  pokemonList: Pokemon[]
  loadState: LoadState
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

function PokemonListPage({ pokemonList, loadState, favoriteIds, onToggleFavorite }: PokemonListPageProps) {
  const [searchText, setSearchText] = useState('')
  const [selectedType, setSelectedType] = useState(ALL_TYPES)

  if (loadState.isLoading || loadState.error) {
    return <LoadStatus loadState={loadState} />
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
