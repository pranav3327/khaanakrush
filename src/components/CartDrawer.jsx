import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/orderService';
import { useState } from 'react';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { cartItems, updateQty, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');


  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setPlacing(true);
    setError('');
    try {
      const payload = {
        items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.qty })),
        totalAmount: cartTotal,
      };
      const res = await placeOrder(payload);
      const orderId = res.orderId || res.id || 'unknown';
      clearCart();
      onClose();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to place order. Try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${open ? 'drawer-backdrop--open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`} id="cart-drawer">
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Order</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <svg className="cart-drawer__empty-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="var(--border)" strokeWidth="2"/>
                <path d="M30 55 Q50 70 70 55" stroke="var(--muted)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="35" cy="40" r="3" fill="var(--muted)"/>
                <circle cx="65" cy="40" r="3" fill="var(--muted)"/>
              </svg>
              <p className="cart-drawer__empty-text">Nothing here yet</p>
              <p className="cart-drawer__empty-sub">Go explore the menu!</p>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <div
                    className="cart-drawer__item-img"
                    style={{
                      backgroundImage: item.image
                        ? `url(${item.image})`
                        : `url(https://source.unsplash.com/120x120/?${encodeURIComponent(item.name)},mexican,food)`,
                    }}
                  />
                  <div className="cart-drawer__item-info">
                    <p className="cart-drawer__item-name">{item.name}</p>
                    <p className="cart-drawer__item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-drawer__item-controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button
                    className="cart-drawer__item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                  <p className="cart-drawer__item-total">₹{item.price * item.qty}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__row cart-drawer__row--total">
              <span>Total</span>
              <span className="cart-drawer__mono">₹{cartTotal}</span>
            </div>
            {error && <p className="cart-drawer__error">{error}</p>}
            <button
              className="cart-drawer__order-btn"
              onClick={handlePlaceOrder}
              disabled={placing}
              id="drawer-place-order"
            >
              {placing ? (
                <span className="cart-drawer__spinner" />
              ) : (
                <>Place Order →</>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
