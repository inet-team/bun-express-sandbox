// src/routes/index.ts

import { Router } from 'express';
import {
  getAllNews,
  getLatestNews,
  getTechnologyNews,
} from '../controllers/news.controller';

const v1Router = Router();

v1Router.get('/news', getAllNews);
v1Router.get('/news/latest', getLatestNews);
v1Router.get('/news/technology', getTechnologyNews);

const rootRouter = Router();
rootRouter.use('/api/v1', v1Router);

export default rootRouter;
