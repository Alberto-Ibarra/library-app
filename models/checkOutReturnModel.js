import executeQuery from './util/queryUtils.js';
import mysql from "mysql2/proimise";
import {database} from "../services/database.js";

export const checkoutBook = async (bookcopyid, patronid, pin) => {
    const connection = await mysql.createConnection(database);

    try {
        await connection.beginTransaction();

        // Step 1: Check if book is available
        const [availableResults] = await connection.execute(`
            SELECT bc.*, b.title 
            FROM book_copy bc
            LEFT JOIN book b ON b.id = bc.bookid
            WHERE bc.id = ? AND bc.isavailable = TRUE
        `, [bookcopyid]);

        if (availableResults.length === 0) {
            throw new Error("Book copy is not available for checkout.");
        }

        // Step 2: Validate PIN
        const [patronResult] = await connection.execute(
            `SELECT pin FROM patron_account WHERE id = ?`, 
            [patronid]
        );

        if (patronResult.length === 0) {
            throw new Error("Patron not found.");
        }

        const storedPin = patronResult[0].pin;
        if (storedPin !== pin) {
            throw new Error("Invalid PIN.");
        }

        // Step 3: Checkout book
        await connection.execute(`
            INSERT INTO checkout (checkouttime, bookcopyid, patronaccountid, is_returned)
            VALUES (NOW(), ?, ?, FALSE)
        `, [bookcopyid, patronid]);

        // Step 4: Update book availability
        await connection.execute(`
            UPDATE book_copy
            SET isavailable = FALSE
            WHERE id = ?
        `, [bookcopyid]);

        await connection.commit();
        await connection.end();

        return { message: "Book checked out successfully" };

    } catch (error) {
        await connection.rollback();
        await connection.end();
        throw error; // This will be caught by the controller
    }
};
// export const checkoutBook = async (bookcopyid, patronid, pin) => {
//     // Step 1: Check if book is available
//     const checkAvailabilityQuery = `
//         SELECT bc.*, b.title 
//         FROM book_copy bc
//         LEFT JOIN book b ON b.id = bc.bookid
//         WHERE bc.id = ? AND bc.isavailable = TRUE
//     `;
//     const availableResults = await executeQuery(checkAvailabilityQuery, [bookcopyid]);
//     if (availableResults.length === 0) {
//         throw new Error("Book copy is not available for checkout.");
//     }

//     // Step 2: Validate PIN
//     const getPatronQuery = `SELECT pin FROM patron_account WHERE id = ?`;
//     const patronResult = await executeQuery(getPatronQuery, [patronid]);
//     if (patronResult.length === 0) {
//         throw new Error("Patron not found.");
//     }

//     const storedPin = patronResult[0].pin;
//     if (storedPin !== pin) {
//         throw new Error("Invalid PIN.");
//     }

//     // Step 3: Checkout book
//     const checkoutQuery = `
//         INSERT INTO checkout (checkouttime, bookcopyid, patronaccountid, is_returned)
//         VALUES (NOW(), ?, ?, FALSE)
//     `;
//     await executeQuery(checkoutQuery, [bookcopyid, patronid]);

//     // Step 4: Update copy availability
//     const updateCopyStatusQuery = `
//         UPDATE book_copy
//         SET isavailable = FALSE
//         WHERE id = ?
//     `;
//     await executeQuery(updateCopyStatusQuery, [bookcopyid]);

//     return { message: "Book checked out successfully" };
// };



// Return a book (mark it as returned)
export const returnBook = async (checkoutId, patronId) => {
    const query = 
        "UPDATE checkout " +
        "SET returnedtime = NOW(), is_returned = TRUE " +
        "WHERE id = ? AND patronaccountid = ?";
    return await executeQuery(query, [checkoutId, patronId]);
};