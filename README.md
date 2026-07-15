# 🚀 JWT Authentication Employee Management System

A full-stack Employee Management System built using **Node.js**, **Express.js**, and **MySQL**, featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, **Password Hashing**, **Audit Logging**, and secure REST APIs.

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
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    role VARCHAR(20)
);
```

Example Employees Table:

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10,2)
);
```

Example Audit Logs Table:

```sql
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔑 Authentication Flow

### Register

```text
User → Register
      ↓
Password Hashed
      ↓
Stored in Database
```

### Login

```text
User Login
      ↓
Password Verification
      ↓
JWT Generated
      ↓
Token Sent to Client
```

### Access Protected API

```text
Client Request
      ↓
Authorization Header
      ↓
JWT Verification
      ↓
Route Access Granted
```

---

# 📬 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|-----------|-------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |

---

## Employees

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | /employees | Get All Employees |
| GET | /employees/:id | Get Employee |
| POST | /employees | Create Employee |
| PUT | /employees/:id | Update Employee |
| DELETE | /employees/:id | Delete Employee |

---

## Audit Logs

| Method | Endpoint | Description |
|----------|-----------|-------------|
| GET | /audit-logs | Get Audit Logs |

---

# 🔒 Protected API Example

```http
Authorization: Bearer <jwt_token>
```

Example:

```javascript
fetch("http://localhost:5000/employees", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

# 📈 Learning Outcomes

This project helps developers understand:

- Authentication vs Authorization
- JWT Implementation
- Password Hashing
- Middleware Architecture
- REST API Design
- MySQL Relationships
- Secure Backend Development
- Audit Logging Concepts
- Enterprise Application Structure

---

# 🚀 Future Enhancements

- Refresh Tokens
- Email Verification
- Forgot Password Feature
- Pagination
- Search & Filtering
- Docker Support
- Swagger API Documentation
- Unit Testing
- CI/CD Pipeline
- Cloud Deployment

---

# 👨‍💻 Author

**Vishnu Karthik Ravichandran**

Associate Developer  
Coimbatore, Tamil Nadu, India

GitHub:
https://github.com/vishnukarthikr

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

📢 Share with others

---

## 📄 License

This project is intended for learning and educational purposes.
