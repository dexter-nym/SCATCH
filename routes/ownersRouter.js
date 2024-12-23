const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// console.log(process.env.NODE_ENV) // to check the node env variable, if not setup returns undefined

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if(owners.length > 0) {
            return res.sendStatus(501)
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    });
}


router.get('/', function (req, res) {
    res.send('Owners route');
});

module.exports = router;