const { pool } = require('../config/db');

async function createEventBooking({ name, phone, event_type, event_date, number_of_people, location }) {
  const [result] = await pool.query(
    `
      INSERT INTO event_bookings (name, phone, event_type, event_date, number_of_people, location)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [name, phone, event_type, event_date, number_of_people, location]
  );
  return { id: result.insertId };
}

module.exports = { createEventBooking };

