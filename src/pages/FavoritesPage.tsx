import { Link } from 'react-router'
import LoadStatus from '../components/LoadStatus'
import PokemonList from '../components/PokemonList'
import type { LoadState, Pokemon } from '../types/pokemon'

type FavoritesPageProps = {
  pokemonList: Pokemon[]
  loadState: LoadState
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

function FavoritesPage({ pokemonList, loadState, favoriteIds, onToggleFavorite }: FavoritesPageProps) {
  if (loadState.isLoading || loadState.error) {
    return <LoadStatus loadState={loadState} />
  }

  const favoritePokemon = pokemonList.filter((pokemon) => favoriteIds.includes(pokemon.id))

  return (
    <section>
      <h1>Favorites</h1>
      {favoritePokemon.length === 0 ? (
        <p>
          You have no favorites yet. Go to the <Link to="/">list</Link> and press "Add favorite"
          on a Pokémon.
        </p>
      ) : (
        <PokemonList
          pokemonList={favoritePokemon}
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  )
}

export default FavoritesPage
