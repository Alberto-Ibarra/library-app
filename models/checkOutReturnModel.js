import executeQuery from './util/queryUtils.js';
import pool from "../services/database.js";

export const checkoutBook = async (bookcopyid, patronid, pin) => {
    const connection = await pool.getConnection();

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
        connection.release();

        return { message: "Book checked out successfully" };

    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};

// Return a book (mark it as returned)
export const returnBook = async (bookcopyid) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Step 1: Find the checkout record using the bookcopyid
        const [checkoutData] = await connection.execute(
            "SELECT id, patronaccountid FROM checkout WHERE bookcopyid = ? AND is_returned = FALSE",
            [bookcopyid]
        );

        if (checkoutData.length === 0) {
            throw new Error('No active checkout record found for this book copy.');
        }

        const checkoutid = checkoutData[0].id;
        console.log(checkoutid);
        
        const patronid = checkoutData[0].patronaccountid;
        console.log(patronid);
        
        // Step 2: Update checkout record to mark as returned
        await connection.execute(
            "UPDATE checkout SET returnedtime = NOW(), is_returned = TRUE WHERE id = ? AND patronaccountid = ?",
            [checkoutid, patronid]
        );

        // Step 3: Update book availability to TRUE (book is now available)
        await connection.execute(
            "UPDATE book_copy SET isavailable = TRUE WHERE id = ?",
            [bookcopyid]
        );

        await connection.commit();
        connection.release();

        return { message: "Book returned successfully" };

    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
};


export const getPatronInfoByBookCopyId = async (bookcopyid) => {
    const connection = await pool.getConnection();

    try {
        // Join checkout, patron_account, and book info to get patron and book details
        const [results] = await connection.execute(
            `
            SELECT 
                p.id AS patronId,
                p.firstname,
                p.lastname,
                p.email,
                c.checkouttime,
                b.title,
                bc.id AS bookcopyid
            FROM checkout c
            JOIN patron_account p ON c.patronaccountid = p.id
            JOIN book_copy bc ON c.bookcopyid = bc.id
            JOIN book b ON b.id = bc.bookid
            WHERE c.bookcopyid = ? AND c.is_returned = FALSE
            `,
            [bookcopyid]
        );

        connection.release();

        if (results.length === 0) {
            throw new Error("No active checkout found for this book copy.");
        }

        return results[0];
    } catch (error) {
        connection.release();
        throw error;
    }
};
