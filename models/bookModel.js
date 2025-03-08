import executeQuery from './util/queryUtils.js';


// Find all books currently available (not checked out)
export const findAllCurrentBooks = async () => {
    const query = 
        "SELECT b.title, b.id " +
        "FROM book b " +
        "JOIN book_copy bc ON b.id = bc.bookid " + 
        "LEFT JOIN checkout c ON bc.id = c.bookcopyid AND c.is_returned = FALSE " +
        "WHERE c.id IS NULL";
    return await executeQuery(query);
};

// Find all patrons with overdue books
export const patronsWithOverDueBooks = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title, c.checkouttime, c.returnedtime " +
        "FROM checkout c " +
        "JOIN patron_account p ON c.patronaccountid = p.id " +
        "JOIN book_copy bc ON c.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "WHERE c.is_returned = FALSE AND c.checkouttime < NOW() - INTERVAL 30 DAY";
    return await executeQuery(query);
};

//Find all books currently checked out
export const currentlyCheckedOutBooks = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title, c.checkouttime " +
        "FROM checkout c " +
        "JOIN patron_account p ON c.patronaccountid = p.id " +
        "JOIN book_copy bc ON c.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "WHERE c.is_returned = FALSE" 
    return await executeQuery(query);
};