// src/routes/index.ts

import { Router } from 'express';
import { getNews, getNewsByPublicId } from '../controllers/news.controller';
import { getMedia, getMediaByPublicId } from '../controllers/media.controller';

const v1Router = Router();
const rootRouter = Router();

rootRouter.get('/', (_req, res) => {
  res.send('API is running.');
});

// News routes           
v1Router.get('/news', getNews);                 // GET /api/v0/news
v1Router.get('/news/:id', getNewsByPublicId);   // GET /api/v0/news/:id
// Media API
v1Router.get('/media', getMedia);               // GET /api/v0/media
v1Router.get('/media/:id', getMediaByPublicId); // GET /api/v0/media/:id

rootRouter.use('/api/v0', v1Router);

export default rootRouter;
