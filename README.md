# E-Commerce Mobile App

A full-stack mobile e-commerce application built with React Native and Node.js. Shop, search, filter, and manage your cart — all from your phone.

---

## What it does

- **Browse products** — scroll through a product catalog with images, prices, and descriptions
- **Search** — find products by name instantly
- **Filter & sort** — narrow results by category, price range, and sorting preference
- **Cart management** — add and remove items, adjust quantities, and review your order before checkout
- **Admin dashboard** — manage products and orders from a separate admin view
- **Authentication** — secure login and registration with JWT

## Tech Stack

**Mobile**
- React Native

**Backend**
- Node.js + Express
- MongoDB
- JWT authentication
- REST API

## Features

- Product search with real-time results
- Filter by category and price range
- Sort by price, name, or relevance
- Cart with add, remove, and quantity controls
- Order flow from cart to confirmation
- Admin panel for product and order management
- JWT-based auth with protected routes

## Running locally

```bash
# Clone the repo
git clone https://github.com/LuKzuX/ecommerce-app.git
cd ecommerce-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your MongoDB URI and JWT secret

# Start the backend
cd server && npm run dev

# Start the mobile app
cd client && npx expo start
```

## Environment Variables

```
MONGODB_URI=
JWT_SECRET=
PORT=
```

## Author

**Lucas Galli Lopes** — [github.com/LuKzuX](https://github.com/LuKzuX)
