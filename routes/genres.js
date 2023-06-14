const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// const asyncMiddleware = require('../middleware/async');


router.get('/', (async (req,res,next)=>{
        const genres = await Genre.find().sort({name:1});
        res.send(genres);
}));

router.get('/:id', async (req,res)=>{
   const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("id not found");
    res.send(genre);
});


//adding in the information
router.post('/', auth, async(req,res)=>{
    const verify = validate(req.body);
    if(!verify) return res.status(400).send(verify.error.details[0].message);
   
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});


//update pre-existing information
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{
        new: true
    });
   
    if(!genre) return res.status(404).send("not found");

    // genre.name = req.body.name;
    res.send(genre);
});

//deleting information
router.delete('/:id', [auth, admin],async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    // const genre = genres.find(g => g.id == parseInt(req.params.id));
    if(!genre) res.status(404).send("not found");

    // const index = genres.indexOf(genre);
    // genres.splice(index,1);
    res.send(genre);
});



module.exports = router;