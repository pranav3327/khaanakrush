const { createFranchiseApplication } = require('../models/franchiseApplicationsModel');

function isValidPhone(phone) {
  const v = String(phone || '').trim();
  return /^[6-9]\d{9}$/.test(v) || /^\+?\d{10,14}$/.test(v);
}

async function create(req, res, next) {
  try {
    const { name, phone, city, investment_range, previous_business_experience } = req.body || {};

    if (!String(name || '').trim()) return res.status(400).json({ message: 'name is required.' });
    if (!isValidPhone(phone)) return res.status(400).json({ message: 'phone is invalid.' });
    if (!String(city || '').trim()) return res.status(400).json({ message: 'city is required.' });
    if (!String(investment_range || '').trim())
      return res.status(400).json({ message: 'investment_range is required.' });

    const pbe = String(previous_business_experience || '').trim().toLowerCase();
    if (pbe !== 'yes' && pbe !== 'no') {
      return res.status(400).json({ message: 'previous_business_experience must be yes or no.' });
    }

    const result = await createFranchiseApplication({
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      investment_range: String(investment_range).trim(),
      previous_business_experience: pbe
    });

    return res.status(201).json({ message: 'Franchise application created.', id: result.id });
  } catch (err) {
    return next(err);
  }
}

module.exports = { create };

