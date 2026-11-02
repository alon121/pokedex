import { Link } from 'react-router'
import type { Pokemon } from '../types/pokemon'
import PokemonTypes from './PokemonTypes'

type PokemonCardProps = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="pokemon-card">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </Link>
      <PokemonTypes types={pokemon.types} />
    </article>
  )
}

export default PokemonCard
