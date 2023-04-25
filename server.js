import express from 'express'
import mysql from 'mysql2'

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Hadley@2009',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);
app.get('/department', (req, res) => {
  let sql = 'SELECT * FROM department';
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
    return sql;
  });
});
app.get('/role', (req, res) => {
 // let sql = 'SELECT * FROM role';
let sql = 'SELECT title, salary, department FROM role JOIN department ON department.id = role.department_id';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    return sql;
  });
});

app.get('/employee', (req, res) => {
  let sql = 'SELECT e.first_name, e.last_name, r.title, d.department as department, r.salary, CONCAT(m.first_name, " ", m.last_name) as manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id';
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});
app.get('/rolesandemployees', (req, res) => {
  let sql = 'SELECT title, salary, department FROM role JOIN department ON department.id = role.department_id';
  let sql2 = 'SELECT first_name, last_name, id FROM employee';
  
  db.query(sql, (err, result) => {
    if (err) throw err;

    db.query(sql2, (err, managerResult) => {
      if (err) throw err;

      res.send({ result, managerResult });
    });
  });
});



app.post('/add_dept/:name', (req, res) => {
  const name = req.params.name;
  db.query('SELECT COUNT(*) AS count FROM department WHERE department = ?', [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error checking department');
    } else {
      const count = results[0].count;
      if (count > 0) {
        console.log('Department already exists');
        res.send('Department already exists');
      } else {
        const query = 'INSERT INTO department (department) VALUES (?)';
        db.query(query, [name], (err, result) => {
          if (err) {
            console.error(err);
            result.status(500).send('Error adding department');
          } else {
            res.send("Department added");
          }
        });
      }
    }
  });
});

  app.post('/add_role/:title/:salary/:department_id', (req, res) => {
    const title = req.params.title;
    const salary = req.params.salary;
    const department_id = req.params.department_id;
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    db.query(query, [title, salary, department_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding role');
      } else {
        res.send('Role added successfully');
      }
    });
  });

  app.post('/add_employee/:fName/:lName/:role_id/:manager_id', (req, res) => {
    const fName = req.params.fName;
    const lName = req.params.lName;
    const role_id = req.params.role_id;
    const manager_id = req.params.manager_id;
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    db.query(query, [fName, lName, role_id, manager_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding employee');
      } else {
        res.send('Employee added successfully');
      }
    });
  });
  app.put('/update_employee/:role_id/:fName/:lName', (req, res) => {
    const fName = req.params.fName;
    const lName = req.params.lName;
    const role_id = req.params.role_id;
    const query = 'UPDATE employee SET role_id = ? WHERE first_name = ? && last_name = ?';
    db.query(query, [role_id, fName, lName], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating employee');
      } else {
        res.send('Employee role updated successfully');
      }
    });
  });
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });