const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isGold: {type: Boolean, dafault: false},
    phone: {
        type: String,
        required: true,
        minlength:10,
        maxlength:15
    }

});

const Customer = mongoose.model('Customer',customerSchema);


function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(10).max(15).required()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;