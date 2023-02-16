const express = require('express');
const mysql = require('mysql2');
const path = require('path');

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
app.get('/api/*', (req, res) => {
  console.log(req.body);
  db.query('SELECT * FROM employee', function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(results);
      res.json(results);
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