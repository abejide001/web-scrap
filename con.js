//create the db connection
const  mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7247101",
    password: "xWTKZU6SU8",
    database: "sql7247101"
});

module.exports = con;
