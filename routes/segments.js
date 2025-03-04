import express from 'express';
import { getSegments, createSegment, deleteSegment } from '../controllers/segmentsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getSegments);
router.post('/', authenticateToken, createSegment);
router.delete('/:id', authenticateToken, deleteSegment);

export default router;