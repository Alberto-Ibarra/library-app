import executeQuery from './util/queryUtils.js';


export const listAllBookCopies = async () => {
    const query = 
        "SELECT bc.*, b.title, " +
        "CASE " +
        "  WHEN bc.isavailable = FALSE THEN 'Checked Out' " +
        "  WHEN hc.bookcopyid IS NOT NULL THEN 'On Hold' " +
        "  ELSE 'Available' " +
        "END AS status " +
        "FROM book b " +
        "JOIN book_copy bc ON b.id = bc.bookid " +
        "LEFT JOIN checkout c ON bc.id = c.bookcopyid AND c.is_returned = FALSE " +
        "LEFT JOIN hold hc ON bc.id = hc.bookcopyid AND hc.endtime > NOW()";
    return await executeQuery(query);
};

// Add a new copy of a book
export const addBookCopy = async (bookId, yearPublished) => {
    const query = 
        "INSERT INTO book_copy (bookid, yearpublished) VALUES (?, ?)";
    return await executeQuery(query, [bookId, yearPublished]);
};

// Remove a copy of a book (if it’s not checked out)
export const removeBookCopy = async (bookCopyId) => {
    const query = 
        "DELETE FROM book_copy " +
        "WHERE id = ? AND NOT EXISTS (" +
        "    SELECT 1 FROM checkout WHERE bookcopyid = ? AND is_returned = FALSE" +
        ")";
    return await executeQuery(query, [bookCopyId, bookCopyId]);
};