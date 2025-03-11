import executeQuery from './util/queryUtils.js';


//find all books
export const allBooks = async () => {
    const query = "SELECT * FROM book";
    return await executeQuery(query);
}

// Find all books currently available (not checked out)
export const findAllCurrentBooks = async () => {
    console.log('triggered');
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

//Get the number of books checked out by a patron
export const booksCheckedOutByPatron = async () => {
    const query = 
        "SELECT COUNT(c.id) AS checked_out_books " +
        "FROM checkout c " +
        "WHERE c.patronaccountid = 1 AND c.is_returned = FALSE " 
    return await executeQuery(query);
};

//List of books by author
export const booksByAuthor = async () => {
    const query = 
        "SELECT b.title, a.name AS author_name " +
        "FROM book b " +
        "JOIN book_author ba ON b.id = ba.bookid " +
        "JOIN author a ON ba.authorid = a.id " +
        "WHERE a.name = 'J.K. Rowling'" 
    return await executeQuery(query);
};

//Get all books on hold (including the patron and copy details)
export const booksOnHold = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title, h.starttime, bc.yearpublished " +
        "FROM hold h " +
        "JOIN book_copy bc ON h.bookcopyid = bc.id " +
        "JOIN book b ON bc.bookid = b.id " +
        "JOIN patron_account p ON h.patronaccountid = p.id "
    return await executeQuery(query);
};

//Find all patrons currently on a waitlist for a book
export const patronsOnWaitList = async () => {
    const query = 
        "SELECT p.firstname, p.lastname, b.title " +
        "FROM waitlist w " +
        "JOIN patron_account p ON w.patronaccountid = p.id " +
        "JOIN book b ON w.bookid = b.id"
    return await executeQuery(query);
};

//Get the count of patrons waiting for a specific book
export const countOfPatronsForABook = async () => {
    const query = 
        "SELECT COUNT(*) AS waitlist_count " +
        "FROM waitlist w " +
        "JOIN book b ON w.bookid = b.id " +
        "WHERE b.title = 'Harry Potter and the Philosopher''s Stone'"
    return await executeQuery(query);
};
