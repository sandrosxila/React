const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require("../lib/db");

router.get('/:name', (req,res) => {
    const {name} = req.params;
    res.sendFile(path.join(__dirname, `../uploads/images/${name}`));
});

router.delete('/remove/:name', (req, res) => {
    console.log("I'm in REMOVE");
    const {name} = req.params;
    console.log("IMAGE NAME:",name);
    fs.unlink(path.join(__dirname,`../uploads/images/${name}`),(err) => {
        if(err){
            console.log("file is not deleted or not found");
            res.json({success:false});
        }
        else res.json({success:true});
    });
});

router.delete('/:name',(req,res) => {
    const {name} = req.params;
    console.log(name);
    fs.unlink(path.join(__dirname,`../uploads/images/${name}`),(err) => {
        if(err){
            console.log("file is not deleted or not found");
            res.json({success:false});
        }
        else {
            db.query(`UPDATE \`react_expressjs_mysql\`.\`posts\` SET \`image\` = NULL WHERE (\`image\` = '${name}')`, (err) =>{
                if(err){
                    res.json({success:false});
                }
                else res.json({success:true});
            })
        }
    });

})

module.exports = router;