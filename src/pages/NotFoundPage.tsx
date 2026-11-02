import { Link, useLocation } from 'react-router'

function NotFoundPage() {
  const location = useLocation()

  return (
    <section className="not-found">
      <h1>404</h1>
      <p>
        The page <code>{location.pathname}</code> does not exist.
      </p>
      <Link to="/">Back to the Pokémon list</Link>
    </section>
  )
}

export default NotFoundPage
