import executeQuery from "./util/queryUtils.js";
import bcrypt from 'bcrypt'

export const allUsers = async () => {
    const query = "select * from user"
    return await executeQuery(query);
}

export const registerUser = async (email, password, role, firstname, lastname) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO user (email, password, role, firstname, lastname) " +
                    "VALUES(?, ?, ?, ?, ?)"
    return await executeQuery(query, [email, hashedPassword, role, firstname, lastname]);
}

// Find user by email
export const findUserByEmail= async (email) => {
    const query = "SELECT * FROM user WHERE email = ?";
    const result = await executeQuery(query, [email]);
    return result.length > 0 ? result[0] : null;
};

// Update user
export const updateUser = async (id, role, firstname, lastname, email) => {
    const query = 
        "UPDATE user SET role = ?, firstname = ?, lastname = ?, email = ? WHERE id = ?";

    // Ensure id is a number
    const numericId = parseInt(id, 10);

    console.log("Executing query with values:", [role, firstname, lastname, email, numericId]);

    return await executeQuery(query, [role, firstname, lastname, email, numericId]);
};



