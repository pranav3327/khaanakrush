const { getAllMenuItems } = require('../models/menuItemsModel');

async function listMenuItems(req, res, next) {
  try {
    const rows = await getAllMenuItems();
    return res.status(200).json(rows);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listMenuItems };

