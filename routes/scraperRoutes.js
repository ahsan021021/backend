// backend/routes/scraperRoutes.js
import express from 'express';
import scraperController from '../controllers/scraperController.js';

const router = express.Router();

router.post('/scrape', scraperController.scrape);
router.post('/export', scraperController.exportToCSV);
router.get('/history', scraperController.getCSVHistory);
router.delete('/history/:id', scraperController.deleteCSVHistory);

export default router;