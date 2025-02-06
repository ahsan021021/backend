import express from 'express';
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} from '../controllers/snippetController.js';

const router = express.Router();

router.post('/', createSnippet);
router.get('/', getSnippets);
router.get('/:id', getSnippetById);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);

export default router;