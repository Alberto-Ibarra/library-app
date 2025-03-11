import express from 'express';
import { getAllCurrentBooks } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getAllCurrentBooks);

export default router;
