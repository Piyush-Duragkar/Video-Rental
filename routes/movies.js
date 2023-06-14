const mongoose = require('mongoose');
const { Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const movies = await Movie.find().sort('name');
    // if(!movies) return res.status(400).send("no movies available");
    res.send(movies);
});

router.get('/:id', async(req, res)=>{
    const movies = await Movie.findById(req.params.id);
    if(!movies) return res.status(404).send("movie not found");
    res.send(movies);
});


router.put('/:id', async(req,res)=>{
    let movies = validate(req.body);
    if(!movies) return res.status(400).send("bad input");

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

        movies = await Movie.findByIdAndUpdate(req.params.id,
            {title: req.body.title,
                genre:{
                    _id: genre._id,
                    name: genre.name
                },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate},
            {new: true});
        if(!movies) return res.status(404).send("not found");
        movies = movies.save();
        res.send(movies);
});

router.post('/', async(req, res)=>{
    let movie = validate(req.body);
    if(!movie) return res.status(400).send("Bad Input");
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("invalid genre id");

    movie = new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    
    res.send(movie);
});

router.delete('/:id', async(req,res)=>{
    const movies = await Movie.findByIdAndRemove(req.params.id);
    if(!movies) return res.status(404).send("no such movie exists");
    res.send(movies);
});

module.exports = router;