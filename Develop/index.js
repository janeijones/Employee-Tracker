const connection = require("./connection")

const inquirer = require("inquirer")

function askPrompts() {
    inquirer.prompt([ //List of questions to for operations with employee tracker
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
            case 'ADD_DEPARTMENT': //Department added into Employee Tracker
                inquirer.prompt([
                    {
                        name: 'name',
                        message: 'What is the name?'
                    }
                ])
                    .then((department) => {
                        connection.query("INSERT INTO department SET ?", department, () => { //Department added into 'Departments'
                            askPrompts();
                        })
                    })
            break;
            case 'VIEW_DEPARTMENTS': //View all departments
                connection.query("SELECT * FROM department", (error, data) => {
                    console.table(data);
                    askPrompts();
                });
            break;
            case 'ADD_ROLE': //Add Role 
                connection.query("SELECT name, id AS value FROM department", (error, departments) => { 

                    inquirer.prompt([
                        { name: 'title', message: 'What is the role title?' },
                        { name: 'salary', message: 'What is the salary?' },
                        { type: 'list', name: 'department_id', message: 'What is the department id?', choices: departments },
                    ])
                        .then((role) => {
                            connection.query("INSERT INTO role SET ?", role, () => {  //Add job role into a department
                                askPrompts();
                            });
                        });
                })
                break;
            case 'VIEW_ROLES': //view all roles with salary and accompanying department name
                connection.query("SELECT title, salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id", (error, data) => {
                    console.table(data);
                    askPrompts();
                });
            break;
            case 'ADD_EMPLOYEE': 
                connection.query("SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id IS NULL", (error, managers)=> {
                connection.query("SELECT id AS value, title AS name FROM role", (error, roles) => {
                        inquirer.prompt([
                            { name: 'first_name', message: 'What is their first name?' },
                            { name: 'last_name', message: 'What is their last name?' },
                            { type: 'list', name: 'role_id', message: 'What is their role?', choices: roles },
                            { type: 'list', name: 'manager_id', message: 'Who is their manager?', choices: [{ value: null, name: 'None' }].concat(managers || []) },
                        ])
                            .then((employee) => {
                                connection.query("INSERT INTO employee SET ?", employee, () => { //Add employee or manager into system with accompanying job role
                                    askPrompts();
                                });
                            });
                    });
                });
                break;
                case 'VIEW_EMPLOYEES': //view all employees, manager and non manager
                    connection.query(`SELECT employee.first_name,
                    employee.last_name,
                    role.title,
                    role.salary,
                    manager.first_name AS manager_first_name,
                    manager.last_name AS manager_last_name
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (error, data) => {
                        console.table(data);
                        askPrompts();
                    });
                break;
                case 'UPDATE_EMPLOYEE_ROLE': //update an employee role from list of employees and list of roles
                    connection.query("SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee", (error, employees) => {
                        connection.query("SELECT id AS value, title AS name FROM role", (error, roles) => {
                        inquirer.prompt([
                            { type: 'list', name: 'id', message: 'Select an employee', choices: employees },
                            {type: 'list', name: 'role_id', message: 'Select a role', choices: roles }
                        ]).then((answers) => {
                            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.id], (error) => {
                                askPrompts();
                            })
                        })
                    })
                });
                break;
                default:
                    process.exit();
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