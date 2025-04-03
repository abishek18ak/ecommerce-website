import mongoose from 'mongoose';
import { sampleProducts } from './data/products.js';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

const importData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Sample products imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

importData();