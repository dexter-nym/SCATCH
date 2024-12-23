const express = require('express');
const app = express();
const router = express.Router();

const cookieParser = require('cookie-parser');
const path =require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

router.get('/', function (req, res) {
    res.render('index')
});

module.exports = router;