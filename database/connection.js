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
	password: '',
	database: 'employeetracker',
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;
