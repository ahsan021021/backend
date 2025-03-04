import express from 'express';
import { getContacts, createContact, deleteContact } from '../controllers/contactController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.get('/', authenticateToken, getContacts);
router.post('/', authenticateToken, createContact);
router.delete('/:id', authenticateToken, deleteContact);

export default router;
