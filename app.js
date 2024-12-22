const express = require('express');
const app = express();

const port = 3000;

const db = require('./config/mongoose-connection')
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname, 'public'))

app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(port, function (req, res) {
    console.log('Server started');
});