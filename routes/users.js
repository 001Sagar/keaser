const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

// update user profile
router.put('/:id',async(req,res) =>{
if(req.body.userId == req.params.id){
    if(req.body.password){
            const salt  = bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password,salt)
    }
    try {
        const udatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        { new:true}
        );
        res.status(200).json(udatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}else{
    res.status(401).json("You cam only update your profile")
}

})
module.exports = router;