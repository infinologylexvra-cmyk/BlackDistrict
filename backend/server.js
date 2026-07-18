const dotenv = require('dotenv');
dotenv.config(); // Run dotenv config first before importing routes/controllers

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

// Simple Health Check
app.get('/', (req, res) => {
  res.send('FineLegends API is running with MVC, Users, and Payments...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in MVC structure on port ${PORT}`);
});
