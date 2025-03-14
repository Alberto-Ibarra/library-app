import executeQuery from './util/queryUtils.js';


// Create a patron
export const createPatronAccount = async (pin, firstname, lastname, email, status) => {
    try {
        console.log('model');
        
        const addPatron = "INSERT INTO patron_account (pin, firstname, lastname, email, status) VALUES (?, ?, ?, ?, ?)"
        const result = await executeQuery(addPatron, [pin, firstname,lastname, email, status])
        return { message: "patron added successfully", result };
    } catch (error) {
        console.error(error);
        throw new Error('New error message', { statusCode: 404 })
    }
}

// Activate a patron account
export const activatePatronAccount = async (patronId) => {
    const query = 
        "UPDATE patron_account " +
        "SET status = 'Active' " +
        "WHERE id = ?";
    return await executeQuery(query, [patronId]);
};

// Suspend a patron account
export const suspendPatronAccount = async (patronId) => {
    const query = 
        "UPDATE patron_account " +
        "SET status = 'Suspended' " +
        "WHERE id = ?";
    return await executeQuery(query, [patronId]);
};

// Get a list of all active patrons
export const getAllActivePatrons = async () => {
    const query = 
        "SELECT firstname, lastname, email " +
        "FROM patron_account " +
        "WHERE status = 'Active'";
    return await executeQuery(query);
};

// Update patron information (e.g., email change)
export const updatePatronEmail = async (patronId, newEmail) => {
    const query = 
        "UPDATE patron_account " +
        "SET email = ? " +
        "WHERE id = ?";
    return await executeQuery(query, [newEmail, patronId]);
};