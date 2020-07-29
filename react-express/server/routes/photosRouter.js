const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:id/:name', (req,res) => {
    const {id,name} = req.params;
    console.log(id,name)
    res.sendFile(path.join(__dirname, `../uploads/photos/${id}/${name}`));
});

module.exports = router;