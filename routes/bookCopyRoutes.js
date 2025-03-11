import express from 'express';
import { getAllBookCopies, createBookCopy, deleteBookCopy } from '../controllers/bookCopyController.js';

const router = express.Router();

// Get all book copies
router.get('/copies', getAllBookCopies);

// Add a new book copy
router.post('/copies', createBookCopy);

// Delete a book copy by ID
router.delete('/copies/:id', deleteBookCopy);

export default router;
