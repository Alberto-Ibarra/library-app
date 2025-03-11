import { findAllCurrentBooks } from '../models/bookModel.js';

export const getAllCurrentBooks = async (req, res) => {
    try {
        const books = await findAllCurrentBooks();
        res.status(200).json(books);  // Send response to client
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
