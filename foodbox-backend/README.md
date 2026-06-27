# 🍱 FoodBox Backend

Backend service for **FoodBox**, a Cloud Kitchen POS (Point of Sale) system built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

The backend powers multiple clients from a single API:

* 📱 Customer Mobile App
* 🌐 Customer Web App
* 👨‍🍳 Chef Dashboard
* 🖥️ Admin Dashboard

---

# Features

## Customer

* Browse Menu
* Place Order (Guest Checkout)
* Optional Customer Login
* View Order History *(Upcoming)*

## Chef

* View Incoming Orders
* Update Order Status
* Manage Kitchen Workflow

## Admin

* Secure JWT Authentication
* Menu Management
* Pricing Management
* Order Management
* Analytics *(Upcoming)*

---

# Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime               |
| Express.js | API Framework         |
| TypeScript | Type Safety           |
| MongoDB    | Database              |
| Mongoose   | ODM                   |
| JWT        | Authentication        |
| bcrypt     | Password Hashing      |
| Zod        | Request Validation    |
| Morgan     | Request Logging       |
| Helmet     | Security Headers      |
| CORS       | Cross-Origin Requests |

---

# Project Structure

```text
src/

├── config/
│   ├── db.ts                 # MongoDB connection
│   └── env.ts                # Environment configuration
│
├── modules/
│   ├── admin/
│   │   ├── admin.model.ts
│   │   ├── admin.controller.ts
│   │   ├── admin.service.ts
│   │   ├── admin.route.ts
│   │   ├── admin.schema.ts
│   │   └── admin.types.ts
│   │
│   ├── menu/
│   │
│   └── order/
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── error.middleware.ts
│
├── utils/
│   ├── jwt.ts
│   ├── response.ts
│   └── logger.ts
│
├── scripts/
│   └── seed-admin.ts
│
├── app.ts
└── server.ts
```

---

# Architecture

The project follows a **Module-Based Architecture** with a **Controller → Service → Database** flow.

```text
Request

↓

Route

↓

Validation Middleware (Zod)

↓

Controller

↓

Service

↓

Database (MongoDB)

↓

Controller

↓

Response
```

### Responsibilities

### Routes

* Register API endpoints
* Apply middleware
* Forward requests to controllers

### Controllers

* Receive validated requests
* Call services
* Return HTTP responses

### Services

* Business logic
* Database operations
* Authentication
* Token generation

### Models

* Define MongoDB schemas
* Validation rules
* Database interaction

### Middleware

* Authentication
* Validation
* Error handling

---

# Authentication

* JWT Authentication
* Admin-only protected APIs
* Password hashing using bcrypt
* Guest checkout for customers

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
```

---

# Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Compiles TypeScript into the `dist` folder.

```bash
npm start
```

Runs the compiled production build.

---

# Roadmap

## Phase 1

* [x] Express Setup
* [x] MongoDB Connection
* [x] TypeScript Configuration

## Phase 2

* [ ] Admin Authentication
* [ ] JWT Middleware
* [ ] Seed Admin

## Phase 3

* [ ] Menu CRUD APIs

## Phase 4

* [ ] Guest Order APIs

## Phase 5

* [ ] Chef Dashboard APIs

## Phase 6

* [ ] Analytics

---

# Design Principles

* Feature-based architecture
* Thin controllers
* Business logic inside services
* Request validation using Zod
* Reusable middleware
* Clean and maintainable codebase
* Scalable folder structure

---

Built as a learning-focused production-style backend for a Cloud Kitchen POS system.
