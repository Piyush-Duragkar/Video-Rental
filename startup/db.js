const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://127.0.0.1:27017/vidly',{
    useNewurlParser:true,
    useUnifiedTopology: true
})
.then(()=>winston.info('Connected to DB'))
// .catch(err=>console.error("Failed Connecting",err));
}