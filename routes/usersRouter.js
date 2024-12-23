const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authContoller')

router.get('/', function (req, res) {
    res.send('Users Route');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;