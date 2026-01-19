const { pool } = require('../config/db');

async function createReview({ name, rating, comment }) {
  const [result] = await pool.query(
    `
      INSERT INTO reviews (name, rating, comment)
      VALUES (?, ?, ?)
    `,
    [name, rating, comment]
  );
  return { id: result.insertId };
}

module.exports = { createReview };

