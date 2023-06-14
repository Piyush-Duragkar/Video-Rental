const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }
});

const Genre = mongoose.model('Gerne', genreSchema);

//validating the information
function validateGenre(genre) {
    const schema = {
        name: Joi.String().min(3).max(30).required()
    };
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;