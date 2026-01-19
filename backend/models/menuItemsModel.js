const { pool } = require('../config/db');

async function getAllMenuItems() {
  const [rows] = await pool.query(
    `
      SELECT id, name, description, price, image_url, is_veg, is_available
      FROM menu_items
      WHERE is_available = 1
      ORDER BY name ASC
    `
  );
  return rows;
}

module.exports = { getAllMenuItems };

