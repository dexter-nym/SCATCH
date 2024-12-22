const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    cart : {
        type : Array,
        default : [],
    },
    isadmin : Boolean,
    orders : {
        type : Array,
        default : [],
    },
    contact : Number,
});

module.exports = mongoose.Model('user', userSchema);