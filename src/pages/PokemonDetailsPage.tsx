import { Link, useParams } from 'react-router'
import PokemonTypes from '../components/PokemonTypes'
import { samplePokemon } from '../data/pokemon'

function PokemonDetailsPage() {
  const { id } = useParams()
  const pokemon = samplePokemon.find((p) => p.id === Number(id))

  if (!pokemon) {
    return (
      <section>
        <p>Pokémon #{id} was not found.</p>
        <Link to="/">Back to the list</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>
        #{pokemon.id} {pokemon.name}
      </h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <PokemonTypes types={pokemon.types} />
    </section>
  )
}

export default PokemonDetailsPage
