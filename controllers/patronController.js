import { createPatronAccount } from "../models/patronAccountModel.js";

export const addNewPatron = async (req, res) => {
    try {
        console.log('controller');
        
        const {pin, firstname, lastname, email, status} = req.body
        const patron = await createPatronAccount(pin, firstname, lastname, email, status)
        res.status(200).json(patron)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}