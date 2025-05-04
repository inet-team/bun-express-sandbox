// src/routes/index.ts

import { Router } from 'express';
import { getNews } from '../controllers/news.controller';

const v1Router = Router();

v1Router.get('/news', getNews);

const rootRouter = Router();
rootRouter.use('/api/v1', v1Router);

export default rootRouter;
