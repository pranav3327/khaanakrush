const { createOrderWithItems, listOrders } = require('../models/ordersModel');

function isValidPhone(phone) {
  const v = String(phone || '').trim();
  return /^[6-9]\d{9}$/.test(v) || /^\+?\d{10,14}$/.test(v);
}

async function createOrder(req, res, next) {
  try {
    const { customer_name, phone, delivery_location, items, event_date, event_time } = req.body || {};

    if (!String(customer_name || '').trim()) {
      return res.status(400).json({ message: 'customer_name is required.' });
    }
    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: 'phone is invalid.' });
    }
    if (!String(delivery_location || '').trim()) {
      return res.status(400).json({ message: 'delivery_location is required.' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items must be a non-empty array.' });
    }

    // Append event date/time to location to avoid schema changes for now
    let finalLocation = String(delivery_location).trim();
    if (event_date) finalLocation += ` | Date: ${event_date}`;
    if (event_time) finalLocation += ` | Time: ${event_time}`;

    for (const it of items) {
      const id = Number(it?.menu_item_id);
      const qty = Number(it?.quantity);
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'Each item must have a valid menu_item_id.' });
      }
      if (!Number.isInteger(qty) || qty <= 0 || qty > 50) {
        return res.status(400).json({ message: 'Each item must have quantity between 1 and 50.' });
      }
    }

    const result = await createOrderWithItems({
      customer_name: String(customer_name).trim(),
      phone: String(phone).trim(),
      delivery_location: finalLocation,
      items
    });

    return res.status(201).json(result);
  } catch (err) {
    if (err?.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return next(err);
  }
}

async function getOrders(req, res, next) {
  try {
    const limit = req.query.limit || 20;
    const rows = await listOrders(limit);
    return res.status(200).json(rows);
  } catch (err) {
    return next(err);
  }
}

module.exports = { createOrder, getOrders };

