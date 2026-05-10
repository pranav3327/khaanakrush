import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/book-event', label: 'Book Event' },
  { to: '/reserve-cart', label: 'Reserve Cart' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bounce cart icon when count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 350);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <svg className="navbar__flame" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C12 0 4 8 4 16C4 20.418 7.582 24 12 24C16.418 24 20 20.418 20 16C20 8 12 0 12 0ZM12 22C8.686 22 6 19.314 6 16C6 11.5 10 6.5 12 4C14 6.5 18 11.5 18 16C18 19.314 15.314 22 12 22Z" fill="var(--red)"/>
              <path d="M12 8C12 8 8 13 8 16C8 18.209 9.791 20 12 20C14.209 20 16 18.209 16 16C16 13 12 8 12 8Z" fill="var(--saffron)" opacity="0.7"/>
            </svg>
            <span className="navbar__brand">Khaana<span className="navbar__brand-red">Krush</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar__links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="navbar__right">
            <button
              className={`navbar__cart-btn ${cartBounce ? 'navbar__cart-btn--bounce' : ''}`}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open cart"
              id="cart-toggle"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="navbar__cart-badge" key={cartCount}>{cartCount}</span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              id="mobile-menu-toggle"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`navbar__mobile-overlay ${mobileOpen ? 'navbar__mobile-overlay--open' : ''}`}>
        <div className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
