// src/routes/index.ts

import { Router } from 'express';
import { getNews, getNewsById } from '../controllers/news.controller';
import { getBanners } from '../controllers/banner.controller';

const v1Router = Router();
const rootRouter = Router();

v1Router.get('/banners', getBanners);

v1Router.get('/news', getNews);
v1Router.get('/news/:id', getNewsById);

rootRouter.use('/api/v1', v1Router);

export default rootRouter;
