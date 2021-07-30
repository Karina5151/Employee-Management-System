const connection = require("./db/connection")

// Action Menu Prompt in Terminal
const actionMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option:",
            choices: [
            "Add a Department", 
            "Add a Role", 
            "Add an Employee", 
            "View Departments", 
            "View Roles", 
            "View Employees", 
            "Update Employee Roles"],
            name: "actionMenu"
        }
    ])
        .then(resp => {
            switch (resp.addEmployee) {
                case "Add Engineer to Team":
                    addEngineer();
                    break;

                case "Add Intern to Team":
                    addIntern();
                    break;

                case "Exit Application":
                    exitApp();
                    break;

                default:
                    break;
            }
        })
}

// Push user input into DB instead of an array like previous HWs...
// const query = connection.query(
//     'INSERT INTO products SET ?',
//     {
//       flavor: 'Rocky Road',
//       price: 3.0,
//       quantity: 50,
//     }

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log("We are connected!");
  });