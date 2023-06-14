const {Customer} =require('../models/customer');
const {Movie} = require('../models/movies');
const {validate, Rental} = require('../models/rental');
const Fawn = require('fawn');
var mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Fawn.init(mongoose);
// Fawn.init(mongoose);

router.get('/', async(req,res)=>{
    const rental = await Rental.find().sort('-date');
    res.send(rental);
});

// router.get()

router.post('/', async (req,res)=>{
    let rental = await validate(req.body);
    if(!rental) return res.status(400).send("bad input");


    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("customer not found");

    const movie = await Movie.findById(req.body.moveiId);
    if(!movie) return res.status(404).send("movie not found");

    if(movie.numbeInStock === 0) return res.status(400).send('movie not found');

    // rental = await Rental.findById(req.body.customerId);
    rental = new rental({
        customer:{
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
    },
    movie: {
        _id: movie._id,
        title: movie._title,
        dailyRentalRate: movie.dailyRentalRate
    }});
// });

try{
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', {_id:movie._id},{
        $inc: {numberInStock: -1}
    })
    .run();
    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();

    res.send(rental);
}
catch(ex){
    res.status(500).send("somehting went wrong!!!");
}

});
module.exports= router;