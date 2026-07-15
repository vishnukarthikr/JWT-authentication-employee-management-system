# 🚀 JWT Authentication Employee Management System

A full-stack Employee Management System built using **Node.js**, **Express.js**, and **MySQL**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, **Password Hashing**, **Audit Logging**, and secure REST APIs. 【1-d89cf3】

---

## 📖 Overview

This project demonstrates how a modern enterprise application manages:

- ✅ User Registration & Login
- ✅ JWT-Based Authentication
- ✅ Password Hashing using bcrypt
- ✅ Protected REST APIs
- ✅ Employee Management (CRUD)
- ✅ Role-Based Access Control (Admin/User)
- ✅ Audit Logging for API Activities
- ✅ MySQL Database Integration
- ✅ Secure Middleware Implementation

The application serves as a practical learning project for understanding backend development, authentication mechanisms, authorization, database operations, and API security.

---

# 🏗️ System Architecture

```text
Frontend UI
     │
     ▼
 Express Server
     │
 ├── Authentication Routes
 ├── Employee Routes
 ├── Audit Log Routes
 ├── JWT Middleware
 └── Role Middleware
     │
     ▼
   MySQL Database
```

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Token Generation
- JWT Token Validation
- Secure Route Protection
- Logout Support

## 👤 User Management

- Create Users
- Store Hashed Passwords
- Role Assignment
- User-Based Authorization

## 👨‍💼 Employee Management

- Create Employee
- View Employees
- Update Employee Details
- Delete Employee Records
- Search and Filter Employees

## 🛡️ Security

- Password Hashing with bcrypt
- JWT Authentication
- Protected Routes
- Middleware Validation
- Role-Based Access Control

## 📋 Audit Logging

- Tracks API Activities
- Stores Request Information
- Records User Actions
- Provides Accountability

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MySQL

## Authentication & Security

- JSON Web Token (JWT)
- bcryptjs

## Utilities

- dotenv
- cors
- nodemon

---

# 📂 Project Structure

```text
JWT-authentication-employee-management-system
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
│   └── auditController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   └── auditRoutes.js
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/vishnukarthikr/JWT-authentication-employee-management-system.git
```

```bash
cd JWT-authentication-employee-management-system
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_management

JWT_SECRET=your_super_secret_key
```

---

## 4. Start MySQL

Ensure MySQL Server is running.

---

## 5. Run the Application

```bash
npm start
```

or

```bash
nodemon server.js
```

---

# 🗄️ Database Setup

Create a database:

```sql
CREATE DATABASE employee_management;
```

Example Users Table:

```sql
CREATE TABLE users (
