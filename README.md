# TaskManagement
## Project Overview
This is a simple full-stack task management app built with a Node.js backend and MongoDB database. It supports creating, reading, and deleting tasks.

### Tech Stack:
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Version Control**: Git, GitHub
- **Frontend**: (Pending setup)

## Backend Setup:
1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run the Server**:
    To run the backend server, use:
    ```bash
    npm run dev
    ```

3. **Environment Variables**:
    Add a `.env` file in the `backend/` folder and include your MongoDB connection string:
    ```
    MONGO_URI=mongodb://localhost:27017/taskmanager
    ```

## API Endpoints

### Get All Tasks
```bash
GET /api/tasks