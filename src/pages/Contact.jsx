import { useState } from 'react';
import InputField from '../components/InputField.jsx';
import './FormPage.css';
import { createContactMessage } from '../services/contactService';
import { getApiErrorMessage } from '../services/api';
import { isNonEmpty, isValidEmail } from '../services/validators';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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
    if (!isValidEmail(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!isNonEmpty(form.message)) nextErrors.message = 'Please write your message.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await createContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      });
      setForm({ name: '', email: '', message: '' });
      setStatus({ type: 'ok', message: 'Message received. We’ll get back to you soon.' });
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
          <div className="kicker">Contact</div>
          <h1 className="title">Contact Us</h1>
          <p className="subtitle">
            Reach out for partnerships, event planning, or premium cart drops. We’ll respond with next steps.
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
                label="Email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                required
                error={errors.email}
              />
            </div>

            <InputField
              label="Message"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Tell us what you’re looking for — event details, city, dates, or special requests."
              required
              as="textarea"
              error={errors.message}
            />

            <div className="formActions">
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
              <div className="mutedNote">For urgent coordination, WhatsApp is fastest.</div>
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

