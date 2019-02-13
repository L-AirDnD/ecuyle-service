const mysql = require('mysql');
const config = require('./config.js');

module.exports = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DB_NAME,
});
