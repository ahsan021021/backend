import express from 'express';
import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  sendCampaignEmails,
  setCampaignToDraft
} from '../controllers/campaignsController.js';

import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getCampaigns);
router.post('/', authenticateToken, createCampaign);
router.put('/:id', authenticateToken, updateCampaign);
router.delete('/:id', authenticateToken, deleteCampaign);
router.post('/:id/send', authenticateToken, sendCampaignEmails);
router.patch('/:id/draft', authenticateToken, setCampaignToDraft);

export default router;