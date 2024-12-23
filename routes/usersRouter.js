const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authContoller')

router.get('/', function (req, res) {
    res.send('Users Route');
});

router.post('/register', registerUser);

module.exports = router;