import express from 'express';
import { getCsvHistory } from '../controllers/csvHistoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/csv-history', protect, getCsvHistory);

export default router;