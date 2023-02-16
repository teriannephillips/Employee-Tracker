//required packages
import inquirer from "inquirer"
import cTable from "console.table"
import fetch from "node-fetch"
function allChoices() {
   
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees',
                'Add a Department', 'Add a Role', 'Add an Employee',
                'Update an Employee Role']
        }
    ]).then(answers => {
        console.log(answers.choice);
        if (answers.choice == 'View all Departments') {
            //    TO DO: create back end to view all departments and connect to it
            getDepartments().then(renderData);
        }
        else if (answers.choice == 'View all Roles') {
            //    TO DO: create back end to view all roles and connect to it
            getRoles().then(renderData);
        }
        else if (answers.choice == 'View all Employees') {
            //    TO DO: create back end to view all employees
            getEmployees().then(renderData);
        }
        else if (answers.choice == 'Add a Department') {
            //    TO DO: create back end and front end to add a department
        }
        else if (answers.choice == 'Add a Role') {
            //    TO DO: create back end to view all employees and connect to it
        }
        else if (answers.choice == 'Add an Employee') {
            //    TO DO: create back end and front end to add an employee
        }
        else if (answers.choice == 'Update an Employee Role') {
            //    TO DO: create back end and front end to update an employee 
        }
    }
    );
}
const getDepartments = () =>
fetch('http:localhost:3001/department', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const getRoles = () =>
fetch('http:localhost:3001/role', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const getEmployees = () =>
fetch('http:localhost:3001/employee', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
const renderData = async (sql) => {
let jsonData = await sql.json();
console.table(jsonData);
}
allChoices();