const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateTokens');

module.exports.registerUser = async function(req, res) {
    try{
        let {email, password, fullname} = req.body;

        let user = await userModel.findOne({email: email});
        if(user){
            return res.status(401).send("User exists, login.")
        }

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
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.send(`User created, token: ${token}`);
                };
            });
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.loginUser = async function(req, res) {
    try{
        let {email, password} = req.body;
        let user = await userModel.findOne({email: email});
        if(!user){
            return res.send("Email or password incorrect");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if(result){
                let token = generateToken(user);
                res.cookie('token', token);
                res.send('Login successfult')
            } else {
                return res.send("Email or password incorrect");
            }
        });
        
    } catch (error) {
        console.log(error.message);
    }
}