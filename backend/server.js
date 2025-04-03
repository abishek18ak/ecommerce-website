import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables at the very beginning
dotenv.config();

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure MONGO_URI is not undefined
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file.");
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit if connection fails
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(); // Connect to DB before running server
  console.log(`🚀 Server running on port ${PORT}`);
});
