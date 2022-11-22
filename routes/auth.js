const router = require('express').Router(); 
const User = require('../models/User') ;
const bcrypt = require("bcrypt");
//Register API
router.post('/register',async(req,res) =>{
    try{
        console.log(req.body);
         const salt  = await bcrypt.genSalt(10);
         const hashPass = await bcrypt.hash(req.body.password,salt)
         const newUser = await User.create({
            username:req.body.username,
            email:req.body.email,
           password:hashPass,
         })
        //  const user = await newUser.save();
         res.status(200).json(newUser);
    } catch(err){
        console.log('error',err);
        res.status(500).json(err);
    }
})
// Login API
router.post('/login',async(req,res) =>{
    try{
       const user = await User.findOne({ username:req.body.username})
       !user && res.status(400).json("wrong Credentials")
       const validate = await bcrypt.compare(req.body.password,  user.password)
       !validate && res.status(422).json("Incorrect Password")
       const{ password, ...others} = user._doc;// Beacuse we not sending passsword
       res.status(200).json(others);
    } catch(err){
        res.status(500).json(others);
    }
})
module.exports = router;