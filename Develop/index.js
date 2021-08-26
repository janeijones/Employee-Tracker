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
                    // employee -> {first_name: 'Nei;, last_name: 'Jones', role_id: 2, manager_id: NULL}
                        connection.query("SELECT name, id AS value FROM role", (error, departments) => {

                        inquirer.prompt([
                            { name: 'first_name', message: 'What is their first name?' },
                            { name: 'last_name', message: 'What is their last name?' },
                            { type: 'list', name: 'role_id', message: 'What is their role id?', choices: roles },
                            { type: 'list', name: 'manager_id', message: 'What is their manager id?', choices: managers },
                        ])
                            .then((employee) => {
                                connection.query("INSERT INTO employee SET?", employee, () => {
                                    askPrompts();
                                });
                            });
                    })
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