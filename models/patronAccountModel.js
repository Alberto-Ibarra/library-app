import executeQuery from './util/queryUtils.js';


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