import express from 'express';
import { getOpportunities, createOpportunity, getOpportunity, updateOpportunity, deleteOpportunity } from '../controllers/opportunityController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.get('/', authenticateToken, getOpportunities);
router.post('/', authenticateToken, createOpportunity);
router.get('/:id', authenticateToken, getOpportunity);
router.put('/:id', authenticateToken, updateOpportunity);
router.delete('/:id', authenticateToken, deleteOpportunity);

export default router;
