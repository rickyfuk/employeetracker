-- open The employeetracker DB
USE employeetracker;

-- Insert 3 department into the database
INSERT INTO department (name)
VALUES ("Gryffindor"),
("Hufflepuff"),
("Ravenclaw");
-- VALUES ("Slytherin");

-- Insert 6 values in the staffrole table
INSERT INTO staffrole (title,salary,department_id)
VALUES ("Head","12000"),
("Hufflepuff"),
("Ravenclaw");

-- INSERT INTO colleges (name)
-- VALUES ("Boston College");

-- INSERT INTO colleges (name)
-- VALUES ("Harvard");

-- /* OR */
-- INSERT INTO colleges (name)
-- VALUES ("Emerson"), ("Northeastern"), ("MIT");

-- -- SELECT * FROM boston.college;
