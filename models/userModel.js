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