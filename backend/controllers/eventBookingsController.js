const { createEventBooking } = require('../models/eventBookingsModel');

function isValidPhone(phone) {
  const v = String(phone || '').trim();
  return /^[6-9]\d{9}$/.test(v) || /^\+?\d{10,14}$/.test(v);
}

function isValidDateString(v) {
  const s = String(v || '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

async function create(req, res, next) {
  try {
    const { name, phone, event_type, event_date, number_of_people, location } = req.body || {};

    if (!String(name || '').trim()) return res.status(400).json({ message: 'name is required.' });
    if (!isValidPhone(phone)) return res.status(400).json({ message: 'phone is invalid.' });
    if (!String(event_type || '').trim()) return res.status(400).json({ message: 'event_type is required.' });
    if (!isValidDateString(event_date)) return res.status(400).json({ message: 'event_date is invalid.' });
    const people = Number(number_of_people);
    if (!Number.isInteger(people) || people <= 0) {
      return res.status(400).json({ message: 'number_of_people must be a positive integer.' });
    }
    if (!String(location || '').trim()) return res.status(400).json({ message: 'location is required.' });

    const result = await createEventBooking({
      name: String(name).trim(),
      phone: String(phone).trim(),
      event_type: String(event_type).trim(),
      event_date: String(event_date).trim(),
      number_of_people: people,
      location: String(location).trim()
    });

    return res.status(201).json({ message: 'Event booking created.', id: result.id });
  } catch (err) {
    return next(err);
  }
}

module.exports = { create };

