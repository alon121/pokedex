import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import PokemonStats from '../components/PokemonStats'
import PokemonTypes from '../components/PokemonTypes'
import { getPokemonById } from '../services/pokemonApi'
import type { PokemonDetails } from '../types/pokemon'

type DetailsResult = {
  id: number
  pokemon: PokemonDetails | null
  error: string | null
}

function PokemonDetailsPage() {
  const { id } = useParams()
  const pokemonId = Number(id)

  // Remember which id the result belongs to, so a new id shows Loading again
  const [result, setResult] = useState<DetailsResult | null>(null)

  useEffect(() => {
    let ignore = false

    getPokemonById(pokemonId)
      .then((pokemon) => {
        if (!ignore) setResult({ id: pokemonId, pokemon, error: null })
      })
      .catch((err: Error) => {
        if (!ignore) setResult({ id: pokemonId, pokemon: null, error: err.message })
      })

    return () => {
      ignore = true
    }
  }, [pokemonId])

  const isLoading = result === null || result.id !== pokemonId
  const pokemon = result?.pokemon ?? null
  const error = result?.error ?? null

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <section>
        <p role="alert">Could not load this Pokémon: {error}</p>
        <Link to="/">Back to the list</Link>
      </section>
    )
  }

  if (!pokemon) {
    return (
      <section>
        <p>Pokémon #{id} was not found.</p>
        <Link to="/">Back to the list</Link>
      </section>
    )
  }

  return (
    <section className="details">
      <h1>
        #{pokemon.id} {pokemon.name}
      </h1>
      {pokemon.image ? (
        <img src={pokemon.image} alt={pokemon.name} />
      ) : (
        <p>No image</p>
      )}

      <h2>Types</h2>
      <PokemonTypes types={pokemon.types} />

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.length === 0 && <li>Unknown</li>}
        {pokemon.abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>

      <p>
        {/* The API gives height in decimeters and weight in hectograms */}
        Height: {pokemon.height === null ? '?' : `${pokemon.height / 10} m`} · Weight:{' '}
        {pokemon.weight === null ? '?' : `${pokemon.weight / 10} kg`}
      </p>

      <h2>Stats</h2>
      <PokemonStats stats={pokemon.stats} />
    </section>
  )
}

export default PokemonDetailsPage
