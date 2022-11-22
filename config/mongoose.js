const mongoose = require('mongoose');

 mongoose.connect('mongodb://0.0.0.0:27017/ECOMMERCEAPI');

 const db = mongoose.connection;

 db.on('error',console.error.bind(console, 'Error in connecting to MongoDB'));

 db.once('open', function(){
    console.log("connected to MongoDb")
 })
 module.exports = db;
