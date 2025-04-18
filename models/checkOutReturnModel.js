import executeQuery from './util/queryUtils.js';

export const checkoutBook = async (bookcopyid, patronid, pin) => {
    // Step 1: Check if book is available
    const checkAvailabilityQuery = `
        SELECT bc.*, b.title 
        FROM book_copy bc
        LEFT JOIN book b ON b.id = bc.bookid
        WHERE bc.id = ? AND bc.isavailable = TRUE
    `;
    const availableResults = await executeQuery(checkAvailabilityQuery, [bookcopyid]);
    if (availableResults.length === 0) {
        throw new Error("Book copy is not available for checkout.");
    }

    // Step 2: Validate PIN
    const getPatronQuery = `SELECT pin FROM patron_account WHERE id = ?`;
    const patronResult = await executeQuery(getPatronQuery, [patronid]);
    if (patronResult.length === 0) {
        throw new Error("Patron not found.");
    }

    const storedPin = patronResult[0].pin;
    if (storedPin !== pin) {
        throw new Error("Invalid PIN.");
    }

    // Step 3: Checkout book
    const checkoutQuery = `
        INSERT INTO checkout (checkouttime, bookcopyid, patronaccountid, is_returned)
        VALUES (NOW(), ?, ?, FALSE)
    `;
    await executeQuery(checkoutQuery, [bookcopyid, patronid]);

    // Step 4: Update copy availability
    const updateCopyStatusQuery = `
        UPDATE book_copy
        SET isavailable = FALSE
        WHERE id = ?
    `;
    await executeQuery(updateCopyStatusQuery, [bookCopyId]);

    return { message: "Book checked out successfully" };
};



// Return a book (mark it as returned)
export const returnBook = async (checkoutId, patronId) => {
    const query = 
        "UPDATE checkout " +
        "SET returnedtime = NOW(), is_returned = TRUE " +
        "WHERE id = ? AND patronaccountid = ?";
    return await executeQuery(query, [checkoutId, patronId]);
};