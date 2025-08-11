import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const proorigin = process.env.CLIENT_ORIGIN;

// Middleware
app.use(cors({ origin: [proorigin, 'http://localhost:5173'], credentials: true }));
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('API is running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

// Start server after DB connection
const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
