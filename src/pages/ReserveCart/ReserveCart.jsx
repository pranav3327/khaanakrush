import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createCartReservation } from '../../services/cartReservationService';
import { isNonEmpty, isValidPhone, isValidEmail } from '../../services/validators';
import './ReserveCart.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOTS = ['Morning 8–11', 'Lunch 12–3', 'Evening 5–8', 'Night 9–11'];

export default function ReserveCart() {
  const [form, setForm] = useState({
    contactName: '', phone: '', email: '',
    locationName: '', address: '',
    preferredDays: [], timeSlot: '',
    dailyFootfall: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const toggleDay = (day) => {
    setForm((p) => ({
      ...p,
      preferredDays: p.preferredDays.includes(day)
        ? p.preferredDays.filter((d) => d !== day)
        : [...p.preferredDays, day],
    }));
  };

  const validate = () => {
    const e = {};
    if (!isNonEmpty(form.contactName)) e.contactName = 'Required';
    if (!isValidPhone(form.phone)) e.phone = 'Valid phone required';
    if (!isValidEmail(form.email)) e.email = 'Valid email required';
    if (!isNonEmpty(form.locationName)) e.locationName = 'Required';
    if (!isNonEmpty(form.address)) e.address = 'Required';
    if (form.preferredDays.length === 0) e.preferredDays = 'Select at least one day';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError('');
    try {
      await createCartReservation(form);
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="page-fade success-page">
        <div className="success-page__inner">
          <div className="success-check">
            <svg viewBox="0 0 52 52" className="success-check__svg">
              <circle className="success-check__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="success-check__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h2>🎉 Reservation Request Received!</h2>
          <p>We'll confirm availability and get back to you shortly.</p>
          <Link to="/" className="btn btn--primary" style={{ marginTop: 24 }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: '📅', title: 'Pick your time slot and location' },
    { icon: '🤝', title: 'We confirm availability and send details' },
    { icon: '🌮', title: 'Our cart rolls up — every time, on time. Fresh Mexican, live.' },
  ];

  return (
    <div className="page-fade">
      {/* HERO */}
      <section className="rc-hero">
        <div className="rc-hero__overlay" />
        <div className="rc-hero__content">
          <h1>Reserve Your KhaanaKrush Cart</h1>
          <p>Fixed slot. Your area. Your crowd. Live Mexican food, cooked fresh every time.</p>
        </div>
      </section>

      {/* STEPS */}
      <section className="rc-steps">
        <div className="rc-steps__inner">
          {steps.map((s, i) => (
            <div key={i} className="rc-step">
              <span className="rc-step__num">{i + 1}</span>
              <span className="rc-step__icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="rc-form-section">
        <form className="rc-form" onSubmit={handleSubmit}>
          <h2>Reserve a Cart</h2>
          {apiError && <div className="be-form__error-banner">{apiError}</div>}

          <div className="be-form__row">
            <div className="form-field">
              <input type="text" placeholder="Contact Name *" value={form.contactName} onChange={(e) => set('contactName', e.target.value)} className={errors.contactName ? 'form-field--error' : ''} />
              {errors.contactName && <span className="form-error">{errors.contactName}</span>}
            </div>
            <div className="form-field">
              <input type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={errors.phone ? 'form-field--error' : ''} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>
          <div className="form-field">
            <input type="email" placeholder="Email *" value={form.email} onChange={(e) => set('email', e.target.value)} className={errors.email ? 'form-field--error' : ''} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-field">
            <input type="text" placeholder="Society / Office / Location Name *" value={form.locationName} onChange={(e) => set('locationName', e.target.value)} className={errors.locationName ? 'form-field--error' : ''} />
            {errors.locationName && <span className="form-error">{errors.locationName}</span>}
          </div>
          <div className="form-field">
            <textarea placeholder="Full Address *" rows={2} value={form.address} onChange={(e) => set('address', e.target.value)} className={errors.address ? 'form-field--error' : ''} />
            {errors.address && <span className="form-error">{errors.address}</span>}
          </div>

          {/* Day selection */}
          <div className="rc-days">
            <p className="be-form__check-label">Preferred Days: *</p>
            <div className="rc-days__grid">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`rc-day-btn ${form.preferredDays.includes(d) ? 'rc-day-btn--active' : ''}`}
                  onClick={() => toggleDay(d)}
                >
                  {d}
                </button>
              ))}
            </div>
            {errors.preferredDays && <span className="form-error">{errors.preferredDays}</span>}
          </div>

          <div className="be-form__row">
            <div className="form-field">
              <select value={form.timeSlot} onChange={(e) => set('timeSlot', e.target.value)}>
                <option value="">Preferred Time Slot</option>
                {SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field">
              <input type="number" placeholder="Expected Daily Footfall" min={1} value={form.dailyFootfall} onChange={(e) => set('dailyFootfall', e.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <textarea placeholder="Notes / Special Requirements" rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} />
          </div>

          <button type="submit" className="btn btn--primary be-form__submit" disabled={submitting} id="submit-reservation">
            {submitting ? <span className="spinner" /> : 'Submit Reservation →'}
          </button>
        </form>
      </section>
    </div>
  );
}
