import executeQuery from './util/queryUtils.js';

// Place a hold on a book copy
export const placeHoldOnBook = async (bookCopyId, patronId) => {
    const query = 
        "INSERT INTO hold (starttime, bookcopyid, patronaccountid) " +
        "VALUES (NOW(), ?, ?)";
    return await executeQuery(query, [bookCopyId, patronId]);
};

// Cancel a hold
export const cancelHold = async (holdId, patronId) => {
    const query = 
        "DELETE FROM hold " +
        "WHERE id = ? AND patronaccountid = ?";
    return await executeQuery(query, [holdId, patronId]);
};