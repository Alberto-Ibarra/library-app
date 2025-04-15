import { checkoutBook, returnBook } from "../models/checkOutReturnModel.js";

export const checkout = async (req, res) => {
    try {
        const { bookCopyId, patronId } = req.params;

        if (!bookCopyId || !patronId) {
            return res.status(400).json({ message: "Missing parameters." });
        }

        const result = await checkoutBook(bookCopyId, patronId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "Checkout failed." });
    }
};


export const returnB = async (req, res) => {
    try {
        const {checkOutId, patronId} = req.params

        if (!checkOutId || !patronId) {
            return res.status(400).json({ message: "Missing parameters." });
        }
        const result = await(returnBook(checkOutId, patronId))
        const now = new Date();
        res.status(200).json({message: 'Book returned: ' + now})
    } catch (error) {
        console.error(error)
    }
}