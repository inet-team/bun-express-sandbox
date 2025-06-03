// src/routes/index.ts

import { Router } from 'express';
import { getBanners } from '../controllers/banner.controller';
import { getNews, getNewsByPublicId } from '../controllers/news.controller';
import { getMedia, getMediaByPublicId } from '../controllers/media.controller';

const v1Router = Router();
const rootRouter = Router();

// Root route
rootRouter.get('/', (_req, res) => {
  res.send('API is running.');
});

// v1 routes
v1Router.get('/banners', getBanners);
v1Router.get('/news', getNews);
v1Router.get('/news/:id', getNewsByPublicId);
v1Router.get('/media', getMedia);
v1Router.get('/media/:id', getMediaByPublicId);

rootRouter.use('/api/v1', v1Router);

export default rootRouter;
