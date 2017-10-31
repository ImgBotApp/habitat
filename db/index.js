const mysql = require('mysql');
var Bluebird = require("bluebird");


const connection = mysql.createConnection({
  host: "mysqlcluster22.registeredsite.com",
  user: 'toastadmin',
  password: '!Qaz2wsx3edc',
  database: 'toasthabit'
})

connection.connect();

connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
  console.log(`mysql connected`)
});

var db = Bluebird.promisifyAll(connection);

// module.exports = connection;
module.exports = db;
