const { pool } = require('../config/db');

async function createOrderWithItems({ customer_name, phone, delivery_location, items }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [orderResult] = await conn.query(
      `
        INSERT INTO orders (customer_name, phone, delivery_location, total_amount, status)
        VALUES (?, ?, ?, 0, 'placed')
      `,
      [customer_name, phone, delivery_location]
    );

    const orderId = orderResult.insertId;

    let total = 0;

    for (const it of items) {
      const [menuRows] = await conn.query(
        `SELECT id, price, is_available FROM menu_items WHERE id = ? LIMIT 1`,
        [it.menu_item_id]
      );
      if (!menuRows.length) {
        const err = new Error(`Menu item not found: ${it.menu_item_id}`);
        err.statusCode = 400;
        throw err;
      }
      if (Number(menuRows[0].is_available) !== 1) {
        const err = new Error(`Menu item not available: ${it.menu_item_id}`);
        err.statusCode = 400;
        throw err;
      }

      const priceEach = Number(menuRows[0].price);
      const qty = Number(it.quantity);
      const lineTotal = priceEach * qty;
      total += lineTotal;

      await conn.query(
        `
          INSERT INTO order_items (order_id, menu_item_id, quantity, price_each, line_total)
          VALUES (?, ?, ?, ?, ?)
        `,
        [orderId, it.menu_item_id, qty, priceEach, lineTotal]
      );
    }

    await conn.query(`UPDATE orders SET total_amount = ? WHERE id = ?`, [total, orderId]);

    await conn.commit();
    return { order_id: orderId, total_amount: total };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function listOrders(limit = 20) {
  const [rows] = await pool.query(
    `
      SELECT id, customer_name, phone, delivery_location, total_amount, status, created_at
      FROM orders
      ORDER BY id DESC
      LIMIT ?
    `,
    [Number(limit)]
  );
  return rows;
}

module.exports = { createOrderWithItems, listOrders };

