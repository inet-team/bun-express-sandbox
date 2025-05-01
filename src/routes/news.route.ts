// src/routes/news.route.ts

import { Router } from 'express';
import {
  getAllNews,
  getLatestNews,
  getTechnologyNews,
} from '../controllers/news.controller';

const router = Router();

router.get('/news', getAllNews);
router.get('/news/latest', getLatestNews);
router.get('/news/technology', getTechnologyNews);

export default router;
