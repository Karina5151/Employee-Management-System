-- Push user input into DB instead of an array like previous HWs...
USE employee_trackerDB;


INSERT INTO department (id, name)
-- VALUES ("vanilla", 2.50, 100);

INSERT INTO role (id, title, salary, department_id)
-- VALUES ("chocolate", 3.10, 120);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
-- VALUES ("strawberry", 3.25, 75);