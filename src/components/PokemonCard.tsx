import { Link } from 'react-router'
import type { Pokemon } from '../types/pokemon'
import PokemonTypes from './PokemonTypes'

type PokemonCardProps = {
  pokemon: Pokemon
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: PokemonCardProps) {
  return (
    <article className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`}>
        {pokemon.image ? <img src={pokemon.image} alt={pokemon.name} /> : <p>No image</p>}
        <h2>{pokemon.name}</h2>
      </Link>
      <PokemonTypes types={pokemon.types} />
      <button
        type="button"
        className={isFavorite ? 'favorite-button is-favorite' : 'favorite-button'}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(pokemon.id)}
      >
        {isFavorite ? '★ Remove favorite' : '☆ Add favorite'}
      </button>
    </article>
  )
}

export default PokemonCard
