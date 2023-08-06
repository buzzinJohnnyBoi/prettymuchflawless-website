const express = require("express");
const connection = require("./db.js");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

connection.query('SELECT * FROM mainpages', (err, results) => {
    if (err) throw err;
    console.log('Query results:', results);
});

app.post("/getAllPageNames", (req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM mainpages;", function(error, results, fields) {
        if (error) {
            console.error(error);
        } else {
            if (results.length > 0) {
                let returnJson = [];
                for (let i = 0; i < results.length; i++) {
                    const row = results[i];
                    returnJson.push({
                        name: row.name,
                        link: row.link,
                    });
                }
                res.json(returnJson);
            } else {
                res.json(null);
                console.log('No rows found');
            }
            console.log('Found');
        }
    });
});

app.post("/getPage", (req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM mainpages WHERE link = ?;", [req.body.link], function(error, results, fields) {
        if (error) {
            console.error(error);
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.json(null);
                console.log('No rows found');
            }
            console.log('Found');
        }
    });
});
app.post("/updatePage", (req, res) => {
    console.log(req.body);
    connection.query("UPDATE mainpages SET layout = ? WHERE link = ?;", [req.body.layout, req.body.link], function(error, results, fields) {
        if (error) {
            console.error(error);
        } else {
            if (results.length > 0) {
                res.json('updated succeful');
            } else {
                res.json(null);
                console.log('No rows found');
            }
        }
    });
});
app.post("/create", (req, res) => {
    console.log(req.body);
    connection.query("INSERT INTO mainpages (name, link, layout) VALUES (?, ?, ?);", [req.body.name, req.body.link, JSON.stringify([])], function(error, results, fields) {
        if (error) {
            console.error(error);
        } else {
            if (results.length > 0) {
                res.json('updated succeful');
            } else {
                res.json(null);
                console.log('No rows found');
            }
        }
    });
});

app.listen(3003, () => {
    console.log(`Server is listening on port ${3003}`);
});