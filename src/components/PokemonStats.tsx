import type { PokemonStat } from '../types/pokemon'

type PokemonStatsProps = {
  stats: PokemonStat[]
}

const MAX_STAT = 255 // highest base stat in the games, used for the bar width

function PokemonStats({ stats }: PokemonStatsProps) {
  if (stats.length === 0) {
    return <p>No stats available.</p>
  }

  return (
    <ul className="pokemon-stats">
      {stats.map((stat) => (
        <li key={stat.name}>
          <span className="stat-name">{stat.name}</span>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-bar">
            <span style={{ width: `${(stat.value / MAX_STAT) * 100}%` }} />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default PokemonStats
