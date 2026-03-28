require('dotenv').config();

const mysql = require('mysql2');

// Railway: mysql.createConnection(process.env.DATABASE_URL) when DATABASE_URL is set (private MYSQL_URL / public proxy URL).
const connectionUrl =
    process.env.DATABASE_URL ||
    process.env.MYSQL_URL ||
    process.env.MYSQL_PUBLIC_URL;

if (connectionUrl && !/^mysql:\/\//i.test(connectionUrl)) {
    console.error(
        'Expected a mysql:// URL. DATABASE_URL must be MySQL, not postgres:// — fix the variable on Railway.'
    );
}

const db = connectionUrl
    ? mysql.createConnection(connectionUrl)
    : mysql.createConnection({
          host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
          user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
          password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
          database:
              process.env.DB_NAME ||
              process.env.MYSQLDATABASE ||
              process.env.MYSQL_DATABASE,
          port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
      });

// Connection check
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        console.log("👉 Check .env file values and MySQL service");
    } else {
        console.log("✅ Connected to Jobra Hospital Database");
    }
});

module.exports = db;
