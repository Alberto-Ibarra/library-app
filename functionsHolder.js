import {
    findAllCurrentBooks,
    patronsWithOverDueBooks,
    currentlyCheckedOutBooks,
    booksCheckedOutByPatron,
    booksByAuthor,
    booksOnHold,
    patronsOnWaitList,
    countOfPatronsForABook,
    allBooks
} from './models/bookModel.js';

import {
    listAllBookCopies,
    addBookCopy,
    removeBookCopy
} from './models/bookCopyModel.js';

import {
    activatePatronAccount,
    suspendPatronAccount,
    getAllActivePatrons,
    updatePatronEmail
} from './models/patronAccountModel.js';

import {
    checkoutBook,
    returnBook
} from './models/checkOutReturnModel.js';

import {
    placeHoldOnBook,
    cancelHold
} from './models/holdModel.js';

import {
    sendNotification,
    getPatronNotifications
} from './models/notificationModel.js';

import {
    getTopCheckedOutBooks,
    getTotalCheckedOutBooks,
    patronsWithMostCheckedOutBooks
} from './models/reportAdminModel.js';

const displayBooks = async () => {
    const books = await findAllCurrentBooks();
    console.log(books);
};

const displayOverduePatrons = async () => {
    const patrons = await patronsWithOverDueBooks();
    console.log(patrons);
};

const checkedOut = async () => {
    const checkOutBooks = await currentlyCheckedOutBooks();
    console.log(checkOutBooks);
};

const numberOfCheckedOutBooks = async () => {
    const checkedOut = await booksCheckedOutByPatron();
    console.log(checkedOut);
};

const listOfAuthorBooks = async () => {
    const authorList = await booksByAuthor();
    console.log(authorList);
};

const onHold = async () => {
    const bOnHold = await booksOnHold();
    console.log(bOnHold);
};

const onWaitList = async () => {
    const waitlist = await patronsOnWaitList();
    console.log(waitlist);
};

const patronsWaitingOnBook = async () => {
    const waitlist = await countOfPatronsForABook();
    console.log(waitlist);
};

const all = async () => {
    const all = await allBooks();
    console.log(JSON.stringify(all, null, 2));
};

const listBookCopies = async () => {
    const copies = await listAllBookCopies();
    console.log(copies);
};

const addCopy = async () => {
    const result = await addBookCopy(1, 2022); // Example params
    console.log(result);
};

const removeCopy = async () => {
    const result = await removeBookCopy(1); // Example param
    console.log(result);
};

const activatePatron = async () => {
    const result = await activatePatronAccount(1); // Example param
    console.log(result);
};

const suspendPatron = async () => {
    const result = await suspendPatronAccount(2); // Example param
    console.log(result);
};

const getActivePatrons = async () => {
    const patrons = await getAllActivePatrons();
    console.log(patrons);
};

const updateEmail = async () => {
    const result = await updatePatronEmail(1, 'newemail@example.com');
    console.log(result);
};

const checkout = async () => {
    const result = await checkoutBook(1, 1); // Example params
    console.log(result);
};

const returnABook = async () => {
    const result = await returnBook(1, 1); // Example params
    console.log(result);
};

const placeHold = async () => {
    const result = await placeHoldOnBook(1, 1); // Example params
    console.log(result);
};

const cancelAHold = async () => {
    const result = await cancelHold(1, 1); // Example params
    console.log(result);
};

const sendAlert = async () => {
    const result = await sendNotification(1, 'Overdue Alert');
    console.log(result);
};

const getNotifications = async () => {
    const notifications = await getPatronNotifications(1); // Example param
    console.log(notifications);
};

const totalCheckedOut = async () => {
    const total = await getTotalCheckedOutBooks();
    console.log(total);
};

const topBooks = async () => {
    const top = await getTopCheckedOutBooks();
    console.log(top);
};

const topPatrons = async () => {
    const patrons = await patronsWithMostCheckedOutBooks();
    console.log(patrons);
};

// all();
// displayBooks();
// displayOverduePatrons();
// checkedOut();
// numberOfCheckedOutBooks();
// listOfAuthorBooks();
// onHold();
// onWaitList();
// patronsWaitingOnBook();

// listBookCopies();
// addCopy();
// removeCopy();

// activatePatron();
// suspendPatron();
// getActivePatrons();
// updateEmail();

// checkout();
// returnABook();

// placeHold();
// cancelAHold();

// sendAlert();
// getNotifications();

// totalCheckedOut();
// topBooks();
// topPatrons();
