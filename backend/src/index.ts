import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {authRoutes} from './routes/authRoutes';
import {orderRoutes} from './routes/orderRoutes';
import {ingredientRoutes} from './routes/ingredientRoutes';
import {errorHandler} from './middlewares/errorHandler';
import {prisma} from './utils/prisma';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
// Bind to all network interfaces so your LAN IP is exposed
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', ingredientRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Pizza Store API is running!' });
});

app.use(errorHandler);

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, HOST, () => {
  console.log(`🍕 Pizza Store API is running at http://${HOST}:${PORT}/`);
  console.log(`📊 Health check: http://${HOST}:${PORT}/api/health`);
});
