import express from 'express';
import {
  createMessage,
  getMessagesByConversationId,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:conversationId', getMessagesByConversationId);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;