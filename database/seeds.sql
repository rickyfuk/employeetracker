-- open The employeetracker DB
USE employeetracker;

-- Insert 3 department into the database
INSERT INTO department (name)
VALUES ("Gryffindor"),
("Hufflepuff"),
("Ravenclaw");
-- for furture test
-- VALUES ("Slytherin");

-- Insert 6 values in the staffrole table
INSERT INTO staffrole (title,salary,department_id)
VALUES ("Head of Gryffindor","40000",1),
("Gryffindor Leader","20000",1),
("Gryffindor Member","10000",1),
("Head of Hufflepuff","25000",2),
("Hufflepuff Leader","15000",2),
("Hufflepuff Member","8000",2),
("Head of Ravenclaw","30000",3),
("Ravenclaw Leader","17000",3),
("Ravenclaw Member","9000",3);
-- for future test
-- VALUES ("Head of Slytherin","35000",1),
-- ("Slytherin Leader","22000",1),
-- ("Slytherin Member","11000",1),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Minerva", "McGonagall", 1, null),
("Harry", "Potter", 2, 1),
("Ron", "Weasley", 3, 1),
("Pomona", "Sprout", 4, null),
("Newton", "Scamander", 5, 4),
("Ernest", "Macmillan", 6, 4),
("Filius", "Flitwick", 7, null),
("Luna", "Lovegood", 8, 7),
("Cho", "Chang", 9, 7);
-- for future test
-- VALUES ("Severus", "Snape", 10, null),
-- ("Draco", "Malfoy", 11, 10),
-- ("Gregory", "Goyle", 12, 10),
-- ("Hermione", "Granger",2,1)
