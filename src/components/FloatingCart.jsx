import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './FloatingCart.css';

export default function FloatingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Don't show if empty or already on the cart page
  if (cartCount === 0 || location.pathname === '/cart') {
    return null;
  }

  return (
    <div className="floatingCartBtn" onClick={() => navigate('/cart')}>
      <span className="cartIcon">🛒</span>
      <span className="cartText">View Cart</span>
      <span className="cartCountBadge">{cartCount}</span>
    </div>
  );
}
