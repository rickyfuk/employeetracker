// start the logo js for displaying the logo
const logo = require('./logo');
// get the consloe table module for display the result
const cTable = require('console.table');
//
// const inquirer = require('inquirer');
const prompts = require('./prompt');
const db = require('./database');

async function viewAllDept() {
	const depts = await db.viewAllDept();
	console.table(depts);
	init();
}

async function selectDept() {
	const deptlistresult = await prompts.deptselection();
	// console.log(deptlistresult);
	return deptlistresult;
}

async function selectRole() {
	const rolelistresult = await prompts.roleselection();
	console.log(rolelistresult);
	return rolelistresult;
}

async function viewAllEmployee() {
	const allEmployee = await db.viewAllEmployee();
	console.table(allEmployee);
	init();
}

async function viewEmployeeByDept() {
	const deptChoice = await selectDept();
	// console.log(deptChoice.department);
	const employeeByDept = await db.viewEmployeeByDept(deptChoice.department);
	console.table(employeeByDept);
	init();
}

async function viewEmployeeByRole() {
	const roleChoice = await selectRole();
	// console.log(roleChoice);
	console.log(roleChoice.role);
	const employeeByRole = await db.viewEmployeeByRole(roleChoice.role);
	console.table(employeeByRole);
	init();
}

async function init() {
	const mainresult = await prompts.mainselection();
	console.log(mainresult.mainChoice);
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
	}
}

// addNewDept();
// viewAllEmployee();
init();
