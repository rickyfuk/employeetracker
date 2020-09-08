// start the logo js for displaying the logo
const logo = require('./logo');
// get the console table module for display the result
const cTable = require('console.table');
const prompts = require('./prompt');
const db = require('./database');

// function server 1 - view all department
async function viewAllDept() {
	// (by function index 1) - get the data from database
	// method 1 - without callback
	const result = await db.viewAllDept();
	console.table(result);
	// method 2 - with callback (for ref only)
	// db.viewAllDept(function (cb) {
	// 	console.table(cb);
	// });
	init();
}

// function server 2  - view all roles
async function viewAllRoles() {
	// (by function index 3) - get the data from the database
	const result = await db.viewAllRoles();
	console.table(result);
	init();
}

// function server 3 - view all employee table
async function viewAllEmployee() {
	// (by function index 7) - get the data from the database
	const allEmployee = await db.viewAllEmployee();
	console.table(allEmployee);
	init();
}

// function server 4 - view all employee table (seperated by department)
async function viewEmployeeByDept() {
	// (by function prompt 3) - get the response from the user for which department is required
	const deptChoice = await prompts.deptselection();
	// (by function index 9) - get the data from database for the employee table with selected department
	const employeeByDept = await db.viewEmployeeByDept(deptChoice);
	console.table(employeeByDept);
	init();
}

// function server 5 - view all employee table (seperated by role)
async function viewEmployeeByRole() {
	// (by function prompt 4) - get the response from the user for which role is required
	const roleChoice = await prompts.roleselection();
	// (by function index 10) - get the data from database for the employee table with selected role
	const employeeByRole = await db.viewEmployeeByRole(roleChoice);
	console.table(employeeByRole);
	init();
}

// function server 6 - add a new employee to database
async function addANewEmployee() {
	const adr = [];
	// (by function prompt 6) - get the response from the user for the first name of the new staff
	const firstname = await prompts.firstNameSelection();
	adr.push(firstname.firstName);
	// (by function prompt 7) - get the response from the user for the last name of the new staff
	const lastname = await prompts.lastNameSelection();
	adr.push(lastname.lastName);
	// (by function prompt 4) - get the response from the user for which role is required
	const roleChoice = await prompts.roleselection();
	adr.push(roleChoice);
	// (by function prompt 5) - get the response from the user for which staff would be the manager of this employee
	const managerChoice = await prompts.managerselection();
	adr.push(managerChoice);
	// (by function index 11) - input the array of result from the user for generate a new employee into the database
	await db.addANewEmployee(adr);
	console.log(
		`Employee ${firstname.firstName} ${lastname.lastName} has been added into database`
	);
	init();
}

// function server 7 - add a new department into database
async function addANewDept() {
	// (by function prompt 8) - get the response from the user for the new department name
	const newDept = await prompts.newDeptNameSelection();
	const result = newDept.newDeptName;
	// (by function index 12) - input the result response to the query and add the new department to the database
	await db.addANewDept(result);
	console.log(`Department ${result} has been added into database`);
	init();
}

// function server 8 - add a new role into database
async function addANewRole() {
	const newRole = [];
	// (by function prompt 9) - get the response from the user for the new role title
	const newTitle = await prompts.newRoleTitle();
	newRole.push(newTitle.newRoleTitle);
	// (by function prompt 10) - get the response from the user for the salary of the new role
	const newSalary = await prompts.newSalary();
	newRole.push(newSalary.newRoleSalary);
	// (by function prompt 3) - get the response from the user for the departmant of the new role
	const deptChoice = await prompts.deptselection();
	newRole.push(deptChoice);
	// (by function index 13) - input the result response to the query and add the new role to the database
	await db.addANewRole(newRole);
	console.log(`Role ${newTitle.newRoleTitle} has been added into database`);
	init();
}

// function server 9 - update the employee role
async function updateEmployeeRole() {
	const result = [];
	// (by function prompt 2) - get the response from the user for which employee's role will be updated
	const employeeSelected = await prompts.employeeselection();
	result.push(employeeSelected[0]);
	// (by function prompt 4) - get the response from the user for the new role
	const newRoleID = await prompts.roleselection();
	result.push(newRoleID);
	// (by function index 14) - input the result response to the query and update the role to the database for the employee
	await db.updateRole(result);
	console.log(
		`The role for employee ${employeeSelected[1]} has been updated into database`
	);
	init();
}

// function server 10 - update the employee's manager
async function updateEmployeeManager() {
	const result = [];
	// (by function prompt 2) - get the response from the user for which employee's role will be updated
	const employeeSelected = await prompts.employeeselection();
	result.push(employeeSelected[0]);
	// (by function prompt 5) - get the response from the user for which staff would be the manager of this employee
	const managerChoice = await prompts.managerselection();
	result.push(managerChoice);
	// (by function index 14) - input the result response to the query and update the manager to the database for the employee
	await db.updateEmployeeManager(result);
	console.log(
		`The Manager for employee ${employeeSelected[1]} has been updated into database`
	);
	init();
}

