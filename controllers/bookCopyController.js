import { listAllBookCopies, addBookCopy, removeBookCopy } from '../models/bookCopyModel.js';

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
export const createBookCopy = async (req, res) => {
    try {
        const { bookId, yearPublished, condition } = req.body;

        if (!bookId || !yearPublished || !condition) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newCopy = await addBookCopy(bookId, yearPublished, condition);
        res.status(201).json({ message: 'Book copy added successfully.', copy: newCopy });
    } catch (error) {
        console.error('Error adding book copy:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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
