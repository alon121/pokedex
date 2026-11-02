import { useEffect, useState } from 'react'
import PokemonList from '../components/PokemonList'
import { getPokemonList } from '../services/pokemonApi'
import type { Pokemon } from '../types/pokemon'

function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)

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

  return (
    <section>
      <h1>Pokémon</h1>
      {pokemonList.length === 0 ? (
        <p>No Pokémon to show.</p>
      ) : (
        <PokemonList pokemonList={pokemonList} />
      )}
    </section>
  )
}

export default PokemonListPage
