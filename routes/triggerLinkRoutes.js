import express from 'express';
import {
  createTriggerLink,
  getTriggerLinks,
  getTriggerLinkById,
  updateTriggerLink,
  deleteTriggerLink,
} from '../controllers/triggerLinkController.js';

const router = express.Router();

router.post('/', createTriggerLink);
router.get('/', getTriggerLinks);
router.get('/:id', getTriggerLinkById);
router.put('/:id', updateTriggerLink);
router.delete('/:id', deleteTriggerLink);

export default router;