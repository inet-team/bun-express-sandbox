// src/routes/index.ts

import { Router } from 'express';
import { getBanners } from '../controllers/banner.controller';
import { getNews, getNewsById } from '../controllers/news.controller';
import { getMedia } from '../controllers/media.controller';

const v1Router = Router();
const rootRouter = Router();

// Root route
rootRouter.get('/', (_req, res) => {
  res.send('API is running.');
});

// v1 routes
v1Router.get('/banners', getBanners);
v1Router.get('/news', getNews);
v1Router.get('/news/:id', getNewsById);
v1Router.get('/media', getMedia);

rootRouter.use('/api/v1', v1Router);

export default rootRouter;
