import mysql from "mysql2";


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: '-03:00', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err.message);
  } else {
    conn.release();
  }
});

export default pool;
