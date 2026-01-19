const { pool } = require('../config/db');

async function createCartReservation({ name, phone, city, date, duration_hours }) {
  const [result] = await pool.query(
    `
      INSERT INTO cart_reservations (name, phone, city, date, duration_hours)
      VALUES (?, ?, ?, ?, ?)
    `,
    [name, phone, city, date, duration_hours]
  );
  return { id: result.insertId };
}

module.exports = { createCartReservation };

