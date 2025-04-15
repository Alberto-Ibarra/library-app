import executeQuery from './util/queryUtils.js';

export const checkoutBook = async (bookCopyId, patronId) => {
    const checkAvailabilityQuery = `
        SELECT bc.*, b.title 
        FROM book_copy bc
        LEFT JOIN book b ON b.id = bc.bookid
        WHERE bc.id = ? AND bc.isavailable = TRUE
    `;

    const availableResults = await executeQuery(checkAvailabilityQuery, [bookCopyId]);

    if (availableResults.length === 0) {
        throw new Error("Book copy is not available for checkout.");
    }

    const checkoutQuery = `
        INSERT INTO checkout (checkouttime, bookcopyid, patronaccountid, is_returned)
        VALUES (NOW(), ?, ?, FALSE)
    `;
    await executeQuery(checkoutQuery, [bookCopyId, patronId]);

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