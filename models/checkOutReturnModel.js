import executeQuery from './util/queryUtils.js';

// Checkout a book (set the book as checked out)
export const checkoutBook = async (bookCopyId, patronId) => {
    const query = 
        "INSERT INTO checkout (checkouttime, bookcopyid, patronaccountid, is_returned) " +
        "VALUES (NOW(), ?, ?, FALSE)";
    return await executeQuery(query, [bookCopyId, patronId]);
};

// Return a book (mark it as returned)
export const returnBook = async (checkoutId, patronId) => {
    const query = 
        "UPDATE checkout " +
        "SET returnedtime = NOW(), is_returned = TRUE " +
        "WHERE id = ? AND patronaccountid = ?";
    return await executeQuery(query, [checkoutId, patronId]);
};