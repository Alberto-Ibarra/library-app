import executeQuery from './util/queryUtils.js';


//find all books
export const allBooks = async () => {
    const query = "SELECT " +
                "b.bookid as bookid, " + 
                "b.title as title, " +
                "a.name as authorname, " + 
                "c.title as category " + 
                "FROM book b " +
                "JOIN book_author ba ON b.id = ba.bookid " +
                "JOIN author a ON ba.authorid = a.id "
                "JOIN category c ON b.categoryid = c.id";
    return await executeQuery(query);
}

//find all categories
export const allCategories = async () => {
    const query = "SELECT * FROM category";
    return await executeQuery(query);
}

// Find authors by partial name (for search)
export const searchAuthors = async (searchTerm) => {
    const query = "SELECT id, name FROM author WHERE name LIKE ? LIMIT 10";
    return await executeQuery(query, [`%${searchTerm}%`]);
};

//add book
export const addBook = async (title, authorNames, categoryId) => {
    try {
        // Ensure authorNames is always an array
        if (!Array.isArray(authorNames)) {
            authorNames = [authorNames];
        }
        console.log('Request Body:', { title, authorNames, categoryId });
        // Add the book
        const bookQuery = `INSERT INTO book (title, categoryid) VALUES (?, ?)`;
        const bookResult = await executeQuery(bookQuery, [title, categoryId]);
        const bookId = bookResult.insertId;

        // Handle authors
        const bookAuthorQuery = `INSERT INTO book_author (bookid, authorid) VALUES (?, ?)`;
        for (const authorName of authorNames) {
            let authorResult = await executeQuery("SELECT id FROM author WHERE name = ?", [authorName]);
            if (authorResult.length === 0) {
                // If author doesn't exist, add them
                const authorInsertResult = await executeQuery("INSERT INTO author (name) VALUES (?)", [authorName]);
                authorResult = [{ id: authorInsertResult.insertId }];
            }
            const authorId = authorResult[0].id;
            await executeQuery(bookAuthorQuery, [bookId, authorId]);
        }

        return { message: "Book added successfully", bookId };
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
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


export const deleteBookById = async (id) => {
    const query = 
        "DELETE FROM book WHERE id = ?";
        const numericId = parseInt(id,10);
        return await executeQuery(query, [numericId]);
}