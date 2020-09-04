// get the util module
const util = require('util');
// get the mySQL module
const mysql = require('mysql');

// set up the connection to the database
const connection = mysql.createConnection({
	host: 'localhost',

	// database port name
	port: 3306,

	// mysql username
	user: 'root',

	// mysql password
	password: 'Truman!2017',
	database: 'employeetracker',
});

// connection.connect(function (err) {
// 	if (err) throw err;
// 	console.log('connected as id ' + connection.threadId);
// 	connection.end();
// });
// connection.connect();
console.log(connection.query);
