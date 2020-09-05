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

	findAllDept() {
		const query = `SELECT name 
        FROM department;`;
		return this.connection.query(query);
	}

	viewAllDept() {
		const query = `SELECT * 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	findAllRole() {
		const query = `SELECT title 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	viewAllEmployee() {
		const query = `
		SELECT 
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,	
		department.name,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id);
		`;
		return this.connection.query(query);
	}

	viewEmployeeByDept(adr) {
		const query = `
		SELECT 	
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,
		department.name,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE department.name = ?;
		`;
		return this.connection.query(query, [adr]);
	}

	viewEmployeeByRole(adr) {
		const query = `
		SELECT 	
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,
		department.name,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE staffrole.title = ?;
		`;
		return this.connection.query(query, [adr]);
	}
}

// console.log(connection);
module.exports = new DB(connection);
