import LoadStatus from '../components/LoadStatus'
import type { LoadState, Pokemon } from '../types/pokemon'
import { countFavorites, countPokemonByType, getMostCommonType } from '../utils/stats'

type StatsPageProps = {
  pokemonList: Pokemon[]
  loadState: LoadState
  favoriteIds: number[]
}

function StatsPage({ pokemonList, loadState, favoriteIds }: StatsPageProps) {
  if (loadState.isLoading || loadState.error) {
    return <LoadStatus loadState={loadState} />
  }

  const typeCounts = countPokemonByType(pokemonList)
  const mostCommon = getMostCommonType(pokemonList)

  return (
    <section>
      <h1>Statistics</h1>

      <dl className="stats-summary">
        <div>
          <dt>Pokémon loaded</dt>
          <dd>{pokemonList.length}</dd>
        </div>
        <div>
          <dt>Most common type</dt>
          <dd>{mostCommon ? `${mostCommon.type} (${mostCommon.count})` : '-'}</dd>
        </div>
        <div>
          <dt>Favorites</dt>
          <dd>{countFavorites(pokemonList, favoriteIds)}</dd>
        </div>
      </dl>

      <h2>Pokémon per type</h2>
      <p>A Pokémon with two types is counted in both.</p>
      <ul className="type-counts">
        {typeCounts.map(({ type, count }) => (
          <li key={type}>
            <span className={`type type-${type}`}>{type}</span> {count}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StatsPage
