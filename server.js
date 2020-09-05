// start the logo js for displaying the logo
const logo = require('./logo');
// get the consloe table module for display the result
const cTable = require('console.table');
//
const inquirer = require('inquirer');
const prompts = require('./prompt');
const db = require('./database');

async function viewAllDept() {
	const depts = await db.viewAllDept();

	console.table(depts);
}

// viewAllDept();
