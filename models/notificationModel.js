import executeQuery from './util/queryUtils.js';\

// Send a notification (e.g., Overdue Alert)
export const sendNotification = async (type, patronId) => {
    const query = 
        "INSERT INTO notification (sentat, type, patronaccountid) " +
        "VALUES (NOW(), ?, ?)";
    return await executeQuery(query, [type, patronId]);
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