import pool from '../../services/database.js';

const executeQuery = async (query, params = []) => {
    try {
        const [rows] = await pool.query(query, params);
        return rows ? rows : [];
    } catch (error) {
        console.error("Error executing the query:", error.message);
        if (error.sqlState) {
            console.error("SQL State:", error.sqlState);
        }
        if (error.code) {
            console.error("SQL Error Code:", error.code);
        }
        return [];
    }
};

export default executeQuery;
