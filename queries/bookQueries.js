import pool from '../database.js'

export const findAllCurrentBooks = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM book")
        return rows
        
    } catch (error) {
        console.log(error);
        
    }
}

