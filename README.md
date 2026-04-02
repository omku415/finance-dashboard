# 💰 Finance Dashboard (MERN Stack)

A full-stack finance dashboard application built using the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates clean backend architecture, role-based access control (RBAC), and real-world data handling with a simple, functional frontend.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login using JWT
* Role-based access control:

  * **Viewer** → read-only dashboard
  * **Analyst** → dashboard + analytics (insights)
  * **Admin** → records management + user management + analytics
* Secure API access using tokens
* Protected routes (frontend + backend)

---

### 👥 User Management (Admin Only)

* Admin can:

  * Update user role (viewer / analyst / admin)
  * Activate / deactivate users
  * Delete users
* Clean service-based implementation
* Protected using role middleware

---

### 💰 Financial Records Management (Admin Only)

* Create, read, update, and delete financial records
* Fields:

  * Amount
  * Type (income / expense)
  * Category
  * Date
  * Note
* User-specific data isolation
* Protected routes (admin only)

---

### 🔍 Filtering, Search & Pagination

* Filter records by:

  * Type
  * Category
  * Date range
* Search records (category & note, case-insensitive)
* Pagination support:

  * `page`
  * `limit`

---

### 📊 Dashboard (Overview)

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent transactions

---

### 📈 Analytics (Analyst + Admin)

* Advanced financial insights
* Category-wise aggregation
* Separate analytics page (`/analytics`)
* Uses MongoDB aggregation

---

### 🛡️ Validation & Error Handling

* Input validation using Joi
* Proper error responses
* Centralized error handling
* Clean API structure

---

### 🎨 Frontend (React)

* Built using React (Vite)
* Login & Register pages
* Role-based navigation (Navbar)
* Protected routes

#### 📄 Pages

* **Dashboard** → Summary view (all users)
* **Analytics** → Insights (analyst + admin)
* **Records** → CRUD operations (admin only)
* **Admin Users** → User management (admin only)

#### ⚙️ Features

* Conditional rendering based on role
* Axios for API integration
* Token stored in localStorage

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Joi

### Frontend

* React (Vite)
* Axios
* React Router

---

## 📁 Project Structure

```
finance-dashboard/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── services/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── validations/
│       ├── utils/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── AdminUsers.jsx
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
```

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

---

### 💰 Records (Admin Only)

* GET `/api/records`
* POST `/api/records`
* PUT `/api/records/:id`
* DELETE `/api/records/:id`

---

### 📊 Dashboard

* GET `/api/dashboard`

---

### 📈 Analytics (Analyst + Admin)

* GET `/api/dashboard/analytics`

---

### 👥 Users (Admin Only)

* GET `/api/users`
* PATCH `/api/users/:id`
* DELETE `/api/users/:id`

---

## 🔑 Authentication

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔍 Query Parameters (Records API)

* `page`
* `limit`
* `type`
* `category`
* `search`
* `startDate`
* `endDate`

---

## 🧠 Design Decisions

* Clean architecture (**controller → service → model**)
* Role-based access control (RBAC)
* Middleware-based authentication & authorization
* MongoDB aggregation for analytics
* Separation of concerns (Dashboard vs Analytics)
* Modular and scalable structure

