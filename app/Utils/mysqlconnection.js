var mysql = require('mysql');
//var connection = {};
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'school'
});
connection.connect((err) => {
    if (err) throw err;
});
module.exports = connection;