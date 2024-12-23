const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        req.flash("error", "You need to login.");
        return res.redirect('/');
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next()
    } catch (error) {
        req.flash("error", "Something went wrong.");
        req.redirect('/');
    }
}