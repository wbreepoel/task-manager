const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '-Familie10-',
    database: 'taskManager'
})

module.exports = connection;