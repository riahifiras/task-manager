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
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

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

6. The backend API will be available at [http://localhost:3001](http://localhost:3001).

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

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to adjust any specific details based on the structure and requirements of your project!