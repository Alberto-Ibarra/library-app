import executeQuery from './util/queryUtils.js';

// Send a notification (e.g., Overdue Alert)
export const createNotification = async (type, patronId, message) => {
    const query = 
        "INSERT INTO notification (sentat, type, message, patronaccountid) " +
        "VALUES (NOW(), ?, ?, ?)";
    return await executeQuery(query, [type, message, patronId]);
};


// Get all notifications for a patron
export const getPatronNotifications = async (patronId) => {
    const query = 
        "SELECT n.sentat, n.type " +
        "FROM notification n " +
        "JOIN patron_account p ON n.patronaccountid = p.id " +
        "WHERE p.id = ?";
    return await executeQuery(query, [patronId]);
};