const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require("../lib/db");


router.get('/', (req, res) => {
    db.query('SELECT * FROM posts ORDER BY postId DESC', (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    });
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`posts\` WHERE \`postId\` = ${id}  ORDER BY postId DESC`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.json(...rows);
        }
    })
})

router.post('/', (req, res) => {
    let {title, content, userId} = req.body;
    console.log(req.files);
    console.log(req.body);

    if (req.files !== null) {
        const {file} = req.files;
        file.mv(path.join(__dirname, `../uploads/images/${file.name}`), err => {
            if (err) {
                console.log(err)
            }
        })
    }
    const image = req.files !== null ? req.files.file.name : '';
    if (title !== undefined && image !== undefined && content !== undefined && userId !== undefined) {
        if(req.files === null){
            try {
                db.query(`INSERT INTO \`react_expressjs_mysql\`.\`posts\` (\`title\`, \`content\`, \`userId\`) VALUES ?`,
                    [[[ title,content, userId]]],
                    function (err) {
                        console.log(err);
                        if (err) {
                            res.status(500).send(err);
                        }
                        res.send("data added successfully!!!");
                    });
            } catch (err) {
                res.status(500).send(err);
            }
        }
        else {
            try {
                db.query(`INSERT INTO \`react_expressjs_mysql\`.\`posts\` (\`title\`, \`image\`, \`content\`, \`userId\`) VALUES ?`,
                    [[[title,image,content,userId]]],
                    function (err) {
                        console.log(err);
                        if (err) {
                            res.status(500).send(err);
                        }
                        res.send("data added successfully!!!");
                    });
            } catch (err) {
                res.status(500).send(err);
            }
        }
    }
});

router.delete('/:id', (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    db.query(`DELETE FROM \`react_expressjs_mysql\`.\`posts\` WHERE (\`postId\` = '${id}');`,(err) => {
        if(err){
            res.json({success:false});
        }
        else res.json({success:true});
    });
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const prevImage = req.body.prevImage;

    const {title, content, userId} = req.body;

    const data = {title, content};

    console.log(req.files);
    console.log(req.body);
    if (req.files !== null) {
        const {file} = req.files;
        fs.unlink(path.join(__dirname, `../uploads/images/${prevImage}`), err => {
            if (err) {
                console.log(err);
            }
        });
        file.mv(path.join(__dirname, `../uploads/images/${file.name}`), err => {
            if (err) {
                console.log(err);
            }
            data.image = file.name;
            db.query(`UPDATE \`react_expressjs_mysql\`.\`posts\` SET ? WHERE (\`postId\` = '${id}');`, data, (err) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    db.query('SELECT * FROM posts', (err, rows) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(rows);
                        }
                    });
                }
            });
        })

    } else {
        db.query(`UPDATE \`react_expressjs_mysql\`.\`posts\` SET ? WHERE (\`postId\` = '${id}');`, data, (err) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                db.query('SELECT * FROM posts', (err, rows) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(rows);
                    }
                });
            }
        });
    }


})
module.exports = router;