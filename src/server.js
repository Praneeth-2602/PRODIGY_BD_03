// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import MongoDB connection
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON request bodies

// Authentication routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB().then(() => {
    // Start the server after MongoDB connection is established
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT || 8000}`);
    });
});
