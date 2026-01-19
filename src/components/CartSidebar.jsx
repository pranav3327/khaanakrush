import { useMemo, useState } from 'react';
import './CartSidebar.css';
import InputField from './InputField.jsx';
import { getApiErrorMessage } from '../services/api';
import { placeOrder } from '../services/orderService';
import { isNonEmpty, isValidPhone } from '../services/validators';

function money(n) {
  const v = Number(n) || 0;
  return `₹${v.toFixed(0)}`;
}

export default function CartSidebar({ cartItems, onInc, onDec, onRemove, onOrderPlaced }) {
  const [checkout, setCheckout] = useState({
    customer_name: '',
    phone: '',
    delivery_location: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, ci) => sum + Number(ci.price) * Number(ci.quantity), 0);
    return { subtotal, total: subtotal };
  }, [cartItems]);

  function onChange(e) {
    setCheckout((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submit() {
    setStatus({ type: '', message: '' });
    const nextErrors = {};
    if (!cartItems.length) nextErrors.items = 'Your cart is empty.';
    if (!isNonEmpty(checkout.customer_name)) nextErrors.customer_name = 'Please enter your name.';
    if (!isValidPhone(checkout.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!isNonEmpty(checkout.delivery_location)) nextErrors.delivery_location = 'Please enter your delivery location.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      const payload = {
        customer_name: checkout.customer_name.trim(),
        phone: checkout.phone.trim(),
        delivery_location: checkout.delivery_location.trim(),
        items: cartItems.map((ci) => ({
          menu_item_id: ci.id,
          quantity: ci.quantity
        }))
      };
      const data = await placeOrder(payload);
      setStatus({ type: 'ok', message: 'Order placed successfully.' });
      onOrderPlaced?.(data?.order_id);
    } catch (err) {
      setStatus({ type: 'err', message: getApiErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="cartSide card" aria-label="Cart">
      <div className="cartHead">
        <div className="cartTitle">Your Cart</div>
        <div className="cartHint">Cooked fresh when your order is confirmed.</div>
      </div>

      {errors.items ? <div className="cartError">{errors.items}</div> : null}

      <div className="cartItems">
        {!cartItems.length ? (
          <div className="cartEmpty">
            Add items from the menu to start your order.
            <div className="cartEmptySub">Tip: try one signature main and one chaat-style starter.</div>
          </div>
        ) : (
          cartItems.map((ci) => (
            <div className="cartRow" key={ci.id}>
              <div className="cartRowMain">
                <div className="cartItemName">{ci.name}</div>
                <div className="cartItemMeta">
                  <span className="cartPriceEach">{money(ci.price)}</span>
                  <span className="cartDot" aria-hidden="true">
                    •
                  </span>
                  <span className="cartLine">{money(Number(ci.price) * Number(ci.quantity))}</span>
                </div>
              </div>

              <div className="cartControls">
                <button className="qtyBtn" type="button" onClick={() => onDec(ci)}>
                  −
                </button>
                <div className="qty">{ci.quantity}</div>
                <button className="qtyBtn" type="button" onClick={() => onInc(ci)}>
                  +
                </button>
                <button className="removeBtn" type="button" onClick={() => onRemove(ci)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cartTotals">
        <div className="totalRow">
          <span>Subtotal</span>
          <span className="totalValue">{money(totals.subtotal)}</span>
        </div>
        <div className="totalRow grand">
          <span>Total</span>
          <span className="totalValue">{money(totals.total)}</span>
        </div>
      </div>

      <div className="cartCheckout">
        <InputField
          label="Name"
          name="customer_name"
          value={checkout.customer_name}
          onChange={onChange}
          placeholder="Your name"
          required
          error={errors.customer_name}
        />
        <InputField
          label="Phone"
          name="phone"
          value={checkout.phone}
          onChange={onChange}
          placeholder="Your phone"
          required
          error={errors.phone}
        />
        <InputField
          label="Delivery location"
          name="delivery_location"
          value={checkout.delivery_location}
          onChange={onChange}
          placeholder="Home, office, or event address"
          required
          error={errors.delivery_location}
        />

        <button className="btn btnPrimary cartPlace" type="button" disabled={loading || !cartItems.length} onClick={submit}>
          {loading ? 'Placing Order…' : 'Place Order'}
        </button>
        {status.message ? (
          <div className={status.type === 'ok' ? 'statusOk' : 'statusErr'}>{status.message}</div>
        ) : null}
      </div>
    </aside>
  );
}

