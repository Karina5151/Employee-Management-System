DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- Create department table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

-- Create role table
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

-- Create employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL
);

-- -- Join the employee and role tables
-- SELECT employee.first_name, employee.last_name AS employee, role.title, role.salary AS role FROM employee JOIN role ON employee.role_id = role.id;

-- -- Joins all 3 tables
-- SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name 
--   FROM ((employee INNER JOIN role ON employee.role_id = role.id ) 
--   INNER JOIN department ON employee.department_id = department.id);
