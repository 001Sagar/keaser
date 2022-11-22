const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require("dotenv");
const port= process.env.PORT || 5000;
// Connect to the MongoDB Database
const db = require('./config/mongoose');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
// dotenv.config();
const autRoutr  = require('./routes/auth');
const userRoutr  = require('./routes/users');
 const productRoute = require('./routes/products');
// const app = express();
// All api Route goes here

app.use("/api/auth",autRoutr);
app.use("/api/users",userRoutr);
 app.use("/api/products",productRoute)
 app.use(express.json());
app.listen(port,function(err){
    if(err){
        console.log('Error',err)
    }
    console.log('Server is running on port:', port);
})