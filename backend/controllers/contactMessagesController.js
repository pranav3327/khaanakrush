const { createContactMessage } = require('../models/contactMessagesModel');

function isValidEmail(email) {
  const v = String(email || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function create(req, res, next) {
  try {
    const { name, email, message } = req.body || {};

    if (!String(name || '').trim()) return res.status(400).json({ message: 'name is required.' });
    if (!isValidEmail(email)) return res.status(400).json({ message: 'email is invalid.' });
    if (!String(message || '').trim()) return res.status(400).json({ message: 'message is required.' });

    const result = await createContactMessage({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    });

    return res.status(201).json({ message: 'Contact message created.', id: result.id });
  } catch (err) {
    return next(err);
  }
}

module.exports = { create };

