# Task - 03: JWT Authentication with Role-based Access Control (RBAC)

This project is a backend API built with **Node.js**, **Express**, **JWT** (JSON Web Tokens), and **MongoDB**. The API implements authentication and authorization using JWTs, allowing users to register, log in, and access protected routes based on their roles (admin, user, owner). Passwords are hashed using **bcrypt** for security.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Server](#running-the-server)
- [Testing the API](#testing-the-api)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: The runtime for running the backend application. Download it from [here](https://nodejs.org/).
- **MongoDB**: A NoSQL database to store user data and JWT tokens. You can use a local MongoDB instance or a cloud provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Postman** (Optional but recommended for API testing): You can install Postman from [here](https://www.postman.com/downloads/).

---

## Project Setup

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/jwt-authentication-api.git
cd jwt-authentication-api
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

This will install the required packages such as **Express**, **jsonwebtoken**, **bcrypt**, **mongoose**, and more.

---

## Environment Variables

Create a `.env` file in the root of the project to configure the following environment variables:

```env
MONGO_URI=mongodb://your_mongo_db_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
```

- **MONGO_URI**: The MongoDB connection string.
- **PORT**: The port your server will run on (default is 8000).
- **JWT_SECRET**: A secret key used to sign JWT tokens. Make sure to keep this secret.

---

## API Endpoints

### 1. User Registration

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:

```json
{
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123"
}
```

- **Response**:

```json
{
    "message": "User registered successfully!"
}
```

### 2. User Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:

```json
{
    "email": "user1@example.com",
    "password": "password123"
}
```

- **Response**:

```json
{
    "token": "your_jwt_token"
}
```

### 3. Protecting Routes with JWT

- **URL**: `/api/profile`
- **Method**: `GET`
- **Description**: This route is protected and can only be accessed with a valid JWT token.

- **Authorization**: Bearer Token in the request header (use the token from the login response).

### 4. Role-based Access Control

- **URL**: `/api/admin`
- **Method**: `GET`
- **Description**: Only accessible by users with the role of **admin**.

- **Authorization**: Bearer Token in the request header.

---

## Running the Server

To run the server locally, follow these steps:

### 1. Start the Development Server

Run the following command:

```bash
npm start
```

This will start the server on [http://localhost:8000](http://localhost:8000).

### 2. Testing the API

You can test the API using **Postman** or any other API testing tool:

1. **Register a User**: Send a `POST` request to `/api/auth/register` with the user's details.
2. **Login**: Send a `POST` request to `/api/auth/login` with the login credentials to get the JWT token.
3. **Access Protected Routes**: Send requests to protected routes (like `/api/profile`) with the token in the `Authorization` header as `Bearer your_jwt_token`.
4. **Role-based Access**: Send requests to routes like `/api/admin` with the token, and ensure that only users with the role `admin` can access these routes.

---

## Error Handling

The API will respond with relevant HTTP status codes and messages:

- **400 Bad Request**: Invalid input data (e.g., missing or incorrect fields).
- **401 Unauthorized**: Missing or invalid JWT token.
- **403 Forbidden**: User does not have permission to access the route (e.g., role-based access control).
- **404 Not Found**: Resource not found (e.g., user or route).
- **500 Internal Server Error**: General server error.

---

## Deployment

To deploy the backend to platforms like **Heroku**, **Render**, or **Vercel**, follow the specific platform instructions for deploying a Node.js application.

Ensure that you have configured your **MONGO_URI** and **JWT_SECRET** for the production environment before deploying.

---

## Conclusion

This backend API handles user registration and login, protects routes using JWT tokens, and implements role-based access control for different user roles (admin, user). The project uses **Node.js**, **Express**, **JWT**, **bcrypt**, and **MongoDB**, and is ready to be extended with additional features like user profile management, room booking, etc.

Let me know if you need further assistance or have any questions! 😊
