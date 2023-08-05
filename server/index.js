const connection = require("./db.js");

connection.query('SELECT * FROM mainpages', (err, results) => {
    if (err) throw err;
    console.log('Query results:', results);
});