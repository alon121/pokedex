type PokemonTypesProps = {
  types: string[]
}

function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <ul className="pokemon-types">
      {types.map((type) => (
        <li key={type} className={`type type-${type}`}>
          {type}
        </li>
      ))}
    </ul>
  )
}

export default PokemonTypes
