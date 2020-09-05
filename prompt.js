const db = require('./database');
const inquirer = require('inquirer');
const managerChoice = [];
const roleChoice = [];
const departmentChoice = [];

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
				'Add a new employee',
				'View all departments',
				'Add a new department',
				'View all roles',
				'Add a new role',
				'Update employee roles',
				'Exit the application',
			],
		},
	]);
	return answer;
};

// for the department selection function
const deptselection = async () => {
	const depts = await db.findAllDept();
	for (let i = 0; i < depts.length; i++) {
		departmentChoice.push(depts[i].name);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'department',
			message: 'What is the department of this employee?',
			choices: departmentChoice,
		},
	]);
	return answer;
};

// for the role selection function
const roleselection = async () => {
	const roles = await db.findAllRole();
	for (let i = 0; i < roles.length; i++) {
		roleChoice.push(roles[i].title);
	}
	const answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'role',
			message: 'What is the department of this employee?',
			choices: roleChoice,
		},
	]);
	return answer;
};

module.exports = { mainselection, deptselection, roleselection };

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
