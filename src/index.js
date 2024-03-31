const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'horse_betting_db'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Registration route
app.post('/api/newuser/register', (req, res) => {
  // Extract registration data from request body
  const { username, firstName, surname, phoneNumber, idNumber, email, password } = req.body;

  // Perform validation (you may want to add validation logic here)

  // Insert the new user into the database
  const sql = 'INSERT INTO users (username, firstName, surname, phoneNumber, idNumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [username, firstName, surname, phoneNumber, idNumber, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      res.status(500).json({ message: 'Failed to register user' });
    } else {
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully', user: req.body });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
