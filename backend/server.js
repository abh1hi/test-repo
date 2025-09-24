// File: backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Import only the required routes
const authRoutes = require('./routes/authRoutes');

const { errorHandler } = require('./middleware/errorMiddleware');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; // Will be read from .env

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// --- Routes ---
// Using only the authentication routes for the streamlined application.
// Other routes like influencers, campaigns, and payments have been removed.
app.use('/api/auth', authRoutes);


// Test protected route
app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({ message: `Hello, ${req.user.name}! Access granted.` });
});

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

