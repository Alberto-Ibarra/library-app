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
export const updateUser = async (id, email, firstname, lastname, role) => {
    const query = 
        "UPDATE user " +
        "SET role = ?, firstname = ?, lastname = ?, email = ?" +
        "WHERE id = ?";
    return await executeQuery(query, [id, firstname, lastname, email, role]);
};