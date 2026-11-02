import { NavLink } from 'react-router'

type NavbarProps = {
  favoritesCount: number
}

function Navbar({ favoritesCount }: NavbarProps) {
  return (
    <nav className="navbar">
      <span className="navbar-title">Pokédex</span>
      <NavLink to="/" end>
        List
      </NavLink>
      <NavLink to="/favorites">Favorites ({favoritesCount})</NavLink>
      <NavLink to="/stats">Statistics</NavLink>
    </nav>
  )
}

export default Navbar
