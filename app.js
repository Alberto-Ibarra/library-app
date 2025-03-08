import {findAllCurrentBooks, 
    patronsWithOverDueBooks,
    currentlyCheckedOutBooks,
    booksCheckedOutByPatron,
    booksByAuthor,
    booksOnHold,
    patronsOnWaitList,
    countOfPatronsForABook} from './models/bookModel.js'

const displayBooks = async () => {
    const books = await findAllCurrentBooks();
    console.log(books);
};

const displayOverduePatrons = async () => {
    const patrons = await patronsWithOverDueBooks();
    console.log(patrons);
};

const checkedOut = async () => {
    const checkOutBooks = await currentlyCheckedOutBooks()
    console.log(checkOutBooks);
    
}

const numberOfCheckedOutBooks = async () => {
    const checkedOut = await booksCheckedOutByPatron()
    console.log(checkedOut);
}

const ListOfAuthorBooks = async () => {
    const authorList = await booksByAuthor()
    console.log(authorList);
}

const onHold = async () => {
    const bOnHold = await booksOnHold()
    console.log(bOnHold);
}

const onWaitList = async () => {
    const waitlist = await patronsOnWaitList()
    console.log(waitlist);
}

const patronsWaitingOnBook = async () => {
    const waitlist = await countOfPatronsForABook()
    console.log(waitlist);
    
}

// displayBooks();
// displayOverduePatrons();
// checkedOut();
// numberOfCheckedOutBooks();
// ListOfAuthorBooks()
// onHold()
// onWaitList()
patronsWaitingOnBook()