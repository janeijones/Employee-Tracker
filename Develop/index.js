const connection = require("./connection")

const inquirer = require("inquirer")
const fs = require("fs")
const mysql = require("mysql")




function askPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then((answers) => {
        switch (answers.choice) {
            case 'ADD_DEPARTMENT':
                inquirer.prompt([
                    {
                        name: 'name',
                        message: 'What is the name?'
                    }
                ])
                    .then((department) => {
                        connection.query("INSERT INTO department SET ?", department, () => {
                            askPrompts();
                        })
                    })
            break;
            case 'VIEW_DEPARTMENTS':
                connection.query("SELECT * FROM department", (error, data) => {
                    console.table(data);
                });
            break;
            case 'ADD_ROLE':
                connection.query("SELECT name, id AS value FROM department", (error, departments) => {

                    inquirer.prompt([
                        { name: 'title', message: 'What is the role title?' },
                        { name: 'salary', message: 'What is the salary?' },
                        { type: 'list', name: 'department_id', message: 'What is the department id?', choices: departments },
                    ])
                        .then((role) => {
                            connection.query("INSERT INTO role SET ?", role, () => {
                                askPrompts();
                            });
                        });
                })
                break;
            case 'VIEW_ROLES':
                connection.query("SELECT title, salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id", (error, data) => {
                    console.table(data);
                    askPrompts();
                });
            break;
            case 'ADD_EMPLOYEE':
                connection.query("SELECT id AS value, first_name AS name FROM employee WHERE manager_id IS NULL", (error, managers)=> {
                connection.query("SELECT id AS value, title AS name FROM role", (error, roles) => {
                        inquirer.prompt([
                            { name: 'first_name', message: 'What is their first name?' },
                            { name: 'last_name', message: 'What is their last name?' },
                            { type: 'list', name: 'role_id', message: 'What is their role?', choices: roles },
                            { type: 'list', name: 'manager_id', message: 'Who is their manager?', choices: [{ value: null, name: 'None' }].concat(managers || []) },
                        ])
                            .then((employee) => {
                                console.log(employee);
                                connection.query("INSERT INTO employee SET ?", employee, () => {
                                    askPrompts();
                                });
                            });
                    });
                });
                break;
                case 'VIEW_EMPLOYEES':
                    connection.query(`SELECT employee.first_name,
                    employee.last_name,
                    role.title,
                    role.salary,
                    manager.first_name AS manager_first_name,
                    manager.last_name AS manager_last_name
                    FROM employee 
                    JOIN role ON employee.role_id = role.id 
                    JOIN employee AS manager ON employee.manager_id = manager.id`, (error, data) => {
                        console.table(data);
                        askPrompts();
                    });
                break;
                case 'UPDATE_EMPLOYEE_ROLE':

                
                break;

        }

    });
}


// function viewAllEmployees() {
//     dataBase.query()
// }
// function addEmployee({
//     dataBase.query()//prompt questions )

// }

askPrompts();
//do a combanation of this for everything else