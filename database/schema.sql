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



-- view all staff
SELECT 
S2.id, S2.first_name, S2.last_name,
staffrole.title,staffrole.salary,
department.name,
(CONCAT(s1.first_name, ' ', s1.last_name)) AS manager
FROM employee As S1
Right JOIN employee as S2 on (S1.id = S2.manager_id)
LEFT JOIN staffrole on (S2.role_id = staffrole.id)
LEFT JOIN department on (staffrole.department_id = department.id);