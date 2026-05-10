import { useState } from 'react';
import { createContactMessage } from '../../services/contactService';
import { createFranchiseApplication } from '../../services/franchiseService';
import { isNonEmpty, isValidEmail, isValidPhone } from '../../services/validators';
import './Contact.css';

const SUBJECTS = ['General', 'Order Issue', 'Franchise', 'Feedback', 'Event Booking'];

export default function Contact() {
  // Contact form
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Franchise form
  const [franchise, setFranchise] = useState({ name: '', phone: '', city: '' });
  const [fErrors, setFErrors] = useState({});
  const [fSubmitting, setFSubmitting] = useState(false);
  const [fSuccess, setFSuccess] = useState(false);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleContact = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isNonEmpty(form.name)) errs.name = 'Required';
    if (!isValidEmail(form.email)) errs.email = 'Valid email required';
    if (!isNonEmpty(form.message) || form.message.trim().length < 40) errs.message = 'Min 40 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setApiError('');
    try {
      await createContactMessage(form);
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Failed to send. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFranchise = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isNonEmpty(franchise.name)) errs.name = 'Required';
    if (!isValidPhone(franchise.phone)) errs.phone = 'Valid phone required';
    if (!isNonEmpty(franchise.city)) errs.city = 'Required';
    setFErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFSubmitting(true);
    try {
      await createFranchiseApplication(franchise);
      setFSuccess(true);
    } catch {
      // silent — optional form
    } finally {
      setFSubmitting(false);
    }
  };

  const infoCards = [
    { icon: '📍', label: 'Address', value: 'Rohtak, Haryana', href: null },
    { icon: '📞', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: '📧', label: 'Email', value: 'hello@khaanakrush.com', href: 'mailto:hello@khaanakrush.com' },
    { icon: '⏰', label: 'Hours', value: 'Mon–Sun, 8 AM – 11 PM', href: null },
  ];

  return (
    <div className="page-fade">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Let's Talk</h1>
        <p>Questions, feedback, franchise, or just to say hi.</p>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-grid">
        {/* Left: Info */}
        <div className="contact-info">
          {infoCards.map((c, i) => (
            <div key={i} className="contact-info-card">
              <span className="contact-info-card__icon">{c.icon}</span>
              <div>
                <p className="contact-info-card__label">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="contact-info-card__value">{c.value}</a>
                ) : (
                  <p className="contact-info-card__value">{c.value}</p>
                )}
              </div>
            </div>
          ))}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn contact-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={handleContact}>
            <h3>Send a Message</h3>
            {success ? (
              <div className="contact-form__success">✓ Message sent! We'll reply within 24 hours.</div>
            ) : (
              <>
                {apiError && <div className="be-form__error-banner">{apiError}</div>}
                <div className="form-field">
                  <input type="text" placeholder="Name *" value={form.name} onChange={(e) => set('name', e.target.value)} className={errors.name ? 'form-field--error' : ''} />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="be-form__row">
                  <div className="form-field">
                    <input type="email" placeholder="Email *" value={form.email} onChange={(e) => set('email', e.target.value)} className={errors.email ? 'form-field--error' : ''} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-field">
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </div>
                </div>
                <div className="form-field">
                  <select value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                    <option value="">Subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <textarea placeholder="Message (min 40 characters) *" rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} className={errors.message ? 'form-field--error' : ''} />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn--primary contact-form__submit" disabled={submitting}>
                  {submitting ? <span className="spinner" /> : 'Send Message →'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FRANCHISE SECTION */}
      <section className="franchise-section">
        <div className="franchise-section__inner">
          <div className="franchise-section__text">
            <h2>Interested in Owning a Mexican Food Cart Franchise?</h2>
            <p>Start your own KhaanaKrush cart. Low investment, high returns, full support.</p>
            <ul>
              <li>✓ Proven Mexican food cart model</li>
              <li>✓ Complete brand & recipe support</li>
              <li>✓ Chef training provided</li>
              <li>✓ Supply chain fully managed</li>
            </ul>
          </div>
          <div className="franchise-section__form-wrap">
            {fSuccess ? (
              <p className="franchise-section__success">✓ We'll call you within 48 hours!</p>
            ) : (
              <form className="franchise-section__form" onSubmit={handleFranchise}>
                <div className="form-field">
                  <input type="text" placeholder="Name *" value={franchise.name} onChange={(e) => setFranchise(p => ({...p, name: e.target.value}))} className={fErrors.name ? 'form-field--error' : ''} />
                </div>
                <div className="form-field">
                  <input type="tel" placeholder="Phone *" value={franchise.phone} onChange={(e) => setFranchise(p => ({...p, phone: e.target.value}))} className={fErrors.phone ? 'form-field--error' : ''} />
                </div>
                <div className="form-field">
                  <input type="text" placeholder="City *" value={franchise.city} onChange={(e) => setFranchise(p => ({...p, city: e.target.value}))} className={fErrors.city ? 'form-field--error' : ''} />
                </div>
                <button type="submit" className="btn btn--primary" disabled={fSubmitting} style={{ width: '100%' }}>
                  {fSubmitting ? <span className="spinner" /> : 'Apply Now →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
