const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:name', (req,res) => {
    const {name} = req.params;
    res.sendFile(path.join(__dirname, `../uploads/images/${name}`));
});

module.exports = router;