const { createReview } = require('../models/reviewsModel');

async function create(req, res, next) {
  try {
    const { name, rating, comment } = req.body || {};

    if (!String(name || '').trim()) return res.status(400).json({ message: 'name is required.' });
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) return res.status(400).json({ message: 'rating must be 1-5.' });
    if (!String(comment || '').trim()) return res.status(400).json({ message: 'comment is required.' });

    const result = await createReview({
      name: String(name).trim(),
      rating: r,
      comment: String(comment).trim()
    });

    return res.status(201).json({ message: 'Review created.', id: result.id });
  } catch (err) {
    return next(err);
  }
}

module.exports = { create };

