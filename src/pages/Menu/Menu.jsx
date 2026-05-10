import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { fetchMenuItems } from '../../services/menuService';
import { placeOrder } from '../../services/orderService';
import { isNonEmpty, isValidPhone } from '../../services/validators';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Menu.css';

const CATEGORIES = [
  { key: 'all',                 label: '🍽 All' },
  { key: 'LIVE GRILL SPECIALS', label: '🔥 Grill Specials' },
  { key: 'QUESA GRILLS',        label: '🧀 Quesa Grills' },
  { key: 'TACO PICKS',          label: '🌮 Taco Picks' },
  { key: 'QUICK BITES',         label: '🍟 Quick Bites' },
  { key: 'STUDENT COMBOS',      label: '🎒 Combos' },
  { key: 'DISH OF THE DAY',     label: '⭐ Dish of the Day' },
  { key: 'DRINKS',              label: '🥤 Drinks' },
  { key: 'ADD-ONS',             label: '➕ Add-Ons' },
];

/* ── curated Unsplash images matched to each dish by name ── */
const DISH_IMAGES = {
  // LIVE GRILL SPECIALS
  'Spice Circuit':               'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',
  'Masala Melt':                 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
  'The Crunch Riot (Signature)': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',

  // QUESA GRILLS
  'Cheesy Veggie Quesa':         'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
  'Paneer Power Quesa':          'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80',
  'Loaded Veg Quesa':            'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',

  // TACO PICKS
  'Pinto Bean Street Taco':      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80',
  'Crispy Veg Taco':             'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  'Mexican Paneer Taco':         'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80',

  // QUICK BITES
  'Cheesy Nacho Crunch':         'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80',

  // DISH OF THE DAY
  'White Sauce Skillet Pasta':   'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80',

  // DRINKS
  'Brain Freeze Protocol (250 ml)': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',

  // STUDENT COMBOS
  'Crunch Combo':                'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Power Combo':                 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Riot Combo':                  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
  'Quesa Combo':                 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
  'Taco Duo Combo':              'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
  'Brain Freeze Protocol Add-On':'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80',

  // ADD-ONS
  'Extra Cheese':                'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
  'Extra Paneer':                'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80',
  'Crunch Layer':                'https://images.unsplash.com/photo-1587888637140-849b25d80ef9?w=400&q=80',
  'Premium Sauce':               'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80',
};

/* Fallback: if name not in map, pick by category */
const CATEGORY_FALLBACKS = {
  'LIVE GRILL SPECIALS': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
  'QUESA GRILLS':        'https://images.unsplash.com/photo-1630914441823-12cefce8e3d2?w=400&q=80',
  'TACO PICKS':          'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80',
  'QUICK BITES':         'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80',
  'DISH OF THE DAY':     'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
  'DRINKS':              'https://images.unsplash.com/photo-1529090498-4f9a4f7e5bdb?w=400&q=80',
  'STUDENT COMBOS':      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  'ADD-ONS':             'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&q=80',
};

const getImage = (item) =>
  DISH_IMAGES[item.name] || CATEGORY_FALLBACKS[item.category] ||
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80';

