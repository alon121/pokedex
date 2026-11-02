import { NavLink } from 'react-router'

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-title">Pokédex</span>
      <NavLink to="/" end>
        List
      </NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/stats">Statistics</NavLink>
    </nav>
  )
}

export default Navbar
