const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'EarlofSmith123!',
  database: 'company_db'
});

module.exports = db;