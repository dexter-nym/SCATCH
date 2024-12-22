const express = require('express');
const app = express();

const port = 3000;

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname, 'public'))
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    try{
        res.send('Welcome, Current route "/"');
    } catch(error){
        console.log(error);       
    }
});

app.listen(port, function (req, res) {
    console.log('Server started');
});