import type { Pokemon } from '../types/pokemon'
import PokemonCard from './PokemonCard'

type PokemonListProps = {
  pokemonList: Pokemon[]
}

function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonList
