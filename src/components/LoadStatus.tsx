import type { LoadState } from '../types/pokemon'

type LoadStatusProps = {
  loadState: LoadState
}

// Shows "Loading..." or an error with a retry button. Shows nothing when data is ready.
function LoadStatus({ loadState }: LoadStatusProps) {
  if (loadState.isLoading) {
    return <p className="status">Loading...</p>
  }

  if (loadState.error) {
    return (
      <div className="status">
        <p role="alert">Could not load Pokémon: {loadState.error}</p>
        <button type="button" onClick={loadState.onRetry}>
          Try again
        </button>
      </div>
    )
  }

  return null
}

export default LoadStatus
