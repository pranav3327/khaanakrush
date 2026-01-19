import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import MenuItemCard from '../components/MenuItemCard.jsx';
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
  const { addToCart } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Pre-order Menu</div>
          <h1 className="title">Select Your Cart Menu</h1>
          <p className="subtitle">
            Choose the dishes you want us to cook at your location. We bring the cart, ingredients, and chef.
          </p>
        </div>

        <div className="menuFullWidth">
          {loading ? (
            <div className="menuState">
              <div className="menuStateTitle">Loading Menu...</div>
              <div className="menuStateText">Getting the freshest dishes for you.</div>
            </div>
          ) : error ? (
            <div className="menuState">
              <div className="menuStateTitle">Menu Unavailable</div>
              <div className="menuStateText">{error}</div>
            </div>
          ) : !items.length ? (
            <div className="menuState">
              <div className="menuStateTitle">No Items Found</div>
              <div className="menuStateText">Please check back later.</div>
            </div>
          ) : (
            <div className="menuGrid">
              {items.map((it) => (
                <MenuItemCard key={it.id} item={it} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

