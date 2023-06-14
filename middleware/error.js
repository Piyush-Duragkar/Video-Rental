const winston = require('winston');

module.exports = function(err, req, res, next){
    // return res.status(500).send('something went wrong');

    winston.error(err.message, err);

    res.status(500).send('Something failed');
};