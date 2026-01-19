const { pool } = require('../config/db');

async function createFranchiseApplication({
  name,
  phone,
  city,
  investment_range,
  previous_business_experience
}) {
  const [result] = await pool.query(
    `
      INSERT INTO franchise_applications
        (name, phone, city, investment_range, previous_business_experience)
      VALUES (?, ?, ?, ?, ?)
    `,
    [name, phone, city, investment_range, previous_business_experience]
  );
  return { id: result.insertId };
}

module.exports = { createFranchiseApplication };

