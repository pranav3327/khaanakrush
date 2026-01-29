const mysql = require('mysql2/promise');

// Allow a single DATABASE_URL to drive both Prisma Studio and mysql2,
// so you don't end up pointing them at different databases.
// Format: mysql://user:pass@host:port/dbname
const parseDatabaseUrl = (url) => {
  try {
    const u = new URL(url);
    return {
      host: u.hostname || 'localhost',
      user: u.username || 'root',
      password: u.password || '',
      database: (u.pathname || '').replace(/^\//, '') || 'khaanakrush',
      port: Number(u.port || '3306')
    };
  } catch (e) {
    return null;
  }
};

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'khanakrush',
  DB_PORT = '3306',
  DATABASE_URL
} = process.env;

// If DATABASE_URL is provided (e.g. from Aiven), use it directly.
// This ensures query params like ?ssl-mode=REQUIRED are respected.
const poolConfig = DATABASE_URL || {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z',
  // Enable SSL by default for cloud connections if not using URL
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = mysql.createPool(poolConfig);

async function pingDb() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
  } finally {
    conn.release();
  }
}

module.exports = { pool, pingDb };

