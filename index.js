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
                .then(({ titleArray, jsonData }) => roleQuestions(titleArray, jsonData));
        }
        else if (answers.choice == 'Add an Employee') {

            getRolesandEmployees()
                .then(({ roleArray, managerArray, data }) => employeeQuestions(roleArray, managerArray, data));
        }
        else if (answers.choice == 'Update an Employee Role') {
            //    TO DO: create back end and front end to update an employee 
            getEmployees()
                .then((sql) => renderManagerChoices(sql))
                .then(({ managerArray, jsonData }) => updateRoleQuestions(managerArray, jsonData));
        }
        else if (answers.choice == 'Quit') {
            console.log("******Thank you for using Employee Tracker!!!******");
        }
    })

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
function employeeQuestions(titleArray, managerArray, data) {

    inquirer.prompt([
        {
            type: 'input',
            name: 'fName',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'lName',
            message: 'What is the employees last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: titleArray,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employees manager?',
            choices: managerArray,
        },
    ]).then(answers => {
        let fName = answers.fName;
        let lName = answers.lName;
        let roleId = 0;
        let managerId =0;
console.log(answers.role)
        for (let i = 0; i < data.result.length; i++) {
            console.log(data.result[i].title);
            if (data.result[i].title == answers.role) {
               roleId = i + 1;
            }
        }
        console.log(roleId)
        console.log(answers.manager)
        let result = answers.manager.split(" ");
        let managerFName = result[1]
        let managerLName =  result[2]
        for (let i = 0; i < data.managerResult.length; i++) {
            if (data.managerResult[i].first_name == managerFName && data.managerResult[i].last_name) {
               managerId = data.managerResult[i].id;
            }
        }
console.log(managerId)
addEmployee(fName, lName, roleId, managerId)
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
const getRolesandEmployees = () =>
    // fetch('http:localhost:3001/rolesandemployees', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },

    // });

    fetch('http:localhost:3001/rolesandemployees')
  .then(response => response.json())
  .then(data => processData(data))
  .catch(error => console.error(error));

const renderData = async (sql) => {
    let jsonData = await sql.json();
    console.table(jsonData);
    console.log(`\n`);
    allChoices();
}
const renderDeptChoices = async (sql) => {
    let jsonData = await sql.json();
    let titleArray = [];
    for (let i = 0; i < jsonData.length; i++) {
        titleArray.push(jsonData[i].department);

    }
    return { titleArray, jsonData };
}
const renderRoleChoices = async (sql) => {
    let jsonData = await sql.json();
    let titleArray = [];
    for (let i = 0; i < jsonData.length; i++) {
        titleArray.push(jsonData[i].title);

    }
    return { titleArray, jsonData };
}
function processData(data) {
    let roleArray = [];
    for (let i = 0; i < data.result.length; i++) {
        roleArray.push(data.result[i].title);
    }
         let managerArray = []; 
         let managerArray2 = [];
 for (let i = 0; i < data.managerResult.length; i++) { 
   let managerName = ` ${data.managerResult[i].first_name} ${data.managerResult[i].last_name}`;
   managerArray2.push(managerName, data.managerResult[i].id );
   managerArray.push(managerName);
  }
  console.log("line 204")
  console.log(roleArray)
    return { roleArray, managerArray, managerArray2, data };
 }
//     renderRoleChoices(sql)
//     renderManagerChoices(sql2)
//     return {titleArray, managerArray}

//     let roleData = await sql.json();
//     let employeeData = await sql2.json();
//     let roleArray = [];
//     let managerArray = []; // Declare managerArray outside of the for loop to be able to add elements to it
//     for (let i = 0; i < roleData.length; i++) { // Use roleData instead of jsonData
//       roleArray.push(roleData[i].title);
//     }
//     for (let i = 0; i < employeeData.length; i++) { // Use employeeData instead of jsonDataMgr
//       let managerName = ` ${employeeData[i].first_name} ${employeeData[i].last_name}`;
//       managerArray.push(managerName);
//     }
//     return { roleArray, managerArray }; // Move the return statement outside of the for loops
//   }
  

    const renderManagerChoices = async (sql) => {
        let jsonDataMgr = await sql.json();
        let managerArray = [];
        for (let i = 0; i < jsonDataMgr.length; i++) {
            let managerName = ` ${jsonDataMgr[i].first_name} ${jsonDataMgr[i].last_name}`
            managerArray.push(managerName);
        }
        return { managerArray };
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
    const addEmployee = (fName, lName, roleId, managerId) => {
        fetch(`http://localhost:3001/add_employee/${fName}/${lName}/${roleId}/${managerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name: fName, last_name: lName, role_id: roleId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add employee');
                }
                console.log('Employee added successfully');
                allChoices();
            })
            .catch((error) => {
                console.error(error);
            });
    };
    allChoices();