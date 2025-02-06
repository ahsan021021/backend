import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} from '../controllers/leadController.js';

const router = express.Router();

/*
 * POST a new lead
 */
router.post('/leads', createLead);

/*
 * GET all leads
 */
router.get('/leads', getLeads);

/*
 * GET a single lead by ID
 */
router.get('/leads/:id', getLeadById);

/*
 * PUT to update an existing lead
 */
router.put('/leads/:id', updateLead);

/*
 * DELETE a lead
 */
router.delete('/leads/:id', deleteLead);

export default router;