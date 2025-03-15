import express from 'express';
import {
    getAllBooks,
    addNewBook,
    getOverduePatrons,
    getBooksCheckedOutByPatron,
    getBooksByAuthor,
    getPatronsOnWaitList,
    getCountOfPatronsForBook
} from '../controllers/bookController.js';

const router = express.Router();

// Book Routes
router.get('/books', getAllBooks);
router.post('/addBook', addNewBook);
router.get('/overdue', getOverduePatrons);
router.get('/patron/:id', getBooksCheckedOutByPatron);
router.get('/author/:authorName', getBooksByAuthor);
router.get('/waitlist', getPatronsOnWaitList); 
router.get('/waitlist/:title', getCountOfPatronsForBook); 

export default router;
