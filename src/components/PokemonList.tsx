import type { Pokemon } from '../types/pokemon'
import PokemonCard from './PokemonCard'

type PokemonListProps = {
  pokemonList: Pokemon[]
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

function PokemonList({ pokemonList, favoriteIds, onToggleFavorite }: PokemonListProps) {
  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favoriteIds.includes(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default PokemonList
