const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const db = require("../lib/db");

const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    });
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`users\` WHERE \`userId\` = ${id}`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.json(...rows);
        }
    })
})

router.get('/:id/posts/', (req, res) => {
    const {id} = req.params;
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`posts\` WHERE \`userId\` = ${id}  ORDER BY postId DESC`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    })
})

router.post('/signup', (req, res) => {
    const getFile = () => {
        if (req.files !== null) {
            const {file} = req.files;
            return file;
        }
        return null;
    }

    const {firstName, lastName, email, password, photo} = req.body;
    console.log(req.body);
    console.log(photo);
    const removeRecord = (email, hash) => {
        db.query(`DELETE FROM \`react_expressjs_mysql\`.\`users\` WHERE (\`email\` = '${email}') and (\`password\` = '${hash}');`, (err) => {
            if (err) {
                console.log('record wasn\'t removed from database');
                // res.send({message: 'record wasn\'t removed from database'})
            }
        });
    }
    const removeData = (removeFromDatabase, photo, hash = "", email = "") => {
        if (photo !== undefined) {
            fs.unlink(path.join(__dirname, `../uploads/photos/${photo}`), (err) => {
                if (err) {
                    console.log("file is not deleted or not found");
                    // res.send({message: "file is not deleted or not found"})
                } else {
                    console.log("file is removed");
                    if (removeFromDatabase) {
                        removeRecord();
                    }
                }
            });
        } else {
            if (removeFromDatabase) {
                removeRecord(email, hash);
            }
        }
    }

    const insertFile = (id,rows,file = getFile()) => {
        console.log(`inserting ${id}`);
        mkdirp(path.join(__dirname,`../uploads/photos`)+`\\${id}`).then(
            (made) => {
                console.log("file made " + made);
                file.mv(path.join(__dirname, `../uploads/photos/${id}/${photo}`), err => {
                    if (err) {
                        console.log(file);
                        console.log(err);
                        console.log("unable to upload picture");
                        res.send({message: "unable to upload picture"});
                    } else {
                        console.log("file moved");
                        res.send({userData: rows[0], message: "data added successfully!!!"});
                    }
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                res.send({message: "folder is not created"});
            }
        )

    }

    const insertQuery = (hash) => (
        photo === undefined
            ? `INSERT INTO \`react_expressjs_mysql\`.\`users\` (\`firstName\`, \`lastName\`, \`email\`, \`password\`)
                                VALUES ('${firstName}', '${lastName}', '${email}', '${hash}');`
            : `INSERT INTO \`react_expressjs_mysql\`.\`users\` (\`firstName\`, \`lastName\`, \`email\`, \`password\`, \`photo\`)
                                        VALUES ('${firstName}', '${lastName}', '${email}', '${hash}', '${photo}');`
    )
    const insertCondition = firstName !== undefined && lastName !== undefined && email !== undefined && password !== undefined;

    const insertRecord = (uploadPhoto) => {
        bcrypt.genSalt(12, function (err, salt) {
            if (err) {
                console.log("unable to generate salt");
                res.send({message: "unable to generate salt"});
                removeData(false, photo);
            }
            else {
                console.log("salt generated!")
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log("unable to generate hash");
                        res.send({message: "unable to generate hash"});
                        removeData(false, photo);
                    }
                    else {
                        console.log("hash is generated");
                        console.log(insertQuery(hash));
                        db.query(insertQuery(hash),
                            (err) => {
                                if (err) {
                                    console.log("unable to insert data in database");
                                    res.send({message: "unable to insert data in database \n email you have entered might already exists"});
                                    removeData(false, photo);
                                }
                                else {
                                    console.log("insert query is executed");
                                    console.log(`SELECT * FROM \`react_expressjs_mysql\` . \`users\` WHERE \`email\` = '${email}';`);
                                    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`users\` WHERE \`email\` = '${email}';`, (err, rows) => {
                                        if (err) {
                                            console.log("unable to get data of new user");
                                            res.send({message: "unable to get data of new user"});
                                            removeData(true, photo, hash, email);
                                        }
                                        else {
                                            console.log(rows);
                                            if (uploadPhoto === true) {
                                                insertFile(rows[0].userId,rows);
                                            }
                                            else {
                                                res.send({userData: rows[0], message: "data added successfully!!!"});
                                            }
                                        }
                                    });
                                }
                            }
                        );
                    }
                }
                );
            }
        });
    }

    console.log(insertCondition, firstName, lastName, email, password, photo);

    insertRecord(insertCondition && photo !== undefined);

});

router.delete('/:id', (req) => {
    console.log(req.params);
    const {id} = req.params;
    db.query(`DELETE FROM \`react_expressjs_mysql\`.\`users\` WHERE (\`userId\` = '${id}');`);
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const data = {...req.body};
    db.query(`UPDATE \`react_expressjs_mysql\`.\`users\` SET ? WHERE (\`userId\` = '${id}');`, data, (err, results) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            db.query('SELECT * FROM users', (err, rows) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(rows);
                }
            });
        }
    })
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`users\` WHERE \`email\` = '${email}'`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            try {
                const passwordHash = result[0].password;
                bcrypt.compare(password, passwordHash, function (err, compareResult) {
                    if (compareResult) {
                        res.send({userData: result[0], message: "Credentials Match."});
                    } else res.send({message: "Password Does Not Match!!!"});
                });
            } catch (e) {
                res.send({message: "E-mail Does Not Exists!!!"});
            }
        }
    });

});

module.exports = router;