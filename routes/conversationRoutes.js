import express from 'express';
import {
  createConversation,
  getConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
} from '../controllers/conversationController.js';

const router = express.Router();

router.post('/', createConversation);
router.get('/', getConversations);
router.get('/:id', getConversationById);
router.put('/:id', updateConversation);
router.delete('/:id', deleteConversation);

export default router;