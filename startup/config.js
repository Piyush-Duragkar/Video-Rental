const config = require('config');
module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error("Private key is yet to be defined!!!");
        // process.exit(1);
    } 
}