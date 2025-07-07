import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import {Server as IOServer} from 'socket.io';

import {authRoutes} from './routes/authRoutes';
import {orderRoutes} from './routes/orderRoutes';
import {ingredientRoutes} from './routes/ingredientRoutes';
import {errorHandler} from './middlewares/errorHandler';
import {prisma} from './utils/prisma';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || '*',
  })
);
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', orderRoutes);
app.use('/api', ingredientRoutes);

app.get('/api/health', (_req, res) =>
  res.json({ status: 'OK', message: 'Pizza Store API is running!' })
);

app.use(errorHandler);

const server = http.createServer(app);

const io = new IOServer(server, {
  path: '/pizza',
  cors: { origin: process.env.FRONTEND_ORIGIN || '*' },
});

io.on('connection', (socket) => {
  console.log('📶 Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

app.set('io', io);

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully…');
  await prisma.$disconnect();
  process.exit(0);
});

server.listen(PORT, HOST, () => {
  console.log(`🍕 API + Socket.IO listening at http://${HOST}:${PORT}/`);
  console.log(`📊 Health check:       http://${HOST}:${PORT}/api/health`);
});
