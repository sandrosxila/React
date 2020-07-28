const express = require("express");
const router = express.Router();

const db = require("../lib/db");

router.get('/',(req,res) => {
    db.query('SELECT * FROM posts', (err, rows) => {
        if(err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
})

router.get('/:id',(req, res) => {
    const {id} = req.params;
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`posts\` WHERE \`postId\` = ${id}`,(err,rows) => {
        if(err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    })
})

router.post('/',(req,res) => {
    const {title,image,content,userId} = req.body;

    if(title !== undefined && image!== undefined && content!==undefined && userId!==undefined) {
        db.query(`INSERT INTO \`react_expressjs_mysql\`.\`posts\` (\`title\`, \`image\`, \`content\`, \`userId\`) 
            VALUES ('${title}', '${image}', '${content}', '${userId}');`,
            (err) => {
                console.log(err);
                if (err) {
                    res.send(err);
                }
                res.send("data added successfully!!!");
            })
    }
})

router.delete('/:id', (req) => {
    console.log(req.params);
    const {id} = req.params;
    db.query(`DELETE FROM \`react_expressjs_mysql\`.\`posts\` WHERE (\`postId\` = '${id}');`);
})

router.put('/:id',(req,res) => {
    const {id} = req.params;
    const data = {...req.body};
    db.query(`UPDATE \`react_expressjs_mysql\`.\`posts\` SET ? WHERE (\`postId\` = '${id}');`,data, (err) => {
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            db.query('SELECT * FROM posts', (err, rows) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.json(rows);
                }
            });
        }
    })
})
module.exports = router;