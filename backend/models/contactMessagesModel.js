const { pool } = require('../config/db');

async function createContactMessage({ name, email, message }) {
  const [result] = await pool.query(
    `
      INSERT INTO contact_messages (name, email, message)
      VALUES (?, ?, ?)
    `,
    [name, email, message]
  );
  return { id: result.insertId };
}

module.exports = { createContactMessage };

