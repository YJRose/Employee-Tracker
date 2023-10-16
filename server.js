const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: 'edcRFVtgb123$',
        database: 'employee_tracker_db'

    },
    console.log(`Connected to the employee_tracker_db database.`)
);

// Prompt user for what they would like to do
mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'mainMenu',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
            },
        ])
        .then((response) => {
            switch (response.mainMenu) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployeeRole();
                    break;
            }
        });
}



viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        mainMenu();
    });
};

viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        mainMenu();
    });
};

viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        mainMenu();
    });
};

addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'departmentName',
            },
        ])
        .then((response) => {
            db.query('INSERT INTO department (name) VALUES (?)', response.departmentName, function (err, results) {
                db.query('SELECT * FROM department', function (err, results) {
                console.log(results);
                mainMenu();
                }
            )}
            );
        });
};

addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'roleSalary',
            },
            {
                type: 'input',
                message: 'What is the department id of the role?',
                name: 'roleDepartmentId',
            },
        ])
        .then((response) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.roleName, response.roleSalary, response.roleDepartmentId], function (err, results) {
                db.query('SELECT * FROM role', function (err, results) {
                console.log(results);
                mainMenu();
                }
            )}
            );
        }
        );
}
            
addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'employeeLastName',
            },
            {
                type: 'input',
                message: 'What is the role id of the employee?',
                name: 'employeeRoleId',
            },
            {
                type: 'input',
                message: 'What is the manager id of the employee?',
                name: 'employeeManagerId',
            },
        ])
        .then((response) => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [response.employeeFirstName, response.employeeLastName, response.employeeRoleId, response.employeeManagerId], function (err, results) {
                db.query('SELECT * FROM employee', function (err, results) {
                console.log(results);
                mainMenu();
                }
            )}
            );
        }
        );
}  

updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the id of the employee?',
                name: 'employeeId',
            },
            {
                type: 'input',
                message: 'What is the new role id of the employee?',
                name: 'employeeRoleId',
            },
        ])
        .then((response) => {
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.employeeRoleId, response.employeeId], function (err, results) {
                db.query('SELECT * FROM employee', function (err, results) {
                console.log(results);
                mainMenu();
                }
            )}
            );
        }
        );
}


mainMenu();


