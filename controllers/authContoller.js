const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateTokens');

module.exports.registerUser = async function(req, res) {
    try{
        let {email, password, fullname} = req.body;

        let user = await userModel.findOne({email: email});
        if(user){
            req.flash("error", "You already have an account")
            return res.redirect('/')
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
                    req.flash("error", "Account created");
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
            return req.flash("error", "Email or password incorrect");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if(result){
                let token = generateToken(user);
                res.cookie('token', token);
                res.redirect('/shop')
            } else {
                return req.flash("error", "Email or password incorrect");
            }
        });
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.logout = function (req, res) {
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
}