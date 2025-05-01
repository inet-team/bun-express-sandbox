// src/index.ts

import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import newsRoute from './routes/news.route';
import { AppConfig } from './configs/env.config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.send('API is running.');
});

// Routes
app.use('/api', newsRoute);

// Handle unknown routes (404)
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler (500)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.listen(AppConfig.PORT, () => {
  console.log(`Server running at http://localhost:${AppConfig.PORT}`);
});
