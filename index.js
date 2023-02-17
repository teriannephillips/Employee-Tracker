//required packages
import inquirer from "inquirer"
//import console_table from "console.table"
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
            getDepartments().then(renderData);
        }
        else if (answers.choice == 'View all Roles') {
            getRoles().then(renderData)
        }
        else if (answers.choice == 'View all Employees') {
            getEmployees().then(renderData);
        }
        else if (answers.choice == 'Add a Department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What department name would you like to add?',
                }
            ]).then(answers => {     
            addDepartment(answers.name);
            });
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
console.log(`\n`);
allChoices();
}
const addDepartment = (name) => {
    fetch(`http://localhost:3001/add_dept/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add department');
        }
        console.log('Department added successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
allChoices();