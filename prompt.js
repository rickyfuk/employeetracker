const db = require('./database');
const inquirer = require('inquirer');

// for the main landing question
const mainselection = async () => {
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'mainChoice',
			message: 'What kind of action do you want yo do?',
			choices: [
				'View all employees',
				'View all employees by department',
				'View all employees by roles',
				'View all employees by Manager',
				'Add a new employee',
				'View all departments',
				'Add a new department',
				'View all roles',
				'Add a new role',
				'Update employee role',
				'Exit the application',
			],
		},
	]);
	return answer;
};

// to generata an employee list for select an employee
const employeeselection = async () => {
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
	return finalanswer;
};

// to generata a department list for select a department
const deptselection = async () => {
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

// to generata a role list for select a role
const roleselection = async () => {
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
	return finalanswer;
};

// to generata a manager list for select a manager
// (use for select the manager for new staff or amend staff)
const managerselection = async () => {
	const managers = await db.pickAManager();
	const managerChoice = ['None'];
	const managerChoiceid = [null];
	for (let i = 0; i < managers.length; i++) {
		managerChoice.push(managers[i].manager);
		managerChoiceid.push(managers[i].id);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'manager',
			message: 'Please select a manager',
			choices: managerChoice,
		},
	]);
	const finalanswer = managerChoiceid[managerChoice.indexOf(answer.manager)];
	return finalanswer;
};

// get the first name for the staff
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

// get the last name for the staff
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

// get the new department name
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

// get the new role title
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

// get the new role salary
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
};

// module.exports = {
// 	// main question
// 	main: [
// 		{
// 			type: 'list',
// 			name: 'mainChoice',
// 			message: 'What kind of action do you want yo do?',
// 			choices: [
// 				'View all employees',
// 				'View all employees by department',
// 				'View all employees by roles',
// 				'Add a new employee',
// 				'View all departments',
// 				'Add a new department',
// 				'View all roles',
// 				'Add a new role',
// 				'Update employee roles',
// 			],
// 		},
// 	],
// 	//  get the employee name (when update or add a new employee)
// 	employeeName: [
// 		{
// 			type: 'input',
// 			name: 'firstName',
// 			message: 'Please enter the first name of the new employee',
// 			// validate if the input is letter only
// 			validate: function (value) {
// 				let pass = false;
// 				if (value.match(/^[A-Za-z]+$/) && value != '') {
// 					pass = true;
// 				}
// 				if (pass) {
// 					return true;
// 				}
// 				return 'Please enter the name with at least one letter and with letter only';
// 			},
// 		},
// 		{
// 			type: 'input',
// 			name: 'lastName',
// 			message: 'Please enter the last name of the new employee',
// 			// validate if the input is letter only
// 			validate: function (value) {
// 				let pass = false;
// 				if (value.match(/^[A-Za-z]+$/) && value != '') {
// 					pass = true;
// 				}
// 				if (pass) {
// 					return true;
// 				}
// 				return 'Please enter the name with at least one letter and with letter only';
// 			},
// 		},
// 	],
// 	//  get the employee manager (when update or add a new employee)
// 	manager: [
// 		{
// 			type: 'list',
// 			name: 'manager',
// 			message: 'Who is the manager of this employee?',
// 			choices: managerChoice,
// 		},
// 	],
// 	// get the role for the employee (when update or add a new employee)
// 	role: [
// 		{
// 			type: 'list',
// 			name: 'role',
// 			message: 'What is the role of this employee?',
// 			choices: roleChoice,
// 		},
// 	],
// 	// get the department for the employee (when update or add a new employee)
// 	department: [
// 		{
// 			type: 'list',
// 			name: 'department',
// 			message: 'What is the department of this employee?',
// 			choices: departmentChoice,
// 		},
// 	],
// };
