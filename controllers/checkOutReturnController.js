import { checkoutBook, returnBook } from "../models/checkOutReturnModel.js";

export const checkout = async (req, res) => {
    try {
        const {bookCopyId, patronId} = req.params
        console.log(bookCopyId);
        console.log(patronId);

        if (!bookCopyId || !patronId) {
            return res.status(400).json({ message: "Missing parameters." });
        }
        const result = await checkoutBook(bookCopyId, patronId)
        res.status(200).json({message: 'Book checked out', result})
    } catch (error) {
        console.error(error)
    }
}

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