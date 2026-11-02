import { ALL_TYPES } from '../utils/filters'

type SearchBarProps = {
  searchText: string
  selectedType: string
  types: string[]
  onSearchChange: (text: string) => void
  onTypeChange: (type: string) => void
}

function SearchBar({ searchText, selectedType, types, onSearchChange, onTypeChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <label>
        Search by name
        <input
          type="search"
          value={searchText}
          placeholder="e.g. pikachu"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>
      <label>
        Type
        <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
          <option value={ALL_TYPES}>All</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SearchBar
