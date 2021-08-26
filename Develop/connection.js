const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    // port:3306,
    password: 'moz4m$',
    database: 'employees'
});

connection.connect();

module.exports = connection; 