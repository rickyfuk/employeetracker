// run the connection.js and get the connection module
const connection = require('./connection');

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	viewAllDept() {
		const query = `SELECT * 
        FROM department;`;
		return this.connection.query(query);
	}

	// viewAllEmployee() {
	// 	// const query = '
	// 	// '
	// }
}

// console.log(connection);
module.exports = new DB(connection);
