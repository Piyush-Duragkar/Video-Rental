const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/',  async(req, res)=>{
    const customers = await Customer.find().sort({name:1});
    // if(!customers) return res.send((404),"no data found");
    res.send(customers);
});

router.get('/:id', async (req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("Customer not found");
    res.send(customer);
});


router.post('/', async(req, res) => {
    let customer = validate(req.body);
    if(!customer) return res.status(400).send("bad input");

    customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
});

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async(req, res) =>{
let customer =  validate(req.body);
if(!customer) return res.status(400).send("Bad input");

customer = await Customer.findByIdAndUpdate(req.params.id,
    {name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone},
    {new: true});
if(!customer) return res.status(404).send("custommer not found");
    // customer = customer.save();
    res.send(customer);
});

router.delete('/:id', async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("not found");
    // customer = await customer.save();
    res.send(customer);
});

module.exports = router;