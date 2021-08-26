const mysql = require('mysql');

const connection = mysql.CreateConnection({
    host:'localhost',
    port:3306,
    password: 'moz4m$',
    dataBase: 'employee_db'
});

connection.connect();

module.exports = connection; 