import executeQuery from './util/queryUtils.js';


// Create a patron
export const createPatronAccount = async (pin, firstname, lastname, email, status) => {
    try {
        const addPatron = "INSERT INTO patron_account (pin, firstname, lastname, email, status) VALUES (?, ?, ?, ?, 'Active')"
        const result = await executeQuery(addPatron, [pin, firstname,lastname, email, status])
        return { message: "patron added successfully", result };
    } catch (error) {
        console.error(error);
        throw new Error('New error message', { statusCode: 404 })
    }
}

// Activate a patron account
export const activatePatronAccount = async (patronId) => {
    console.log('model triggered');
    console.log(patronId);
    
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
// export const getAllActivePatrons = async () => {
//     const query = 
//         "SELECT id, firstname, lastname, email, status " +
//         "FROM patron_account " +
//         "WHERE status = 'Active'";
//     return await executeQuery(query);
// };

// Get a list of all active patrons
export const getAllPatrons = async () => {
    const query = 
        "SELECT id, firstname, lastname, email, status " +
        "FROM patron_account "
    return await executeQuery(query);
};

// Update patron information
export const updatePatron = async (patronId, pin, firstname, lastname, email) => {
    const query = 
        "UPDATE patron_account " +
        "SET pin = ?, firstname = ?, lastname = ?, email = ?" +
        "WHERE id = ?";
    return await executeQuery(query, [pin, firstname, lastname, email, patronId]);
};