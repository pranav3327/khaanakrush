import { useState } from 'react';
import InputField from '../components/InputField.jsx';
import './FormPage.css';
import { createCartReservation } from '../services/cartReservationService';
import { getApiErrorMessage } from '../services/api';
import { asPositiveInt, isNonEmpty, isValidPhone } from '../services/validators';

export default function ReserveCart() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    date: '',
    duration_hours: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const nextErrors = {};
    if (!isNonEmpty(form.name)) nextErrors.name = 'Please enter your name.';
    if (!isValidPhone(form.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!isNonEmpty(form.city)) nextErrors.city = 'Please enter your city.';
    if (!isNonEmpty(form.date)) nextErrors.date = 'Please select a date.';
    const hours = asPositiveInt(form.duration_hours);
    if (!hours || hours < 1 || hours > 12) nextErrors.duration_hours = 'Please enter duration between 1 and 12 hours.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await createCartReservation({
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        date: form.date,
        duration_hours: hours
      });
      setForm({ name: '', phone: '', city: '', date: '', duration_hours: '' });
      setStatus({ type: 'ok', message: 'Cart reservation saved. We’ll contact you to confirm availability.' });
    } catch (err) {
      setStatus({ type: 'err', message: getApiErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pagePad">
      <div className="container">
        <div className="pageHeader">
          <div className="kicker">Cart reservation</div>
          <h1 className="title">Reserve a Cart</h1>
          <p className="subtitle">
            Reserve a KhaanaKrush cart for your date and city. Ideal for intimate gatherings or premium pop-ups.
          </p>
        </div>

        <div className="card formCard">
          <form onSubmit={onSubmit}>
            <div className="split">
              <InputField
                label="Name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                required
                error={errors.name}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="Your phone number"
                required
                error={errors.phone}
              />
            </div>

            <div className="split">
              <InputField
                label="City"
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="e.g. Mumbai"
                required
                error={errors.city}
              />
              <InputField
                label="Date"
                name="date"
                value={form.date}
                onChange={onChange}
                type="date"
                required
                error={errors.date}
              />
            </div>

            <InputField
              label="Duration (hours)"
              name="duration_hours"
              value={form.duration_hours}
              onChange={onChange}
              type="number"
              placeholder="e.g. 4"
              required
              error={errors.duration_hours}
              hint="Typical setups run 3–6 hours depending on guest count and service style."
            />

            <div className="formActions">
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Reserve Cart'}
              </button>
              <div className="mutedNote">We’ll confirm pricing and availability after reviewing your request.</div>
            </div>

            {status.message ? (
              <div className={status.type === 'ok' ? 'statusOk' : 'statusErr'}>{status.message}</div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

