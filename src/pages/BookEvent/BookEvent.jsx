import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createEventBooking } from '../../services/eventBookingService';
import { isNonEmpty, isValidPhone, isValidEmail } from '../../services/validators';
import './BookEvent.css';

const EVENT_TYPES = ['Home Gathering', 'Wedding', 'Corporate', 'Other'];
const DURATIONS = ['Half Day', 'Full Day', 'Evening Only'];
const CUISINES = ['Street Tacos', 'Loaded Burritos', 'Quesadilla Bar', 'Nacho Station', 'Full Mexican Spread'];
const DIETS = ['Pure Veg', 'Non-Veg', 'Vegan Options'];

export default function BookEvent() {
  const [form, setForm] = useState({
    eventType: '', eventDate: '', expectedGuests: '', duration: '',
    venueName: '', venueAddress: '', city: '',
    cuisineTypes: [], dietaryReqs: [], specialRequests: '',
    contactName: '', phone: '', email: '', preferredTime: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const toggleArray = (key, val) => {
    setForm((p) => {
      const arr = p[key];
      return { ...p, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  };

  const validate = () => {
    const e = {};
    if (!isNonEmpty(form.eventType)) e.eventType = 'Required';
    if (!isNonEmpty(form.eventDate)) e.eventDate = 'Required';
    if (!form.expectedGuests || form.expectedGuests < 20) e.expectedGuests = 'Min 20 guests';
    if (!isNonEmpty(form.venueAddress)) e.venueAddress = 'Required';
    if (!isNonEmpty(form.city)) e.city = 'Required';
    if (!isNonEmpty(form.contactName)) e.contactName = 'Required';
    if (!isValidPhone(form.phone)) e.phone = 'Valid phone required';
    if (!isValidEmail(form.email)) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError('');
    try {
      await createEventBooking(form);
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Something went wrong. Please try again.');
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
          <h2>🎉 Booking Request Received!</h2>
          <p>We'll call you within 2 hours to confirm your event details.</p>
          <Link to="/" className="btn btn--primary" style={{ marginTop: 24 }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  const eventCards = [
    { icon: '🏠', title: 'Home Gatherings', desc: 'Birthdays, kitty parties, family get-togethers. Live taco cart at your door. Serves 20–100 guests.' },
    { icon: '💒', title: 'Weddings & Receptions', desc: 'A full Mexican food cart setup for your big day. Serves 200–2000+ guests.' },
    { icon: '🏢', title: 'Corporate Events', desc: 'Office lunches, team offsites, product launches. Tacos, burritos, and more — any scale.' },
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="page-fade">
      {/* HERO */}
      <section className="be-hero">
        <div className="be-hero__overlay" />
        <div className="be-hero__content">
          <div className="be-hero__breadcrumb">
            <Link to="/">Home</Link> <span>›</span> <span>Book Event</span>
          </div>
          <h1>Bring a Live Mexican Food Cart to Your Event</h1>
          <p>From intimate house parties to 2000-guest weddings — we roll up, cook fresh, and serve hot.</p>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="be-types">
        <div className="be-types__grid">
          {eventCards.map((c, i) => (
            <div key={i} className="be-type-card">
              <div className="be-type-card__overlay" />
              <div className="be-type-card__content">
                <span className="be-type-card__icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="be-form-section">
        <form className="be-form" onSubmit={handleSubmit}>
          <h2>Book Your Cart</h2>

          {apiError && <div className="be-form__error-banner">{apiError}</div>}

          {/* Event Details */}
          <h3 className="be-form__section-title">Event Details</h3>
          <div className="be-form__row">
            <div className="form-field">
              <select value={form.eventType} onChange={(e) => set('eventType', e.target.value)} className={errors.eventType ? 'form-field--error' : ''}>
                <option value="">Event Type *</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.eventType && <span className="form-error">{errors.eventType}</span>}
            </div>
            <div className="form-field">
              <input type="date" value={form.eventDate} min={minDate} onChange={(e) => set('eventDate', e.target.value)} className={errors.eventDate ? 'form-field--error' : ''} />
              {errors.eventDate && <span className="form-error">{errors.eventDate}</span>}
            </div>
          </div>
          <div className="be-form__row">
            <div className="form-field">
              <input type="number" placeholder="Expected Guests *" min={20} value={form.expectedGuests} onChange={(e) => set('expectedGuests', e.target.value)} className={errors.expectedGuests ? 'form-field--error' : ''} />
              {errors.expectedGuests && <span className="form-error">{errors.expectedGuests}</span>}
            </div>
            <div className="form-field">
              <select value={form.duration} onChange={(e) => set('duration', e.target.value)}>
                <option value="">Duration</option>
                {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Venue */}
          <h3 className="be-form__section-title">Venue Details</h3>
          <div className="form-field">
            <input type="text" placeholder="Venue Name / Description" value={form.venueName} onChange={(e) => set('venueName', e.target.value)} />
          </div>
          <div className="form-field">
            <textarea placeholder="Full Address *" rows={2} value={form.venueAddress} onChange={(e) => set('venueAddress', e.target.value)} className={errors.venueAddress ? 'form-field--error' : ''} />
            {errors.venueAddress && <span className="form-error">{errors.venueAddress}</span>}
          </div>
          <div className="form-field">
            <input type="text" placeholder="City *" value={form.city} onChange={(e) => set('city', e.target.value)} className={errors.city ? 'form-field--error' : ''} />
            {errors.city && <span className="form-error">{errors.city}</span>}
          </div>

          {/* Menu Preferences */}
          <h3 className="be-form__section-title">Menu Preferences</h3>
          <div className="be-form__checkboxes">
            <p className="be-form__check-label">Cart Style:</p>
            {CUISINES.map((c) => (
              <label key={c} className="be-form__checkbox">
                <input type="checkbox" checked={form.cuisineTypes.includes(c)} onChange={() => toggleArray('cuisineTypes', c)} />
                <span>{c}</span>
              </label>
            ))}
          </div>
          <div className="be-form__checkboxes">
            <p className="be-form__check-label">Dietary Requirements:</p>
            {DIETS.map((d) => (
              <label key={d} className="be-form__checkbox">
                <input type="checkbox" checked={form.dietaryReqs.includes(d)} onChange={() => toggleArray('dietaryReqs', d)} />
                <span>{d}</span>
              </label>
            ))}
          </div>
          <div className="form-field">
            <textarea placeholder="Special requests" rows={2} value={form.specialRequests} onChange={(e) => set('specialRequests', e.target.value)} />
          </div>

          {/* Contact */}
          <h3 className="be-form__section-title">Contact Info</h3>
          <div className="be-form__row">
            <div className="form-field">
              <input type="text" placeholder="Name *" value={form.contactName} onChange={(e) => set('contactName', e.target.value)} className={errors.contactName ? 'form-field--error' : ''} />
              {errors.contactName && <span className="form-error">{errors.contactName}</span>}
            </div>
            <div className="form-field">
              <input type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={errors.phone ? 'form-field--error' : ''} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>
          <div className="be-form__row">
            <div className="form-field">
              <input type="email" placeholder="Email *" value={form.email} onChange={(e) => set('email', e.target.value)} className={errors.email ? 'form-field--error' : ''} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <input type="text" placeholder="Preferred contact time" value={form.preferredTime} onChange={(e) => set('preferredTime', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn--primary be-form__submit" disabled={submitting} id="submit-event">
            {submitting ? <span className="spinner" /> : 'Send Booking Request →'}
          </button>
        </form>
      </section>
    </div>
  );
}
