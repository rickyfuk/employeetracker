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
		const query = `SELECT id,name 
        FROM department;`;
		return this.connection.query(query);
	}

	viewAllRoles() {
		const query = `SELECT * 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	findAllRole() {
		const query = `SELECT id,title 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	viewAllManager() {
		const query = `
		SELECT S2.id, S2.first_name, S2.last_name,
			   staffrole.title,staffrole.salary,	
			   department.name
		FROM employee as S1
		right JOIN employee as S2 on (S2.id = s1.id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE S2.manager_id is null;`;
		return this.connection.query(query);
	}

	findAllManager() {
		const query = `
		SELECT 
		s2.id,
		(CONCAT(s2.first_name, ' ', s2.last_name)) AS manager
		FROM employee as S1
		right JOIN employee as S2 on (S2.id = s1.id)
		where s2.manager_id is null;`;
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
		WHERE department.id = ?;
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
		WHERE staffrole.id = ?;
		`;
		return this.connection.query(query, [adr]);
	}

	addANewEmployee(adr) {
		const query = `
		 INSERT INTO
		 employee
		 SET ?
		`;
		const post = {
			first_name: adr[0],
			last_name: adr[1],
			role_id: adr[2],
			manager_id: adr[3],
		};
		return this.connection.query(query, post);
	}
}

// function viewAllDept() {
// 	const query = `SELECT *
//         FROM department;`;
// 	connection.query(query, function (err, res) {
// 		if (err) throw err;
// 		console.log(res);
// 	});
// }

// viewAllDept();
// console.log(connection);
module.exports = new DB(connection);
