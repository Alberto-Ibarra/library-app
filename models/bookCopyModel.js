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

// Add a new book copy
export const addBookCopy = async (bookid, bookcondition, location, isAvailable = true) => {
    try {
        const copyQuery = `
            INSERT INTO book_copy (bookid, bookcondition, location, isavailable) 
            VALUES (?, ?, ?, ?)`;
        
        const result = await executeQuery(copyQuery, [bookid, bookcondition, location, isAvailable]);
        
        return { message: "Book copy added successfully", copyId: result.insertId };
    } catch (error) {
        console.error("Error adding book copy:", error);
        throw error;
    }
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

// Find all books currently available (not checked out)
export const findAvailableCopies = async () => {
    console.log('triggered');
    const query = 
        "SELECT b.title, b.id " +
        "FROM book b " +
        "JOIN book_copy bc ON b.id = bc.bookid " + 
        "LEFT JOIN checkout c ON bc.id = c.bookcopyid AND c.is_returned = FALSE " +
        "WHERE c.id IS NULL";
    return await executeQuery(query);
};

//Find all books currently checked out
export const findCheckedOutCopies = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title, c.checkouttime " +
        "FROM checkout c " +
        "JOIN patron_account p ON c.patronaccountid = p.id " +
        "JOIN book_copy bc ON c.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "WHERE c.is_returned = FALSE" 
    return await executeQuery(query);
};

//Get all books on hold (including the patron and copy details)
export const findCopiesOnHold = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title, h.starttime, bc.yearpublished " +
        "FROM hold h " +
        "JOIN book_copy bc ON h.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "JOIN patron_account p ON h.patronaccountid = p.id "
    return await executeQuery(query);
};