export default function Menu() {
  const { cartItems, addToCart, updateQty, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const ref = useScrollReveal();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [filterSticky, setFilterSticky] = useState(false);

  // Order form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchMenuItems()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items || data.data || [];
        setItems(list);
      })
      .catch(() => setError("Couldn't load menu — try refreshing."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setFilterSticky(window.scrollY > 340);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── filtering: exact match (case-insensitive) or 'all' ── */
  const filtered = items.filter((item) => {
    const matchCat =
      category === 'all' ||
      (item.category || '').toUpperCase().trim() === category.toUpperCase().trim();
    const matchSearch =
      !search || (item.name || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handlePlaceOrder = async () => {
    const errors = {};
    if (!isNonEmpty(name)) errors.name = 'Name is required';
    if (!isValidPhone(phone)) errors.phone = 'Valid 10-digit phone required';
    if (!isNonEmpty(address)) errors.address = 'Address is required';
    if (cartItems.length === 0) errors.cart = 'Cart is empty';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setPlacing(true);
    setOrderError('');
    try {
      const payload = {
        items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.qty })),
        customerName: name,
        phone,
        address,
        instructions,
        totalAmount: cartTotal,
      };
      const res = await placeOrder(payload);
      const orderId = res.orderId || res.id || 'unknown';
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setOrderError(err?.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="page-fade menu-page" ref={ref}>
      {/* HERO */}
      <section className="menu-hero">
        <div className="menu-hero__bg" />
        <div className="menu-hero__content">
          <h1>What are you craving today?</h1>
          <p>Fresh Mexican dishes. Cooked live at your doorstep.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className={`menu-filter ${filterSticky ? 'menu-filter--sticky' : ''}`}>
        <div className="menu-filter__inner">
          <div className="menu-filter__pills">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`menu-filter__pill ${category === c.key ? 'menu-filter__pill--active' : ''}`}
                onClick={() => setCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="menu-filter__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="menu-search"
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="menu-main">
        {/* DISH GRID */}
        <div className="menu-grid">
          {loading ? (
            [...Array(9)].map((_, i) => (
              <div key={i} className="dish-card dish-card--skeleton">
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '50%' }} />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="menu-empty">
              <p>{error}</p>
              <button className="btn btn--primary" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="menu-empty">
              <span className="menu-empty__icon">🌮</span>
              <p>No dishes found.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const inCart = cartItems.find((c) => c.id === item.id);
              const imgSrc = getImage(item);

              return (
                <div key={item.id} className="dish-card">
                  <div className="dish-card__img-wrap">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      loading="lazy"
                      className="dish-card__img"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80';
                      }}
                    />
                    <span className={`dish-card__badge ${item.is_veg !== false ? 'dish-card__badge--veg' : 'dish-card__badge--nonveg'}`}>
                      {item.is_veg !== false ? '🟢' : '🔴'}
                    </span>
                    {item.category && (
                      <span className="dish-card__cat-tag">{item.category}</span>
                    )}
                  </div>
                  <div className="dish-card__body">
                    <h4 className="dish-card__name">{item.name}</h4>
                    <p className="dish-card__desc">
                      {item.description || 'Freshly prepared with authentic Mexican flavors'}
                    </p>
                    <div className="dish-card__footer">
                      <span className="dish-card__price">₹{item.price}</span>
                      {!inCart ? (
                        <button className="dish-card__add" onClick={() => addToCart(item)}>
                          + Add
                        </button>
                      ) : (
                        <div className="dish-card__qty-controls">
                          <button
                            onClick={() =>
                              inCart.qty > 1
                                ? updateQty(item.id, inCart.qty - 1)
                                : removeFromCart(item.id)
                            }
                          >
                            −
                          </button>
                          <span>{inCart.qty}</span>
                          <button onClick={() => updateQty(item.id, inCart.qty + 1)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ORDER SIDEBAR (desktop) */}
        <aside className="menu-sidebar">
          <div className="menu-sidebar__inner">
            <h3 className="menu-sidebar__title">Your Order</h3>
            {cartItems.length === 0 ? (
              <p className="menu-sidebar__empty">Add items from the menu</p>
            ) : (
              <>
                <ul className="menu-sidebar__items">
                  {cartItems.map((item) => (
                    <li key={item.id} className="menu-sidebar__item">
                      <div className="menu-sidebar__item-info">
                        <span className="menu-sidebar__item-name">{item.name}</span>
                        <span className="menu-sidebar__item-price">₹{item.price * item.qty}</span>
                      </div>
                      <div className="menu-sidebar__item-controls">
                        <button
                          onClick={() =>
                            item.qty > 1
                              ? updateQty(item.id, item.qty - 1)
                              : removeFromCart(item.id)
                          }
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="menu-sidebar__totals">
                  <div className="menu-sidebar__row menu-sidebar__row--total">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>

                <div className="menu-sidebar__form">
                  <div className="form-field">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={formErrors.name ? 'form-field--error' : ''}
                    />
                    {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                  </div>
                  <div className="form-field">
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={formErrors.phone ? 'form-field--error' : ''}
                    />
                    {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
                  </div>
                  <div className="form-field">
                    <textarea
                      placeholder="Your Address (for cart visit) *"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={formErrors.address ? 'form-field--error' : ''}
                    />
                    {formErrors.address && <span className="form-error">{formErrors.address}</span>}
                  </div>
                  <div className="form-field">
                    <textarea
                      placeholder="Special instructions (optional)"
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </div>

                {orderError && <p className="form-error" style={{ marginBottom: 12 }}>{orderError}</p>}
                {formErrors.cart && <p className="form-error" style={{ marginBottom: 12 }}>{formErrors.cart}</p>}

                <button
                  className="btn btn--primary menu-sidebar__order-btn"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  id="place-order-btn"
                >
                  {placing ? <span className="spinner" /> : 'Place Order →'}
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM BAR */}
      {cartCount > 0 && (
        <div className="menu-mobile-bar">
          <span>
            {cartCount} item{cartCount > 1 ? 's' : ''} • ₹{cartTotal}
          </span>
          <span className="menu-mobile-bar__cta">View Order →</span>
        </div>
      )}
    </div>
  );
}
