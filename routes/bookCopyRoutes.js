import express from 'express';
import { getAllBookCopies, addNewBookCopy, deleteBookCopy } from '../controllers/bookCopyController.js';

const router = express.Router();

// Get all book copies
router.get('/copies', getAllBookCopies);

// Add a new book copy
router.post('/copies', addNewBookCopy);

// Delete a book copy by ID
router.delete('/copies/:id', deleteBookCopy);

export default router;
