const _ = require('lodash');
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async(req,res)=>{
const {error} = validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Invalid pass or emial...');

const validPassword = await bcrypt.compare(req.body.password, user.password);
if(!validPassword) return res.status(400).send('Incorrect Password');

const token = user.generateAuthToken();
res.send(token);
 });

function validate(req){
    const schema = {
        email: Joi.string().min(3).max(80).required().email(),
        password: Joi.string().min(8).max(50).required()
    };
return Joi.validate(req, schema);
}

 module.exports = router;