import { createPatronAccount,
    activatePatronAccount, 
    suspendPatronAccount, 
    // getAllActivePatrons,
    updatePatron,
    getAllPatrons
} from "../models/patronAccountModel.js";

export const addNewPatron = async (req, res) => {
    try {
        const {pin, firstname, lastname, email, status} = req.body

        if (!pin?.trim() || !firstname?.trim() || !lastname?.trim() || !email?.trim()) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const patron = await createPatronAccount(pin, firstname, lastname, email, status)
        res.status(200).json(patron)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const activatePatron = async (req, res)=> {
    try {
        const {id} = req.params
        const active = await activatePatronAccount(id)
        res.status(200).json(active)
    } catch (error) {
        console.error(error)
    }
}

export const suspendPatron = async (req, res) => {
    try {
        const {id} = req.params
        const suspend = await suspendPatronAccount(id)
        res.status(200).json({message: "Account suspended"})
    } catch (error) {
        console.error(error)
    }
}

// export const allActivePatrons = async (req, res) => {
//     try {
//         const result = await getAllActivePatrons()
//         res.status(200).json(result)
//     } catch (error) {
//         console.error(error)
//     }
// }

export const allPatrons = async (req, res) => {
    try {
        const result = await getAllPatrons()
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}

export const updateP = async (req, res) => {
    try {
        const {pin, firstname, lastname, email} = req.body
        const {id} = req.params

        if (!pin?.trim() || !firstname?.trim() || !lastname?.trim() || !email?.trim()) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const updateResult = await updatePatron(id, pin, firstname, lastname, email)
        res.status(200).json({message: "Patron updated"})
    } catch (error) {
        console.error(error)
    }
}