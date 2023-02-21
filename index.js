//required packages
import inquirer from "inquirer"
import console_table from "console.table"
import fetch from "node-fetch"
function allChoices() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees',
                'Add a Department', 'Add a Role', 'Add an Employee',
                'Update an Employee Role', 'Quit']
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
        
            getDepartments()
            .then((sql) => renderDeptChoices(sql))
            .then(({ titleArray, jsonData}) => roleQuestions(titleArray, jsonData));
        }
        else if (answers.choice == 'Add an Employee') {
            //    TO DO: create back end and front end to add an employee
        }
        else if (answers.choice == 'Update an Employee Role') {
            //    TO DO: create back end and front end to update an employee 
        }
        else if (answers.choice == 'Quit') {
            console.log("******Thank you for using Employee Tracker!!!******");
        }
    }
    );
}
function roleQuestions(titleArray, jsonData) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this position?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this position?',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: titleArray,
        }
    ]).then(answers => {
        let title = answers.title;
        let salary = answers.salary;
        let deptId;
        for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].department == answers.department) {
                deptId = jsonData[i].id;
                console.log(deptId)
                break;
            }
        }
        addRole(title, salary, deptId);
    });
}

const getDepartments = () =>
    fetch('http:localhost:3001/department', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    })
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
const renderDeptChoices = async (sql) => {
    let jsonData = await sql.json();
    let titleArray = [];
    let deptId;
    for (let i = 0; i < jsonData.length; i++) {
        titleArray.push(jsonData[i].department);
        
    }
    return { titleArray, jsonData };
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
            allChoices();
        })
        .catch((error) => {
            console.error(error);
        });
};
const addRole = (title, salary, deptId) => {
    fetch(`http://localhost:3001/add_role/${title}/${salary}/${deptId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, salary: salary, department_id: deptId }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add role');
            }
            console.log('Role added successfully');
            allChoices();
        })
        .catch((error) => {
            console.error(error);
        });
};

allChoices();