const express = require("express");
const router = express.Router();

const db = require("../lib/db");

router.get('/',(req,res) => {
  db.query('SELECT * FROM users', (err, rows) => {
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
    db.query(`SELECT * FROM \`react_expressjs_mysql\` . \`users\` WHERE \`userId\` = ${id}`,(err,rows) => {
        if(err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    })
})

router.post('/',(req,res) => {
  const {firstName,lastName,email,password,photo} = req.body;
  if(firstName !== undefined && lastName!== undefined && email!==undefined && password!==undefined && photo!==undefined) {
    db.query(`INSERT INTO \`react_expressjs_mysql\`.\`users\` (\`firstName\`, \`lastName\`, \`email\`, \`password\`, \`photo\`)
      VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${photo}');`,
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
    db.query(`DELETE FROM \`react_expressjs_mysql\`.\`users\` WHERE (\`userId\` = '${id}');`);
})

router.put('/:id',(req,res) => {
    const {id} = req.params;
    const data = {...req.body};
    db.query(`UPDATE \`react_expressjs_mysql\`.\`users\` SET ? WHERE (\`userId\` = '${id}');`,data, (err,results) => {
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            db.query('SELECT * FROM users', (err, rows) => {
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