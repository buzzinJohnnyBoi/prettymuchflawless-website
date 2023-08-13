const express = require("express");
const connection = require("./db.js");
const app = express();
const cors = require('cors');
const multer = require('multer')

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})
const uploadImage = multer({ storage: storage }).single('file')

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

app.post("/uploadImage", (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
          res.sendStatus(500);
        }
        else {
            res.send(req.file);
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
    connection.query("INSERT INTO mainpages (name, link, layout) VALUES (?, ?, ?);", [req.body.name, req.body.link, JSON.stringify({text: [{id: 0, content: 'add something'}], image: [], video: []})], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.json(false);
        } else {
            res.json(true);
        }
    });
});
app.post("/update", (req, res) => {
    console.log(req.body);
    connection.query("UPDATE mainpages SET name = ?, link = ? WHERE name = ?;", [req.body.newName, req.body.newLink, req.body.name], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.json(false);
        } else {
            if (results.changedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
    });
});
app.post("/delete", (req, res) => {
    console.log(req.body);
    connection.query("DELETE FROM mainpages WHERE name = ? AND link = ?;", [req.body.name, req.body.link], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.json(false);
        } else {
            if (results.affectedRows > 0) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
    });
});

app.listen(3003, () => {
    console.log(`Server is listening on port ${3003}`);
});