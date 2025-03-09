import executeQuery from './util/queryUtils.js';

// Get the total number of books checked out by all patrons
export const getTotalCheckedOutBooks = async () => {
    const query = 
        "SELECT COUNT(*) AS total_checked_out " +
        "FROM checkout " +
        "WHERE is_returned = FALSE";
    return await executeQuery(query);
};

// List books that have been checked out the most (top 5)
export const getTopCheckedOutBooks = async () => {
    const query = 
        "SELECT b.title, COUNT(c.id) AS checkout_count " +
        "FROM checkout c " +
        "JOIN book_copy bc ON c.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "GROUP BY b.id " +
        "ORDER BY checkout_count DESC " +
        "LIMIT 5";
    return await executeQuery(query);
};

// Find patrons with the most books checked out
export const getPatronsWithMostBooks = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, COUNT(c.id) AS checked_out_count " +
        "FROM checkout c " +
        "JOIN patron_account p ON c.patronaccountid = p.id " +
        "WHERE c.is_returned = FALSE " +
        "GROUP BY p.id " +
        "ORDER BY checked_out_count DESC";
    return await executeQuery(query);
};