// function server 11 - update the employee's first name
async function updateEmployeeFirstName() {
	const result = [];
	// (by function prompt 2) - get the response from the user for which employee's role will be updated
	const employeeSelected = await prompts.employeeselection();
	result.push(employeeSelected[0]);
	// (by function prompt 6) - get the response from the user for the first name of the new staff
	const firstname = await prompts.firstNameSelection();
	result.push(firstname.firstName);
	// (by function index 15) - input the result response to the query and update the employee first name to the database for the employee
	await db.updateEmployeeFirstName(result);
	console.log(
		`The First name for employee ${employeeSelected[1]} has been updated into database`
	);
	init();
}

// function server 12 - update the employee's last name
async function updateEmployeeLastName() {
	const result = [];
	// (by function prompt 2) - get the response from the user for which employee's role will be updated
	const employeeSelected = await prompts.employeeselection();
	result.push(employeeSelected[0]);
	// (by function prompt 7) - get the response from the user for the last name of the new staff
	const lastname = await prompts.lastNameSelection();
	result.push(lastname.lastName);
	// (by function index 16) - input the result response to the query and update the employee last name to the database for the employee
	await db.updateEmployeeLastName(result);
	console.log(
		`The last name for employee ${employeeSelected[1]} has been updated into database`
	);
	init();
}

// function server 13 - view all manager table
async function viewAllManager() {
	// (by function index 5) - get the data from database for the manager table
	const result = await db.viewAllManager();
	console.table(result);
	init();
}

// function server 14 - view all employee table (seperated by manager)
async function viewEmployeeByManager() {
	// (by function prompt 11) - get the response from the user for which manager is required
	const managerPick = await prompts.managerPick();
	// (by function index 17) - get the data from database for the employee table with selected manager
	const employeeByManager = await db.viewEmployeeByManager(managerPick);
	console.table(employeeByManager);
	init();
}

// function server 15 - exit the application
async function exit() {
	// (by function index 18) - end the connection
	await db.connectionend();
	console.log('Thanks for using Employee Tracker');
}

// function server 16 - view all total salary table
// report the total salary for all staff
async function viewTotalSalarySpending() {
	// (by function index 19) - get the data from database to generate the sum of salary
	const totalSalary = await db.viewAllSalarySum();
	console.log(`The total salary spending is ${totalSalary[0].salary_total}`);
	console.log('--------------------------');
	// (by function index 20) - get the data from database to generate the sum of all department salary
	const totaldeptSalary = await db.viewAllDeptSalarySum();
	console.log(`The Department salary spending report`);
	console.table(totaldeptSalary);
	init();
}

// function server 17 - view the salary table (seperate by Department)
// report the total salary for each department
async function viewDeptSalarySpending() {
	// (by function prompt 3) - get the response from the user for which department is required
	const deptChoice = await prompts.deptselection();
	// (by function index 21) - get the data from database to generate the sum of salary by department level
	const totalSalary = await db.viewDeptSalarySum(deptChoice);
	console.log(
		`The department ${totalSalary[0].name} salary spending is ${totalSalary[0].salary_total}`
	);
	console.log('--------------------------');
	// (by function index 22) - get the data from database to generate the a job title salary table for the department
	const deptjobtitleSalary = await db.viewJobSalarytable(deptChoice);
	console.log(
		`The Job title salary spending report of Department ${totalSalary[0].name}`
	);
	console.table(deptjobtitleSalary);
	console.log('--------------------------');
	// (by function index 23) - get the data from database to generate the a salary table for the department
	const deptindividualSalary = await db.viewInvidualSalarytable(deptChoice);
	console.log(
		`The Individual salary spending report of Department ${totalSalary[0].name}`
	);
	console.table(deptindividualSalary);
	init();
}

// main function  - take the choice from the user and execute the corresponding fuction
async function init() {
	const mainresult = await prompts.mainselection();

	switch (mainresult.mainChoice) {
		// Choice 1 - All employee table
		case 'View all employees':
			// execute (server function 3)
			viewAllEmployee();
			break;
		case 'View all employees by department':
			// execute (server function 4)
			viewEmployeeByDept();
			break;
		case 'View all employees by roles':
			// execute (server function 5)
			viewEmployeeByRole();
			break;
		case 'Add a new employee':
			// execute (server function 6)
			addANewEmployee();
			break;
		case 'View all departments':
			// execute (server function 1)
			viewAllDept();
			break;
		case 'Add a new department':
			// execute (server function 7)
			addANewDept();
			break;
		case 'View all roles':
			// execute (server function 2)
			viewAllRoles();
			break;
		case 'Add a new role':
			// execute (server function 8)
			addANewRole();
			break;
		case 'Update employee role':
			// execute (server function 9)
			updateEmployeeRole();
			break;
		case "Update employee's manager":
			// excute (server function 10)
			updateEmployeeManager();
			break;
		case "Update employee's First name":
			// excute (server function 11)
			updateEmployeeFirstName();
			break;
		case "Update employee's Last name":
			// excute (server function 12)
			updateEmployeeLastName();
			break;
		case 'View all Manager':
			// excute (server function 13)
			viewAllManager();
			break;
		case 'View all employees by Manager':
			// excute (server function 14)
			viewEmployeeByManager();
			break;
		case 'View Total Salary Spending':
			// excute (server function 16)
			viewTotalSalarySpending();
			break;
		case 'View Salary Spending by Department':
			// excute (server function 17)
			viewDeptSalarySpending();
			break;
		default:
			// excute (server function 15)
			exit();
	}
}

init();
