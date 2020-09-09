# Project Name

Homework 11 - Employee Tracker

# Table of contents

- [Project Name](#project-name)
- [Table of contents](#table-of-contents)
- [General info](#general-info)
- [Video Demo](#video-demo)
- [Features](#features)
- [Installation](#installation)
- [User Guide](#user-guide)
- [Code Style](#code-style)
- [Technology](#technology)
- [Local File Description](#local-file-description)
- [Status](#status)
- [Future Plan](#future-plan)
- [Create By](#create-by)

# General info

This project is to bulid a application to track all the employee data where the data will read or write into a database.

For the feature of the site, please visit the [Features](#features) section for more details.

# Video Demo

![employee tracker demo](./asset/employeeTracker.gif)

You might also visit the following youtube link for the demo:
[employee tracker demo](https://youtu.be/-vBVqukc0I0)

# Features

In this application, the following features have been applied:

1. All the data is read from or written from the employeetracker database
2. The user can perform the following function from this application:
   | Options | Description |
   | :----------: | :--------------------------------: | :----------: |
   | View all employees | Generate a table for a full employee list |
   | View all employees by department | Generate a table for a full employee list under the selected department |
   | View all employees by roles | Generate a table for a full employee list under the selected role |
   | View all employees by Manager | Generate a table for a full employee list under the selected manager |
   | View all Manager | Generate a table for a full manager list |
   | View Total Salary Spending | Generate the total salary and a salary table by department level |
   | Add a new employee | Add a new employee to the database |
   | View all departments | Generate a table for a departments list |
   | View Salary Spending by Department | Generate the total salary of the department and a salary table by job level / staff level |
   | Add a new department | Add a new department to the database |
   | View all roles | Generate a table for a roles list |
   | Add a new role | Add a new role to the database |
   | Update employee role | Update the role of an existing staff |
   | Update employee's manager | Update the manager of an existing staff |
   | Update employee's First name | Update the first name of an existing staff |
   | Update employee's Last name | Update the last name of an existing staff |
   | Exit the application | Quit the application |
3. All roles / departments (except add a new role / department) will be presented in a list for selection where required.
4. The employee without a manager will keep the manager_id as 'Null' (Please select 'None' if the employee has no manager).

# Installation

The user must install the npm package before they run this application:

```sh
npm install
```

The user must use build a database with the following 3 tables before they run this application:

1. department
2. staffrole
3. employee

For MySQL Workbench:

```sql
-- Schema for SQL database/table
DROP DATABASE IF EXISTS employeetracker;

/* Create database */
CREATE DATABASE employeetracker;
USE employeetracker;

/* Create department table with
1. deparment id - primary key that auto-increments
2. department name - a text field */
CREATE TABLE department (
  -- use unsigned for all positive number
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);

/* Create staffrole table with
1. role id - a primary key that auto-increment
2. title - a text field to keep the staff title
3. salary -  a number value to keep the position salary
4. department id - a foreign ID for the deparment ID from departmant table */
CREATE TABLE staffrole (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  /* for deparment ID
    - add constraint for easier to drop the foreign relationship if needed
    - define the foreign relationship with the id from department table */
  CONSTRAINT FK_departmentid
  FOREIGN KEY (department_id)
  REFERENCES department(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (id)
);


/* Create employee table with
1. employee id - a primary key that auto-increment
2. first name - a text field to keep the staff first name
3. last name -  a text field to keep the staff first name
4. role id - a foreign ID for the role ID from staffrole table
5. manager id - a foreign ID for the employee ID who is the manager for the staff from the employee table (same table)*/
CREATE TABLE employee (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  manager_id INT UNSIGNED,
  /* for role ID
    - add constraint for easier to drop the foreign relationship if needed
    - define the foreign relationship with the role id from staffrole table */
  CONSTRAINT FK_roleid
  FOREIGN KEY (role_id)
  REFERENCES staffrole(id)ON UPDATE CASCADE ON DELETE CASCADE,
  /* for manager ID
    - add constraint for easier to drop the foreign relationship if needed
    - define the foreign relationship with the employee id from employee table */
  CONSTRAINT FK_managerid
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (id)
);

```

# User Guide

1. The user need to enter the following code in terminal to execute the application

```sh
node server.js
```

2. The user will get the 17 options to perform different functions on the main page.
3. Please make sure the password for your database has been enter on the connection.js before the application is running

# Code Style

Standard

# Technology

The following technology have been used for this project:

1. [JavaScript](https://www.javascript.com/)
2. [NodeJS](https://nodejs.org/en/)
3. [NPM](https://www.npmjs.com/)
   - The following application from NPM have been used:
   1. [asciiart-logo](https://github.com/tomi-vanek/asciiart-logo#readme)
   2. [console.table](https://github.com/bahmutov/console.table)
   3. [inquirer](https://github.com/SBoudrias/Inquirer.js#readme)
   4. [mysql](https://github.com/mysqljs/mysql#readme)
4. [MySQL](https://www.mysql.com/)

# Local File Description

Below are the description for all local files:

1. Main folder:
   1. server.js - The main JS file for transitting the information between files
   2. prompt.js - A JS file keep all the question bulid up and return the result to server.js
   3. package.json - A file keep the project details
2. Asset:
   1. employeeTracker.gif - the gif file for the demo in readMe
3. Database:
   1. connection.js - The JS file keeps the connection details to the database
   2. index.js - The JS file to keep all the reading and writing query to/from database

# Status

Project status: finished

# Future Plan

Plan for the future development of this site:

1. Group the functions into parts and build another layer on top of the current selection.
2. Go live on cloud drive
3. Export to HTML with a nicer outlook

# Create By

Created by Chung Hei Fuk
