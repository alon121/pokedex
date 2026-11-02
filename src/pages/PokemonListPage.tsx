import PokemonList from '../components/PokemonList'
import { samplePokemon } from '../data/pokemon'

function PokemonListPage() {
  return (
    <section>
      <h1>Pokémon</h1>
      <PokemonList pokemonList={samplePokemon} />
    </section>
  )
}

export default PokemonListPage
