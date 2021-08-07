const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require('figlet');


// START MENU Prompt in Terminal
const startMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "startMenu",
            message: "Choose an option:",
            choices: [
                "View departments, roles, or employees",
                "Add a department, role, or employee",
                "Update an employee's role",
                "Exit"
            ],
        }
    ])
        .then((res) => {
            switch (res.startMenu) {
                case "View departments, roles, or employees":
                    viewMenu();
                    break;

                case "Add a department, role, or employee":
                    addMenu();
                    break;

                case "Update an employee's role":
                    updateMenu();
                    break;

                case "Exit":
                    connection.end();
                    break;

                // default:
                //     break;
            }
        });
}

// VIEW MENU Prompt in Terminal
const viewMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "viewMenu",
            message: "Choose an option to view:",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                "All",
                "Back to Start Menu"
            ],
        }
    ])
        .then((res) => {
            switch (res.viewMenu) {
                case "Departments":
                    viewDepartments();
                    break;

                case "Roles":
                    viewRoles();
                    break;

                case "Employees":
                    viewEmployees();
                    break;

                case "All":
                    viewAll();
                    break;

                case "Back to Start Menu":
                    startMenu();
                // break;

                // default:
                //     break;
            }
        });
}

// VIEW DEPARTMENT
const viewDepartments = () => {
    let viewDept = 'SELECT department.name, department.id FROM department;';

    connection.query(viewDept, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewMenu();
    })
};

// VIEW  ROLE
const viewRoles = () => {
    let viewRole = 'SELECT role.title, role.salary, role.id, role.department_id FROM role;';

    connection.query(viewRole, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewMenu();
    })
};

// VIEW EMPLOYEE
const viewEmployees = () => {
    let viewEmployee = 'SELECT employee.first_name, employee.last_name FROM employee;';

    connection.query(viewEmployee, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewMenu();
    })
};

// VIEW ALL
const viewAll = () => {
    let viewingAll = 'SELECT employee.first_name, employee.last_name, department.name AS department, role.title, role.salary ';
    viewingAll +=
        'FROM employee LEFT JOIN role ON employee.role_id = role.id ';
    viewingAll +=
        'LEFT JOIN department department ON role.department_id = department.id';

    connection.query(viewingAll, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewMenu();
    })
};

// ADD MENU Prompt in Terminal
const addMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "addMenuChoice",
            message: "Choose an option to add:",
            choices: [
                "Department",
                "Role",
                "Employee",
                "Back to Start Menu"
            ],
        }
    ])
        .then((res) => {
            switch (res.addMenuChoice) {
                case "Department":
                    addDepartment();
                    break;

                case "Role":
                    addRole();
                    break;

                case "Employee":
                    addEmployee();
                    break;

                case "Back to Start Menu":
                    startMenu();
                // break;

                // default:
                //     break;
            }
        });
}

// ADD DEPARTMENT
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "New department name is:"
        }
    ])
        .then((res) => {
            let query = 'INSERT INTO department SET ?';

            connection.query(query, res, (err, res) => {
                if (err) throw err;
                console.log("New department added!");

                addMenu();
            });
        });
}

// ADD ROLE
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "New role name is:"
        },
        {
            type: "input",
            name: "salary",
            message: "This new role's salary:"
        },
        {
            type: "input",
            name: "department_id",
            message: "This new role's department ID?"
        }
    ])
        .then((res) => {
            let insertRole = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);';

            connection.query(insertRole, [res.title, res.salary, res.department_id], (err, res) => {
                if (err) throw err;
                console.log("New role added!");

                addMenu();
            })
        })
}

// ADD EMPLOYEE
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "New employee's first name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "New employee's last name:"
        },
        {
            type: "input",
            name: "roleId",
            message: "New employee's role ID:"
        },
        {
            type: "input",
            name: "managerId",
            message: "The manager ID of the new employee:"
        }])
        .then((res) => {
            let insertEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);';

            connection.query(insertEmployee, [res.firstName, res.lastName, res.roleId, res.managerId], (err, res) => {
                if (err) throw err;
                console.log("New employee added!");

                addMenu();
            })
        })
}

// UPDATE MENU Prompt in Terminal
const updateMenu = async () => {
    var employees = await connection.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;

        // display employees you can choose to update
        const employeeChoices = employees.map(({ id, first_name, last_name }) => {
            return { name: `${first_name} ${last_name}`, value: id }
        });

        inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Choose an employee to update:",
                choices: employeeChoices
            }
        ])
            .then((employeeID) => {
                connection.query('SELECT * FROM role', (err, roles) => {
                    if (err) throw err;

                    // display the chosen employee's possible roles you could update them to
                    const roleChoices = roles.map(({ id, title }) => {
                        return { name: `${title}`, value: id }
                    });

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "roles",
                            message: "Choose a new role for the employee:",
                            choices: roleChoices
                        }
                    ])
                        // update the employee's role
                        .then((roleId) => {
                            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId.roles, employeeID.employeeId], (err, result) => {
                                if (err) throw err;

                                startMenu();
                            })
                        });
                })
            })
    })
}

// Run the figlet style 'Employee Tracker' Header
figlet('Employee Tracker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    // Start the Start Menu prompts
    startMenu();
});

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log("We are connected!");
});