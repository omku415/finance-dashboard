# 💰 Finance Dashboard (MERN Stack)

A full-stack finance dashboard application built using the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates clean backend architecture, role-based access control, and real-world data handling with a simple frontend for interaction.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login using JWT
* Role-based access control:

  * Viewer → read-only access
  * Analyst → read + insights
  * Admin → full access
* Secure API access using tokens

---

### 💰 Financial Records Management

* Create, read, update, and delete financial records
* Fields:

  * Amount
  * Type (income / expense)
  * Category
  * Date
  * Note
* User-specific data isolation

---

### 🔍 Filtering, Search & Pagination

* Filter records by:

  * Type
  * Category
  * Date range
* Search records (category & note, case-insensitive)
* Pagination support:

  * page
  * limit

---

### 📊 Dashboard Analytics

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent transactions

---

### 🛡️ Validation & Error Handling

* Input validation using Joi
* Proper error responses
* Clean API structure

---

### 🎨 Frontend (React)

* Built using React (Vite)
* Login & Register pages
* Protected routes
* Dashboard view:

  * Summary (income, expense, balance)
  * Category insights
* Records management:

  * Add, edit, delete records
  * Filter, search, pagination
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

```id="g7c5i9"
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
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```id="1qpgpz"
cd backend
npm install
```

Create `.env`:

```id="r90bo5"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```id="10l99s"
npm run dev
```

---

### 🔹 Frontend Setup

```id="l1pt4y"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```id="qxxg2i"
http://localhost:5173
```

---

## 📡 API Endpoints

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 💰 Records

* GET `/api/records`
* POST `/api/records`
* PUT `/api/records/:id`
* DELETE `/api/records/:id`

### 📊 Dashboard

* GET `/api/dashboard`

---

## 🔑 Authentication

All protected routes require:

```id="b9gjxj"
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔍 Query Parameters (Records API)

* page
* limit
* type
* category
* search
* startDate
* endDate

---

## 🧠 Design Decisions

* Clean architecture (controller → service → model)
* Middleware-based authentication & authorization
* MongoDB aggregation for analytics
* Modular and scalable structure
