// get the data from the database
const db = require('./database');
// get the inquirer module for building the question and getting the response
const inquirer = require('inquirer');

// function Prompt 1 - the main landing question
// get the response from the user for the next action
const mainselection = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'mainChoice',
			message: 'What do you want to do?',
			choices: [
				'View all employees',
				'View all employees by department',
				'View all employees by roles',
				'View all employees by Manager',
				'View all Manager',
				'Add a new employee',
				'View all departments',
				'Add a new department',
				'View all roles',
				'Add a new role',
				'Update employee role',
				"Update employee's manager",
				"Update employee's First name",
				"Update employee's Last name",
				'Exit the application',
			],
		},
	]);
	return answer;
};

// function Prompt 2 - pick an employee from the employee list
// generata an employee list for select an employee and pass the response for other function
const employeeselection = async () => {
	// connect to function (index 8) to get the employee from database
	const employees = await db.findAllEmployee();
	const employeeChoice = [];
	const employeeChoiceid = [];
	for (let i = 0; i < employees.length; i++) {
		employeeChoice.push(employees[i].staff_name);
		employeeChoiceid.push(employees[i].id);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'employee',
			message: 'Please select an employee',
			choices: employeeChoice,
		},
	]);
	const finalanswer = [
		employeeChoiceid[employeeChoice.indexOf(answer.employee)],
		answer.employee,
	];
	// return an array with the id and the name
	return finalanswer;
};

// function Prompt 3 - pick an department from the department list
// to generata a department list for select a department for other function
const deptselection = async () => {
	// connect to function (index 2) to get the employee from database
	const depts = await db.findAllDept();
	const departmentChoice = [];
	const departmentChoiceid = [];
	for (let i = 0; i < depts.length; i++) {
		departmentChoice.push(depts[i].name);
		departmentChoiceid.push(depts[i].id);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'department',
			message: 'Please select a department',
			choices: departmentChoice,
		},
	]);
	const finalanswer =
		departmentChoiceid[departmentChoice.indexOf(answer.department)];
	return finalanswer;
};

// function Prompt 4 - pick an role from the role list
// to generata a role list for select a role
const roleselection = async () => {
	// connect to function (index 4) to get the employee from database
	const roles = await db.findAllRole();
	const roleChoice = [];
	const roleChoiceid = [];
	for (let i = 0; i < roles.length; i++) {
		roleChoice.push(roles[i].title);
		roleChoiceid.push(roles[i].id);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'role',
			message: 'Please select a role',
			choices: roleChoice,
		},
	]);
	const finalanswer = roleChoiceid[roleChoice.indexOf(answer.role)];
	// return the role id for the user selection
	return finalanswer;
};

// function Prompt 5 - pick a manager from the manager list
// to generata a manager list for select a manager
// (use for select the manager for new staff or amend staff)
const managerselection = async () => {
	// connect to function (index 6) to get the manager list from database
	const managers = await db.pickAManager();
	const managerChoice = ['None'];
	const managerChoiceid = [null];
	for (let i = 0; i < managers.length; i++) {
		managerChoice.push(managers[i].manager);
		managerChoiceid.push(managers[i].id);
	}
	// get the manager selection from the list
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'manager',
			message: 'Please select a manager',
			choices: managerChoice,
		},
	]);
	const finalanswer = managerChoiceid[managerChoice.indexOf(answer.manager)];
	// return the manager employee id
	return finalanswer;
};

// function Prompt 6 - get the first name for the staff from the user
const firstNameSelection = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'firstName',
			message: 'Please enter the first name of the new employee',
			// validate if the input is letter only
			validate: function (value) {
				let pass = false;
				if (value.match(/^[A-Za-z]+$/) && value != '') {
					pass = true;
				}
				if (pass) {
					return true;
				}
				return 'Please enter the name with at least one letter and with letter only';
			},
		},
	]);
	return answer;
};

// function Prompt 7 - get the last name for the staff from the user
const lastNameSelection = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'lastName',
			message: 'Please enter the last name of the new employee',
			// validate if the input is letter only
			validate: function (value) {
				let pass = false;
				if (value.match(/^[A-Za-z]+$/) && value != '') {
					pass = true;
				}
				if (pass) {
					return true;
				}
				return 'Please enter the name with at least one letter and with letter only';
			},
		},
	]);
	return answer;
};

// function Prompt 8 - get the new department name from the user
const newDeptNameSelection = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'newDeptName',
			message: 'Please enter a new department name',
			// validate if the input is letter only
			validate: function (value) {
				let pass = false;
				if (value.match(/^[A-Za-z]+$/) && value != '') {
					pass = true;
				}
				if (pass) {
					return true;
				}
				return 'Please enter the name with at least one letter and with letter only';
			},
		},
	]);
	return answer;
};

// function Prompt 9 - get the new role title from the user
const newRoleTitle = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'newRoleTitle',
			message: 'Please enter the title for the new role',
			// validate if the input is letter only
			validate: function (value) {
				let pass = false;
				if (value.match(/^[A-Za-z]+$/) && value != '') {
					pass = true;
				}
				if (pass) {
					return true;
				}
				return 'Please enter the name with at least one letter and with letter only';
			},
		},
	]);
	return answer;
};

// function Prompt 10 - get the new salary from the user
const newSalary = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'input',
			name: 'newRoleSalary',
			message:
				'Please enter the Salary for the new role (i.e. 92341 for $ 92,341)',
			// validate if the input is number only
			validate: function (value) {
				let pass = false;
				if (value.match(/^[0-9]+$/) && value.length != 0) {
					pass = true;
				}
				if (pass) {
					return true;
				}
				return 'Please enter a number without any sign or decimal';
			},
		},
	]);
	return answer;
};

// function Prompt 11 - get the manager where pick by the user
const managerPick = async () => {
	// connect to function (index 5) to get the manager list from database
	const managers = await db.viewAllManager();
	const managerChoice = [];
	const managerChoiceid = [];
	for (let i = 0; i < managers.length; i++) {
		managerChoice.push(managers[i].manager_full_name);
		managerChoiceid.push(managers[i].manager_id);
	}
	// get the manager selection from the list
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'manager',
			message: 'Please select a manager',
			choices: managerChoice,
		},
	]);
	const finalanswer = managerChoiceid[managerChoice.indexOf(answer.manager)];
	// return the manager employee id
	return finalanswer;
};

module.exports = {
	mainselection,
	employeeselection,
	deptselection,
	roleselection,
	managerselection,
	firstNameSelection,
	lastNameSelection,
	newDeptNameSelection,
	newRoleTitle,
	newSalary,
	managerPick,
};
