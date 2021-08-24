const inquirer = requier ("inquirer")
const fs = requier("fs")
const mysql = requier("mysql")
const dataBase = mysql.CreateConnection({
    host:'localhost',
    port:3306,
    password: 'moz4m$',
    dataBase: 'employee_db'
})
function startProgram(){
    //make a promt to ask questions 

    //.then and put a switch statment 

}
function viewAllEmployees(){
    dataBase.query()
}
function addEmployee(){
    dataBase.query(//prompt questions )

}

//do a combanation of this for everything else 