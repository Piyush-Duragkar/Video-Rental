const mongoose = require('mongoose');
const Joi = require('joi');
const jwt= require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 80
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024 
    },           
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
   const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(3).max(80).required().email(),
        password: Joi.string().min(8).max(52).required()
    };
    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
exports.userSchema = userSchema;
