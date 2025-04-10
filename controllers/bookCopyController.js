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
        const { yearpublished, bookid, bookcondition, location, isavailable } = req.body;
        console.log('Received Data:', { bookid, bookcondition, location, isavailable });

        // Trim and validate the book condition
        const bookconditionTrimmed = bookcondition.trim();
        console.log('1');
        
        // Validate required fields
        if (!bookid || !bookconditionTrimmed || !location) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        console.log('2');

        // Validate book condition
        const validConditions = ['New', 'Good', 'Fair', 'Poor'];
        if (!validConditions.includes(bookconditionTrimmed)) {
            return res.status(400).json({ message: "Invalid book condition." });
        }
        console.log('3');

        const result = await addBookCopy(yearpublished, bookid, bookconditionTrimmed, location, isavailable);
        console.log('4');

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