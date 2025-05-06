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
export const addBookCopy = async (bookid, bookcondition, location, isavailable = true) => {
    try {
        console.log('from model ');
        console.log('Book condition: ' + bookcondition);
        
        const copyQuery = `
            INSERT INTO book_copy (bookid, bookcondition, location, isavailable) 
            VALUES (?, ?, ?, ?)`;
        
        const result = await executeQuery(copyQuery, [bookid, bookcondition, location, isavailable]);
        
        return { message: "Book copy added successfully", copyId: result.insertId };
    } catch (error) {
        console.error("Error adding book copy:", error);
        throw error;
    }
};

// Edit a book copy
export const editBookCopy = async (id, bookcondition, location) => {
    try {
        const query = `
            UPDATE book_copy
            SET bookcondition = ?, location = ?
            WHERE id = ?
        `;
        await executeQuery(query, [bookcondition, location, id]);
        return { message: "Book copy updated successfully" };
    } catch (error) {
        console.error("Error updating book copy:", error);
        throw error;
    }
};

export const removeBookCopy = async (bookCopyId) => {
    // First check if the book copy is currently checked out
    const checkQuery = "SELECT 1 FROM checkout WHERE bookcopyid = ? AND is_returned = FALSE";
    const checkResult = await executeQuery(checkQuery, [bookCopyId]);

    if (checkResult.length > 0) {
        throw new Error("Cannot delete book copy. It is currently checked out.");
    }

    // Delete any returned checkout history related to the book copy (optional but required for FK)
    const deleteHistoryQuery = "DELETE FROM checkout WHERE bookcopyid = ? AND is_returned = TRUE";
    await executeQuery(deleteHistoryQuery, [bookCopyId]);

    // Now delete the book copy
    const deleteBookCopyQuery = "DELETE FROM book_copy WHERE id = ?";
    return await executeQuery(deleteBookCopyQuery, [bookCopyId]);
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

export const findSingleBookWithDetails = async (bookCopyId) => {
    const query = `
        SELECT 
            b.title AS book_title,
            GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
            c.title AS category,
            bc.id AS bookcopyid,
            bc.bookcondition,
            bc.yearpublished,
            bc.location,
            bc.isavailable,
            CASE 
                WHEN co.id IS NOT NULL AND co.is_returned = FALSE THEN 'Checked Out'
                WHEN h.id IS NOT NULL AND h.endtime > NOW() THEN 'On Hold'
                ELSE 'Available'
            END AS status,

            -- Patron info if checked out
            pa.id AS patronid,
            pa.firstname,
            pa.lastname,
            pa.email,
            co.checkouttime,
            co.returnedtime,

            -- Hold info
            h.starttime AS hold_start,
            h.endtime AS hold_end

        FROM book_copy bc
        JOIN book b ON bc.bookid = b.id
        LEFT JOIN book_author ba ON b.id = ba.bookid
        LEFT JOIN author a ON ba.authorid = a.id
        LEFT JOIN category c ON b.categoryid = c.id
        LEFT JOIN checkout co ON bc.id = co.bookcopyid AND co.is_returned = FALSE
        LEFT JOIN patron_account pa ON co.patronaccountid = pa.id
        LEFT JOIN hold h ON bc.id = h.bookcopyid AND h.endtime > NOW()

        WHERE bc.id = ?
        GROUP BY bc.id, co.id, pa.id, h.id;
    `;

    return await executeQuery(query, [bookCopyId]);
};
