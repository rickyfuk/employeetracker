// start the logo js for displaying the logo
const logo = require('./logo');
// get the consloe table module for display the result
const cTable = require('console.table');
//
// const inquirer = require('inquirer');
const prompts = require('./prompt');
const db = require('./database');

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

// async function selectDept() {
// 	const deptlistresult = await prompts.deptselection();
// 	// console.log(deptlistresult);
// 	return deptlistresult;
// }

// async function selectRole() {
// 	const rolelistresult = await prompts.roleselection();
// 	// console.log(rolelistresult);
// 	return rolelistresult;
// }

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
	await viewAllEmployee();
}

async function init() {
	const mainresult = await prompts.mainselection();
	// console.log(mainresult.mainChoice);
	switch (mainresult.mainChoice) {
		case 'View all employees':
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
	}
}

// viewAllDept();
// addNewDept();
// viewAllEmployee();
init();
