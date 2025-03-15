import { listAllBookCopies,
    addBookCopy,
    removeBookCopy,
    findAvailableCopies,
    findCheckedOutCopies,
    findCopiesOnHold } from '../models/bookCopyModel.js';

// Get all book copies
export const getAllBookCopies = async (req, res) => {
    try {
        const copies = await listAllBookCopies();
        res.status(200).json(copies);
    } catch (error) {
        console.error('Error fetching book copies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add a new book copy
export const addNewBookCopy = async (req, res) => {
    try {
        const { yearPublished, bookId, bookCondition, location, isAvailable } = req.body;

        // Validate required fields
        if (!yearPublished || !bookId || !bookCondition || !location) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const validConditions = ['New', 'Good', 'Fair', 'Poor'];
        if (!validConditions.includes(bookCondition)) {
            return res.status(400).json({ message: "Invalid book condition." });
        }

        const result = await addBookCopy(yearPublished, bookId, bookCondition, location, isAvailable);

        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding new book copy:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Remove a book copy by ID
export const deleteBookCopy = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: 'Book copy ID is required.' });
        }

        const deletedCopy = await removeBookCopy(id);
        
        if (deletedCopy.affectedRows === 0) {
            return res.status(404).json({ message: 'Book copy not found.' });
        }

        res.status(200).json({ message: 'Book copy deleted successfully.' });
    } catch (error) {
        console.error('Error deleting book copy:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all currently available books (not checked out)
export const getAllAvailableCopies = async (req, res) => {
    try {
        const availableBooks = await findAvailableCopies();
        res.status(200).json(availableBooks);
    } catch (error) {
        console.error('Error fetching available books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get books currently checked out
export const getCheckedOutCopies = async (req, res) => {
    try {
        const checkedOutBooks = await findCheckedOutCopies();
        res.status(200).json(checkedOutBooks);
    } catch (error) {
        console.error('Error fetching checked-out books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all books currently on hold (with patron and copy details)
export const copiesOnHold = async (req, res) => {
    try {
        const onHoldBooks = await findCopiesOnHold();
        res.status(200).json(onHoldBooks);
    } catch (error) {
        console.error('Error fetching books on hold:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};