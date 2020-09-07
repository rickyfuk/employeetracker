// run the connection.js and get the connection module
const connection = require('./connection');

// keep all the function in this class constructor for export
class DB {
	// connection to database by connection.js
	constructor(connection) {
		this.connection = connection;
	}

	// function index 1 - query to database for all dept data
	// (for display the table for user)
	viewAllDept() {
		const query = `SELECT * 
        FROM department;`;
		return this.connection.query(query);
	}

	// function index 2 - query to database for all dept data with ID and dapartment name
	// (this function designate for other function when they need a dept list for selection)
	findAllDept() {
		const query = `SELECT id,name 
        FROM department;`;
		return this.connection.query(query);
	}

	// function index 3 - query to database for all role data
	// (for display the table for user)
	viewAllRoles() {
		const query = `SELECT * 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	// function index 4 - query to database for all role data with role title and role id
	// (this function designate for other function when they need a role list for selection)
	findAllRole() {
		const query = `SELECT id,title 
        FROM staffRole;`;
		return this.connection.query(query);
	}

	// function index 5 - query to database for all manager data
	// (for display the table for user)
	viewAllManager() {
		const query = `
		SELECT S2.id, S2.first_name, S2.last_name,
			   staffrole.title,staffrole.salary,	
			   department.name as department
		FROM employee as S1
		right JOIN employee as S2 on (S2.id = s1.id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE S2.manager_id is null;`;
		return this.connection.query(query);
	}

	// function index 6 - query to database for all manager data with manager name and his/her employee id
	// (this function designate for other function when they need a manager list for selection)
	pickAManager() {
		const query = `
		SELECT 
		s2.id,
		(CONCAT(s2.first_name, ' ', s2.last_name)) AS manager
		FROM employee as S1
		right JOIN employee as S2 on (S2.id = s1.id)`;
		return this.connection.query(query);
	}

	// function index 7 - query to database for all employee data
	// (for display the table for user)
	viewAllEmployee() {
		const query = `
		SELECT 
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,	
		department.name as department,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id);
		`;
		return this.connection.query(query);
	}

	// function index 8 - query to database for all employee data with employee name (combined first and last name) and his/her employee id
	// (this function designate for other function when they need a employee list for selection)
	findAllEmployee() {
		const query = `
		SELECT 
		employee.id,
        (CONCAT(employee.first_name, ' ', employee.last_name)) AS staff_name
		FROM employee
		`;
		return this.connection.query(query);
	}

	// function index 9 - query to database for the employee data (seperated by department)
	// (for display the table for user)
	viewEmployeeByDept(adr) {
		const query = `
		SELECT 	
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,
		department.name as department,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE department.id = ?;
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 10 - query to database for the employee data (seperated by role)
	// (for display the table for user)
	viewEmployeeByRole(adr) {
		const query = `
		SELECT 	
		S2.id, S2.first_name, S2.last_name,
		staffrole.title,staffrole.salary,
		department.name as department,
		(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE staffrole.id = ?;
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 11 - query to add a new employee to database
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

	// function index 12 - query to add a new department to database
	addANewDept(adr) {
		const query = `
		 INSERT INTO
		 department
		 SET ?
		`;
		const post = {
			name: adr,
		};
		return this.connection.query(query, post);
	}

	// function index 13 - query to add a new role to database
	addANewRole(adr) {
		const query = `
		 INSERT INTO
		 staffrole
		 SET ?
		`;
		const post = {
			title: adr[0],
			salary: adr[1],
			department_id: adr[2],
		};
		return this.connection.query(query, post);
	}

	// function index 14 - query to add a update role for an existing employee
	updateRole(adr) {
		const query = `
		UPDATE employee
		SET ?
		WHERE ?;
		`;
		const post = [
			{
				role_id: adr[0],
			},
			{
				id: adr[1],
			},
		];
		return this.connection.query(query, post);
	}
}

module.exports = new DB(connection);
