# Task Manager

A full-stack application where users can manage their tasks. The project includes both a frontend and a backend, each residing in its own directory.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing the API with Swagger](#testing-the-api-with-swagger)
- [Unit Tests](#unit-tests)
- [License](#license)

---

## Project Overview

This is a task management app built with a **React** frontend and a **NestJS** backend. The backend is responsible for handling user authentication, task management, and serving API endpoints. The frontend interacts with the backend through HTTP requests to manage tasks (create, read, update, and delete).

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Authentication**: JWT-based authentication

---

## Tech Stack

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - Axios (for API calls)
  
- **Backend**:
  - NestJS
  - TypeORM
  - PostgreSQL
  - Passport.js (JWT Authentication)

- **Database**:
  - PostgreSQL

---

## Frontend Setup

The frontend is located in the `frontend` directory. It uses **Next.js** for React-based server-side rendering and **Tailwind CSS** for styling.

### Steps to run the frontend:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```


---

## Backend Setup

The backend is located in the `backend` directory. It uses **NestJS** with **TypeORM** to handle database operations and **JWT** for user authentication.

### Steps to run the backend:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables by creating a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Set up your PostgreSQL database credentials in `.env`.

5. Run the development server:
   ```bash
   npm run start:dev
   ```

6. The backend API will be available at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

Here are the main API endpoints for the backend:

### Authentication

- **POST** `/auth/login`: Login a user and receive a JWT token.
- **POST** `/auth/signup`: Register a new user and receive a JWT token.

### Task Management

- **GET** `/tasks`: Get all tasks for the logged-in user (requires JWT).
- **GET** `/tasks/:id`: Get a specific task by ID for the logged-in user (requires JWT).
- **POST** `/tasks`: Create a new task (requires JWT).
- **PUT** `/tasks/:id`: Update the completion status of a task (requires JWT).
- **DELETE** `/tasks/:id`: Delete a task (requires JWT).

---

## Environment Variables

The backend requires the following environment variables to run:

| Variable              | Description                            |
|-----------------------|----------------------------------------|
| `DATABASE_HOST`        | Database host (default: `localhost`)   |
| `DATABASE_PORT`        | Database port (default: `5432`)        |
| `DATABASE_USER`        | Database username                      |
| `DATABASE_PASSWORD`    | Database password                      |
| `DATABASE_NAME`        | Database name                          |
| `JWT_SECRET`           | Secret key for JWT (use a secure string)|

### Example `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=task_manager
JWT_SECRET=your-jwt-secret
```

---

## Running the Application

1. Make sure both the frontend and backend are set up.
2. Start the backend and frontend servers as described above.
3. Make API calls from the frontend, which will communicate with the backend for authentication and task management.

---

## Testing the API with Swagger

You can test the API using Swagger by following these steps:

1. Run the backend server (`npm run start:dev`).
2. Visit `http://localhost:3000/api` in your browser.
3. You will see the Swagger UI where you can explore and test all the available API endpoints interactively.

---

## Unit Tests

The backend includes unit tests to ensure that the application functions as expected.

### Running the Unit Tests

To run the unit tests for the backend, follow these steps:

1. Navigate to the `backend` directory.
2. Run the following command:
   ```bash
   npm run test
   ```

This will execute the unit tests and show the results in the terminal.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---
