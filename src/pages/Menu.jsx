import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItemCard from '../components/MenuItemCard.jsx';
import CartSidebar from '../components/CartSidebar.jsx';
import './Menu.css';
import './FormPage.css';
import { fetchMenuItems } from '../services/menuService';
import { API_BASE_URL, getApiErrorMessage } from '../services/api';

function resolveImageUrl(url) {
  const v = String(url || '');
  if (!v) return '';
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  if (v.startsWith('/')) return `${API_BASE_URL}${v}`;
  return v;
}

export default function Menu() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchMenuItems();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.items || [];
        setItems(
          list.map((it) => ({
            ...it,
            image_url: resolveImageUrl(it.image_url)
          }))
        );
      } catch (err) {
        if (cancelled) return;
        setError(getApiErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const cartItems = useMemo(() => cart, [cart]);

  function addToCart(item) {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  }

  function inc(ci) {
    setCart((prev) => prev.map((p) => (p.id === ci.id ? { ...p, quantity: p.quantity + 1 } : p)));
  }
  function dec(ci) {
    setCart((prev) =>
      prev
        .map((p) => (p.id === ci.id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
        .filter(Boolean)
    );
  }
  function remove(ci) {
    setCart((prev) => prev.filter((p) => p.id !== ci.id));
  }

  function onOrderPlaced(orderId) {
    const id = orderId || 'new';
    setCart([]);
    navigate(`/order-confirmation/${id}`);
  }

  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Menu</div>
          <h1 className="title">Place a Food Order</h1>
          <p className="subtitle">
            Curated modern Indian flavours designed for cart cooking — consistent, hot, and premium.
          </p>
        </div>

        <div className="menuLayout">
          <div className="menuLeft">
            {loading ? (
              <div className="card menuState">
                <div className="menuStateTitle">Loading menu…</div>
                <div className="menuStateText">Fetching today’s cooked-fresh selection.</div>
              </div>
            ) : error ? (
              <div className="card menuState">
                <div className="menuStateTitle">Could not load the menu</div>
                <div className="menuStateText">{error}</div>
                <div className="menuStateText">Make sure the backend is running and `VITE_API_URL` is set.</div>
              </div>
            ) : (
              <div className="menuGrid">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAdd={addToCart} />
                ))}
              </div>
            )}
          </div>

          <CartSidebar
            cartItems={cartItems}
            onInc={inc}
            onDec={dec}
            onRemove={remove}
            onOrderPlaced={onOrderPlaced}
          />
        </div>
      </div>
    </div>
  );
}

