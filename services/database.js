import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// async function testDB() {
//     try {
//         console.log("🔄 Connecting to MySQL...");
//         const connection = await pool.getConnection();
//         console.log("✅ Connected to MySQL!");
//         const [rows] = await connection.execute("SHOW TABLES;");
//         console.log("📊 Tables:", rows);
//         connection.release();
//     } catch (err) {
//         console.error("❌ Database Connection Failed:", err.message);
//     }
// }

// testDB();

export default pool