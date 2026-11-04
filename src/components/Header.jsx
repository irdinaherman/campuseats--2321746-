
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Header() {
  const { cartCount } = useCart()

  return (
    <header className="header">
      <h1 className="logo">
        <NavLink to="/">CampusEats</NavLink>
      </h1>

      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/" end>
          Vendors
        </NavLink>

        <NavLink to="/orders">
          My Orders
        </NavLink>

        <NavLink to="/cart" className="cart">
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
