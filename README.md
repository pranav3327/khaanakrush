## KhaanaKrush — Full Stack (React + Express + MySQL)

Production-ready starter for **KhaanaKrush**, a premium cooked-fresh food cart e-cart experience.

### Tech stack
- **Frontend**: React (Vite), HTML5, CSS3 (no UI libraries), Axios, React Router
- **Backend**: Node.js, Express.js, MySQL (`mysql2`), MVC architecture

---

## Setup

### 1) Database (MySQL)

1. Create a database and tables, then seed menu items:

```bash
cd backend/sql
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql
```

This creates/uses a DB named `khaanakrush`. If you want a different DB name, update:
- `backend/env.example` → `DB_NAME`
- `backend/sql/schema.sql` → `CREATE DATABASE` / `USE`

---

### 2) Backend (Express API)

```bash
cd backend
npm install
```

Create a `.env` file from `backend/env.example` (copy + rename) and fill in your DB credentials:

- `PORT` (default `8081`)
- `CORS_ORIGIN` (default `http://localhost:5173`)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`

Run:

```bash
npm run dev
```

Health check:
- `GET http://localhost:8081/api/health`

Static assets:
- Menu SVGs are served from `http://localhost:8081/static/menu/...`

---

### 3) Frontend (React + Vite)

```bash
npm install
```

Create a `.env` file from `env.example` (copy + rename) and set:
- `VITE_API_URL=http://localhost:8081`

Run:

```bash
npm run dev
```

---

## REST API (Backend)

Base URL: `http://localhost:8081`

- **Menu items**
  - `GET /api/menu-items`

- **Orders**
  - `POST /api/orders`
  - `GET /api/orders?limit=20`

- **Event bookings**
  - `POST /api/event-bookings`

- **Cart reservations**
  - `POST /api/cart-reservations`

- **Contact messages**
  - `POST /api/contact-messages`

- **Reviews**
  - `POST /api/reviews`

- **Franchise applications**
  - `POST /api/franchise-applications`

---

## Frontend routes
- `/` Home
- `/book-event` Book for an Event
- `/menu` Menu (place food orders)
- `/order-confirmation/:orderId` Order Confirmation (static tracking UI)
- `/reserve-cart` Reserve a Cart
- `/contact` Contact Us

