const database = require("./connection")

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
                        database.query("INSERT INTO department SET ?", department, () => {
                            askPrompts();
                        })
                    })
                break;
        }

    })
}


// function viewAllEmployees() {
//     dataBase.query()
// }
// function addEmployee({
//     dataBase.query()//prompt questions )

// }

askPrompts(); 
//do a combanation of this for everything else 