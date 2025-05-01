// src/index.ts

import express from 'express';
import newsRoute from './routes/news.route';
import { AppConfig } from './configs/env.config';

const app = express();

app.use(express.json());
app.use('/api', newsRoute);

app.listen(AppConfig.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${AppConfig.PORT}`);
});
