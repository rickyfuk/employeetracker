const logo = require('asciiart-logo');
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');

const config = require('./package.json');
config.font = 'Calvin S';
config.logoColor = 'green';
config.textColor = 'green';
config.borderColor = 'grey';
console.log(logo(config).render());
