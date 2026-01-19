const { createCartReservation } = require('../models/cartReservationsModel');

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
    const { name, phone, city, date, duration_hours } = req.body || {};

    if (!String(name || '').trim()) return res.status(400).json({ message: 'name is required.' });
    if (!isValidPhone(phone)) return res.status(400).json({ message: 'phone is invalid.' });
    if (!String(city || '').trim()) return res.status(400).json({ message: 'city is required.' });
    if (!isValidDateString(date)) return res.status(400).json({ message: 'date is invalid.' });
    const hours = Number(duration_hours);
    if (!Number.isInteger(hours) || hours <= 0 || hours > 24) {
      return res.status(400).json({ message: 'duration_hours must be an integer between 1 and 24.' });
    }

    const result = await createCartReservation({
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      date: String(date).trim(),
      duration_hours: hours
    });

    return res.status(201).json({ message: 'Cart reservation created.', id: result.id });
  } catch (err) {
    return next(err);
  }
}

module.exports = { create };

