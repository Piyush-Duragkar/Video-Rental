// const { ref } = require('joi/lib/types/func');
const Joi =  require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre'); 


// mongoose.connect('mongodb://127.0.0.1:27017/playground');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
        
    },

    genre: {
        // type: genreSchema,
        type: String,
        required: true,
    },

    numberInStock: {
        type: Number,
        requred: true,
        minlength: 2,
        maxlength: 1000
    },  
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 1000
}
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie){
    const schema = {
        title: Joi.string().min(2).max(100).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.Number().min(0).max(1000).required(),
        dailyRentalRate: Joi.Number().min(0).max(1000).required()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
// exports.movieSchema = movieSchema;



