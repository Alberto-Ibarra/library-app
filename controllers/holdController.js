import { placeHoldOnBook, cancelHold } from "../models/holdModel.js";

export const placeHold = async (req,res) => {
    try {
        const {bookCopyId, patronId} = req.params
        const result = await placeHoldOnBook(bookCopyId, patronId)
        res.status(200).json({message: 'Book is on hold for ' + patronId})
    } catch (error) {
        console.error(error)
    }
}

export const cancelBookHold = async (req,res) => {
    try {
        const {holdId, patronId} = req.params
        const result = await cancelHold(holdId, patronId)
        console.log(result)
        res.status(200).json({message: 'Hold canceled'})
    } catch (error) {
        console.error(error)
    }
}