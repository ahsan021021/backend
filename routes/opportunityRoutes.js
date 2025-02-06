import express from 'express';
import { createOpportunity, getOpportunities, updateOpportunity, deleteOpportunity } from '../controllers/opportunityController.js';

const router = express.Router();

router.post('/', createOpportunity);
router.get('/', getOpportunities);
router.put('/:id', updateOpportunity);
router.delete('/:id', deleteOpportunity);

export default router;