const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Product Route');
});

module.exports = router;