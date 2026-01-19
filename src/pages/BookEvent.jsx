import { useMemo, useState } from 'react';
import InputField from '../components/InputField.jsx';
import './FormPage.css';
import { createEventBooking } from '../services/eventBookingService';
import { getApiErrorMessage } from '../services/api';
import { asPositiveInt, isNonEmpty, isValidPhone } from '../services/validators';

export default function BookEvent() {
  const eventTypeOptions = useMemo(
    () => [
      { value: '', label: 'Select event type' },
      { value: 'Birthday', label: 'Birthday' },
      { value: 'Corporate', label: 'Corporate' },
      { value: 'House Party', label: 'House Party' },
      { value: 'Wedding Function', label: 'Wedding Function' },
      { value: 'Pop-up / Launch', label: 'Pop-up / Launch' },
      { value: 'Other', label: 'Other' }
    ],
    []
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    event_type: '',
    event_date: '',
    number_of_people: '',
    location: ''
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
    if (!isNonEmpty(form.event_type)) nextErrors.event_type = 'Please select an event type.';
    if (!isNonEmpty(form.event_date)) nextErrors.event_date = 'Please select an event date.';
    const people = asPositiveInt(form.number_of_people);
    if (!people || people < 5) nextErrors.number_of_people = 'Please enter number of people (minimum 5).';
    if (!isNonEmpty(form.location)) nextErrors.location = 'Please enter the event location.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await createEventBooking({
        name: form.name.trim(),
        phone: form.phone.trim(),
        event_type: form.event_type,
        event_date: form.event_date,
        number_of_people: people,
        location: form.location.trim()
      });
      setForm({
        name: '',
        phone: '',
        event_type: '',
        event_date: '',
        number_of_people: '',
        location: ''
      });
      setStatus({ type: 'ok', message: 'Booking request saved. Our team will contact you shortly.' });
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
          <div className="kicker">Event booking</div>
          <h1 className="title">Book for an Event</h1>
          <p className="subtitle">
            Share your details and guest count. We’ll plan the cart setup, staffing, and a menu flow suited to your
            event.
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
                label="Event type"
                name="event_type"
                value={form.event_type}
                onChange={onChange}
                required
                as="select"
                options={eventTypeOptions}
                error={errors.event_type}
              />
              <InputField
                label="Event date"
                name="event_date"
                value={form.event_date}
                onChange={onChange}
                type="date"
                required
                error={errors.event_date}
              />
            </div>

            <div className="split">
              <InputField
                label="Number of people"
                name="number_of_people"
                value={form.number_of_people}
                onChange={onChange}
                type="number"
                placeholder="e.g. 80"
                required
                error={errors.number_of_people}
              />
              <InputField
                label="Location"
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="Venue / society / office location"
                required
                error={errors.location}
              />
            </div>

            <div className="formActions">
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Booking'}
              </button>
              <div className="mutedNote">We typically respond within business hours with confirmation and next steps.</div>
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

