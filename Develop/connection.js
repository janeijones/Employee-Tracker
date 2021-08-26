const mysql = require('mysql');

const database = mysql.createConnection({
    host:'localhost',
    user: 'root',
    // port:3306,
    password: 'moz4m$',
    dataBase: 'employees'
});

database.connect();

module.exports = database; 