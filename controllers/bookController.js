import {
    allBooks,
    addBook,
    patronsWithOverDueBooks,
    booksCheckedOutByPatron,
    booksByAuthor,
    patronsOnWaitList,
    countOfPatronsForABook
} from '../models/bookModel.js';

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await allBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching all books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add a new book
export const addNewBook = async (req, res) => {
    try {
        console.log(req.body); 
        const { title, authorNames, categoryId } = req.body;
        const result = await addBook(title, authorNames, categoryId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error adding new book:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get patrons with overdue books
export const getOverduePatrons = async (req, res) => {
    try {
        const overduePatrons = await patronsWithOverDueBooks();
        res.status(200).json(overduePatrons);
    } catch (error) {
        console.error('Error fetching overdue patrons:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the number of books checked out by a specific patron
export const getBooksCheckedOutByPatron = async (req, res) => {
    try {
        const { id } = req.params;
        const booksCount = await booksCheckedOutByPatron(id);
        res.status(200).json(booksCount);
    } catch (error) {
        console.error('Error fetching books checked out by patron:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a list of books by a specific author
export const getBooksByAuthor = async (req, res) => {
    try {
        const { authorName } = req.params;
        const books = await booksByAuthor(authorName);
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all patrons on the waitlist for a book
export const getPatronsOnWaitList = async (req, res) => {
    try {
        const waitList = await patronsOnWaitList();
        res.status(200).json(waitList);
    } catch (error) {
        console.error('Error fetching patrons on waitlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the count of patrons waiting for a specific book
export const getCountOfPatronsForBook = async (req, res) => {
    try {
        const { title } = req.params;
        const count = await countOfPatronsForABook(title);
        res.status(200).json(count);
    } catch (error) {
        console.error('Error fetching waitlist count for book:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
