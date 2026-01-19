import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import BrandLogo from './BrandLogo';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const isHome = location.pathname === '/';

  return (
    <header className="navWrap">
      <div className="container navInner">
        <NavLink to="/" className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <BrandLogo />
          </div>
        </NavLink>

        <nav className="navLinks" aria-label="Primary">
          <NavLink end to="/" className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            Home
          </NavLink>
          <NavLink
            to="/book-event"
            className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
          >
            Book for an Event
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}>
            Menu
          </NavLink>
          <NavLink
            to="/reserve-cart"
            className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
          >
            Reserve a Cart
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
          >
            Contact Us
          </NavLink>
        </nav>

        <div className="navCta">
          <NavLink to="/cart" className="navCartLink">
            <span className="navCartIcon">🛒</span>
            {cartCount > 0 && <span className="navCartBadge">{cartCount}</span>}
          </NavLink>
          <NavLink to="/menu" className="navButton">
            {isHome ? 'Pre-Order Now' : 'Pre-Order'}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

