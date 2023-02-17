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
  let sql = 'SELECT * FROM role';
  db.query(sql, (err, result) => {
      if (err) throw err;

      res.send(result);
      return sql;
  });
});
app.get('/employee', (req, res) => {
  let sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
      if (err) throw err;

      res.send(result);
      return sql
  });
});

app.post('/add_dept/name', (req, res) => {
  const name = req.params.name;
  const query = 'INSERT INTO department (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding department');
    } else {
      res.send('Department added successfully');
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