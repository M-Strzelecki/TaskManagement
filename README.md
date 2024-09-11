# Task Management App

A full-stack task management application with user authentication, profile management, and task management. This app is built with **React** for the frontend and **Node.js/Express** for the backend, using **MongoDB** for data storage.

## Features:
- User Authentication (Login, Registration)
- Profile Management (Update user information and password)
- Task Management (CRUD operations on tasks)
- User-specific tasks
- Protected routes using JWT tokens
- Welcome Dashboard after login

---

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)

---

## Technologies

**Frontend**:
- React
- React Router
- Context API
- Fetch API
- Bootstrap

**Backend**:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js

---

## Project Structure

```
TaskManagementApp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

---

## Installation

Before getting started, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

Clone the repository:

```bash
git clone https://github.com/yourusername/taskmanagement.git
cd taskmanagement
```

### Backend Setup

1. **Install Backend Dependencies**:

```bash
cd backend
npm install
```

The backend requires the following npm packages:
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mongoose`: MongoDB object modeling for Node.js.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `bcryptjs`: For hashing and comparing user passwords.
- `dotenv`: For managing environment variables.
- `cors`: Middleware for handling Cross-Origin Resource Sharing.
- `nodemon` (for development): Automatically restart the node app when file changes are detected.

2. **Create a `.env` file** in the `backend/` directory and add the following:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Replace `your_mongo_connection_string` with your actual MongoDB connection string (use **MongoDB Atlas** or your local MongoDB instance) and `your_secret_key` with a random string for JWT token signing.

---

### Frontend Setup

1. **Install Frontend Dependencies**:

```bash
cd ../frontend
npm install
```

The frontend requires the following npm packages:
- `react`: Frontend JavaScript library for building user interfaces.
- `react-dom`: React library for DOM rendering.
- `react-router-dom`: For routing and navigation between pages.
- `react-scripts`: Scripts for running and building the React app.
- `bootstrap` : Frontend UX design.

---

## Environment Variables

You will need to configure environment variables for the backend by creating a `.env` file in the `backend/` folder as mentioned in the backend setup.

Example `.env` file:

```bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Running the App

1. **Backend**:
   
   To start the backend server, run the following command inside the `backend` directory:
   
   ```bash
   npm run dev
   ```
   
   The backend should now be running on `http://localhost:5000`.

2. **Frontend**:

   To start the frontend development server, run the following command inside the `frontend` directory:
   
   ```bash
   npm start
   ```
   
   The frontend should now be running on `http://localhost:3000`.

---

## API Endpoints

### **Authentication**

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user and return a JWT token.

### **Profile Management**

- `GET /api/auth/profile`: Get the current user's profile.
- `PUT /api/auth/profile`: Update the current user's profile.

### **Task Management**

- `GET /api/tasks`: Get all tasks for the authenticated user.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task.
- `DELETE /api/tasks/:id`: Delete a task.

---

## Deployment

To deploy the app:

1. **Backend Deployment**: You can deploy the backend using services like **Heroku**, **AWS**, or **DigitalOcean**.
2. **Frontend Deployment**: Deploy the frontend using services like **Vercel** or **Netlify**.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
