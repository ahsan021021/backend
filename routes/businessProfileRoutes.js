import express from 'express';
import {
  getBusinessProfile,
  updateBusinessProfile,
} from '../controllers/businessProfileController.js';

const router = express.Router();

// Routes
router.get('/', getBusinessProfile);
router.post('/', updateBusinessProfile);

export default router;