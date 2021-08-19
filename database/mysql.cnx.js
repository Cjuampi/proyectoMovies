require("dotenv").config();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.hostMySQL, 
    user: process.env.userMySQL,
    database: process.env.dbMySQL,
    password: process.env.passMySQL,
    connectionLimit: 5,
    connectTimeout: 15000}
);

module.exports = pool;