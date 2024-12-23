const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const cookieParser = ('cookie-parser');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    res.send('Users Route');
});

router.post('/register', function(req, res) {
    try{
        let {email, password, fullname} = req.body;

        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err){
                    return res.send(err.message)
                } else {
                    let user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                    });

                    let token = jwt.sign({email, id: user._id}, 'hey');
                    
                    res.cookie('token', token);
                    res.send(`${req.cookies['token']}, user created`)
                }
            })
        })
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;