import express from 'express';
import {
    getAllBooks,
    addNewBook,
    getAllCurrentBooks,
    getOverduePatrons,
    getCheckedOutBooks,
    getBooksCheckedOutByPatron,
    getBooksByAuthor,
    getBooksOnHold,
    getPatronsOnWaitList,
    getCountOfPatronsForBook
} from '../controllers/bookController.js';

const router = express.Router();

// Book Routes
router.get('/books', getAllBooks);                        // Get all books
router.post('/addBook', addNewBook);
router.get('/available', getAllCurrentBooks);        // Get available books (not checked out)
router.get('/overdue', getOverduePatrons);           // Get patrons with overdue books
router.get('/checked-out', getCheckedOutBooks);      // Get books currently checked out
router.get('/patron/:id', getBooksCheckedOutByPatron); // Get number of books checked out by a patron
router.get('/author/:authorName', getBooksByAuthor); // Get books by a specific author
router.get('/on-hold', getBooksOnHold);              // Get all books on hold
router.get('/waitlist', getPatronsOnWaitList);       // Get patrons on waitlist
router.get('/waitlist/:title', getCountOfPatronsForBook); // Get the count of patrons for a specific book

export default router;
