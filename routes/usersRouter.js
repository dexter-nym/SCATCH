const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/authContoller')

router.get('/', function (req, res) {
    res.send('Users Route');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);

module.exports = router;