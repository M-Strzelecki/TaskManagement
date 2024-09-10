const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS before defining any routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/tasks', taskRoutes); // Task routes

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
