const mongoose = require('mongoose');
const Joi = require('joi');



const rentalSchema = new mongoose.Schema({
customer: {
      type: new mongoose.Schema({     
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                defaut: false
            },
            phone:{
                type: Number,
                required: true,
                maxlength: 15,
                minlength: 10
            }
        }),
    required: true
    },

movie:{
    type: new mongoose.Schema({
        title:{
            type: String,
            required: true,
            maxlength: 100,
            minlength: 3,
            trim: true
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            minlength: 1,
            maxlength: 200
        },
    }),
    required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date,
        required: true,
        min: 0  
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental  = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema={
        customerId: Joi.objectId().required(),
        moiveId: Joi.objectId().required()
    };
    return Joi.validate(rental,schema);
}

exports.validate = validateRental;
exports.Rental = Rental;