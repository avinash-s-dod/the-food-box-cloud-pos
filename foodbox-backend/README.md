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
│   ├── db.ts                    # MongoDB connection
│   └── env.ts                   # Environment configuration
│
├── middleware/
│   ├── auth.middleware.ts       # Authentication & Role Authorization
│   ├── error.middleware.ts      # Global Error Handler
│   └── validate.middleware.ts   # Request Validation
│
├── modules/
│   ├── admin/
│   │   ├── admin.controller.ts
│   │   ├── admin.model.ts
│   │   ├── admin.route.ts
│   │   ├── admin.schema.ts
│   │   ├── admin.service.ts
│   │   └── admin.types.ts
│   │
│   ├── category/
│   │   ├── category.controller.ts
│   │   ├── category.model.ts
│   │   ├── category.route.ts
│   │   ├── category.schema.ts
│   │   ├── category.service.ts
│   │   └── category.types.ts
│   │
│   ├── menu/
│   │   ├── menu.controller.ts
│   │   ├── menu.model.ts
│   │   ├── menu.route.ts
│   │   ├── menu.schema.ts
│   │   ├── menu.service.ts
│   │   └── menu.types.ts
│   │
│   └── order/
│       ├── order.controller.ts
│       ├── order.model.ts
│       ├── order.route.ts
│       ├── order.schema.ts
│       ├── order.service.ts
│       └── orders.types.ts
│
├── scripts/
│   ├── admin.seed.ts
│   └── category.seed.ts
│
├── types/
│   └── express.d.ts             # Express Request type extensions
│
├── utils/
│   └── jwt.ts
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

* [x] Admin Authentication
* [x] JWT Middleware
* [x] Seed Admin
* [x] Admin Login/Profile API

## Phase 3

* [x] Category CRUD APIs
* [x] Seed Categories
* [x] Menu CRUD APIs

## Phase 4

* [x] Order APIs
* [x] Order Management
* [x] Order Status Management
* [x] Order Cancellation

## Phase 5

* [x] Common Utilities
* [x] API Features
* [x] Request Validation
* [x] Guest Order Improvements
* [x] Refactor Existing Modules

## Phase 6

* [x] Pagination & Response Improvements
* [x] Standard API Response Structure
* [x] Apply Pagination Across List APIs

## Phase 7

* [x] Customer APIs
* [x] Customer Authentication
* [x] Customer Profile
* [x] Order History

## Phase 8

* [ ] Settings Module
* [ ] Delivery Charge
* [ ] Restaurant Information
* [ ] Opening Hours
* [ ] Future Configuration

## Phase 9

* [ ] Swagger / OpenAPI Documentation

## Phase 10

* [ ] Production Readiness
* [ ] Logging
* [ ] Security Review
* [ ] Error Handling Review
* [ ] API Testing
* [ ] Environment / Configuration Review

## Phase 11

* [ ] Invoice / Billing
* [ ] Invoice PDF Download

# Design Principles

* Feature-based architecture
* Thin controllers
* Business logic inside services
* Request validation using Zod
* Reusable middleware
* Clean and maintainable codebase
* Scalable folder structure

---

Built as a production-style backend for a Cloud Kitchen POS system.
