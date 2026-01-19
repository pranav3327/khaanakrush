import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import InputField from '../components/InputField';
import { getApiErrorMessage } from '../services/api';
import { placeOrder } from '../services/orderService';
import { isNonEmpty, isValidPhone } from '../services/validators';
import './CartPage.css';
import './FormPage.css';

function money(n) {
  const v = Number(n) || 0;
  return `₹${v.toFixed(0)}`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, inc, dec, remove, clearCart } = useCart();
  
  const [checkout, setCheckout] = useState({
    customer_name: '',
    phone: '',
    delivery_location: '',
    event_date: '',
    event_time: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, ci) => sum + Number(ci.price) * Number(ci.quantity), 0);
    return { subtotal, total: subtotal };
  }, [cart]);

  const MIN_ORDER_VALUE = 1500;
  const isBelowMin = totals.total < MIN_ORDER_VALUE;

  function onChange(e) {
    setCheckout((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submit() {
    setStatus({ type: '', message: '' });
    const nextErrors = {};
    if (!cart.length) nextErrors.items = 'Your cart is empty.';
    if (isBelowMin) nextErrors.items = `Minimum order value is ₹${MIN_ORDER_VALUE}.`;
    if (!isNonEmpty(checkout.customer_name)) nextErrors.customer_name = 'Please enter your name.';
    if (!isValidPhone(checkout.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!isNonEmpty(checkout.delivery_location)) nextErrors.delivery_location = 'Please enter the event location.';
    if (!checkout.event_date) nextErrors.event_date = 'Please select a date.';
    if (!checkout.event_time) nextErrors.event_time = 'Please select a time.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      const payload = {
        customer_name: checkout.customer_name.trim(),
        phone: checkout.phone.trim(),
        delivery_location: checkout.delivery_location.trim(),
        event_date: checkout.event_date,
        event_time: checkout.event_time,
        items: cart.map((ci) => ({
          menu_item_id: ci.id,
          quantity: ci.quantity
        }))
      };
      const data = await placeOrder(payload);
      setStatus({ type: 'ok', message: 'Booking request sent successfully.' });
      clearCart();
      navigate(`/order-confirmation/${data?.order_id || 'new'}`);
    } catch (err) {
      setStatus({ type: 'err', message: getApiErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }

  if (!cart.length) {
    return (
      <div className="pagePad">
        <div className="container">
          <div className="emptyCartPage">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any dishes yet.</p>
            <button className="btn btnPrimary" onClick={() => navigate('/menu')}>
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pagePad">
      <div className="container">
        <h1 className="pageTitle">Complete Your Booking</h1>
        
        <div className="cartPageGrid">
          <div className="cartItemsSection glass-panel">
            <h2 className="sectionTitle">Your Selection</h2>
            <div className="cartItemsList">
              {cart.map((ci) => (
                <div className="cartItemRow" key={ci.id}>
                  <div className="cartItemInfo">
                    <div className="cartItemName">{ci.name}</div>
                    <div className="cartItemPrice">{money(ci.price)} x {ci.quantity}</div>
                  </div>
                  <div className="cartItemTotal">{money(ci.price * ci.quantity)}</div>
                  <div className="cartItemControls">
                    <button className="qtyBtn" onClick={() => dec(ci)}>−</button>
                    <span className="qtyVal">{ci.quantity}</span>
                    <button className="qtyBtn" onClick={() => inc(ci)}>+</button>
                    <button className="removeBtn" onClick={() => remove(ci)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotalRow">
              <span>Total Estimate</span>
              <span>{money(totals.total)}</span>
            </div>
            {isBelowMin && (
              <div className="minOrderWarning">
                Minimum order is ₹{MIN_ORDER_VALUE}. <br />
                Add <strong>{money(MIN_ORDER_VALUE - totals.total)}</strong> more to proceed.
              </div>
            )}
          </div>

          <div className="checkoutSection glass-panel">
            <h2 className="sectionTitle">Event Details</h2>
            <div className="formStack">
              {errors.items && <div className="formError">{errors.items}</div>}
              
              <InputField
                label="Your Name"
                name="customer_name"
                value={checkout.customer_name}
                onChange={onChange}
                error={errors.customer_name}
                placeholder="e.g. Rahul Sharma"
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={checkout.phone}
                onChange={onChange}
                error={errors.phone}
                placeholder="10-digit mobile number"
              />
              <InputField
                label="Event Location"
                name="delivery_location"
                value={checkout.delivery_location}
                onChange={onChange}
                error={errors.delivery_location}
                placeholder="Complete address for the cart"
              />
              <div className="formRow">
                <InputField
                  label="Date"
                  name="event_date"
                  type="date"
                  value={checkout.event_date}
                  onChange={onChange}
                  error={errors.event_date}
                />
                <InputField
                  label="Time"
                  name="event_time"
                  type="time"
                  value={checkout.event_time}
                  onChange={onChange}
                  error={errors.event_time}
                />
              </div>

              {status.message && (
                <div className={`formStatus ${status.type === 'err' ? 'statusError' : 'statusOk'}`}>
                  {status.message}
                </div>
              )}

              <button 
                className="btn btnPrimary fullBtn" 
                onClick={submit} 
                disabled={loading || isBelowMin}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
