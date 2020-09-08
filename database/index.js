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
		select 
		s1.manager_id, s2.first_name, s2.last_name,
		staffrole.title,staffrole.salary,
		department.name as department,
		count(s1.manager_id) as staff_managing,
		(CONCAT(s2.first_name, ' ', s2.last_name)) AS manager_full_name
		from employee as S1
		Right join employee as s2 on (s1.manager_id = s2.id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		where s1.manager_id is not null
		group by s1.manager_id`;
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
				role_id: adr[1],
			},
			{
				id: adr[0],
			},
		];
		return this.connection.query(query, post);
	}

	// function index 14 - query to update the manager for an existing employee
	updateEmployeeManager(adr) {
		const query = `
		UPDATE employee
		SET ?
		WHERE ?;
		`;
		const post = [
			{
				manager_id: adr[1],
			},
			{
				id: adr[0],
			},
		];
		return this.connection.query(query, post);
	}

	// function index 15 - query to update the first name for an existing employee
	updateEmployeeFirstName(adr) {
		const query = `
		UPDATE employee
		SET ?
		WHERE ?;
		`;
		const post = [
			{
				first_name: adr[1],
			},
			{
				id: adr[0],
			},
		];
		return this.connection.query(query, post);
	}

	// function index 16 - query to update the last name for an existing employee
	updateEmployeeLastName(adr) {
		const query = `
		UPDATE employee
		SET ?
		WHERE ?;
		`;
		const post = [
			{
				last_name: adr[1],
			},
			{
				id: adr[0],
			},
		];
		return this.connection.query(query, post);
	}

	// function index 17 - query to database for the employee data (seperated by manager)
	// (for display the table for user)
	viewEmployeeByManager(adr) {
		const query = `
		select employee.id, employee.first_name, employee.last_name,
		staffrole.title,staffrole.salary,
		department.name as department
		from employee
		LEFT JOIN staffrole on (employee.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		where employee.manager_id = ?;
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 18 - connection end
	connectionend() {
		return this.connection.end();
	}

	// function index 19 - query to database for the all employee salary data
	// (for display the result for user)
	viewAllSalarySum(adr) {
		const query = `
		select sum(staffrole.salary) as salary_total
		from employee
		LEFT JOIN staffrole on (employee.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 20 - query to database for the all employee salary data (table by department)
	// (for display the table for user)
	viewAllDeptSalarySum(adr) {
		const query = `
		select department.name,sum(staffrole.salary) as total_salary
		from employee
		LEFT JOIN staffrole on (employee.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		group by department.name
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 21 - query to database for the total salary data by the selected department
	// (for display the result for user)
	viewDeptSalarySum(adr) {
		const query = `
		select department.name,sum(staffrole.salary) as salary_total
		from employee
		LEFT JOIN staffrole on (employee.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		where department.id = ?
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 22 - query to database for the selected department job title salary data (table by department)
	// (for display the table for user)
	viewJobSalarytable(adr) {
		const query = `
		SELECT 	
		staffrole.title,sum(staffrole.salary)
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE department.id = ?
        group by staffrole.title
		`;
		return this.connection.query(query, [adr]);
	}

	// function index 23 - query to database for the selected department employee salary data (table by department)
	// (for display the table for user)
	viewInvidualSalarytable(adr) {
		const query = `
		SELECT 	
		(CONCAT(s2.first_name, ' ', s2.last_name)) AS staff_name,
		staffrole.title,staffrole.salary
		FROM employee As S1
		Right JOIN employee as S2 on (S1.id = S2.manager_id)
		LEFT JOIN staffrole on (S2.role_id = staffrole.id)
		LEFT JOIN department on (staffrole.department_id = department.id)
		WHERE department.id = ?
		`;
		return this.connection.query(query, [adr]);
	}
}

module.exports = new DB(connection);
