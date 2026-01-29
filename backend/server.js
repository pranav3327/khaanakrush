require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const { pingDb } = require('./config/db');

const menuItemsRoutes = require('./routes/menuItemsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const eventBookingsRoutes = require('./routes/eventBookingsRoutes');
const cartReservationsRoutes = require('./routes/cartReservationsRoutes');
const contactMessagesRoutes = require('./routes/contactMessagesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const franchiseRoutes = require('./routes/franchiseApplicationsRoutes');

const app = express();

const PORT = Number(process.env.PORT || 8081);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174';
const ALLOWED_ORIGINS = CORS_ORIGIN.split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (curl/postman) with no Origin header
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      // Allow all Render subdomains (for robustness)
      if (origin.endsWith('.onrender.com')) return callback(null, true);
      return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '1mb' }));

// Static assets (menu images, etc.)
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/api/health', async (req, res) => {
  try {
    await pingDb();
    return res.status(200).json({ ok: true, db: 'up' });
  } catch (err) {
    return res.status(500).json({ ok: false, db: 'down', message: 'Database connection failed.' });
  }
});

app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/event-bookings', eventBookingsRoutes);
app.use('/api/cart-reservations', cartReservationsRoutes);
app.use('/api/contact-messages', contactMessagesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/franchise-applications', franchiseRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  // Return actual error message for debugging deployment issues
  res.status(500).json({ 
    message: 'Internal server error.', 
    debug_error: err.message,
    debug_code: err.code 
  });
});

const server = app.listen(PORT, () => {
  console.log(`KhaanaKrush API running on port ${PORT}`);
  console.log(`CORS origins allowed: ${ALLOWED_ORIGINS.join(', ')}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    console.error('Stop the other process using this port, or change PORT in backend/.env.');
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

