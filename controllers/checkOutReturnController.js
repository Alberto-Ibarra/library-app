import { checkoutBook, returnBook } from "../models/checkOutReturnModel.js";

export const checkout = async (req, res) => {
    try {
        const { bookcopyid, patronid, pin } = req.body;
        
        if (!bookcopyid || !patronid || !pin) {
            return res.status(400).json({ message: "Missing parameters." });
        }

        const result = await checkoutBook(bookcopyid, patronid, pin);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "Checkout failed." });
    }
};

export const returnB = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('book return triggered');
        console.log(id);
        
        if (!id) {
            return res.status(400).json({ message: "Missing parameters." });
        }

        const result = await returnBook(id);
        console.log(result);

        res.status(200).json({ message: `Book returned successfully at ${new Date().toLocaleString()}` });
    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        res.status(500).json({ message: "Failed to return the book. Please try again later." });
    }
};
