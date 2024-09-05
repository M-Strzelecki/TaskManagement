const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

//CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
