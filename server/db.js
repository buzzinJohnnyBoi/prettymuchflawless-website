const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'pmf',
    password: 'xeCbA#Du#%uD3}@Z',
    database: 'pmfwebsite',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

module.exports = connection;