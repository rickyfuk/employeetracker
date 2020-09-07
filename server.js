// start the logo js for displaying the logo
const logo = require('./logo');
// get the console table module for display the result
const cTable = require('console.table');
const prompts = require('./prompt');
const db = require('./database');

// function server 1 - view all department
async function viewAllDept() {
	const result = await db.viewAllDept();
	console.table(result);
	init();
}

async function viewAllRoles() {
	const result = await db.viewAllRoles();
	console.table(result);
	init();
}

async function viewAllEmployee() {
	const allEmployee = await db.viewAllEmployee();
	// console.log('running');
	// console.log(allEmployee);
	console.table(allEmployee);
	init();
}

async function viewEmployeeByDept() {
	const deptChoice = await prompts.deptselection();
	// console.log(deptChoice.department);
	const employeeByDept = await db.viewEmployeeByDept(deptChoice);
	console.table(employeeByDept);
	init();
}

async function viewEmployeeByRole() {
	const roleChoice = await prompts.roleselection();
	// console.log(roleChoice);
	// console.log(roleChoice.role);
	const employeeByRole = await db.viewEmployeeByRole(roleChoice);
	console.table(employeeByRole);
	init();
}

async function addANewEmployee() {
	const adr = [];
	const firstname = await prompts.firstNameSelection();
	// console.log(firstname.firstName);
	adr.push(firstname.firstName);
	const lastname = await prompts.lastNameSelection();
	// console.log(lastname.lastName);
	adr.push(lastname.lastName);
	const roleChoice = await prompts.roleselection();
	adr.push(roleChoice);
	const managerChoice = await prompts.managerselection();
	adr.push(managerChoice);
	await db.addANewEmployee(adr);
	console.log(
		`Employee ${firstname.firstName} ${lastname.lastName} has been added into database`
	);
	init();
}

async function addANewDept() {
	const newDept = await prompts.newDeptNameSelection();
	const result = newDept.newDeptName;
	await db.addANewDept(result);
	console.log(`Department ${result} has been added into database`);
	init();
}

async function addANewRole() {
	const newRole = [];
	const newTitle = await prompts.newRoleTitle();
	newRole.push(newTitle.newRoleTitle);
	const newSalary = await prompts.newSalary();
	newRole.push(newSalary.newRoleSalary);
	const deptChoice = await prompts.deptselection();
	newRole.push(deptChoice);
	await db.addANewRole(newRole);
	console.log(`Role ${newTitle.newRoleTitle} has been added into database`);
	init();
}

async function updateEmployeeRole() {
	const result = [];
	const employeeSelected = await prompts.employeeselection();
	result.push(employeeSelected[0]);
	const newRoleID = await prompts.roleselection();
	result.push(newRoleID);
	await db.updateRole(result);
	console.log(
		`The role for employee ${employeeSelected[1]} has been added into database`
	);
	init();
}

// main function  - take the choice from the user and execute the corresponding fuction
async function init() {
	const mainresult = await prompts.mainselection();

	switch (mainresult.mainChoice) {
		// Choice 1 - All employee table
		case 'View all employees':
			// go to server function
			viewAllEmployee();
			break;
		case 'View all employees by department':
			viewEmployeeByDept();
			break;
		case 'View all employees by roles':
			viewEmployeeByRole();
			break;
		case 'Add a new employee':
			addANewEmployee();
			break;
		case 'View all departments':
			viewAllDept();
			break;
		case 'Add a new department':
			addANewDept();
			break;
		case 'View all roles':
			viewAllRoles();
			break;
		case 'Add a new role':
			addANewRole();
			break;
		case 'Update employee role':
			updateEmployeeRole();
			break;
	}
}

// viewAllDept();
// addNewDept();
// viewAllEmployee();
init();
