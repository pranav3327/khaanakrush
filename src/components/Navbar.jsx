import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="navWrap">
      <div className="container navInner">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandName">KhaanaKrush</div>
            <div className="brandTag">Cooked-fresh cart cuisine</div>
          </div>
        </div>

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
          <NavLink to="/menu" className="navButton">
            {isHome ? 'Order Now' : 'Order'}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

