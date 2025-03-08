import {findAllCurrentBooks, patronsWithOverDueBooks,currentlyCheckedOutBooks} from './models/bookModel.js'

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

// displayBooks();
// displayOverduePatrons();
checkedOut();