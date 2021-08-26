const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'moz4m$',
    database: 'employees'
});

connection.connect();

module.exports = connection; 