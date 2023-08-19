const express = require("express");
const connection = require("./db.js");
const app = express();
const cors = require('cors');
const multer = require('multer')
const fs = require("fs");
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

// connection.query('SELECT * FROM mainpages', (err, results) => {
//     if (err) throw err;
// });

app.post("/getAllPageNames", (req, res) => {
    connection.query("SELECT * FROM mainpages;", function(error, results, fields) {
        if (error) {
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
            }
        }
    });
});

app.post("/getPage", (req, res) => {
    connection.query("SELECT * FROM mainpages WHERE link = ?;", [req.body.link], function(error, results, fields) {
        if (error) {
        } else {
            if (results.length > 0) {
                if(req.body.link == 'YouTube') {
                    try {
                        const jsonData = fs.readFileSync("videos.json", "utf-8");
                        const videoData = JSON.parse(jsonData);
                        results[0].videos = videoData;
                        res.json(results[0]);
                      } catch (error) {
                      }
                    const jsonData = fs.readFileSync("videos.json", "utf-8");
                }
                else {
                    res.json(results[0]);
                }
            } else {
                res.json(null);
            }
        }
    });
});

app.post("/uploadImage", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        const referer = req.headers.referer;
        uploadImage(req, res, (err) => {
            if (err) {
            res.sendStatus(500);
            }
            else {
                res.send(req.file);
            }
        });
    }
});

app.post("/updatePage", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("UPDATE mainpages SET layout = ? WHERE link = ?;", [req.body.layout, req.body.link], function(error, results, fields) {
            if (error) {
            } else {
                if (results.length > 0) {
                    res.json('updated succeful');
                } else {
                    res.json(null);
                }
            }
        });
    }
});
app.post("/create", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("INSERT INTO mainpages (name, link, layout) VALUES (?, ?, ?);", [req.body.name, req.body.link, JSON.stringify({text: [{id: 0, content: 'add something'}], image: [], video: []})], function(error, results, fields) {
            if (error) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
    }
});
app.post("/update", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("UPDATE mainpages SET name = ?, link = ? WHERE name = ?;", [req.body.newName, req.body.newLink, req.body.name], function(error, results, fields) {
            if (error) {
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
    }
});
app.post("/delete", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("DELETE FROM mainpages WHERE name = ? AND link = ?;", [req.body.name, req.body.link], function(error, results, fields) {
            if (error) {
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
    }
});

// article stuff

app.post("/createArticle", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("INSERT INTO articles (name, link, layout) VALUES (?, ?, ?);", [req.body.name, req.body.link, JSON.stringify({text: [{id: 0, content: 'add something'}], image: [], video: []})], function(error, results, fields) {
            if (error) {
                res.json(false);
            } else {
                res.json(true);
            }
        });
    }
});

app.post("/deleteArticle", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("DELETE FROM articles WHERE name = ? AND link = ?;", [req.body.name, req.body.link], function(error, results, fields) {
            if (error) {
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
    }
});

app.post("/getAllArticles", (req, res) => {
    connection.query("SELECT * FROM articles;", function(error, results, fields) {
        if (error) {
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
            }
        }
    });
});

app.post("/getArticle", (req, res) => {
    connection.query("SELECT * FROM articles WHERE link = ?;", [req.body.link], function(error, results, fields) {
        if (error) {
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.json(null);
            }
        }
    });
});

app.post("/updateArticle", (req, res) => {
    const referer = req.headers.referer;
    if(referer == "http://192.168.1.240:3001/") {
        connection.query("UPDATE articles SET layout = ? WHERE link = ?;", [req.body.layout, req.body.link], function(error, results, fields) {
            if (error) {
            } else {
                if (results.length > 0) {
                    res.json('updated succeful');
                } else {
                    res.json(null);
                }
            }
        });
    }
});

app.listen(3003, () => {
    console.log("Listening on 3003");
});