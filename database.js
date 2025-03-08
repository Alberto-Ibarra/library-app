import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: process.env.SQL_DATABASE
}).promise()

const getAllBooks = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM book")
        console.log(JSON.stringify(rows, null, 2));
    } catch (error) {
        console.log(error);
        
    }
}

getAllBooks()