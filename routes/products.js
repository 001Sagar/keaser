const router = require('express').Router(); 
const Product = require('../models/Product') ;

// create user profile
router.post('/create/new',async(req,res) =>{
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.log('error',err);
    res.status(500).json(error);
  }
});
// Get all products API with  Search
router.get("/", async(req,res) =>{
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if(qNew){
      products = await Product.find().sort({ createdAt: -1}).limit(1);
    }else if(qCategory){
      products = await Product.find({
        categories:{
          $in:[qCategory],
        },
      })
    }else{
      products = Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
})
module.exports = router;